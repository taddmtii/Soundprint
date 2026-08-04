'use client'

import TopArtistsCard from "../components/TopArtistsCard";
import TopTracksCard from "../components/TopTracksCard";
import { useFetchData } from "../hooks/useFetchData";

export default function Dashboard() {
  const data = useFetchData();
  return (
    <>
      <span>Hello, {data.user?.display_name}! Welcome to Soundprint.</span>
      <div className="flex">
        <TopTracksCard title="Top 5 Tracks" content={data.topTracks?.items} />
        <TopArtistsCard title="Top 5 Artists" content={data.topArtists?.items} />
      </div>
    </>
  )
}
