"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    title: "BraillePhonics+",
    subtitle: "An interactive braille and phonics learning platform for students, teachers, and parents.",
    image: "/images/hero-bg.jpg",
    alt: "Child learning with colorful braille alphabet board",
  },
  {
    title: "BraillePhonics+",
    subtitle: "Engage with hands-on braille activities designed for every learning level.",
    image: "/images/hero-bg-2.jpg",
    alt: "Teacher guiding a child through braille learning",
  },
  {
    title: "BraillePhonics+",
    subtitle: "Track progress, set goals, and celebrate achievements along the way.",
    image: "/images/hero-bg-3.jpg",
    alt: "Children exploring braille cards and tactile materials",
  },
]

export function LandingHero() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {slides.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image || "/placeholder.svg"}
          alt={slide.alt}
          fill
          className={`object-cover transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          priority={i === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
          {"Welcome to "}
          <span className="text-[hsl(213,94%,55%)]">{slides[current].title}</span>
        </h1>
        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-white/90 md:text-xl">
          {slides[current].subtitle}
        </p>
        <Link href="/login">
          <Button
            size="lg"
            className="rounded-full bg-[hsl(213,94%,55%)] px-8 py-6 text-lg font-semibold text-white hover:bg-[hsl(213,94%,45%)]"
          >
            Get Started
            <ChevronRight className="ml-1 h-5 w-5" />
          </Button>
        </Link>
      </div>

      <div className="absolute bottom-8 z-10 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={`slide-${slides[i].subtitle.slice(0, 10)}`}
            onClick={() => setCurrent(i)}
            className={`h-3 w-3 rounded-full transition-colors ${i === current ? "bg-[hsl(213,94%,55%)]" : "bg-white/50"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </main>
  )
}
