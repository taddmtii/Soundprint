'use client'

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useFetchData } from "../hooks/useFetchData"

export default function Header() {
  const data = useFetchData();
  return (
    <header className="flex w-full h-20 items-center justify-between bg-white sticky top-0 px-6">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Soundprint</span>
        <Badge className="rounded-2xl" variant="secondary">Beta</Badge>
      </div>

      <nav className="flex items-center gap-6">
        <Link href="/now-playing" className="text-sm font-medium hover:text-primary transition-colors">Now Playing</Link>
        <Link href="/4-weeks" className="text-sm font-medium hover:text-primary transition-colors">Last Month</Link>
        <Link href="/6-months" className="text-sm font-medium hover:text-primary transition-colors">6 Months</Link>
        <Link href="/12-months" className="text-sm font-medium hover:text-primary transition-colors">Last Year</Link>
      </nav>

      <div>
        <span className="text-muted-foreground text-sm">Logged in as: { data.user?.display_name}</span>
      </div>
    </header>
  )
}
