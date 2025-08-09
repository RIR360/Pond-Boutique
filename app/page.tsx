import { CartProvider } from "@/components/CartContact"
import { SiteHeader } from "@/components/Header"
import { Hero } from "@/components/sections/Hero"
import { FeaturedGrid } from "@/components/sections/FeaturedGrid"
import { ProductGrid } from "@/components/sections/ProductGrid"
import { SiteFooter } from "@/components/Footer"

export default function Page() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <SiteHeader />
        <main>
          <Hero />
          <FeaturedGrid />
          <ProductGrid />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  )
}
