import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import connectToDatabase from "@/lib/connectDB"
import User from "@/models/User"

const ADMIN_EMAIL = "pond.admin@gmail.com"

export async function GET() {
  const session = await getServerSession(authOptions)
  if (session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  await connectToDatabase()

  const users = await User.find({}, { password: 0 })
    .sort({ createdAt: -1 })
    .lean()

  const safeUsers = users.map((u) => ({
    id: u._id?.toString?.() ?? "",
    name: u.name,
    email: u.email,
    phone: u.phone || "",
    address: u.address || "",
    createdAt: u.createdAt,
  }))

  return NextResponse.json({ users: safeUsers })
}

