import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token')?.value;

  if (!access_token) {
    return NextResponse.json({ error: 'access_token could not be read.' });
  }
  // TODO: Short term only right now, change query param so that we can conditionally put short term, medium term and long term. This is importnat for calculations like minuted played, but for simplicity sake right now this is fine.
  const response = await fetch(
    'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50',
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    },
  );
  if (!response.ok) {
    const errorData = await response.json();
    return NextResponse.json(errorData, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
