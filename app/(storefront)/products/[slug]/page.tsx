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
import { mockPatterns, mockCategories } from '@/lib/mock-data'

export const revalidate = 86400

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  // Use mock data directly for instant loading
  const pattern = mockPatterns.find(p => p.slug === slug)

  if (!pattern) {
    notFound()
  }

  // Add category info from mock data
  const category = mockCategories.find(c => c.slug === pattern.category)
  const patternWithCategory = {
    ...pattern,
    categories: category ? { name: category.name, slug: category.slug } : null
  }

  // Prepare gallery images
  const galleryImages = [
    patternWithCategory.cover_url,
    ...(patternWithCategory.preview_images || [])
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
                title={patternWithCategory.title}
                badges={{
                  bestseller: patternWithCategory.bestseller,
                  featured: patternWithCategory.featured,
                }}
              />
            </div>
          </div>

          {/* Right: Details */}
          <div>
            {/* Category */}
            {patternWithCategory.categories && (
              <a
                href={`/products?category=${patternWithCategory.categories.slug}`}
                className="text-sm text-brown-warm hover:text-brown-dark font-medium mb-2 inline-block"
              >
                {patternWithCategory.categories.name}
              </a>
            )}

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-heading font-semibold text-black mb-3">
              {patternWithCategory.title}
            </h1>

            {/* Rating, Sales & Difficulty */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              {patternWithCategory.rating_avg && patternWithCategory.rating_count > 0 && (
                <>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.round(patternWithCategory.rating_avg)
                            ? 'fill-brown-warm text-brown-warm'
                            : 'text-beige'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray">
                    {patternWithCategory.rating_avg.toFixed(1)} ({patternWithCategory.rating_count} reviews)
                  </span>
                  {patternWithCategory.sales_count > 0 && (
                    <>
                      <span className="text-gray">•</span>
                      <span className="text-sm text-gray">{formatSalesCount(patternWithCategory.sales_count)} sold</span>
                    </>
                  )}
                </>
              )}
              
              {/* Difficulty Badge */}
              {patternWithCategory.difficulty && (
                <>
                  {(patternWithCategory.rating_avg && patternWithCategory.rating_count > 0) && <span className="text-gray">•</span>}
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-brown-warm/10 text-brown-warm border border-brown-warm/20`}>
                    {patternWithCategory.difficulty === 'beginner' ? 'Beginner' : patternWithCategory.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                  </span>
                </>
              )}
            </div>

            {/* Price */}
            <div className="mb-4">
              {patternWithCategory.sale_type && patternWithCategory.sale_type !== 'none' && patternWithCategory.sale_value ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-black">
                    ${patternWithCategory.sale_type === 'percentage' 
                      ? (patternWithCategory.price * (1 - patternWithCategory.sale_value / 100)).toFixed(2)
                      : (patternWithCategory.price - patternWithCategory.sale_value).toFixed(2)
                    }
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    ${patternWithCategory.price.toFixed(2)}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    ({patternWithCategory.sale_type === 'percentage' 
                      ? `${patternWithCategory.sale_value}% off`
                      : `$${patternWithCategory.sale_value} off`
                    })
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-semibold text-black">
                  ${patternWithCategory.price.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <p className="text-base text-gray leading-relaxed">
                {patternWithCategory.description}
              </p>
            </div>

            {/* Add to Cart & Buy Now */}
            <div className="mb-8">
              <ProductDetailClient
                pattern={{
                  id: patternWithCategory.id,
                  slug: patternWithCategory.slug,
                  title: patternWithCategory.title,
                  price: patternWithCategory.price,
                  cover_url: patternWithCategory.cover_url,
                }}
              />
            </div>

            {/* Highlights - Etsy Style */}
            <div className="mb-6">
              <ProductHighlights
                designer="Morii Heartmade"
                fileType="PDF"
              />
            </div>

            {/* Accordion Sections */}
            <div className="mb-8">
              <ProductAccordion
                items={[
                  {
                    title: 'Item Details',
                    content: patternWithCategory.long_description || patternWithCategory.description,
                    isHtml: true,
                  },
                  {
                    title: 'This Pattern Includes',
                    content: patternWithCategory.whats_included && patternWithCategory.whats_included.length > 0 
                      ? patternWithCategory.whats_included 
                      : [
                          'Detailed, beginner-friendly instructions with clear illustrations',
                          'Nested Print at Home Files (US Letter + A4 compatible) with layers',
                          'Large Format File (A0/Copyshop)',
                          'Projector File',
                          'Detailed Video Tutorial',
                        ],
                  },
                  ...(patternWithCategory.tools_needed && patternWithCategory.tools_needed.length > 0 || patternWithCategory.materials_needed && patternWithCategory.materials_needed.length > 0 ? [{
                    title: 'What You Need',
                    content: {
                      tools: patternWithCategory.tools_needed || [],
                      materials: patternWithCategory.materials_needed || [],
                    },
                  }] : []),
                  {
                    title: 'Sizing',
                    content: (patternWithCategory as any).sizing_info || 'This pattern includes multiple size options to fit your needs. Detailed measurements are provided in the PDF file.',
                  },
                  {
                    title: 'Suitable Fabrics',
                    content: (patternWithCategory as any).suitable_fabrics || 'Recommended fabrics: Cotton, linen, canvas, denim, or any medium-weight woven fabric. Avoid stretchy fabrics unless specified in the pattern.',
                  },
                  {
                    title: 'Delivery',
                    content: (patternWithCategory as any).delivery_info || 'Instant Download\n\nYour files will be available to download once payment is confirmed.\n\nInstant download items don\'t accept returns, exchanges or cancellations. Please contact us about any problems with your order.',
                  },
                  {
                    title: 'Disclaimer',
                    content: (patternWithCategory as any).disclaimer || 'This is a digital sewing pattern, not a finished product. You will receive a PDF file to download and print. No physical items will be shipped.\n\nAll patterns are for personal use only. Commercial use requires a separate license. [View Commercial License →](/commercial-license)',
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
            rating_avg={patternWithCategory.rating_avg || 4.8}
            rating_count={patternWithCategory.rating_count || 0}
            sales_count={patternWithCategory.sales_count || 0}
          />
        </div>

        {/* You May Also Like */}
        <RelatedProducts
          products={mockPatterns}
          currentProductId={patternWithCategory.id}
        />
      </div>
    </div>
  )
}
