import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TopArtistsCardProps {
  title: string,
  content: SpotifyArtist[] | undefined,
}

export default function TopArtistsCard({title, content}: TopArtistsCardProps) {
    return (
      <Card>
        <CardHeader className="text-muted-foreground">
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-3xl font-bold">
          {content?.map((track) => (
            <div key={track.id} className="flex items-center gap-3">
              {track.images[0].url && (
                <img src={track.images[0].url} alt={track.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div>{track.name}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
}
