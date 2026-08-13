'use client'

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
interface CurrentlyPlayingCardProps {
    content: CurrentlyPlayingResponse | null;
    isLoading: boolean;
}
export default function CurrentlyPlayingCard({content, isLoading}: CurrentlyPlayingCardProps) {
  // State to store last content.
  const [lastContent, setLastContent] = useState<CurrentlyPlayingResponse | null>(null)
  useEffect(() => {
    const cached = sessionStorage.getItem("lastContent");
    if (cached) {
      setLastContent(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    if (content != null && content.item != null) {
      setLastContent(content);
      sessionStorage.setItem("lastContent", JSON.stringify(content));
    }
  }, [content])
  // Check if track is currently active (or playing now). If it is not, get most recent track from lastContent as a fallback.
  const hasActiveSession = content != null && content.item != null;
  const isActive = hasActiveSession && content.is_playing;
  const displayTrack = hasActiveSession ? content?.item : lastContent?.item ?? null;
  const hasAnyTrack = displayTrack != null;
  return (
      <div>
      <Card className="rounded-2xl bg-primary">
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {isLoading && !hasAnyTrack ? (
              <div className="flex items-center gap-10">
                <Skeleton className="h-50 w-50 rounded" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-10 w-100" />
                  <Skeleton className="h-6 w-80" />
                  <Skeleton className="h-4 w-100" />
                </div>
              </div>
          ) : !hasAnyTrack ? (
            <div className="flex items-center gap-10">
                <div className="h-50 w-50 rounded bg-white/10 shrink-0 flex items-center justify-center">
                </div>
                <div className="flex flex-col gap-1 justify-center">
                  <div className="text-white font-bold text-2xl w-100">
                    No recent listening activity
                  </div>
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
                      <span className="h-2 w-2 bg-gray-400 rounded-full" />
                      <span>Last played</span>
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
                <span className="font-medium">
                  {hasActiveSession
                    ? content?.device?.name ?? "Unknown device"
                    : lastContent?.device?.name ?? "Unknown device"}
                </span>
              </div>
            </div>
          </div>
          )}
        </CardContent>
      </Card>
      </div>
    );
}
