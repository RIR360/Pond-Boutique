"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/CartContact"

export default function ProductDetail({ product }) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const [qty, setQty] = useState(1)
  const sizes = ["XS", "S", "M", "L", "XL"]
  const [size, setSize] = useState(sizes[2])

  const handleAdd = () => {
    addItem({ id: product._id, name: product.name, price: product.price, image: `/images/products/${product.image_url}` }, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  console.log(product)

  return (
    <section className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8 items-start py-16">
        <div className="bg-gray-50 rounded-lg p-6 flex items-center justify-center overflow-hidden group">
          <img
            src={`/images/products/${product.image_url}`}
            alt={product.name}
            className="max-h-96 object-contain w-full transform transition-transform duration-500 ease-in-out group-hover:scale-200 cursor-zoom-in"
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-4">
            <p className="text-2xl text-emerald-600 font-semibold">
              tk {product.price}
            </p>
            {product.stock !== undefined && (
              <span className="text-sm text-neutral-500">
                {product.stock} in stock
              </span>
            )}
          </div>

          <p className="text-neutral-700 mt-4 mb-6">
            {product.description || "A beautiful, sustainably made piece."}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-600 mr-2">Size</label>
              <select
                value={size}
                onChange={e => setSize(e.target.value)}
                className="border rounded px-3 py-2 text-sm"
                aria-label="Select size"
              >
                {sizes.map(s => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-600 mr-2">Qty</label>
              <div className="flex items-center border rounded overflow-hidden">
                <button
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  className="px-3 py-2 bg-white hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <div className="px-4 py-2">{qty}</div>
                <button
                  onClick={() => setQty(q => q + 1)}
                  className="px-3 py-2 bg-white hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Button size="lg" onClick={handleAdd}>
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/products">Continue shopping</a>
            </Button>
          </div>

          {added && (
            <div className="text-sm text-emerald-600 mb-4">Added to cart</div>
          )}

          <div className="border-t pt-6 mt-6 text-sm text-neutral-600">
            <p className="mb-2">
              Shipping: Free standard shipping on orders over $50. Expedited
              options available at checkout.
            </p>
            <p>
              Returns: 30-day returns. Item must be in original condition. See
              our returns policy for details.
            </p>
          </div>
        </div>
      </div>

      {/* Reviews & Related (simple stubs for demo) */}
      <div className="lg:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Customer reviews</h3>
          <div className="space-y-4">
            <div className="p-4 border rounded">
              <div className="text-sm text-neutral-600">
                No reviews yet
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}
