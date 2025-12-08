"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCart } from "@/components/CartContact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/Header"
import { SiteFooter } from "@/components/Footer"

export default function OrderPage() {
  const router = useRouter()
  const { data: session } = useSession()
  const { items, updateQty, removeItem, clear } = useCart()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [note, setNote] = useState("")

  const total = items.reduce((acc, i) => acc + (i.price || 0) * (i.qty || 1), 0)

  const placeOrder = async () => {
    if (!session) {
      router.push("/auth/signin")
      return
    }
    if (items.length === 0) return

    setLoading(true)
    setMessage({ type: "", text: "" })
    try {
      const payload = {
        items: items.map(i => ({ product_id: i.id, quantity: i.qty })),
        note,
      }
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to place order")
      clear()
      setMessage({ type: "success", text: `Order placed! #${data.id}` })
      router.push("/dashboard")
    } catch (err) {
      setMessage({ type: "error", text: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-10 space-y-6">
        <div className="bg-white border rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-semibold mb-2">Order review</h1>
          <p className="text-sm text-neutral-600">Confirm your cart and place the order.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white border rounded-lg shadow-sm">
            {items.length === 0 ? (
              <div className="p-6 text-neutral-600">Your cart is empty. <Button variant="link" onClick={() => router.push("/products")}>Go shopping</Button></div>
            ) : (
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    <div className="flex-1">
                      <div className="font-semibold">{item.name}</div>
                      <div className="text-sm text-neutral-600">tk {item.price}</div>
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" variant="outline" onClick={() => updateQty(item.id, Math.max(1, (item.qty || 1) - 1))}>-</Button>
                        <div className="px-3 py-1 border rounded">{item.qty || 1}</div>
                        <Button size="sm" variant="outline" onClick={() => updateQty(item.id, (item.qty || 1) + 1)}>+</Button>
                        <Button size="sm" variant="ghost" className="text-red-600 ml-auto" onClick={() => removeItem(item.id)}>Remove</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className="bg-white border rounded-lg shadow-sm p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-neutral-700">Subtotal</div>
              <div className="font-semibold">tk {total}</div>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-neutral-700">Shipping</div>
              <div className="font-semibold">Free</div>
            </div>
            <div className="border-t pt-3 flex items-center justify-between text-lg font-semibold">
              <div>Total</div>
              <div>tk {total}</div>
            </div>

            <div>
              <label className="text-sm text-neutral-600 block mb-1">Order note (optional)</label>
              <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add a note for the seller" />
            </div>

            {message.text && (
              <div className={`text-sm ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {message.text}
              </div>
            )}

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={placeOrder} disabled={loading || items.length === 0}>
              {loading ? "Placing order..." : "Place order"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/products")}>
              Continue shopping
            </Button>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

