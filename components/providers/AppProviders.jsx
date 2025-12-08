"use client"

import SessionProvider from "@/components/providers/SessionProvider"
import { CartProvider } from "@/components/CartContact"

export default function AppProviders({ children }) {
  return (
    <SessionProvider>
      <CartProvider>{children}</CartProvider>
    </SessionProvider>
  )
}

