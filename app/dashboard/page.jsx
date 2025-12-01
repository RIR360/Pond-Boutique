import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import connectToDatabase from "@/lib/connectDB"
import Order from "@/models/Order"
import { SiteHeader } from "@/components/Header"
import { SiteFooter } from "@/components/Footer"

export default async function Page() {
  const session = await getServerSession(authOptions)
  if (!session) return redirect("/auth/signin")

  await connectToDatabase()

  const userFromSession = session.user || {}

  // Fetch minimal order info for this user
  const ordersFromDB = await Order.find({ user_id: session.user?.id }).lean()
  const orders = ordersFromDB.map((o) => ({
    id: o._id.toString(),
    date: o.createdAt,
    total: o.total_amount || 0,
    status: o.status || "pending",
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white shadow-sm border-b mb-6 rounded">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-neutral-900">My Dashboard</h1>
            <p className="text-neutral-600 mt-1">Welcome back{userFromSession?.name ? `, ${userFromSession.name}` : "!"}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <section className="md:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-3">Profile</h2>
            <p className="text-sm text-neutral-500">Name</p>
            <p className="text-lg font-semibold">{userFromSession?.name || "-"}</p>
            <p className="text-sm text-neutral-500 mt-3">Email</p>
            <p className="text-lg font-semibold">{userFromSession?.email || "-"}</p>
          </section>

          <section className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Order History</h2>
              <div className="text-sm text-neutral-600">{orders.length} order{orders.length !== 1 ? "s" : ""}</div>
            </div>

            {orders.length === 0 ? (
              <p className="text-neutral-600">No orders yet.</p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded p-4 flex items-center justify-between">
                    <div>
                      <div className="text-sm text-neutral-500">Order ID</div>
                      <div className="font-semibold">{order.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-neutral-500">Date</div>
                      <div className="font-semibold">{new Date(order.date).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right font-semibold">tk {order.total}</div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
