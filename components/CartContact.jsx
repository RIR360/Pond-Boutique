"use client"

import { createContext, useContext, useMemo, useState } from "react"

const CartContext = createContext({
  items: [],
  count: 0,
  addItem: () => { },
  clear: () => { },
})

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  const addItem = (item, qty = 1) => {
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

