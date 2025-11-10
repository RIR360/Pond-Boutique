import ProductsList from "@/components/ProductsList"
import { SiteHeader } from "@/components/Header"
import { SiteFooter } from "@/components/Footer"
import { products as sampleProducts } from "@/components/sections/ProductGrid"

export default function Page() {
  // Map the ProductGrid sample shape to the ProductsList shape
  const serializable = sampleProducts.map((p) => ({
    _id: p.id,
    name: p.name,
    price: p.price,
    images: p.image ? [p.image] : [],
    stock: (p as any).stock,
    description: p.alt || "",
  }))

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />
      <main className="max-w-7xl mx-auto py-12">
        <h2 className="text-2xl font-semibold md:text-3xl mb-0 text-emerald-700">All Products</h2>
        <ProductsList products={serializable} />
      </main>
      <SiteFooter />
    </div>
  )
}
