'use client'

import { Badge } from "@/components/ui/badge"

export default function Header() {
  return (
    <header className="flex w-full h-20 items-center justify-between bg-white sticky top-0">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Soundprint</span>
        <Badge className="rounded-2xl" variant="secondary">Beta</Badge>
      </div>
    </header>
  )
}
