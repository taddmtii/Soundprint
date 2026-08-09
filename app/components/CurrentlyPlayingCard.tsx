import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentlyPlayingCardProps {
    content: CurrentlyPlayingResponse | null;
    isLoading: boolean;
}

export default function CurrentlyPlayingCard({content, isLoading}: CurrentlyPlayingCardProps) {
  return (
      <div className="w-[90vw] h-100">
      <Card className="rounded-2xl bg-primary">
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {isLoading || content == null ? (
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
              src={content?.item?.album.images[0]?.url}
              className="h-50 w-50 rounded object-cover shrink-0"
              alt={content?.item?.album.name}
            />
            <div className="flex flex-col gap-2">
              <Badge className="bg-white text-black hover:bg-white w-fit rounded-3xl">
                {content?.is_playing ? (
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-green-500 rounded-full" />
                    <span>Playing</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 bg-red-500 rounded-full" />
                    <span>Not Playing</span>
                  </div>
                )}
              </Badge>

              <div className="text-white font-bold text-2xl truncate w-100">
                {content?.item?.name}
              </div>

              <div className="text-muted-foreground text-lg truncate w-80">
                {content?.item?.artists[0]?.name} · {content?.item?.album.name}
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