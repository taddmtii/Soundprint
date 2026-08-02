import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersRound } from "lucide-react";

interface TopArtistsCardProps {
  title: string,
  content: SpotifyArtist[] | undefined,
}

export default function TopArtistsCard({title, content}: TopArtistsCardProps) {
  return (
      <div className="w-125 h-100">
      <Card>
        <CardHeader className="text-muted-foreground">
            <div className="flex gap-2">
                <UsersRound color="red" />
                <CardTitle className="font-bold">{title}</CardTitle>
            </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {content?.map((artist, index) => (
            <div key={artist.id} className="flex items-center gap-3">
               <span>{index + 1}</span>
              {artist.images[0].url && (
                <img src={artist.images[0].url} alt={artist.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex flex-col gap-1">
                <div>{artist.name}</div>
                <div className="text-muted-foreground text-sm">{artist.type}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    );
}
