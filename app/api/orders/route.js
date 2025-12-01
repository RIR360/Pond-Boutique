import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import connectToDatabase from "@/lib/connectDB"
import Order from "@/models/Order"
import Product from "@/models/Product"

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const items = body.items || []
  if (!Array.isArray(items) || items.length === 0) return NextResponse.json({ message: "No items provided" }, { status: 400 })

  await connectToDatabase()

  // Validate products and calculate total
  const productIds = items.map(i => i.product_id)
  const products = await Product.find({ _id: { $in: productIds } }).lean()
  const productMap = new Map(products.map(p => [p._id.toString(), p]))

  let total = 0
  const processed = []
  for (const it of items) {
    const pid = it.product_id
    const qty = parseInt(it.quantity || 0) || 0
    const prod = productMap.get(pid)
    if (!prod) return NextResponse.json({ message: `Product not found: ${pid}` }, { status: 400 })
    if (qty <= 0) return NextResponse.json({ message: `Invalid quantity for ${pid}` }, { status: 400 })
    if (prod.stock !== undefined && prod.stock < qty) return NextResponse.json({ message: `Insufficient stock for ${prod.name}` }, { status: 400 })
    total += prod.price * qty
    processed.push({ product_id: pid, quantity: qty })
  }

  // Create order
  const newOrder = await Order.create({
    user_id: session.user.id,
    products: processed,
    total_amount: total,
  })

  // Optionally decrement stock
  const bulkUpdates = processed.map(p => ({ updateOne: { filter: { _id: p.product_id }, update: { $inc: { stock: -p.quantity } } } }))
  if (bulkUpdates.length > 0) {
    await Product.bulkWrite(bulkUpdates)
  }

  return NextResponse.json({ id: newOrder._id.toString(), total: newOrder.total_amount }, { status: 201 })
}
