import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface TopArtistProps {
    data: SpotifyArtist[] | undefined,
    isLoading: boolean;
}

export default function TopArtist({ data, isLoading }: TopArtistProps) {
    const artist = data?.[0];
    return (
        <div className="w-50 h-50">
        <Card>
        <CardHeader className="text-muted-foreground">
            <CardTitle>#1 Artist</CardTitle>
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
              <div key={artist?.id} className="flex items-center gap-3">
                {artist?.images[0].url && (
                  <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="h-12 w-12 rounded object-cover"
                  />
                )}
                <div className="flex flex-col gap-1">
                  <div>{artist?.name}</div>
                  <div className="text-muted-foreground text-sm">{artist?.type}</div>
                </div>
              </div>
          )}
        </CardContent>
      </Card>
        </div>
    )
}