import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/connectDB";
import Product from "@/models/Product";

export async function GET() {
  await connectToDatabase();
  const products = await Product.find({});
  return NextResponse.json(products);
}