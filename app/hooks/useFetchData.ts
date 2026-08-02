import { useEffect, useState } from 'react';

export function useFetchData() {
  const [topArtists, setTopArtists] = useState<TopArtistsResponse | null>(null);
  const [topTracks, setTopTracks] = useState<TopTracksResponse | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayedResponse | null>(null);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<Response>();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Top artists
      const topArtistsResponse = await fetch('/api/spotify/top-artists', {
        method: 'GET',
      });
      if (!topArtistsResponse.ok) {
        setError(topArtistsResponse);
      }
      const topArtistsData = await topArtistsResponse.json();
      setTopArtists(topArtistsData);
      console.log(topArtistsData);

      // Fetch Top tracks
      const topTracksResponse = await fetch('/api/spotify/top-tracks', {
        method: 'GET',
      });
      if (!topTracksResponse.ok) {
        setError(topTracksResponse);
      }
      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData);
      console.log(topTracksData);

      // Fetch the User
      const spotifyUserResponse = await fetch('api/spotify/me', {
        method: 'GET',
      });
      if (!spotifyUserResponse.ok) {
        setError(spotifyUserResponse);
      }
      const spotifyUserData = await spotifyUserResponse.json();
      setUser(spotifyUserData);
      console.log(spotifyUserData);

      // Fetch recently played tracks
      const recentlyPlayedResponse = await fetch('api/spotify/me/recently-played', {
        method: 'GET',
      });
      if (!recentlyPlayedResponse.ok) {
        setError(recentlyPlayedResponse);
      }
      const recentlyPlayedData = await recentlyPlayedResponse.json();
      setRecentlyPlayed(recentlyPlayedData);
      console.log(recentlyPlayedData);
    };
    fetchData();
  }, []);

  return {
    topArtists,
    topTracks,
    recentlyPlayed,
    user,
    error,
  };
}

function getMinutesPlayedForArtist(artist: string) {}
