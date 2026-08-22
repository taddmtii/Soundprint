'use client'

import TimePeriod from "../components/TimePeriod";
import { useTopArtists } from "../hooks/useTopArtists";
import { useTopTracks } from "../hooks/useTopTracks";

export default function SixMonthsPage() {
    const {data: topArtists, isLoading: topArtistsLoading} = useTopArtists("medium_term");
    const {data: topTracks, isLoading: topTracksLoading} = useTopTracks("medium_term");
    const pageTitle = "Last 6 Months"
    const heading = "Your most-played tracks and artists from the past six months."
    return (
      <TimePeriod pageTitle={pageTitle} heading={heading} topArtists={topArtists} topTracks={topTracks} topArtistsLoading={topArtistsLoading} topTracksLoading={topTracksLoading} />
    )
}
