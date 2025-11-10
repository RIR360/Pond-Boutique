import ProductDetail from "@/components/ProductDetail"
import { CartProvider } from "@/components/CartContact"
import { SiteHeader } from "@/components/Header"
import { ProductGrid } from "@/components/sections/ProductGrid"
import { SiteFooter } from "@/components/Footer"

export default function Page() {
  const demoProduct = {
    _id: "demo-123",
    name: "Ruby Kameez",
    description: "A timeless, nature-inspired midi dress crafted from sustainable linen blend. Comfortable, breathable, and designed to last. The Ruby Kameez is perfect for warm weather, outdoor events, or just lounging around in style. The dress features a flowy silhouette, adjustable straps, and a subtle high-low hem. Pair it with your favorite sandals or sneakers for a chic, effortless look.",
    price: 3900,
    images: ["/images/pexels-photo-31874446.jpeg"],
    stock: 4,
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <SiteHeader />
        <main>
          <ProductDetail product={demoProduct} />
          <ProductGrid />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  )
}
