"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section
      className="relative overflow-hidden text-white"
      style={{
        background: "url(/images/hero-bg.jpeg) no-repeat center center / cover",
      }}
    >
      <div className="bg-hero-gradient">
        <div className="max-w-7xl mx-auto grid gap-8 px-4 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              Embrace the Elegance of Nature-Inspired Fashion
            </h1>
            <p className="text-pretty text-neutral-200 md:text-lg">
              Explore airy fabrics, gentle cottons, and carefree designs. <br /> Handpicked outfits inspired by the tranquility of nature.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="#new-arrivals">
                  <span className="text-white">Shop new arrivals</span>
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                <Link href="#featured">Explore featured</Link>
              </Button>
            </div>
            <p className="text-xs text-neutral-500">{"Free shipping over $75 · Easy 30-day returns"}</p>
          </div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img
                src="/images/pexels-photo-9470640.jpeg"
                width={400}
                height={520}
                alt="Model wearing a linen dress near water"
                className="h-[420px] w-full rounded-xl object-cover md:h-[520px]"
              />
              <div className="grid gap-3">
                <img
                  src="/images/pexels-photo-31874438.jpeg"
                  width={300}
                  height={250}
                  alt="Folded cotton shirts on a wooden table"
                  className="h-[200px] w-full rounded-xl object-cover md:h-[250px]"
                />
                <img
                  src="/images/pexels-photo-20777202.jpeg"
                  width={300}
                  height={260}
                  alt="Linen pants and a straw bag"
                  className="h-[200px] w-full rounded-xl object-cover md:h-[260px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}