'use client'

import { useCart } from '@/contexts/cart-context'
import { Trash2, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function CartPage() {
  const { items, removeFromCart, getCartTotal } = useCart()
  const totalPrice = getCartTotal()

  if (items.length === 0) {
    return (
      <div className="bg-white min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-gray-light mx-auto mb-4" />
            <h1 className="text-3xl font-heading font-semibold text-black mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray mb-8">
              Add some beautiful patterns to get started!
            </p>
            <Button asChild>
              <Link href="/products">Browse Patterns</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-heading font-semibold text-black mb-8">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white border border-beige rounded-lg"
                >
                  {/* Image */}
                  <div className="relative w-24 h-32 bg-beige rounded overflow-hidden flex-shrink-0">
                    {item.cover_url ? (
                      <Image
                        src={item.cover_url}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-light text-xs">
                        No image
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/products/${item.slug}`}
                      className="font-heading text-lg font-semibold text-black hover:text-brown-warm transition-smooth line-clamp-2"
                    >
                      {item.title}
                    </Link>
                    <p className="text-2xl font-heading font-semibold text-black mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray hover:text-error transition-smooth self-start"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-cream rounded-lg p-6">
              <h2 className="font-heading text-2xl font-semibold text-black mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray">
                  <span>Subtotal ({items.length} {items.length === 1 ? 'item' : 'items'})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-beige pt-3 flex justify-between">
                  <span className="font-heading text-xl font-semibold text-black">
                    Total
                  </span>
                  <span className="font-heading text-xl font-semibold text-black">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <Button size="lg" className="w-full mb-3" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>

              <div className="mt-6 p-4 bg-white rounded border border-beige">
                <p className="text-sm text-gray">
                  <strong className="text-charcoal">Instant Download:</strong> You'll receive your patterns immediately after purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
