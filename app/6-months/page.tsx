'use client'

import Header from "../components/Header";
import TopArtist from "../components/TopArtist";
import TopArtists from "../components/TopArtists";
import TopTrack from "../components/TopTrack";
import TopTracks from "../components/TopTracks";
import { useTopArtists } from "../hooks/useTopArtists";
import { useTopTracks } from "../hooks/useTopTracks";

export default function SixMonthsPage() {
    const {data: topArtists, isLoading: topArtistsLoading} = useTopArtists("medium_term");
    const {data: topTracks, isLoading: topTracksLoading} = useTopTracks("medium_term");
      return (
        <div className="w-full">
          <Header />
          <div className="flex flex-col gap-4 items-center p-4">
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold">Last 6 Months</h1>
              <span className="text-muted-foreground">Your most-played tracks and artists from the past six months.</span>
            </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between gap-2">
              <TopArtist data={topArtists} isLoading={topArtistsLoading} />
              <TopTrack data={topTracks} isLoading={topTracksLoading} />
            </div>
            <TopArtists data={topArtists} isLoading={topArtistsLoading}  />
            <TopTracks data={topTracks} isLoading={topTracksLoading}  />
          </div>
          </div>
        </div>
      )
}
