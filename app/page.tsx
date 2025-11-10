import { CartProvider } from "@/components/CartContact"
import { SiteHeader } from "@/components/Header"
import { Hero } from "@/components/sections/Hero"
import { FeaturedGrid } from "@/components/sections/FeaturedGrid"
import { ProductGrid } from "@/components/sections/ProductGrid"
import { FlashSaleBanner } from "@/components/sections/FlashSaleBanner"
import { WhyChooseUs } from "@/components/sections/WhyChooseUs"
import { Testimonials } from "@/components/sections/Testimonials"
import { ShopStory } from "@/components/sections/ShopStory"
import { SiteFooter } from "@/components/Footer"

export default function Page() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <SiteHeader />
        <main>
          <Hero />
          <FeaturedGrid />
          <FlashSaleBanner />
          <ProductGrid />
          <WhyChooseUs />
          <Testimonials />
          <ShopStory />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  )
}
