'use client'

import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import CartSidebar from '@/components/cart-sidebar'
import { CartProvider, useCart } from '@/lib/cart-context'

function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isCartOpen, closeCart } = useCart()
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
      <CartSidebar isOpen={isCartOpen} onClose={closeCart} />
    </>
  )
}

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CartProvider>
      <LayoutContent>{children}</LayoutContent>
    </CartProvider>
  )
}
