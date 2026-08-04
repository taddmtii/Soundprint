'use client'

import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import TopArtistsCard from "../components/TopArtistsCard";
import TopTracksCard from "../components/TopTracksCard";
import { useFetchData } from "../hooks/useFetchData";

export default function Dashboard() {
  const data = useFetchData();
  return (
    <>
      <span>Hello, {data.user?.display_name}! Welcome to Soundprint.</span>
      <div className="flex">
        <TopTracksCard content={data.topTracks?.items} />
        <TopArtistsCard content={data.topArtists?.items} />
        <RecentlyPlayedCard content={data.recentlyPlayed?.items} />
      </div>
    </>
  )
}
