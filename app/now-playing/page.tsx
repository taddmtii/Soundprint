'use client'

import { Separator } from "@/components/ui/separator";
import CurrentlyPlayingCard from "../components/CurrentlyPlayingCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import { useFetchData } from "../hooks/useFetchData";

export default function NowPlaying() {
  const data = useFetchData();
  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Now playing</h1>
        <span className="text-muted-foreground">What is coming out of your speakers right now. Whats next?</span>
      </div>
      <Separator />
      <div className="flex flex-col gap-2 items-center">
        <CurrentlyPlayingCard content={data.currentlyPlaying} isLoading={data.isLoading} />
        <Separator />
        <RecentlyPlayedCard content={data.recentlyPlayed?.items} isLoading={data.isLoading} />
      </div>
      </div>
  )
}
