import connectToDatabase from "@/lib/connectDB"
import Product from "@/models/Product"
import { notFound } from "next/navigation"
import ProductDetail from "@/components/ProductDetail"
import { CartProvider } from "@/components/CartContact"

type Props = {
  params: {
    id: string
  }
}

export default async function Page({ params }: Props) {
  await connectToDatabase()

  const product = await Product.findById(params.id).lean()

  if (!product) {
    notFound()
  }

  // Ensure the object is serializable for passing to a client component
  const serializable = JSON.parse(JSON.stringify({ ...product, _id: product._id }))

  return (
    <CartProvider>
      <div className="min-h-screen bg-white text-neutral-900">
        <main className="max-w-6xl mx-auto py-12 px-4">
          <ProductDetail product={serializable} />
        </main>
      </div>
    </CartProvider>
  )
}
