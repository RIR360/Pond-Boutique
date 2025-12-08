"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useCart } from "@/components/CartContact"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteHeader } from "@/components/Header"
import { SiteFooter } from "@/components/Footer"

export default function CheckoutPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { items, updateQty, removeItem, clear, isHydrated } = useCart()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: "", text: "" })
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" })
  const [paymentMethod, setPaymentMethod] = useState("cod")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

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
        note: form.note,
        payment_method: paymentMethod,
        shipping: {
          name: form.name,
          phone: form.phone,
          address: form.address,
        },
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
          <h1 className="text-2xl font-semibold mb-2">Checkout</h1>
          <p className="text-sm text-neutral-600">Enter your details and place the order.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 bg-white border rounded-lg shadow-sm p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-700">Full name</label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
              </div>
              <div>
                <label className="text-sm text-neutral-700">Phone</label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
              </div>
            </div>
            <div>
              <label className="text-sm text-neutral-700">Address</label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Street, city, ZIP" />
            </div>
            <div>
              <label className="text-sm text-neutral-700">Order note (optional)</label>
              <Input value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} placeholder="Add a note for the seller" />
            </div>
            <div>
              <label className="text-sm text-neutral-700 mb-2 block">Payment method</label>
              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  variant={paymentMethod === "online" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("online")}
                >
                  Online payment
                </Button>
                <Button
                  type="button"
                  variant={paymentMethod === "cod" ? "default" : "outline"}
                  onClick={() => setPaymentMethod("cod")}
                >
                  Cash on delivery
                </Button>
              </div>
            </div>
            <div className="border-t pt-4 space-y-3">
              {!isHydrated ? (
                <div className="text-neutral-600 flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Loading cart...
                </div>
              ) : items.length === 0 ? (
                <div className="text-neutral-600">Your cart is empty.</div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 border rounded p-3">
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
                ))
              )}
            </div>
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

            {message.text && (
              <div className={`text-sm ${message.type === "success" ? "text-emerald-600" : "text-red-600"}`}>
                {message.text}
              </div>
            )}

            <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={placeOrder} disabled={loading || !isHydrated || items.length === 0}>
              {loading ? "Placing order..." : !isHydrated ? "Loading..." : "Place order"}
            </Button>
            <Button variant="outline" className="w-full" onClick={() => router.push("/cart")}>
              Back to cart
            </Button>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

