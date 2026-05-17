'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function ProductsSort() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentSort = searchParams.get('sort') || 'featured'

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <select
      className="w-full px-3 py-2 border border-beige rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brown-warm"
      value={currentSort}
      onChange={(e) => handleSortChange(e.target.value)}
    >
      <option value="featured">Featured</option>
      <option value="popular">Most Popular</option>
      <option value="newest">Newest</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
    </select>
  )
}
