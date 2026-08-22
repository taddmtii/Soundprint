import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TopTrackProps {
    data: SpotifyTrack[] | undefined,
    isLoading: boolean;
}

export default function TopTrack({ data, isLoading }: TopTrackProps) {
    const track = data?.[0];
    return (
      <Card className="w-1/2">
        <CardHeader className="text-muted-foreground">
            <CardTitle>#1 Track</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
            {isLoading ? (
              <div key={1} className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-12 w-12 rounded" />
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
          ) : (
              <div key={track?.id} className="flex items-center gap-3">
                {track?.album.images[0].url && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <div>{track?.name}</div>
                  <div className="text-muted-foreground text-sm"> {track?.duration_ms != null ? formatDuration(track.duration_ms) : null}</div>
                </div>
              </div>
          )}
        </CardContent>
      </Card>
    )
}


function formatDuration(durationMs: number): string {
  const totalSeconds = Math.floor(durationMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}