import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface CurrentlyPlayingCardProps {
    content: CurrentlyPlayingResponse | null;
    isLoading: boolean;
}

export default function CurrentlyPlayingCard({content, isLoading}: CurrentlyPlayingCardProps) {
    return (
      <div className="w-[90vw] h-100">
      <Card>
        <CardHeader className="text-muted-foreground">
            <div>
                <CardTitle className="font-bold">Currently Played</CardTitle>
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
            <div>Done Loading</div>
          )}
        </CardContent>
      </Card>
      </div>
    );
}