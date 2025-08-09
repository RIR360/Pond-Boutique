"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

type CartItem = {
  id: string
  name: string
  price: number
  qty: number
}

type CartContextValue = {
  items: CartItem[]
  count: number
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue>({
  items: [],
  count: 0,
  addItem: () => { },
  clear: () => { },
})

export function CartProvider({ children }: { children?: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id)
      if (idx !== -1) {
        const copy = [...prev]
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty }
        return copy
      }
      return [...prev, { ...item, qty }]
    })
  }

  const clear = () => setItems([])

  const count = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items])

  const value = useMemo(
    () => ({
      items,
      count,
      addItem,
      clear,
    }),
    [items, count],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}