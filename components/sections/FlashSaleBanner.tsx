'use client'

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export function FlashSaleBanner() {
  const [countDown, setCountDown] = useState(300 * 60 * 1000) // 90 minutes in milliseconds
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDown - 1000)
    }, 1000)
    return () => clearInterval(interval)
  }, [countDown])
  
  const hours = Math.floor(countDown / (60 * 60 * 1000))
  const minutes = Math.floor((countDown % (60 * 60 * 1000)) / (60 * 1000))
  const seconds = Math.floor((countDown % (60 * 1000)) / 1000)

  return (
    <section className="bg-gradient-to-r from-teal-600 to-teal-400 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-4">
          <span className="inline-block bg-white text-teal-600 font-bold px-4 py-2 rounded-full text-sm mb-4">
            ⏰ LIMITED TIME OFFER
          </span>
        </div>
        <h2 className="text-3xl font-bold mb-5">Flash Sale - 50% OFF</h2>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-8 opacity-90">
          Discover timeless pieces inspired by nature at unbeatable prices. Sustainable fashion designed for the modern woman.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <div className="text-center">
            <div className="text-3xl font-bold">{hours < 10 ? `0${hours}` : hours}</div>
            <div className="text-sm opacity-75">HOURS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{minutes < 10 ? `0${minutes}` : minutes}</div>
            <div className="text-sm opacity-75">MINUTES</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{seconds < 10 ? `0${seconds}` : seconds}</div>
            <div className="text-sm opacity-75">SECONDS</div>
          </div>
        </div>
        <Button 
          size="lg"
          className="bg-white text-teal-600 hover:bg-gray-100 font-bold text-lg px-8 py-6"
        >
          Shop Now
        </Button>
      </div>
    </section>
  )
}

