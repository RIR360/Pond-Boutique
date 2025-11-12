"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SiteFooter } from "@/components/Footer"
import { SiteHeader } from "@/components/Header"
import { CartProvider } from "@/components/CartContact"

export default function DashboardPage() {
  const [editing, setEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Fatima Ahmed",
    email: "fatima.ahmed@example.com",
    phone: "+880 1234 567890",
    address: "123 Main Street, Dhaka, Bangladesh",
  })

  const [formData, setFormData] = useState(profile)

  const handleSave = () => {
    setProfile(formData)
    setEditing(false)
  }

  const handleCancel = () => {
    setFormData(profile)
    setEditing(false)
  }

  const orders = [
    {
      id: "ORD-001",
      date: "2025-11-05",
      status: "Delivered",
      total: 7200,
      items: [
        { name: "Ruby Kameez", quantity: 1, price: 3900 },
        { name: "Designer Kameez", quantity: 1, price: 4800 },
      ],
    },
    {
      id: "ORD-002",
      date: "2025-10-28",
      status: "Shipped",
      total: 3200,
      items: [{ name: "Cotton Three Piece", quantity: 1, price: 3200 }],
    },
    {
      id: "ORD-003",
      date: "2025-10-15",
      status: "Delivered",
      total: 2450,
      items: [{ name: "Casual Kurti", quantity: 1, price: 2450 }],
    },
  ]

  const getStatusColor = (status: string) => {
    if (status === "Delivered") return "text-emerald-600 bg-emerald-50"
    if (status === "Shipped") return "text-blue-600 bg-blue-50"
    if (status === "Processing") return "text-amber-600 bg-amber-50"
    return "text-gray-600 bg-gray-50"
  }

  return (
    <CartProvider>
      <SiteHeader />
      <main className="max-w-7xl mx-auto min-h-screen">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-neutral-900">My Dashboard</h1>
            <p className="text-neutral-600 mt-1">Welcome back to Pond Boutique!</p>
          </div>
        </div>

        <div className="px-4 py-8">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-neutral-900">My Profile</h2>
              {!editing && (
                <Button onClick={() => setEditing(true)} variant="outline">
                  Edit Profile
                </Button>
              )}
            </div>

            {!editing ? (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Name</p>
                  <p className="text-lg font-semibold text-neutral-900">{profile.name}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Email</p>
                  <p className="text-lg font-semibold text-neutral-900">{profile.email}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Phone</p>
                  <p className="text-lg font-semibold text-neutral-900">{profile.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-neutral-500 mb-1">Address</p>
                  <p className="text-lg font-semibold text-neutral-900">{profile.address}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-600">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-600">Email</label>
                  <Input
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-600">Phone</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm text-neutral-600">Address</label>
                  <Input
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700">
                    Save Changes
                  </Button>
                  <Button onClick={handleCancel} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">Order History</h2>

            {orders.length === 0 ? (
              <p className="text-neutral-600 text-center py-8">No orders yet. Start shopping now!</p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-neutral-500">Order ID</p>
                        <p className="text-lg font-semibold text-neutral-900">{order.id}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-500">Date</p>
                        <p className="text-lg font-semibold text-neutral-900">{order.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-500">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4 mb-4">
                      <h4 className="font-semibold text-neutral-900 mb-3">Items</h4>
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm text-neutral-600">
                            <span>
                              {item.name} x {item.quantity}
                            </span>
                            <span>tk {item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 flex items-center justify-between">
                      <p className="text-lg font-semibold text-neutral-900">Total: tk {order.total}</p>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">❤️</div>
              <h3 className="font-semibold text-neutral-900 mb-2">My Favorites</h3>
              <p className="text-sm text-neutral-600 mb-4">View your saved items</p>
              <Button variant="outline" className="w-full">
                Go to Favorites
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">🔐</div>
              <h3 className="font-semibold text-neutral-900 mb-2">Security</h3>
              <p className="text-sm text-neutral-600 mb-4">Manage password & login</p>
              <Button variant="outline" className="w-full">
                Security Settings
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl mb-3">🛍️</div>
              <h3 className="font-semibold text-neutral-900 mb-2">Continue Shopping</h3>
              <p className="text-sm text-neutral-600 mb-4">Browse our collection</p>
              <Button className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                <a href="/products">Shop Now</a>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </CartProvider>
  )
}
