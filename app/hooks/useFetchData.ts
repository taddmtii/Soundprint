import { useEffect, useState } from "react";

export function useFetchData() {
  const [topArtists, setTopArtists] = useState<TopArtistsResponse | null>(null);
  const [topTracks, setTopTracks] = useState<TopTracksResponse | null>(null);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<Response>();

  useEffect(() => {
    const fetchData = async () => {
      // Fetch Top 5 artists
      const topArtistsResponse = await fetch("/api/spotify/top-artists", {
        method: "GET",
      });
      if (!topArtistsResponse.ok) {
        setError(topArtistsResponse);
      }
      const topArtistsData = await topArtistsResponse.json();
      setTopArtists(topArtistsData);
      console.log(topArtistsData);

      // Fetch Top 5 tracks
      const topTracksResponse = await fetch("/api/spotify/top-tracks", {
        method: "GET",
      });
      if (!topTracksResponse.ok) {
        setError(topTracksResponse);
      }
      const topTracksData = await topTracksResponse.json();
      setTopTracks(topTracksData);
      console.log(topTracksData);

      const spotifyUserResponse = await fetch("api/spotify/me", {
        method: "GET",
      });
      if (!spotifyUserResponse.ok) {
        setError(spotifyUserResponse);
      }
      const spotifyUserData = await spotifyUserResponse.json();
      setUser(spotifyUserData);
      console.log(spotifyUserData);
    };
    fetchData();
  }, []);

  return {
    topArtists,
    topTracks,
    user,
    error,
  };
}
