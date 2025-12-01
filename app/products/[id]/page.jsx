import connectToDatabase from "@/lib/connectDB"
import Product from "@/models/Product"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { CartProvider } from "@/components/CartContact"
import { SiteHeader } from "@/components/Header"
import ProductGrid from "@/components/sections/ProductGrid"
import { SiteFooter } from "@/components/Footer"

export default async function Page({ params }) {
  // `params` can be a promise-like object in some Next.js versions — await it before use
  const { id } = await params
  await connectToDatabase()

  const product = await Product.findById(id).lean();
  const serializedProduct = JSON.parse(JSON.stringify(product));

  if (!product) {
    notFound()
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <SiteHeader />
        <main>
          <ProductDetail product={serializedProduct} />
          <ProductGrid />
        </main>
        <SiteFooter />
      </div>
    </CartProvider>
  )
}

