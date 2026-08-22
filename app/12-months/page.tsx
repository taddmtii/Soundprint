'use client'

import Header from "../components/Header";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import { useTopArtists } from "../hooks/useTopArtists";
import { useTopTracks } from "../hooks/useTopTracks";

export default function TwelveMonthsPage() {
    const {data: topArtists, isLoading: topArtistsLoading} = useTopArtists("long_term");
    const {data: topTracks, isLoading: topTracksLoading} = useTopTracks("long_term");
    return (
      <div className="w-full">
        <Header />
        <div className="flex flex-col gap-2">
          <TopArtists data={topArtists} isLoading={topArtistsLoading}  />
          <TopTracks data={topTracks} isLoading={topTracksLoading}  />
        </div>
      </div>
    )
}
