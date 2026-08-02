import { Prisma } from "@/app/generated/prisma/client";
import { db } from "@/db";
import { NextRequest, NextResponse } from "next/server";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID!;
const REDIRECT_URI = "http://127.0.0.1:3000/api/auth/callback";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";
const APP_ORIGIN = "http://127.0.0.1:3000";

export async function GET(request: NextRequest) {
  // Look at the url parameters and get the code, as well as the codeVerifier from the cookies.
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const codeVerifier = request.cookies.get("code_verifier")?.value;

  if (error) {
    return NextResponse.json(
      { error: "Unauthorized: User denied authorization." },
      { status: 401 },
    );
  }

  // Error if we do not have either of these things.
  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Missing either code or verifier" },
      { status: 400 },
    );
  }

  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: REDIRECT_URI,
      client_id: CLIENT_ID,
      code_verifier: codeVerifier,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "Token exchange failed" },
      { status: 500 },
    );
  }

  // Data structure:
  // {
  //   access_token: "...",
  //   token_type: "Bearer",
  //   expires_in: 3600,
  //   refresh_token: "...",
  //   scope: "..."
  // }
  const data = await response.json();

  // Look up user profile with access token.
  const profileResponse = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });

  const profile = await profileResponse.json();

  // Create entry in users table if user does not already exist. If they do exist, update fields with new information.
  const expiresAt = new Date(Date.now() + data.expires_in * 1000);

  let user;
  try {
    user = await db.user.upsert({
      where: { spotifyAccountId: profile.account_id },
      update: {
        spotifyUserId: profile.id,
        displayName: profile.display_name,
        email: profile.email,
        imageUrl: profile.images[0].url ?? null,
        spotifyProfileUrl: profile.external_urls?.spotify ?? null,
        spotifyUri: profile.uri,
        scopes: data.scope,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        token_expires_at: expiresAt,
      },
      create: {
        spotifyAccountId: profile.account_id,
        spotifyUserId: profile.id,
        displayName: profile.display_name,
        email: profile.email,
        imageUrl: profile.images[0].url ?? null,
        spotifyProfileUrl: profile.external_urls?.spotify ?? null,
        spotifyUri: profile.uri,
        scopes: data.scope,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        token_expires_at: expiresAt,
      },
    });
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      if (err.code === "P2002") {
        user = await db.user.update({
          where: { spotifyAccountId: profile.id },
          data: {
            spotifyUserId: profile.id,
            displayName: profile.display_name,
            email: profile.email,
            imageUrl: profile.images[0].url ?? null,
            spotifyProfileUrl: profile.external_urls?.spotify ?? null,
            spotifyUri: profile.uri,
            scopes: data.scope,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            token_expires_at: expiresAt,
          },
        });
      }
      // Throw anything that is not explicitly handled
      throw err;
    } else {
      return NextResponse.json({ error: "DB write failed." }, { status: 500 });
    }
  }

  // Redirect user to Dashboard now that they are authetnicated and store token in cookie.
  // If user is null for any reason, redirect to home page for now.

  // if (user == null) {
  //   return NextResponse.redirect(new URL("/", APP_ORIGIN));
  // }

  const res = NextResponse.redirect(new URL("/dashboard", APP_ORIGIN));
  res.cookies.set("access_token", data.access_token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: data.expires_in,
    path: "/",
  });
  res.cookies.delete("code_verifier");

  return res;
}
