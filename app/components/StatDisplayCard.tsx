import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface StatDisplayCard {
  title: string,
  content: string,
  footer: string,
  iconPath: string
}

export default function StatDisplayCard({
  title, content, footer, iconPath
}: StatDisplayCard) {
  return (
    <Card className="w-100">
      <CardHeader className="text-muted-foreground">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-3xl font-bold">
        <p>{content}</p>
      </CardContent>
      <CardFooter className="text-muted-foreground text-xs">
        <p>{footer}</p>
      </CardFooter>
    </Card>
  )

}
