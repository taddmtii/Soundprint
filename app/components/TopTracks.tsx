import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Music2 } from "lucide-react"

interface TopTracksProps {
  data: SpotifyTrack[] | undefined,
  isLoading: boolean;
}

export default function TopTracks({data, isLoading}: TopTracksProps) {
    const top5 = data?.slice(0,5)
    return (
      <Card>
        <CardHeader className="text-muted-foreground">
          <div className="flex gap-2">
            <Music2 color="red" />
            <CardTitle>Top Tracks</CardTitle>
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
            top5?.map((track, index) => (
              <div key={track.id} className="flex items-center gap-3">
                <span>{index + 1}</span>
                {track.album.images[0].url && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <div>{track.name}</div>
                  <div className="text-muted-foreground text-sm">{track.artists[0].name}</div>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    );
}
