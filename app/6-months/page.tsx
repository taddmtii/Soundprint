'use client'

import Header from "../components/Header";
import TimePeriod from "../components/TimePeriod";
import TopArtist from "../components/TopArtist";
import TopArtists from "../components/TopArtists";
import TopTrack from "../components/TopTrack";
import TopTracks from "../components/TopTracks";
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
