import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound } from "lucide-react";

interface TopArtistsCardProps {
  title: string,
  content: SpotifyArtist[] | undefined,
  recentlyPlayedTracks: RecentlyPlayedItem[] | undefined
}

export default function TopArtistsCard({title, content, recentlyPlayedTracks}: TopArtistsCardProps) {
  // Get top five artists from content, and then put all of their artistIds into a list to pass into function.
  const top5 = content?.slice(0,5)
  let artistIds: string[] = [];
  top5?.map((artist) => {
    artistIds.push(artist.id);
  })
  const stats: Record<string, ArtistPlayStats> = getTotalMsPlayedForArtists(artistIds, recentlyPlayedTracks);
  
  return (
      <div className="w-125 h-100">
      <Card>
        <CardHeader className="text-muted-foreground">
            <div className="flex gap-2">
                <UsersRound color="red" />
                <CardTitle className="font-bold">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {top5?.map((artist, index) => (
            <div key={artist.id} className="flex items-center gap-3">
               <span>{index + 1}</span>
              {artist.images[0].url && (
                <img src={artist.images[0].url} alt={artist.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex flex-col gap-1">
                <div>{artist.name}</div>
                <div className="text-muted-foreground text-sm">{Math.round(stats[artist.id].totalMs / 60000)} min in recent plays</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    );
}

function getTotalMsPlayedForArtists(artistIds: string[], recentlyPlayedTracks: RecentlyPlayedItem[] | undefined): Record<string, ArtistPlayStats> {
  const idSet = new Set(artistIds);
  const stats: Record<string, ArtistPlayStats> = {};
  // Initialize the stats map with all the ids and a blank slate to start off with.
  for (const id of artistIds) {
    stats[id] = {name: "", totalMs: 0}
  }
  // For each track, check all the artists. If the artist id set has the artist we are currently on, add their name and total duration to the count.
  recentlyPlayedTracks?.forEach((item) => {
    item.track.artists.forEach((artist) => {
      if (idSet.has(artist.id)) {
        stats[artist.id].name = artist.name;
        stats[artist.id].totalMs += item.track.duration_ms;
      }
    })
  })
  return stats;
}