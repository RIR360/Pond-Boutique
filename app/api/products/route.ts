import { NextResponse } from "next/server";
import connectDB from "@/lib/connectDB";
import Product from "@/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return NextResponse.json(products);
}
