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
                  <Skeleton className="h-4 w-[70vw]" />
                </div>
              </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div>{content?.is_playing ? (<span>Playing</span>) : (<span>Not currently playing anything</span>)}</div>
              <div className="font-bond text-2xl">{content?.item?.name}</div>
              <div className="text-muted-foreground text-lg">{content?.item?.artists[0].name} · {content?.item?.album.name}</div>
              <img src={content?.item?.album.images[0].url} />
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    );
}