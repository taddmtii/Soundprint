'use client'

import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import TopArtistsCard from "../components/TopArtistsCard";
import TopTracksCard from "../components/TopTracksCard";
import { useFetchData } from "../hooks/useFetchData";
import CurrentlyPlayingCard from "../components/CurrentlyPlayingCard";

export default function Dashboard() {

  const data = useFetchData();
  return (
    <>
      <span className="text-2xl font-bold">Hello, {data.user?.display_name}! Welcome to Soundprint.</span>
      <div className="flex">
        {/* <TopTracksCard content={data.topTracks?.items} isLoading={data.isLoading}/>
        <TopArtistsCard content={data.topArtists?.items} isLoading={data.isLoading} />
        <RecentlyPlayedCard content={data.recentlyPlayed?.items} isLoading={data.isLoading} /> */}
        <CurrentlyPlayingCard content={data.currentlyPlaying} recentlyPlayed={data.recentlyPlayed} isLoading={data.isLoading} />
      </div>
    </>
  )
}
