'use client'

import { useState } from 'react'
import AddToCartButton from './add-to-cart-button'
import CartSidebar from './cart-sidebar'
import Link from 'next/link'

interface ProductDetailClientProps {
  pattern: {
    id: string
    slug: string
    title: string
    price: number
    cover_url: string | null
  }
}

export default function ProductDetailClient({ pattern }: ProductDetailClientProps) {
  const [isCartOpen, setIsCartOpen] = useState(false)

  return (
    <>
      <div className="space-y-4">
        {/* Add to Cart */}
        <AddToCartButton
          pattern={pattern}
          className="w-full"
          onCartOpen={() => setIsCartOpen(true)}
        />

        {/* Buy Now Button */}
        <Link
          href="/checkout"
          className="block w-full bg-black text-white text-center py-3 px-6 rounded-lg font-medium hover:bg-charcoal transition-smooth"
        >
          BUY IT NOW
        </Link>
      </div>

      {/* Cart Sidebar */}
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  )
}
