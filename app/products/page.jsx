import connectToDatabase from "@/lib/connectDB"
import Product from "@/models/Product"
import ProductsList from "@/components/ProductsList"
import { SiteHeader } from "@/components/Header"
import { SiteFooter } from "@/components/Footer"

export default async function Page() {
  await connectToDatabase()
  const products = await Product.find({}).lean()

  const serializable = products.map((p) => ({
    _id: p._id?.toString?.() ?? String(p._id),
    name: p.name,
    price: p.price,
    image_url: p.image_url || "",
    stock: p.stock,
    description: p.description || "",
  }))

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <SiteHeader />
      <main className="max-w-7xl mx-auto py-12">
        <ProductsList products={serializable} />
      </main>
      <SiteFooter />
    </div>
  )
}

