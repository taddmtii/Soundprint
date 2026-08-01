import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TopFiveCardProps {
  title: string,
  content: TopTracksResponse | TopArtistsResponse | null,
  footer: string,
  iconPath: string
}

export default function TopFiveCard({title, content, footer, iconPath}: TopFiveCardProps) {
    return (
    <Card className="w-150 h-200">
      <CardHeader className="text-muted-foreground">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2 text-3xl font-bold">
        {content?.items.map((item, index) => (
            <div key={index}>{item.name}</div>
        ))}
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        <p>{footer}</p>
      </CardFooter>
    </Card>
    )
}
