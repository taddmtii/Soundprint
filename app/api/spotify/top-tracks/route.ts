import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const access_token = cookieStore.get('access_token')?.value;

  if (!access_token) {
    return NextResponse.json({ error: 'access_token could not be read.' });
  }

  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get('time_range') ?? 'short_term';
  const limit = searchParams.get('limit') ?? 50;

  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${timeRange}&limit=${limit}`,
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
