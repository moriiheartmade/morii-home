import Link from 'next/link'
import Image from 'next/image'
import { Download } from 'lucide-react'

interface Pattern {
  id: string
  slug: string
  title: string
  price: number
  cover_url: string | null
  categories?: {
    name: string
    slug: string
  }
}

interface RelatedProductsProps {
  products: Pattern[]
  currentProductId: string
}

export default function RelatedProducts({ products, currentProductId }: RelatedProductsProps) {
  // Filter out current product and limit to 6
  const relatedProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 6)

  if (relatedProducts.length === 0) return null

  return (
    <section className="py-12 border-t border-beige">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-heading font-semibold text-black">
          You may also like
        </h2>
        <Link
          href="/products"
          className="text-sm text-brown-warm hover:text-brown-dark font-medium transition-smooth"
        >
          See more
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="group"
          >
            {/* Image */}
            <div className="relative aspect-square bg-beige rounded-lg overflow-hidden mb-3">
              {product.cover_url ? (
                <Image
                  src={product.cover_url}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-gray-light text-xs">
                  No image
                </div>
              )}
            </div>

            {/* Digital Download Badge */}
            <div className="flex items-center gap-1 text-xs text-gray mb-1">
              <Download className="w-3 h-3" />
              <span>Digital download</span>
            </div>

            {/* Title */}
            <h3 className="text-sm font-medium text-charcoal line-clamp-2 group-hover:text-brown-warm transition-smooth mb-1">
              {product.title}
            </h3>

            {/* Price */}
            <p className="text-sm font-semibold text-black">
              ${product.price.toFixed(2)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
