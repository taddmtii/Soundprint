import Header from "./Header"
import TopArtist from "./TopArtist"
import TopArtists from "./TopArtists"
import TopTrack from "./TopTrack"
import TopTracks from "./TopTracks"

interface TimePeriodProps {
    pageTitle: string,
    heading: string,
    topArtists: SpotifyArtist[] | undefined,
    topTracks: SpotifyTrack[] | undefined,
    topArtistsLoading: boolean,
    topTracksLoading: boolean
}

export default function TimePeriod({pageTitle, heading, topArtists, topTracks, topArtistsLoading, topTracksLoading}: TimePeriodProps) {
 return (
      <div className="w-full">
        <Header />
        <div className="flex flex-col gap-4 items-center p-4">
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold">{pageTitle}</h1>
            <span className="text-muted-foreground">{heading}</span>
          </div>
        <div className="flex flex-col gap-2 w-1/4">
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