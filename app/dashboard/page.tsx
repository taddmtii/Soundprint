'use client'

import TopFiveCard from "../components/TopFiveCard";
import { useFetchData } from "../hooks/useFetchData";

export default function Dashboard() {
  const data = useFetchData();
  return (
    <>
      <span>Hello, {data.user?.display_name}! Welcome to Sountprint.</span>
      <div className="flex">
        <TopFiveCard title="Top 5 Artists" content={data.topArtists} iconPath="" />
        <TopFiveCard title="Top 5 Tracks" content={data.topTracks} iconPath="" />
      </div>
    </>
  )
}
