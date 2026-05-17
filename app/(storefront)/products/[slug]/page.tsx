import { getSupabase } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Star } from 'lucide-react'
import { formatSalesCount } from '@/lib/utils'
import ProductDetailClient from '@/components/product-detail-client'
import ProductAccordion from '@/components/product-accordion'
import ProductReviews from '@/components/product-reviews'
import ProductGallery from '@/components/product-gallery'
import ProductHighlights from '@/components/product-highlights'
import ProductStats from '@/components/product-stats'
import RelatedProducts from '@/components/related-products'
import { mockPatterns } from '@/lib/mock-data'

export const revalidate = 3600

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = getSupabase()

  const { data: patternData, error } = await supabase
    .from('patterns')
    .select('*, categories(name, slug)')
    .eq('slug', slug)
    .eq('active', true)
    .single()

  // Use mock data if Supabase returns no data
  let pattern = patternData
  if (!pattern || error) {
    console.warn('Using mock data for pattern:', slug)
    pattern = mockPatterns.find(p => p.slug === slug)
  }

  if (!pattern) {
    notFound()
  }

  // Prepare gallery images
  const galleryImages = [
    pattern.cover_url,
    ...(pattern.preview_images || [])
  ].filter(Boolean) as string[]

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Gallery */}
          <div>
            <div className="sticky top-20">
              <ProductGallery
                images={galleryImages}
                title={pattern.title}
                badges={{
                  bestseller: pattern.bestseller,
                  featured: pattern.featured,
                }}
              />
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {/* Category */}
            {pattern.categories && (
              <a
                href={`/products?category=${pattern.categories.slug}`}
                className="text-sm text-brown-warm hover:text-brown-dark font-medium mb-2 inline-block"
              >
                {pattern.categories.name}
              </a>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-heading font-semibold text-black mb-3">
              {pattern.title}
            </h1>

            {/* Rating, Sales & Difficulty */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {pattern.rating_avg && pattern.rating_count > 0 && (
                <>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(pattern.rating_avg)
                            ? 'fill-brown-warm text-brown-warm'
                            : 'text-beige'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray">
                    {pattern.rating_avg.toFixed(1)} ({pattern.rating_count} reviews)
                  </span>
                  {pattern.sales_count > 0 && (
                    <>
                      <span className="text-gray">•</span>
                      <span className="text-sm text-gray">{formatSalesCount(pattern.sales_count)} sold</span>
                    </>
                  )}
                </>
              )}
              
              {/* Difficulty Badge */}
              {pattern.difficulty && (
                <>
                  {(pattern.rating_avg && pattern.rating_count > 0) && <span className="text-gray">•</span>}
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brown-warm/10 text-brown-warm border border-brown-warm/20`}>
                    {pattern.difficulty === 'beginner' ? 'Beginner' : pattern.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                  </span>
                </>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              {pattern.sale_type && pattern.sale_type !== 'none' && pattern.sale_value ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-black">
                    ${pattern.sale_type === 'percentage' 
                      ? (pattern.price * (1 - pattern.sale_value / 100)).toFixed(2)
                      : (pattern.price - pattern.sale_value).toFixed(2)
                    }
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${pattern.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    ({pattern.sale_type === 'percentage' 
                      ? `${pattern.sale_value}% off`
                      : `$${pattern.sale_value} off`
                    })
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-black">
                  ${pattern.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray leading-relaxed">
                {pattern.description}
              </p>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="mb-8">
              <ProductDetailClient
                pattern={{
                  id: pattern.id,
                  slug: pattern.slug,
                  title: pattern.title,
                  price: pattern.price,
                  cover_url: pattern.cover_url,
                }}
              />
            </div>

            {/* Highlights - Etsy Style */}
            <div className="mb-6">
              <ProductHighlights
                designer="Morii Home"
                fileType="PDF"
              />
            </div>

            {/* Accordion Sections */}
            <div className="mb-8">
              <ProductAccordion
                items={[
                  {
                    title: 'Item Details',
                    content: pattern.long_description || pattern.description,
                    isHtml: true,
                  },
                  {
                    title: 'This Pattern Includes',
                    content: pattern.whats_included && pattern.whats_included.length > 0 
                      ? pattern.whats_included 
                      : [
                          'Detailed, beginner-friendly instructions with clear illustrations',
                          'Nested Print at Home Files (US Letter + A4 compatible) with layers',
                          'Large Format File (A0/Copyshop)',
                          'Projector File',
                          'Detailed Video Tutorial',
                        ],
                  },
                  ...(pattern.tools_needed && pattern.tools_needed.length > 0 || pattern.materials_needed && pattern.materials_needed.length > 0 ? [{
                    title: 'What You Need',
                    content: {
                      tools: pattern.tools_needed || [],
                      materials: pattern.materials_needed || [],
                    },
                  }] : []),
                  {
                    title: 'Sizing',
                    content: pattern.sizing_info || 'This pattern includes multiple size options to fit your needs. Detailed measurements are provided in the PDF file.',
                  },
                  {
                    title: 'Suitable Fabrics',
                    content: pattern.suitable_fabrics || 'Recommended fabrics: Cotton, linen, canvas, denim, or any medium-weight woven fabric. Avoid stretchy fabrics unless specified in the pattern.',
                  },
                  {
                    title: 'Delivery',
                    content: pattern.delivery_info || 'Instant Download\n\nYour files will be available to download once payment is confirmed.\n\nInstant download items don\'t accept returns, exchanges or cancellations. Please contact us about any problems with your order.',
                  },
                  {
                    title: 'Disclaimer',
                    content: pattern.disclaimer || 'This is a digital sewing pattern, not a finished product. You will receive a PDF file to download and print. No physical items will be shipped.\n\nAll patterns are for personal use only. Commercial use requires a separate license. [View Commercial License →](/commercial-license)',
                  },
                ]}
              />
            </div>
          </div>
        </div>

        {/* Product Stats - Etsy Style */}
        <div className="mt-12">
          <ProductStats
            itemQuality={5.0}
            shipping={5.0}
            customerService={5.0}
            buyersRecommend={99}
          />
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <ProductReviews
            rating_avg={pattern.rating_avg || 4.8}
            rating_count={pattern.rating_count || 0}
            sales_count={pattern.sales_count || 0}
          />
        </div>

        {/* You May Also Like */}
        <RelatedProducts
          products={mockPatterns}
          currentProductId={pattern.id}
        />
      </div>
    </div>
  )
}
