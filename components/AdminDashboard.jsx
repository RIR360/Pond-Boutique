"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

const tabs = [
  { id: "customers", label: "Customers" },
  { id: "products", label: "Products" },
]

const formatDate = (value) => {
  if (!value) return "-"
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "-"
  return date.toLocaleDateString()
}

export default function AdminDashboard({ users = [], products = [] }) {
  const [activeTab, setActiveTab] = useState("customers")
  const [productList, setProductList] = useState(products)
  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    image_url: "",
    stock: "",
    description: "",
    category: "",
  })
  const [message, setMessage] = useState({ type: "", text: "" })
  const [isSaving, setIsSaving] = useState(false)
  const [deletingId, setDeletingId] = useState("")

  const totalStock = useMemo(
    () => productList.reduce((sum, p) => sum + (Number(p.stock) || 0), 0),
    [productList]
  )

  const handleFormChange = (field, value) => {
    setProductForm((prev) => ({ ...prev, [field]: value }))
    if (message.text) setMessage({ type: "", text: "" })
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage({ type: "", text: "" })

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...productForm,
          price: Number(productForm.price),
          stock: productForm.stock === "" ? 0 : Number(productForm.stock),
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to add product")

      setProductList((prev) => [data.product, ...prev])
      setProductForm({
        name: "",
        price: "",
        image_url: "",
        stock: "",
        description: "",
        category: "",
      })
      setMessage({ type: "success", text: "Product added successfully" })
    } catch (error) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteProduct = async (id) => {
    setDeletingId(id)
    setMessage({ type: "", text: "" })

    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.message || "Failed to delete product")

      setProductList((prev) => prev.filter((p) => p.id !== id))
      setMessage({ type: "success", text: "Product removed" })
    } catch (error) {
      setMessage({ type: "error", text: error.message })
    } finally {
      setDeletingId("")
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg border">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold">Admin tools</h2>
            <p className="text-sm text-neutral-600">Manage customers and products</p>
          </div>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {message.text && (
          <Alert variant={message.type === "success" ? "default" : "destructive"}>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {activeTab === "customers" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-100 rounded p-4">
                <p className="text-sm text-neutral-600">Total customers</p>
                <p className="text-2xl font-semibold text-emerald-700">{users.length}</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded p-4">
                <p className="text-sm text-neutral-600">Products in store</p>
                <p className="text-2xl font-semibold text-emerald-700">{productList.length}</p>
              </div>
            </div>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Name</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Email</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Phone</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Address</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                        No customers found.
                      </td>
                    </tr>
                  )}
                  {users.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-4 py-3 font-medium text-neutral-900">{user.name}</td>
                      <td className="px-4 py-3 text-neutral-700">{user.email}</td>
                      <td className="px-4 py-3 text-neutral-700">{user.phone || "-"}</td>
                      <td className="px-4 py-3 text-neutral-700">{user.address || "-"}</td>
                      <td className="px-4 py-3 text-neutral-700">{formatDate(user.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div className="space-y-6">
            <form onSubmit={handleAddProduct} className="grid gap-4 md:grid-cols-2 bg-neutral-50 border rounded-lg p-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Product name"
                  value={productForm.name}
                  onChange={(e) => handleFormChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={productForm.price}
                  onChange={(e) => handleFormChange("price", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  placeholder="0"
                  value={productForm.stock}
                  onChange={(e) => handleFormChange("stock", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image_url">Image filename</Label>
                <Input
                  id="image_url"
                  placeholder="e.g. backpack.jpg"
                  value={productForm.image_url}
                  onChange={(e) => handleFormChange("image_url", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Short description"
                  value={productForm.description}
                  onChange={(e) => handleFormChange("description", e.target.value)}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Optional category label"
                  value={productForm.category}
                  onChange={(e) => handleFormChange("category", e.target.value)}
                />
              </div>
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={isSaving}>
                  {isSaving ? "Saving..." : "Add product"}
                </Button>
              </div>
            </form>

            <div className="overflow-x-auto border rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-neutral-50 text-left">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Name</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Price</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Stock</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Category</th>
                    <th className="px-4 py-3 font-semibold text-neutral-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {productList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-6 text-center text-neutral-500">
                        No products available.
                      </td>
                    </tr>
                  )}
                  {productList.map((product) => (
                    <tr key={product.id} className="border-t">
                      <td className="px-4 py-3 font-medium text-neutral-900">{product.name}</td>
                      <td className="px-4 py-3 text-neutral-700">tk {product.price}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.stock ?? 0}</td>
                      <td className="px-4 py-3 text-neutral-700">{product.category || "-"}</td>
                      <td className="px-4 py-3">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={deletingId === product.id}
                        >
                          {deletingId === product.id ? "Removing..." : "Remove"}
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

