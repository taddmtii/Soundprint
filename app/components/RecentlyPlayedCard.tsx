import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AudioLines } from "lucide-react";
import { useRecentlyPlayed } from "../hooks/useRecentlyPlayed";

export default function RecentlyPlayedCard() {
  const {data, isLoading, error} = useRecentlyPlayed();
  const topRecentlyPlayedTracks = data ? dedupeByTrack(data).slice(0,10) : undefined
  return (
      <div className="w-full">
      <Card className="rounded-2xl">
        <CardHeader className="text-muted-foreground">
            <div className="flex gap-2">
                <AudioLines color="red" />
                <CardTitle className="font-bold">Recently Played</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
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
          topRecentlyPlayedTracks?.map((item, index) => (
            <div key={`${item.track.id}-${item.played_at}`} className="flex items-center gap-3">
               <span>{index + 1}</span>
               {/* If we are in the double digits on index, add some space to others to formatting is not misaligned */}
               {(index + 1) < 10 ? <span>        </span> : ""}
              {item.track.album.images[0] && (
                <img src={item.track.album.images[0].url} alt={item.track.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex flex-col gap-1">
                <div>{item.track.name}</div>
                <div className="text-muted-foreground text-sm">{getMinutesAgo(item.played_at)}</div>
              </div>
            </div>
            ))
          )}
        </CardContent>
      </Card>
      </div>
    );
}

// Represents how many minutes ago the track was last played for display.
function getMinutesAgo(played_at: string): string {
    let res;
    const total_minutes = Math.round((Date.now() - new Date(played_at).getTime()) / 60000);
    if (total_minutes >= 60) {
      const hours = Math.floor(total_minutes / 60)
      const minutes = total_minutes % 60
      res = `${hours}h ${minutes}m ago`
    } else {
      res = `${total_minutes}m ago`
    }
    return res;
  }

// Go over each item and add the item only if we have not seen it yet. Avoids duplicate tracks in display.
function dedupeByTrack(items: RecentlyPlayedItem[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.track.id)) return false;
    seen.add(item.track.id);
    return true;
  });
}
