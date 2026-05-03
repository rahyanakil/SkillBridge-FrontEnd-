import { NextRequest, NextResponse } from "next/server";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60,
  path: "/",
};

function fail(origin: string, reason: string, detail?: unknown) {
  console.error(`[github-oauth] ${reason}`, detail ?? "");
  return NextResponse.redirect(new URL(`/login?error=${reason}`, origin));
}

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) return fail(origin, "github_denied", error);

  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (!clientId || !clientSecret) return fail(origin, "oauth_not_configured");
  if (!baseUrl) return fail(origin, "base_url_not_configured");

  try {
    // 1 — Exchange code for access token
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
    console.log("[github-oauth] token response status:", tokenRes.status);

    if (!tokenData.access_token) {
      return fail(origin, "token_exchange_failed", tokenData);
    }

    const headers = {
      Authorization: `Bearer ${tokenData.access_token}`,
      Accept: "application/vnd.github+json",
    };

    // 2 — Fetch user profile
    const profileRes = await fetch("https://api.github.com/user", { headers });
    const profile = await profileRes.json();

    // GitHub users may have a private email — fetch the verified primary one
    let email = profile.email as string | null;
    if (!email) {
      const emailsRes = await fetch("https://api.github.com/user/emails", { headers });
      const emails: { email: string; primary: boolean; verified: boolean }[] = await emailsRes.json();
      email = emails.find((e) => e.primary && e.verified)?.email ?? null;
    }
    console.log("[github-oauth] resolved email:", email);

    if (!email) return fail(origin, "no_email", profile);

    // 3 — Create / find user on backend
    const backendRes = await fetch(`${baseUrl}/auth/github`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name: profile.name ?? profile.login ?? email.split("@")[0],
        avatar: profile.avatar_url ?? null,
      }),
    });
    const result = await backendRes.json();
    console.log("[github-oauth] backend status:", backendRes.status, "success:", result.success);

    if (!result.success || !result.data?.token) {
      return fail(origin, "backend_auth_failed", result);
    }

    // 4 — Set JWT cookie and redirect home
    const response = NextResponse.redirect(new URL("/", origin));
    response.cookies.set("token", result.data.token, COOKIE_OPTIONS);
    return response;

  } catch (err: any) {
    return fail(origin, "server_error", err?.message);
  }
}
