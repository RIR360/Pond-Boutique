import { ProductCard } from "@/components/ProductCard"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import connectToDatabase from "@/lib/connectDB"
import Product from "@/models/Product"


export default async function ProductGrid() {
  await connectToDatabase()
  const productsFromDB = await Product.find({}).sort({ createdAt: -1 }).limit(4).lean()

  const products = productsFromDB.map((p) => ({
    id: p._id?.toString?.() ?? "",
    name: p.name,
    price: p.price,
    image_url: `/images/products/${p.image_url}`,
  }))

  return (
    <section id="new-arrivals" className="max-w-7xl mx-auto px-4 py-12 md:py-16">
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-semibold md:text-3xl mb-0 text-emerald-700">Other products</h2>
        <Link href="/products">
          <Button size="sm" variant={"outline"}>View all</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} id={p.id} name={p.name} price={p.price} image={p.image_url} alt={p.alt} label={p.label} />
        ))}
      </div>
    </section>
  )
}

