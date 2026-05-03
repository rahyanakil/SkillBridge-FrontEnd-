import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams, origin } = req.nextUrl;
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error || !code) {
    return NextResponse.redirect(new URL("/login?error=google_denied", origin));
  }

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = `${origin}/api/auth/google`;

  if (!clientId || !clientSecret) {
    return NextResponse.redirect(new URL("/login?error=oauth_not_configured", origin));
  }

  // Exchange authorization code for access token
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

  if (!tokenData.access_token) {
    console.error("[google-oauth] token exchange failed:", tokenData);
    return NextResponse.redirect(new URL("/login?error=token_exchange_failed", origin));
  }

  // Fetch Google user profile
  const profileRes = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  const profile = await profileRes.json();

  if (!profile.email) {
    return NextResponse.redirect(new URL("/login?error=no_email", origin));
  }

  // Call our backend to create / find the user and get a JWT
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: profile.email,
      name: profile.name ?? profile.email.split("@")[0],
      avatar: profile.picture ?? null,
    }),
  });

  const result = await backendRes.json();

  if (!result.success || !result.data?.token) {
    console.error("[google-oauth] backend auth failed:", result);
    return NextResponse.redirect(new URL("/login?error=backend_auth_failed", origin));
  }

  // Set the JWT cookie exactly like the regular login flow
  const cookieStore = await cookies();
  cookieStore.set("token", result.data.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return NextResponse.redirect(new URL("/", origin));
}
