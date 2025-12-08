"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "./CartContact"
import { useSession } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export default function CartModal({ children }) {
  const { items, count, clear, removeItem, updateQty } = useCart()
  const { data: session } = useSession()
  const router = useRouter()
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" })
  const [paymentMethod, setPaymentMethod] = useState("cod")

  const total = items.reduce((acc, i) => acc + (i.price || 0) * (i.qty || 1), 0)

  const placeOrder = async () => {
    if (!session) {
      router.push("/auth/signin")
      return
    }
    if (items.length === 0) return

    setLoading(true)
    setError(null)
    setSuccess(null)

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
      setSuccess(`Order placed! #${data.id}`)
      setShowCheckout(false)
      setForm({ name: "", phone: "", address: "", note: "" })
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
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Cart ({count})</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="p-4">
            {success ? (
              <div className="text-emerald-600 font-medium">{success}</div>
            ) : (
              <div className="text-neutral-600">Your cart is empty.</div>
            )}
          </div>
        ) : showCheckout ? (
          <div className="p-4 flex flex-col gap-4">
            <div className="space-y-3">
              <div>
                <label className="text-sm text-neutral-700">Full name</label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-700">Phone</label>
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Phone number"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-700">Address</label>
                <Input
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Delivery address"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-700">Note (optional)</label>
                <Input
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="Special instructions"
                />
              </div>
              <div>
                <label className="text-sm text-neutral-700 mb-2 block">Payment method</label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant={paymentMethod === "online" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("online")}
                  >
                    Online
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant={paymentMethod === "cod" ? "default" : "outline"}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    Cash on delivery
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-neutral-600">Total</div>
                <div className="font-semibold text-lg">tk {total}</div>
              </div>
              {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
              <div className="flex flex-col gap-2">
                <Button
                  onClick={placeOrder}
                  disabled={loading || !form.name || !form.phone || !form.address}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  {loading ? "Placing order..." : "Place Order"}
                </Button>
                <Button variant="outline" onClick={() => setShowCheckout(false)}>
                  Back to cart
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-4">
            <div className="space-y-3 max-h-[50vh] overflow-y-auto">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-3 border rounded p-2">
                  {item.image ? (
                    <div className="w-16 h-16 relative flex-shrink-0">
                      <Image src={item.image} alt={item.name} width={64} height={64} className="object-cover rounded" />
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{item.name}</div>
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
                <div className="font-semibold text-lg">tk {total}</div>
              </div>
              {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

              <div className="mt-4 flex flex-col gap-2">
                <Button
                  onClick={() => {
                    if (!session) {
                      router.push("/auth/signin")
                      return
                    }
                    setShowCheckout(true)
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Proceed to checkout
                </Button>
                <Button variant="outline" onClick={clear}>Clear cart</Button>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
