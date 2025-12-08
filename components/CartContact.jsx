"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

const CartContext = createContext({
  items: [],
  count: 0,
  isHydrated: false,
  addItem: () => { },
  clear: () => { },
})

const STORAGE_KEY = "pond_cart_v1"

// Helper function to read cart from localStorage
function getStoredCart() {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch (err) {
    console.warn("Failed to read cart from storage", err)
  }
  return []
}

export function CartProvider({ children }) {
  // Use lazy initializer to read from localStorage synchronously on first render
  const [items, setItems] = useState(() => getStoredCart())
  const [isHydrated, setIsHydrated] = useState(false)

  // Mark as hydrated after first client-side render
  useEffect(() => {
    setIsHydrated(true)
  }, [])

  // Persist cart whenever it changes (after hydration)
  useEffect(() => {
    if (!isHydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch (err) {
      console.warn("Failed to persist cart", err)
    }
  }, [items, isHydrated])

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

  const removeItem = (id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }

  const updateQty = (id, qty) => {
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }

  const count = useMemo(() => items.reduce((acc, i) => acc + i.qty, 0), [items])

  const value = useMemo(
    () => ({
      items,
      count,
      isHydrated,
      addItem,
      removeItem,
      updateQty,
      clear,
    }),
    [items, count, isHydrated],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}

