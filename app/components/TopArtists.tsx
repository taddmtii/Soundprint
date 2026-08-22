import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UsersRound } from "lucide-react";

interface TopArtistsProps {
  data: SpotifyArtist[] | undefined
  isLoading: boolean
}

export default function TopArtists({data, isLoading}: TopArtistsProps) {
  const top5 = data?.slice(0,5)
  return (
      <Card className="rounded-2xl shadow-lg">
        <CardHeader className="text-muted-foreground">
            <div className="flex gap-2">
                <UsersRound color="red" />
                <CardTitle className="font-bold">Top Artists</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))
          ) : (
          top5?.map((artist, index) => (
            <div key={artist.id} className="flex items-center gap-3">
               <span>{index + 1}</span>
              {artist.images[0].url && (
                <img src={artist.images[0].url} alt={artist.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex flex-col gap-1">
                <div>{artist.name}</div>
                <div className="text-muted-foreground text-sm cursor-pointer">
                  <a href={artist.external_urls.spotify} target="_blank">Spotify Link</a>
                </div>
              </div>
            </div>
              ))
          )}
        </CardContent>
      </Card>
    );
}