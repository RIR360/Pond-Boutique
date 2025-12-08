"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

// Status badge helper component
function StatusBadge({ type, status }) {
  const configs = {
    payment: {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Payment Pending" },
      paid: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Paid" },
      failed: { bg: "bg-red-100", text: "text-red-800", label: "Payment Failed" },
    },
    shipping: {
      processing: { bg: "bg-blue-100", text: "text-blue-800", label: "Processing" },
      shipped: { bg: "bg-orange-100", text: "text-orange-800", label: "Shipped" },
      delivered: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Delivered" },
    },
    order: {
      pending: { bg: "bg-yellow-100", text: "text-yellow-800", label: "Pending" },
      shipped: { bg: "bg-blue-100", text: "text-blue-800", label: "Shipped" },
      delivered: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Delivered" },
      cancelled: { bg: "bg-red-100", text: "text-red-800", label: "Cancelled" },
    },
  }

  const config = configs[type]?.[status] || { bg: "bg-gray-100", text: "text-gray-800", label: status }

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${config.bg} ${config.text}`}>
      {config.label}
    </span>
  )
}

export default function OrdersSection({ orders = [] }) {
  const [list, setList] = useState(orders)
  const [loadingId, setLoadingId] = useState("")
  const [error, setError] = useState("")

  const cancelOrder = async (id) => {
    setLoadingId(id)
    setError("")
    try {
      const res = await fetch(`/api/orders/${id}`, { method: "PATCH" })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to cancel order")
      setList((prev) => prev.map((o) => (o.id === id ? { ...o, status: "cancelled" } : o)))
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingId("")
    }
  }

  return (
    <section className="md:col-span-2 bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Order History</h2>
        <div className="text-sm text-neutral-600">{list.length} order{list.length !== 1 ? "s" : ""}</div>
      </div>

      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

      {list.length === 0 ? (
        <p className="text-neutral-600">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {list.map((order) => (
            <div key={order.id} className="border rounded-lg p-4">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <div className="text-xs text-neutral-500">Order ID</div>
                  <div className="font-mono text-sm">{order.id.slice(-8)}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-500">Date</div>
                  <div className="text-sm font-medium">{new Date(order.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-neutral-500">Total</div>
                  <div className="font-semibold text-emerald-600">tk {order.total}</div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-3">
                <StatusBadge type="order" status={order.status} />
                <StatusBadge type="payment" status={order.payment_status} />
                <StatusBadge type="shipping" status={order.shipping_status} />
                {order.payment_method && (
                  <span className="text-xs text-neutral-500 capitalize">
                    ({order.payment_method === "cod" ? "Cash on Delivery" : "Online Payment"})
                  </span>
                )}
              </div>

              <div className="flex items-center justify-end">
                {order.status === "pending" ? (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => cancelOrder(order.id)}
                    disabled={loadingId === order.id}
                  >
                    {loadingId === order.id ? "Cancelling..." : "Cancel Order"}
                  </Button>
                ) : (
                  <span className="text-xs text-neutral-500">
                    {order.status === "cancelled" ? "Order cancelled" : "Order locked"}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
