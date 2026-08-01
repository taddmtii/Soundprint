import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TopFiveCardProps {
  title: string,
  content: TopTracksResponse | TopArtistsResponse | null,
  iconPath: string
}

export default function TopFiveCard({title, content, iconPath}: TopFiveCardProps) {
    return (
    <Card>
      <CardHeader className="text-muted-foreground">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-3xl font-bold">
        {content?.items.map((item, index) => (
            <div key={index}>{item.name}</div>
        ))}
      </CardContent>
    </Card>
    )
}
