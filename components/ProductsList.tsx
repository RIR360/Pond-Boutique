"use client"

import { useMemo, useState } from "react"
import { ProductCard } from "@/components/ProductCard"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Product = {
  _id: string
  name: string
  price: number
  image_url?: string
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
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters - left column */}
        <aside className="w-full md:w-72 bg-white border rounded p-4 sticky top-20 h-fit">
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          <div className="mb-4">
            <label className="text-sm text-neutral-600 block mb-2">Search</label>
            <Input
              placeholder="Search products by name..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="mb-4">
            <label className="text-sm text-neutral-600 block mb-2">Price range</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={minPrice as any}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="border rounded px-3 py-2 w-24 text-sm"
              />
              <input
                type="number"
                placeholder="Max"
                value={maxPrice as any}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="border rounded px-3 py-2 w-24 text-sm"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} /> In stock only
            </label>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => { setQuery(""); setMinPrice(""); setMaxPrice(""); setInStockOnly(false) }}>
              Reset
            </Button>
            <Button onClick={() => { /* optionally apply or close filter panel */ }}>
              Apply
            </Button>
          </div>
        </aside>

        {/* Products - right column */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold md:text-3xl mb-0 text-emerald-700">
                Products that feels like home!
              </h2>
              <p className="text-sm text-neutral-600">Showing {filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
            </div>
            {/* future: sorting controls */}
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p._id} id={p._id} name={p.name} price={p.price} image={`/images/products/${p.image_url}`} alt={p.name} />
            ))}
          </div>z

          {filtered.length === 0 && (
            <div className="text-center text-neutral-600 mt-8">No products match your filters.</div>
          )}
        </div>
      </div>
    </section>
  )
}
