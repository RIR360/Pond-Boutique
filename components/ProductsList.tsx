"use client"

import { useMemo, useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Product = {
  _id: string
  name: string
  price: number
  images?: string[]
  stock?: number
  description?: string
}

export default function ProductsList({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("")
  const [minPrice, setMinPrice] = useState<number | "">("")
  const [maxPrice, setMaxPrice] = useState<number | "">("")
  const [inStockOnly, setInStockOnly] = useState(false)

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false
      if (minPrice !== "" && p.price < Number(minPrice)) return false
      if (maxPrice !== "" && p.price > Number(maxPrice)) return false
      if (inStockOnly && (!p.stock || p.stock <= 0)) return false
      return true
    })
  }, [products, query, minPrice, maxPrice, inStockOnly])

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-2 w-full md:w-1/2">
          <Input
            placeholder="Search products by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
          <Button variant="outline" onClick={() => { setQuery(""); setMinPrice(""); setMaxPrice(""); setInStockOnly(false) }}>
            Reset
          </Button>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Min"
            value={minPrice as any}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded px-3 py-2 w-20 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice as any}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="border rounded px-3 py-2 w-20 text-sm"
          />
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} /> In stock
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p._id} id={p._id} name={p.name} price={p.price} image={p.images?.[0] || "/images/placeholder.svg"} alt={p.name} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-neutral-600 mt-8">No products match your filters.</div>
      )}
    </section>
  )
}
