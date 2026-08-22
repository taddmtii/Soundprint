'use client'

import TimePeriod from "../components/TimePeriod";
import { useTopArtists } from "../hooks/useTopArtists";
import { useTopTracks } from "../hooks/useTopTracks";

export default function FourWeeksPage() {
    const {data: topArtists, isLoading: topArtistsLoading} = useTopArtists("short_term");
    const {data: topTracks, isLoading: topTracksLoading} = useTopTracks("short_term");
    const pageTitle = "Last 4 Weeks"
    const heading = "Your most-played tracks and artists from the past 4 weeks."
    return (
      <TimePeriod pageTitle={pageTitle} heading={heading} topArtists={topArtists} topTracks={topTracks} topArtistsLoading={topArtistsLoading} topTracksLoading={topTracksLoading} />
    )
}
