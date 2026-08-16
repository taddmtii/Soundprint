import { useEffect, useState } from 'react';

export function useFetchData() {
  const [topArtists, setTopArtists] = useState<TopArtistsResponse | null>(null);
  const [topTracks, setTopTracks] = useState<TopTracksResponse | null>(null);
  const [recentlyPlayed, setRecentlyPlayed] = useState<RecentlyPlayedResponse | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<CurrentlyPlayingResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [user, setUser] = useState<SpotifyUser | null>(null);
  const [error, setError] = useState<Response>();
  const POLLING_INTERVAL = 10000;

  useEffect(() => {
    // topArtists, topTracks, and User only should be fetched on mount.
    // The goal here is to reduce server load, and poll for the other stuff.
    const fetchStaticData = async () => {
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

      setIsLoading(false);
    };

    // Fetch the other stuff that needs to be polled for.
    const fetchLiveData = async () => {
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

      // Fetch currently playing track
      const currentlyPlayingResponse = await fetch('api/spotify/me/player', {
        method: 'GET',
      });
      if (!currentlyPlayingResponse.ok) {
        setError(currentlyPlayingResponse);
      } else {
        const currentlyPlayingData = await currentlyPlayingResponse.json();
        setCurrentlyPlaying(currentlyPlayingData);
        console.log(currentlyPlayingData);
      }
    }
    fetchStaticData();
    fetchLiveData();
    // Set up interval to run the callback (fetchLiveData). Returns ID that
    // references the id.
    const interval = setInterval(fetchLiveData, POLLING_INTERVAL);
    // Clean up the interval.
    return () => clearInterval(interval)
  }, []);

  return {
    topArtists,
    topTracks,
    recentlyPlayed,
    currentlyPlaying,
    isLoading,
    user,
    error,
  };
}
