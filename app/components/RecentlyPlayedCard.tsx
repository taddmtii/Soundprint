import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound } from "lucide-react";

interface RecentlyPlayedCardProps {
  content: RecentlyPlayedItem[] | undefined
}


export default function RecentlyPlayedCard({content}: RecentlyPlayedCardProps) {
  const topRecentlyPlayedTracks = content ? dedupeByTrack(content).slice(0,6) : undefined
  return (
      <div className="w-125 h-100">
      <Card>
        <CardHeader className="text-muted-foreground">
            <div className="flex gap-2">
                <UsersRound color="red" />
                <CardTitle className="font-bold">Recently Played</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {topRecentlyPlayedTracks?.map((item, index) => (
            <div key={`${item.track.id}-${item.played_at}`} className="flex items-center gap-3">
               <span>{index + 1}</span>
              {item.track.album.images[0] && (
                <img src={item.track.album.images[0].url} alt={item.track.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex flex-col gap-1">
                <div>{item.track.name}</div>
                <div>{getMinutesAgo(item.played_at)}m ago</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    );
}

// Represents how many minutes ago the track was last played for display.
function getMinutesAgo(played_at: string) {
    return Math.round((Date.now() - new Date(played_at).getTime()) / 60000);
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