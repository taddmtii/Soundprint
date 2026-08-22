'use client'

import Header from "../components/Header";
import TimePeriod from "../components/TimePeriod";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";
import { useTopArtists } from "../hooks/useTopArtists";
import { useTopTracks } from "../hooks/useTopTracks";

export default function TwelveMonthsPage() {
    const {data: topArtists, isLoading: topArtistsLoading} = useTopArtists("long_term");
    const {data: topTracks, isLoading: topTracksLoading} = useTopTracks("long_term");
    const pageTitle = "Last 12 Months"
    const heading = "Your most-played tracks and artists from the past twelve months."
    return (
      <TimePeriod pageTitle={pageTitle} heading={heading} topArtists={topArtists} topTracks={topTracks} topArtistsLoading={topArtistsLoading} topTracksLoading={topTracksLoading} />
    )
}
