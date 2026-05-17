import { getSupabase } from '@/lib/db'
import ProductCard from '@/components/product-card'
import ProductsSearchBar from '@/components/products-search-bar'
import { mockCategories, mockPatterns } from '@/lib/mock-data'
import { Suspense } from 'react'
import { Scissors, Star, Users } from 'lucide-react'

export const revalidate = 3600

interface SearchParams {
  category?: string
  sort?: string
  q?: string
  page?: string
}

const ITEMS_PER_PAGE = 24

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = getSupabase()

  // Build query
  let query = supabase
    .from('patterns')
    .select('*, categories(name, slug)')
    .eq('active', true)

  // Filter by category
  if (searchParams.category) {
    const { data: category } = await supabase
      .from('categories')
      .select('id')
      .eq('slug', searchParams.category)
      .single()
    
    if (category) {
      query = query.eq('category_id', category.id)
    }
  }

  // Search by query
  if (searchParams.q) {
    query = query.ilike('title', `%${searchParams.q}%`)
  }

  // Sort
  const sort = searchParams.sort || 'featured'
  switch (sort) {
    case 'price-low':
      query = query.order('price', { ascending: true })
      break
    case 'price-high':
      query = query.order('price', { ascending: false })
      break
    case 'newest':
      query = query.order('created_at', { ascending: false })
      break
    case 'popular':
      query = query.order('sales_count', { ascending: false })
      break
    default:
      query = query.order('featured', { ascending: false }).order('sales_count', { ascending: false })
  }

  const { data: patternsData, error: patternsError } = await query
  const { data: categoriesData, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('display_order')

  // Use mock data if Supabase returns no data
  const allPatterns = patternsData && patternsData.length > 0 ? patternsData : mockPatterns
  const categories = categoriesData && categoriesData.length > 0 ? categoriesData : mockCategories

  // Handle errors gracefully
  if (patternsError) console.warn('Using mock data for patterns')
  if (categoriesError) console.warn('Using mock data for categories')

  // Count patterns per category
  const getCategoryCount = (categorySlug: string) => {
    if (!categorySlug) return allPatterns.length
    return allPatterns.filter((p: any) => p.categories?.slug === categorySlug).length
  }

  // Pagination
  const currentPage = parseInt(searchParams.page || '1', 10)
  const totalItems = allPatterns.length
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const patterns = allPatterns.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            Sewing Patterns
          </h1>
          <p className="text-lg text-gray max-w-2xl mb-6">
            Browse our collection of premium PDF sewing patterns. Each pattern includes detailed instructions and diagrams.
          </p>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 text-sm text-gray">
            <div className="flex items-center gap-1.5">
              <Scissors className="w-4 h-4" />
              <span>50+ Patterns</span>
            </div>
            <div className="w-px h-4 bg-beige" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="w-px h-4 bg-beige" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4" />
              <span>10,000+ Sales</span>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Sort Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 border-b border-beige">
        <Suspense fallback={<div className="h-12 bg-beige animate-pulse rounded-lg" />}>
          <ProductsSearchBar />
        </Suspense>
      </div>

      {/* Categories & Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Pills with Count */}
        <div className="flex flex-wrap gap-2 mb-6">
          <a
            href="/products"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
              !searchParams.category 
                ? 'bg-brown-warm text-white' 
                : 'bg-beige text-charcoal hover:bg-brown-warm/10'
            }`}
          >
            All ({allPatterns.length})
          </a>
          {categories?.map((cat) => {
            const count = getCategoryCount(cat.slug)
            return (
              <a
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${
                  searchParams.category === cat.slug 
                    ? 'bg-brown-warm text-white' 
                    : 'bg-beige text-charcoal hover:bg-brown-warm/10'
                }`}
              >
                {cat.name} ({count})
              </a>
            )
          })}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-gray">
            {totalItems} patterns
          </p>
        </div>

        {/* Products Grid */}
        {patterns && patterns.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {patterns.map((pattern: any) => (
              <ProductCard key={pattern.id} pattern={pattern} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray text-lg">No patterns found matching your search.</p>
          </div>
        )}

        {/* Pagination - Only show if more than 1 page */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-12 pt-8 border-t border-beige">
            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
              const params = new URLSearchParams()
              if (searchParams.category) params.set('category', searchParams.category)
              if (searchParams.sort) params.set('sort', searchParams.sort)
              if (searchParams.q) params.set('q', searchParams.q)
              if (page > 1) params.set('page', page.toString())
              const href = `/products${params.toString() ? `?${params.toString()}` : ''}`
              
              return (
                <a
                  key={page}
                  href={href}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-smooth ${
                    currentPage === page
                      ? 'bg-brown-warm text-white'
                      : 'text-gray hover:bg-beige'
                  }`}
                >
                  {page}
                </a>
              )
            })}
            
            {/* Next Button */}
            {currentPage < totalPages && (
              <a
                href={`/products?${new URLSearchParams({
                  ...(searchParams.category && { category: searchParams.category }),
                  ...(searchParams.sort && { sort: searchParams.sort }),
                  ...(searchParams.q && { q: searchParams.q }),
                  page: (currentPage + 1).toString(),
                }).toString()}`}
                className="px-4 h-10 flex items-center justify-center rounded-lg text-gray hover:bg-beige transition-smooth font-medium"
              >
                Next
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
