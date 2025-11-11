import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/connectDB";
import Product from "@/models/Product";

let data_sample = {
  id: "kameez-003",
  name: "Designer Kameez",
  price: 4800,
  image: "/images/pexels-photo-22431192.jpeg",
  alt: "Embroidered designer kameez",
  label: "Bestseller",
}

export async function GET() {
  await connectToDatabase();
  await Product.create(data_sample);
  const products = await Product.find({});
  return NextResponse.json(products);
}