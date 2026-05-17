'use client'

import { useCart } from '@/contexts/cart-context'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Mail, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart()
  const router = useRouter()
  const totalPrice = getCartTotal()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-3xl font-heading font-semibold text-black mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray mb-8">
              Add some patterns to checkout
            </p>
            <Button asChild>
              <Link href="/products">Browse Patterns</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  const handleCheckout = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create order in database
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          items: items.map(item => ({
            pattern_id: item.id,
            quantity: 1,
            unit_price: item.price,
          })),
          amount: totalPrice,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create order')
      }

      // Redirect to PayPal or success page
      // For now, simulate success
      clearCart()
      router.push(`/success?order=${data.order_code}`)
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-brown-warm hover:text-brown-dark font-medium mb-8 transition-smooth"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-heading font-semibold text-black mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-beige rounded-lg p-6">
              <h2 className="font-heading text-2xl font-semibold text-black mb-6">
                Contact Information
              </h2>

              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
                    required
                  />
                </div>
                <p className="text-sm text-gray mt-2">
                  We'll send your patterns to this email
                </p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg text-error">
                  {error}
                </div>
              )}

              <div className="bg-cream rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-brown-warm flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray">
                    <p className="font-medium text-charcoal mb-1">Secure Payment</p>
                    <p>
                      After clicking "Continue to Payment", you'll be redirected to PayPal to complete your purchase securely.
                    </p>
                  </div>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </Button>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-cream rounded-lg p-6">
              <h2 className="font-heading text-xl font-semibold text-black mb-4">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-16 h-20 bg-beige rounded overflow-hidden flex-shrink-0">
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
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-charcoal text-sm line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm font-semibold text-black mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-beige pt-4 space-y-2">
                <div className="flex justify-between text-gray">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="border-t border-beige pt-2 flex justify-between">
                  <span className="font-heading text-lg font-semibold text-black">
                    Total
                  </span>
                  <span className="font-heading text-lg font-semibold text-black">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white rounded border border-beige">
                <p className="text-xs text-gray">
                  <strong className="text-charcoal">Instant Download:</strong> You'll receive download links immediately after payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
