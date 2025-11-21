"use client"

import Link from "next/link"
import { ShoppingBag, Menu, Search, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./CartContact"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const { count } = useCart()
  const router = useRouter()

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Pond Boutique</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-4 text-base ps-5">
                <Link href="#" className="hover:text-emerald-700">
                  New Arrivals
                </Link>
                <Link href="#" className="hover:text-emerald-700">
                  Women
                </Link>
                <Link href="#" className="hover:text-emerald-700">
                  Men
                </Link>
                <Link href="#" className="hover:text-emerald-700">
                  Accessories
                </Link>
                <Link href="#" className="hover:text-emerald-700">
                  Sale
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center gap-2" aria-label="Pond Boutique Home">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Leaf className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">Pond Boutique</span>
          </Link>
        </div>

        <form className="hidden max-w-md flex-1 items-center gap-2 md:flex" onSubmit={(e) => {
          e.preventDefault()
          const searchQuery = e.currentTarget.querySelector('input')?.value || ""
          if (searchQuery) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
          }
        }}>
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <Input className="bg-white pl-9" placeholder="Search clothing, accessories, and more" aria-label="Search" />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Link href={"auth/signin"}>
            <Button className="hidden md:inline-flex bg-emerald-600 hover:bg-emerald-700">
              Sign in
            </Button>
          </Link>
          <Button variant="ghost" size="icon" aria-label="Open cart">
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              {count > 0 ? (
                <span
                  aria-live="polite"
                  className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-[11px] font-medium text-white"
                >
                  {count}
                </span>
              ) : null}
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}

