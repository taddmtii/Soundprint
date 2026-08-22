'use client'

import Header from "../components/Header";
import TopArtists from "../components/TopArtists";
import { useTopArtists } from "../hooks/useTopArtists";

export default function SixMonthsPage() {
    const {data, isLoading} = useTopArtists("medium_term");
    return (
      <div className="w-full">
        <Header />
        <div className="flex flex-col gap-2">
          <TopArtists data={data} isLoading={isLoading}  />
        </div>
      </div>
    )
}
