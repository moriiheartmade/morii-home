'use client'

import { useCart } from '@/lib/cart-context'
import { X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, totalPrice } = useCart()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!mounted) return null

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-cream z-50 shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-beige">
            <h2 className="font-heading text-2xl font-semibold text-black">
              Your Cart
            </h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-beige transition-smooth"
              aria-label="Close cart"
            >
              <X className="w-5 h-5 text-charcoal" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray mb-4">Your cart is empty</p>
                <button
                  onClick={onClose}
                  className="text-brown-warm hover:text-brown-dark font-medium"
                >
                  Continue shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-lg p-4 border border-beige"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 bg-beige rounded overflow-hidden flex-shrink-0">
                        {item.cover_url ? (
                          <Image
                            src={item.cover_url}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-light text-xs">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-charcoal mb-1 truncate">
                          {item.title}
                        </h3>
                        <p className="text-brown-warm font-semibold">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-gray hover:text-red-500 transition-smooth"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-beige p-6 bg-white">
              {/* Add note */}
              <div className="mb-4">
                <label className="block text-sm text-gray mb-2">
                  Add a note to your order
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-beige rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brown-warm"
                  rows={2}
                  placeholder="Special instructions..."
                />
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-charcoal">Subtotal</span>
                <span className="text-2xl font-heading font-semibold text-black">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-gray mb-4">
                Shipping & taxes calculated at checkout
              </p>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                className="block w-full bg-brown-warm text-white text-center py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth mb-3"
                onClick={onClose}
              >
                CHECK OUT
              </Link>

              {/* Continue Shopping */}
              <button
                onClick={onClose}
                className="w-full text-brown-warm hover:text-brown-dark font-medium transition-smooth"
              >
                Continue shopping
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
