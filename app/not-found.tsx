import Link from 'next/link'
import { Home, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-heading font-semibold text-brown-warm mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray max-w-md mx-auto">
            Sorry, we couldn't find the page you're looking for. The pattern you're looking for might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" asChild>
            <Link href="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/products">
              <Search className="w-5 h-5" />
              Browse Patterns
            </Link>
          </Button>
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg border border-beige">
          <h3 className="font-heading text-xl font-semibold text-black mb-3">
            Looking for something specific?
          </h3>
          <p className="text-gray mb-4">
            Try browsing our categories or use the search feature to find the perfect pattern.
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/products?category=bags"
              className="px-4 py-2 bg-cream rounded-lg text-sm font-medium text-charcoal hover:bg-beige transition-smooth"
            >
              Bags
            </Link>
            <Link
              href="/products?category=other"
              className="px-4 py-2 bg-cream rounded-lg text-sm font-medium text-charcoal hover:bg-beige transition-smooth"
            >
              Other
            </Link>
            <Link
              href="/products?category=accessories"
              className="px-4 py-2 bg-cream rounded-lg text-sm font-medium text-charcoal hover:bg-beige transition-smooth"
            >
              Accessories
            </Link>
            <Link
              href="/products?category=home-decor"
              className="px-4 py-2 bg-cream rounded-lg text-sm font-medium text-charcoal hover:bg-beige transition-smooth"
            >
              Home Decor
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
