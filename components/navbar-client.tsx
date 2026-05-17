'use client'

import Link from 'next/link'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

export default function NavbarClient() {
  const { totalItems, openCart } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-beige">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading text-2xl font-semibold text-black">
              Morii Home
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className="text-charcoal hover:text-brown-warm transition-smooth font-medium"
            >
              Products
            </Link>
            <Link
              href="/tools"
              className="text-charcoal hover:text-brown-warm transition-smooth font-medium"
            >
              Tools
            </Link>
            <Link
              href="/learn-to-sew"
              className="text-charcoal hover:text-brown-warm transition-smooth font-medium"
            >
              Learn To Sew
            </Link>
            <Link
              href="/blog"
              className="text-charcoal hover:text-brown-warm transition-smooth font-medium"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-charcoal hover:text-brown-warm transition-smooth font-medium"
            >
              About
            </Link>
            <Link
              href="/faq"
              className="text-charcoal hover:text-brown-warm transition-smooth font-medium"
            >
              FAQ
            </Link>
          </div>

          {/* Cart Icon */}
          <div className="flex items-center space-x-4">
            <button
              onClick={openCart}
              className="relative p-2 text-charcoal hover:text-brown-warm transition-smooth"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-brown-warm text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-charcoal hover:text-brown-warm transition-smooth"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-beige">
            <div className="flex flex-col space-y-3">
              <Link
                href="/products"
                className="text-charcoal hover:text-brown-warm transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/tools"
                className="text-charcoal hover:text-brown-warm transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tools
              </Link>
              <Link
                href="/learn-to-sew"
                className="text-charcoal hover:text-brown-warm transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Learn To Sew
              </Link>
              <Link
                href="/blog"
                className="text-charcoal hover:text-brown-warm transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-charcoal hover:text-brown-warm transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/faq"
                className="text-charcoal hover:text-brown-warm transition-smooth font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
