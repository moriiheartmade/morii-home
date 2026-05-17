'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { ShoppingCart, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AddToCartButtonProps {
  pattern: {
    id: string
    slug: string
    title: string
    price: number
    cover_url: string | null
  }
  className?: string
  onCartOpen?: () => void
}

export default function AddToCartButton({ pattern, className = '', onCartOpen }: AddToCartButtonProps) {
  const { items, addItem, openCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const isInCart = items.some(item => item.id === pattern.id)

  const handleAddToCart = () => {
    if (!isInCart) {
      addItem({
        id: pattern.id,
        slug: pattern.slug,
        title: pattern.title,
        price: pattern.price,
        cover_url: pattern.cover_url,
      })
      
      setIsAdded(true)
      
      // Open cart sidebar
      setTimeout(() => {
        openCart()
        if (onCartOpen) {
          onCartOpen()
        }
      }, 300)
      
      setTimeout(() => setIsAdded(false), 2000)
    }
  }

  if (isInCart) {
    return (
      <Button
        variant="outline"
        className={className}
        disabled
      >
        <Check className="w-5 h-5" />
        In Cart
      </Button>
    )
  }

  return (
    <Button
      className={className}
      onClick={handleAddToCart}
    >
      <ShoppingCart className="w-5 h-5" />
      {isAdded ? 'Added!' : 'Add to Cart'}
    </Button>
  )
}
