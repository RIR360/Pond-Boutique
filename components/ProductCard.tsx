"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "./CartContact"

export type ProductCardProps = {
  id?: string
  name?: string
  price?: number
  image?: string
  alt?: string
  label?: string
}

export function ProductCard({
  id = "sku-default",
  name = "Sample Product",
  price = 49,
  image = "https://images.pexels.com/photos/18898092/pexels-photo-18898092.jpeg",
  alt = "Product photo",
  label,
}: ProductCardProps) {
  const { addItem } = useCart()
  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(price)

  return (
    <div className="group overflow-hidden rounded-xl border">
      <div className="relative">
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          width={400}
          height={400}
          className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {label ? (
          <Badge className="absolute left-3 top-3 bg-emerald-600 text-white hover:bg-emerald-700">{label}</Badge>
        ) : null}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 font-medium">{name}</h3>
          <span className="shrink-0 font-semibold">{formatted}</span>
        </div>
        <div className="flex gap-2">
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={() => addItem({ id, name, price }, 1)}
            aria-label={"Add " + name + " to cart"}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  )
}