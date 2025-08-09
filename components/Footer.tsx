"use client"

import { type FormEvent, useState } from "react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Leaf } from "lucide-react"

export function SiteFooter() {
  const [email, setEmail] = useState("")

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setEmail("")
    alert("Thanks for subscribing! You’ll hear from us soon.")
  }

  return (
    <footer className="mt-12 border-t bg-slate-900 text-white">
      <div className="container mx-auto px-5 py-10">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" aria-label="Pond Boutique Home">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Leaf className="h-4 w-4" />
              </div>
              <span className="font-semibold tracking-tight">Pond Boutique</span>
            </Link>
            <p className="max-w-md text-sm text-neutral-200">
              Timeless pieces inspired by nature. Designed for comfort, made to last.
            </p>
            <p className="text-xs text-neutral-200">
              {"© " + new Date().getFullYear() + " Pond Boutique. All rights reserved."}
            </p>
          </div>

          <div>
            <div className="mb-3">
              <h4 className="font-medium text-xl">Shop</h4>
            </div>
            <ul className="space-y-2 text-sm text-neutral-200">
              <li>
                <Link href="#" className="hover:text-emerald-700">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-700">
                  Women
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-700">
                  Kids
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-emerald-700">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="mb-3">
              <h4 className="font-medium text-xl">Stay in the loop</h4>
            </div>
            <p className="mb-3 text-sm text-neutral-200">
              Get early access to drops, styling tips, and exclusive offers.
            </p>
            <form onSubmit={onSubmit} className="flex max-w-sm gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                aria-label="Email for newsletter"
                className="px-4 rounded-lg w-full text-white bg-gray-800 border-gray-700 placeholder:text-neutral-400 focus-visible:border-emerald-600 focus-visible:ring-emerald-600"
              />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <Separator className="my-8 bg-emerald-900" />

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-neutral-200">
          <div className="flex gap-4">
            <Link href="#" className="hover:text-emerald-700">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-emerald-700">
              Terms
            </Link>
            <Link href="#" className="hover:text-emerald-700">
              Contact
            </Link>
          </div>
          <p>{"Crafted with care — wear often."}</p>
        </div>
      </div>
    </footer>
  )
}