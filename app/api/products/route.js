import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { Types } from "mongoose"
import { authOptions } from "@/auth"
import connectToDatabase from "@/lib/connectDB"
import Product from "@/models/Product"

const ADMIN_EMAIL = "pond.admin@gmail.com"

const serializeProduct = p => ({
  id: p._id?.toString?.() ?? "",
  name: p.name,
  description: p.description || "",
  price: p.price,
  stock: p.stock ?? 0,
  rating: p.rating ?? 0,
  image_url: p.image_url || "",
  category: p.category || "",
})

export async function GET() {
  await connectToDatabase()
  const products = await Product.find({}).sort({ createdAt: -1 }).lean()
  return NextResponse.json({ products: products.map(serializeProduct) })
}

export async function POST(req) {
  const session = await getServerSession(authOptions)
  if (session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const body = await req.json()
  const { name, price, image_url, stock = 0, description = "", category = "" } = body || {}

  if (!name || typeof name !== "string") {
    return NextResponse.json({ message: "Name is required" }, { status: 400 })
  }
  const numericPrice = Number(price)
  if (Number.isNaN(numericPrice) || numericPrice <= 0) {
    return NextResponse.json({ message: "Price must be greater than zero" }, { status: 400 })
  }

  const numericStock = Number(stock)
  if (Number.isNaN(numericStock) || numericStock < 0) {
    return NextResponse.json({ message: "Stock cannot be negative" }, { status: 400 })
  }

  await connectToDatabase()

  const product = await Product.create({
    _id: new Types.ObjectId(),
    name: name.trim(),
    price: numericPrice,
    stock: numericStock,
    image_url: image_url?.trim?.() || "",
    description: description?.trim?.() || "",
    category: category?.trim?.() || "",
  })

  return NextResponse.json({ product: serializeProduct(product) }, { status: 201 })
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions)
  if (session?.user?.email !== ADMIN_EMAIL) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 })
  }

  const body = await req.json()
  const { id } = body || {}

  if (!id || !Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Valid product id is required" }, { status: 400 })
  }

  await connectToDatabase()

  const deleted = await Product.findByIdAndDelete(id)
  if (!deleted) {
    return NextResponse.json({ message: "Product not found" }, { status: 404 })
  }

  return NextResponse.json({ message: "Product removed" }, { status: 200 })
}

