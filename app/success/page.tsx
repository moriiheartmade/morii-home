'use client'

import { useSearchParams } from 'next/navigation'
import { CheckCircle, Download, Mail } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const orderCode = searchParams.get('order')

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-success/10 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-success" />
          </div>

          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            Thank You!
          </h1>

          <p className="text-xl text-gray mb-8">
            Your order has been received successfully.
          </p>

          {orderCode && (
            <div className="bg-cream rounded-lg p-6 mb-8">
              <p className="text-sm text-gray mb-2">Order Number</p>
              <p className="text-2xl font-heading font-semibold text-black font-mono">
                {orderCode}
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white border border-beige rounded-lg p-6 text-left">
              <Mail className="w-8 h-8 text-brown-warm mb-3" />
              <h3 className="font-heading text-lg font-semibold text-black mb-2">
                Check Your Email
              </h3>
              <p className="text-gray text-sm">
                We've sent your download links to your email address. Please check your inbox (and spam folder).
              </p>
            </div>

            <div className="bg-white border border-beige rounded-lg p-6 text-left">
              <Download className="w-8 h-8 text-brown-warm mb-3" />
              <h3 className="font-heading text-lg font-semibold text-black mb-2">
                Download Your Patterns
              </h3>
              <p className="text-gray text-sm">
                Your download links are valid for 48 hours. You can download each pattern up to 5 times.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Button size="lg" asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>

            <div>
              <Link
                href="/"
                className="text-brown-warm hover:text-brown-dark font-medium transition-smooth"
              >
                Return to Home
              </Link>
            </div>
          </div>

          <div className="mt-12 p-6 bg-cream rounded-lg text-left">
            <h3 className="font-heading text-lg font-semibold text-black mb-3">
              Need Help?
            </h3>
            <p className="text-gray mb-4">
              If you have any questions or didn't receive your email, please contact us:
            </p>
            <a
              href="mailto:moriiheartmade@gmail.com"
              className="text-brown-warm hover:text-brown-dark font-medium transition-smooth"
            >
              moriiheartmade@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  )
}
