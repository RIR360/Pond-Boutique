import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { Types } from "mongoose"
import { authOptions } from "@/auth"
import connectToDatabase from "@/lib/connectDB"
import Order from "@/models/Order"

export async function PATCH(_req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const orderId = params?.id
  if (!orderId || !Types.ObjectId.isValid(orderId)) {
    return NextResponse.json({ message: "Invalid order id" }, { status: 400 })
  }

  await connectToDatabase()

  const order = await Order.findById(orderId)
  if (!order) return NextResponse.json({ message: "Order not found" }, { status: 404 })
  if (order.user_id.toString() !== session.user.id) return NextResponse.json({ message: "Forbidden" }, { status: 403 })
  if (order.status !== "pending") return NextResponse.json({ message: "Only pending orders can be cancelled" }, { status: 400 })

  order.status = "cancelled"
  await order.save()

  return NextResponse.json({ message: "Order cancelled" }, { status: 200 })
}

