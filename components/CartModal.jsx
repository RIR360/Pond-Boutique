"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./CartContact"
import Image from "next/image"

export default function CartModal({ children }) {
  const { items, count, clear, removeItem, updateQty } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const total = items.reduce((acc, i) => acc + (i.price || 0) * (i.qty || 1), 0)

  const placeOrder = async () => {
    if (items.length === 0) return
    setLoading(true)
    setError(null)
    try {
      const payload = {
        items: items.map(i => ({ product_id: i.id, quantity: i.qty }))
      }
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const json = await res.json()
        throw new Error(json?.message || "Failed to create order")
      }
      const json = await res.json()
      setSuccess(json)
      clear()
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Cart ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="p-4 text-neutral-600">Your cart is empty.</div>
        ) : (
          <div className="p-4 flex flex-col gap-4">
            <div className="space-y-3">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 border rounded p-2">
                  {item.image ? (
                    <div className="w-16 h-16 relative">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded" />
                  )}
                  <div className="flex-1">
                    <div className="font-semibold">{item.name}</div>
                    <div className="text-sm text-neutral-600">tk {item.price}</div>

                    <div className="flex items-center gap-2 mt-2">
                      <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => updateQty(item.id, Math.max(1, (item.qty || 1) - 1))}>-</button>
                      <div className="px-3 py-1 border rounded">{item.qty || 1}</div>
                      <button className="px-2 py-1 bg-gray-100 rounded" onClick={() => updateQty(item.id, (item.qty || 1) + 1)}>+</button>
                      <button className="ml-auto text-sm text-red-600" onClick={() => removeItem(item.id)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between">
                <div className="text-neutral-600">Total</div>
                <div className="font-semibold">tk {total}</div>
              </div>
              {error && <div className="text-sm text-red-600 mt-2">{error}</div>}
              {success && <div className="text-sm text-emerald-600 mt-2">Order placed — #{success.id}</div>}

              <div className="mt-4 flex gap-2">
                <Button onClick={placeOrder} disabled={loading} className="bg-emerald-600 hover:bg-emerald-700">{loading ? 'Placing...' : 'Place Order'}</Button>
                <Button variant="outline" onClick={clear}>Clear</Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
