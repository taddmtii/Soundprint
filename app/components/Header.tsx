'use client'

import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useSpotifyUser } from "../hooks/useSpotifyUser";
import { useSpring, animated } from '@react-spring/web'
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Header() {
const { data, isLoading } = useSpotifyUser();
const springs = useSpring({
  from: { x: 0 },
  to: { x: 100 }
})
// gives us the current url path to determine what link we are on for pill.
const pathname = usePathname();
// lookup table of basically any href -> dom element. This is for pixel positioning so we know 
// where exactly to move the pill when we click a new link.
const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

// Store where pill should be as state.
const [pillPosition, setPillPosition] = useState({ left: 0, width: 0})

// Everytime pathname changes, trigger this to basically get the new link element and get the positions of it 
// for pill to know where to go.
useEffect(() => {
  const activeLinkElement = linkRefs.current[pathname]
  if (activeLinkElement) {
    setPillPosition({
      left: activeLinkElement.offsetLeft,
      width: activeLinkElement.offsetWidth
    })
  }
}, [pathname])

// Animate to pill by "springing" to the pillPosition
const pillSpring = useSpring({
  left: pillPosition.left,
  width: pillPosition.width,
  config: { tension: 300, friction: 26 }
})

return (
    <header className="flex h-20 items-center rounded-2xl mx-4 mt-4 overflow-hidden justify-between bg-white/70 backdrop-blur-md sticky top-4 px-6 w-[calc(100%-2rem)] z-50">
      <div className="flex items-center gap-2">
        <span className="font-bold text-lg">Soundprint</span>
        <Badge className="rounded-2xl" variant="secondary">Beta</Badge>
      </div>

      <nav className="relative flex items-center gap-6">

        <animated.div className="absolute h-8 rounded-2xl bg-primary/10 -z-10" style={{ top: "50%", marginTop: -16, ...pillSpring}} />

        <Link ref={(el) => { linkRefs.current["/now-playing"] = el }} href="/now-playing" className="text-sm font-medium hover:text-primary transition-colors px-3">Now Playing</Link>
        <Link ref={(el) => { linkRefs.current["/4-weeks"] = el }} href="/4-weeks" className="text-sm font-medium hover:text-primary transition-colors px-3">Last Month</Link>
        <Link ref={(el) => { linkRefs.current["/6-months"] = el }} href="/6-months" className="text-sm font-medium hover:text-primary transition-colors px-3">Last 6 Months</Link>
        <Link ref={(el) => { linkRefs.current["/12-months"] = el }} href="/12-months" className="text-sm font-medium hover:text-primary transition-colors p-3">Last Year</Link>
      </nav>

      <div>
        <span className="text-muted-foreground text-sm truncate max-w-[200px]">
          {isLoading ? "Loading..." : `Logged in as: ${data?.display_name ?? "Unknown"}`}
        </span>
      </div>
    </header>
  )
}
