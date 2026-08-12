import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentlyPlayingCardProps {
    content: CurrentlyPlayingResponse | null;
    recentlyPlayed: RecentlyPlayedResponse | null;
    isLoading: boolean;
}

export default function CurrentlyPlayingCard({content, recentlyPlayed, isLoading}: CurrentlyPlayingCardProps) {
  // Check if track is currently active (or playing now). If it is not, get most recent track from recentlyPlayed response and use that as a fall back.
  const hasActiveSession = content != null && content.item != null;
  const isActive = hasActiveSession && content.is_playing;
  const lastPlayedTrack = recentlyPlayed?.items[0].track ?? null;
  // Only fall back to recently palyed if there is no active session at all.
  const displayTrack = hasActiveSession ? content?.item : lastPlayedTrack;

  return (
      <div>
      <Card className="rounded-2xl bg-primary">
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {isLoading || (content == null && recentlyPlayed == null) ? (
              <div className="flex items-center gap-10">
                <Skeleton className="h-50 w-50 rounded" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-100" />
                  <Skeleton className="h-6 w-80" />
                  <Skeleton className="h-4 w-100" />
                </div>
              </div>
          ) : (
            <div className="flex items-center gap-10">
            <img
              src={displayTrack?.album.images[0]?.url}
              className="h-50 w-50 rounded object-cover shrink-0"
              alt={displayTrack?.album.name}
            />
            <div className="flex flex-col gap-1">
              <Badge className="bg-white text-black hover:bg-white w-fit rounded-3xl">
                {isActive ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-green-500 rounded-full" />
                      <span>Playing</span>
                    </div>
                  ) : hasActiveSession ? (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-yellow-500 rounded-full" />
                      <span>Paused</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-red-500 rounded-full" />
                      <span>Not Playing</span>
                    </div>
                  )}
              </Badge>

              <div className="text-white font-bold text-2xl truncate w-100">
                {displayTrack?.name}
              </div>

              <div className="text-muted-foreground text-lg truncate w-80">
                {displayTrack?.artists[0]?.name} · {displayTrack?.album.name}
              </div>

              <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span>Playing on</span>
                <span className="font-medium">{content?.device.name ?? "Unknown device"}</span>
              </div>
            </div>
          </div>
          )}
        </CardContent>
      </Card>
      </div>
    );
}
