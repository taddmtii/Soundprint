'use client'

import { Button } from "@/components/ui/button";

const CLIENT_ID = process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = "http://127.0.0.1:3000/api/auth/callback"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "code"
const SCOPE = "user-read-private user-read-email user-top-read user-read-recently-played user-read-currently-playing user-read-playback-state";
const generateRandomString = (length: number) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}

// Uses SHA256 encryption algorithm for hashing the string we got from the code verifier.
const sha256 = async (plain: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
}

// Returns base64 representation of the digest.
const base64encode = (input: ArrayBuffer) => {
    return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}

export default function LoginButton() {
  const handleLogin = async () => {
    const codeVerifier = generateRandomString(64);
    // Get random string from code verifier, hash it using SHA256, then base64encode it so spotifys API can understand it.
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Set cookie in the browser for code_verifier.
    // cookie is sent for requests to any path (path=/)
    // expires in 5 minutes
    document.cookie = `code_verifier=${codeVerifier}; path=/; max-age=300; SameSite=Lax`;

    const params: Record<string, string> = {
      response_type: RESPONSE_TYPE,
      client_id: CLIENT_ID ?? '',
      redirect_uri: REDIRECT_URI,
      scope: SCOPE,
      code_challenge_method: "S256",
      code_challenge: codeChallenge
    }

    // Create authorize url with appended search params we made.
    const authUrl = new URL(AUTH_ENDPOINT);
    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  };

  return (
    <Button onClick={handleLogin} variant={"outline"} className="cursor-pointer">
      Login with Spotify
    </Button>
  )

}
