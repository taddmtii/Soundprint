'use client'

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSpotifyUser } from "../hooks/useSpotifyUser";

export default function Header() {
const { data, isLoading } = useSpotifyUser();
  return (
    <header className="flex h-20 items-center rounded-2xl mx-4 mt-4 overflow-hidden justify-between bg-white/70 backdrop-blur-md sticky top-4 px-6 w-[calc(100%-2rem)] z-50">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Soundprint</span>
        <Badge className="rounded-2xl" variant="secondary">Beta</Badge>
      </div>

      <nav className="flex items-center gap-6">
        <Link href="/now-playing" className="text-sm font-medium hover:text-primary transition-colors">Now Playing</Link>
        <Link href="/4-weeks" className="text-sm font-medium hover:text-primary transition-colors">Last Month</Link>
        <Link href="/6-months" className="text-sm font-medium hover:text-primary transition-colors">Last 6 Months</Link>
        <Link href="/12-months" className="text-sm font-medium hover:text-primary transition-colors">Last Year</Link>
      </nav>

      <div>
        <span className="text-muted-foreground text-sm truncate max-w-[200px]">
          {isLoading ? "Loading..." : `Logged in as: ${data?.display_name ?? "Unknown"}`}
        </span>
      </div>
    </header>
  )
}
