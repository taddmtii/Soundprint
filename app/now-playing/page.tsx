'use client'

import { Separator } from "@/components/ui/separator";
import CurrentlyPlayingCard from "../components/CurrentlyPlayingCard";
import RecentlyPlayedCard from "../components/RecentlyPlayedCard";
import Header from "../components/Header";
import { useCurrentlyPlaying } from "../hooks/useCurrentlyPlaying";

export default function NowPlaying() {
  return (
    <div className="w-full">
      <Header />
      <div className="flex flex-col gap-4 items-center p-4">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Now playing</h1>
          <span className="text-muted-foreground">What is coming out of your speakers right now. Whats next?</span>
        </div>
        <Separator />
        <div className="flex flex-col gap-4 items-center">
          <CurrentlyPlayingCard />
          <Separator />
          <RecentlyPlayedCard  />
        </div>
      </div>
    </div>
  )
}
