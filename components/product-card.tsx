'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatSalesCount } from '@/lib/utils'
import { useState } from 'react'

interface ProductCardProps {
  pattern: {
    id: string
    slug: string
    title: string
    price: number
    sale_type?: string
    sale_value?: number
    category?: string
    categories?: {
      name: string
      slug: string
    }
    cover_url: string | null
    rating_avg: number
    rating_count: number
    sales_count?: number
    bestseller: boolean
    featured: boolean
    difficulty?: string
  }
}

export default function ProductCard({ pattern }: ProductCardProps) {
  // Demo sales count if not provided - use pattern.id to generate consistent value
  const salesCount = pattern.sales_count || (parseInt(pattern.id.slice(0, 8), 16) % 500) + 50
  const { addItem, openCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)

  // Calculate sale price
  const calculateSalePrice = () => {
    if (!pattern.sale_type || pattern.sale_type === 'none' || !pattern.sale_value) {
      return null
    }
    if (pattern.sale_type === 'percentage') {
      return pattern.price * (1 - pattern.sale_value / 100)
    }
    return pattern.price - pattern.sale_value
  }

  const salePrice = calculateSalePrice()
  const discountPercentage = pattern.sale_type === 'percentage' 
    ? pattern.sale_value 
    : pattern.sale_value && pattern.price 
      ? Math.round((pattern.sale_value / pattern.price) * 100)
      : null

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAdding(true)
    addItem({
      id: pattern.id,
      slug: pattern.slug,
      title: pattern.title,
      price: pattern.price,
      cover_url: pattern.cover_url,
    })
    setTimeout(() => {
      setIsAdding(false)
      openCart()
    }, 300)
  }

  return (
    <Link href={`/products/${pattern.slug}`} target="_blank" className="group">
      <div className="bg-white rounded-lg border border-beige overflow-hidden hover-scale hover:shadow-md transition-smooth">
        {/* Image */}
        <div className="relative aspect-square bg-beige rounded-lg overflow-hidden mb-4 group-hover:shadow-md transition-smooth">
          {pattern.cover_url ? (
            <Image
              src={pattern.cover_url}
              alt={pattern.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-light">
              No image
            </div>
          )}
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-brown-warm hover:text-white"
            title="Add to cart"
          >
            <Plus className={`w-6 h-6 transition-transform ${isAdding ? 'scale-110' : ''}`} />
          </button>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {pattern.bestseller && (
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2 py-1 rounded border border-orange-200">
                Bestseller
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Title */}
          <h3 className="text-lg font-black text-black line-clamp-2 group-hover:text-brown-warm transition-smooth mb-2">
            {pattern.title}
          </h3>

          {/* Category & Difficulty */}
          <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
            <span className="capitalize">
              {pattern.categories?.name || pattern.category || 'Uncategorized'}
            </span>
            {pattern.difficulty && (
              <>
                <span>•</span>
                <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-medium bg-brown-warm/10 text-brown-warm`}>
                  {pattern.difficulty === 'beginner' ? 'Beginner' : pattern.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                </span>
              </>
            )}
          </div>

          {/* Rating & Sales */}
          <div className="flex items-center gap-2 mb-3 text-sm">
            {pattern.rating_count > 0 && (
              <>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-brown-warm text-brown-warm" />
                  <span className="text-gray">
                    {pattern.rating_avg.toFixed(1)}
                  </span>
                </div>
                <span className="text-gray">•</span>
              </>
            )}
            <span className="text-gray">({formatSalesCount(salesCount)} sold)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            {salePrice ? (
              <>
                <span className="text-lg font-semibold text-black">
                  ${salePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${pattern.price.toFixed(2)}
                </span>
                <span className="text-sm font-medium text-green-600">
                  ({discountPercentage}% off)
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-black">
                ${pattern.price.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
