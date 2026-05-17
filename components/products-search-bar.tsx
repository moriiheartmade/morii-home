'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal } from 'lucide-react'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'popular', label: 'Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
]

export default function ProductsSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams(searchParams.toString())
    if (query) {
      params.set('q', query)
    } else {
      params.delete('q')
    }
    router.push(`/products?${params.toString()}`)
  }

  const handleSortChange = (newSort: string) => {
    setSort(newSort)
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', newSort)
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
      {/* Search Input */}
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patterns..."
            className="w-full pl-12 pr-4 py-3 border border-beige rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brown-warm focus:border-transparent text-charcoal placeholder:text-gray"
          />
        </div>
      </form>

      {/* Sort Dropdown */}
      <div className="flex items-center gap-2">
        <SlidersHorizontal className="w-5 h-5 text-gray hidden sm:block" />
        <select
          value={sort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-4 py-3 border border-beige rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brown-warm text-charcoal cursor-pointer min-w-[160px]"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
