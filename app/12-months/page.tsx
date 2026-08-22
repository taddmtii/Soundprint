'use client'

import TimePeriod from "../components/TimePeriod";
import { useTopArtists } from "../hooks/useTopArtists";
import { useTopTracks } from "../hooks/useTopTracks";

export default function TwelveMonthsPage() {
    const {data: topArtists, isLoading: topArtistsLoading} = useTopArtists("long_term");
    const {data: topTracks, isLoading: topTracksLoading} = useTopTracks("long_term");
    const pageTitle = "Last Year"
    const heading = "Your most-played tracks and artists from the past twelve months."
    return (
      <TimePeriod pageTitle={pageTitle} heading={heading} topArtists={topArtists} topTracks={topTracks} topArtistsLoading={topArtistsLoading} topTracksLoading={topTracksLoading} />
    )
}
