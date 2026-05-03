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
  console.error(`[github-oauth] FAIL — ${reason}:`, detail);
  const url = new URL("/login", origin);
  url.searchParams.set("error", reason);
  if (msg) url.searchParams.set("detail", msg);
  return NextResponse.redirect(url);
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) return fail(origin, "github_denied", error);

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const baseUrl = (process.env.NEXT_PUBLIC_BASE_URL ?? "").replace(/\/$/, "");

  if (!clientId || !clientSecret) return fail(origin, "github_not_configured");
  if (!baseUrl) return fail(origin, "base_url_missing");

  try {
    // 1 — Exchange code for GitHub access token
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: `${origin}/api/auth/github`,
      }),
    });
    const tokenData = await tokenRes.json();
    if (!tokenData.access_token) return fail(origin, "github_token_failed", tokenData);

    const headers = {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/vnd.github+json",
    };

    // 2 — Get GitHub profile
    const profileRes = await fetch("https://api.github.com/user", { headers });
    const profile = await profileRes.json();

    let email = profile.email as string | null;
    if (!email) {
      const emailsRes = await fetch("https://api.github.com/user/emails", { headers });
      const emails: { email: string; primary: boolean; verified: boolean }[] = await emailsRes.json();
      email = emails.find((e) => e.primary && e.verified)?.email ?? null;
    }
    if (!email) return fail(origin, "github_no_email", profile);

    // 3 — Create / find user on backend
    const backendUrl = `${baseUrl}/auth/github`;
    console.log("[github-oauth] calling backend:", backendUrl);

    const backendRes = await fetch(backendUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: profile.name ?? profile.login ?? email.split("@")[0],
        avatar: profile.avatar_url ?? null,
      }),
      cache: "no-store",
    });

    const rawText = await backendRes.text();
    console.log("[github-oauth] backend raw response:", backendRes.status, rawText);

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
