'use client'

import { useEffect, useState } from "react";
import StatDisplayCard from "../components/StatDisplayCard";
import TopFiveCard from "../components/TopFiveCard";
import { useFetchData } from "../hooks/useFetchData";

export default function Dashboard() {
  const data = useFetchData();
  return (
    <>
      <span>Hello, {data.user?.display_name}! Welcome to Sountprint.</span>
      <div className="flex">
        <TopFiveCard title="Top 5 Artists" content={data.topArtists} footer="" iconPath="" />
        <TopFiveCard title="Top 5 Tracks" content={data.topTracks} footer="" iconPath="" />
      </div>
    </>
  )
}
