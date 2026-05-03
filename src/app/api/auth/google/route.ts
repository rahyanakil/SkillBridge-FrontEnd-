import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
};

function fail(origin: string, reason: string, detail?: unknown) {
  const msg = detail ? String(JSON.stringify(detail)).slice(0, 300) : "";
  console.error(`[google-oauth] FAIL — ${reason}:`, detail);
  const url = new URL("/login", origin);
  url.searchParams.set("error", reason);
  if (msg) url.searchParams.set("detail", msg);
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) return fail(origin, "google_denied", error);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");
  const redirectUri = `${origin}/api/auth/google`;

  if (!clientId || !clientSecret) return fail(origin, "google_not_configured");
  if (!baseUrl) return fail(origin, "base_url_missing");

  try {
    // 1 — Exchange code for Google access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return fail(origin, "google_token_failed", tokenData);

    // 2 — Get Google profile
    const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    const profile = await profileRes.json();
    if (!profile.email) return fail(origin, "google_no_email", profile);

    // 3 — Create / find user on backend
    const backendUrl = `${baseUrl}/auth/google`;
    console.log("[google-oauth] calling backend:", backendUrl);

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: profile.email,
        name: profile.name ?? profile.email.split("@")[0],
        avatar: profile.picture ?? null,
      }),
      cache: "no-store",
    });

    const rawText = await backendRes.text();
    console.log("[google-oauth] backend raw response:", backendRes.status, rawText);

    let result: any;
    try { result = JSON.parse(rawText); } catch { return fail(origin, "backend_invalid_json", rawText); }

    if (!result.success || !result.data?.token) {
      return fail(origin, "backend_auth_failed", { status: backendRes.status, body: result });
    }

    // 4 — Set JWT cookie and redirect home
    const response = NextResponse.redirect(new URL("/", origin));
    response.cookies.set("token", result.data.token, COOKIE_OPTIONS);
    return response;

  } catch (err: any) {
    return fail(origin, "server_error", err?.message);
  }
}
