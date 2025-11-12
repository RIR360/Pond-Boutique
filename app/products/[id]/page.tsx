import connectToDatabase from "@/lib/connectDB"
import Product from "@/models/Product"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { CartProvider } from "@/components/CartContact"
import { SiteHeader } from "@/components/Header"
import { ProductGrid } from "@/components/sections/ProductGrid"
import { SiteFooter } from "@/components/Footer"

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  await connectToDatabase()

  const product = await Product.findById(params.id).lean();
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
