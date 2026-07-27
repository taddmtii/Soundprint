'use client'

import { useEffect, useState } from "react";
import StatDisplayCard from "../components/StatDisplayCard";

export default function Dashboard() {

  const [topArtists, setTopArtists] = useState(null);
  const [topTracks, setTopTracks] = useState(null);
  const [error, setError] = useState<Response>();

  useEffect(() => {
    const fetchData = async () => {
        // Fetch Top 5 artists
        const topArtistsResponse = await fetch('/api/spotify/top-artists', {
          method: 'GET'
        })
        if (!topArtistsResponse.ok) {
          setError(topArtistsResponse)
        }
        const topArtistsData = await topArtistsResponse.json();
        setTopArtists(topArtistsData)
        console.log(topArtistsData)

        // Fetch Top 5 tracks
        const topTracksResponse = await fetch('/api/spotify/top-tracks', {
          method: 'GET'
        })
        if (!topTracksResponse.ok) {
          setError(topTracksResponse)
        }
        const topTracksData = await topTracksResponse.json();
        setTopTracks(topTracksData)
        console.log(topTracksData)
    }
    fetchData();
  }, [])

  return (
    <>
      <div className="flex">
        <StatDisplayCard title="Streams" content="34" footer="tracks played" iconPath="..." />
      </div>
    </>
  )
}
