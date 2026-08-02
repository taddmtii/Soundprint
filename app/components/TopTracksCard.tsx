import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music2 } from "lucide-react"

interface TopTracksCardProps {
  title: string,
  content: SpotifyTrack[] | undefined,
}

export default function TopTracksCard({title, content}: TopTracksCardProps) {
    const top5 = content?.slice(0,5)
    return (
      <div className="w-125 h-100">
      <Card>
        <CardHeader className="text-muted-foreground">
          <div className="flex gap-2">
            <Music2 color="red" />
            <CardTitle>{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-lg font-bold">
          {top5?.map((track, index) => (
            <div key={track.id} className="flex items-center gap-3">
              <span>{index + 1}</span>
              {track.album.images[0].url && (
                <img src={track.album.images[0].url} alt={track.name} className="h-12 w-12 rounded object-cover" />
              )}
              <div className="flex flex-col gap-1">
                <div>{track.name}</div>
                <div className="text-muted-foreground text-sm">{track.artists[0].name}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      </div>
    );
}
