'use client'

import { Star, User } from 'lucide-react'

interface Review {
  id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
}

interface ProductReviewsProps {
  rating_avg: number
  rating_count: number
  sales_count: number
  reviews?: Review[]
}

export default function ProductReviews({ 
  rating_avg, 
  rating_count, 
  sales_count,
  reviews = []
}: ProductReviewsProps) {
  // Mock reviews if none provided
  const displayReviews = reviews.length > 0 ? reviews : [
    {
      id: '1',
      user_name: 'Sarah M.',
      rating: 5,
      comment: 'Amazing pattern! Very detailed instructions and easy to follow. I made my first bag and it turned out perfect!',
      created_at: '2024-02-15T00:00:00Z',
    },
    {
      id: '2',
      user_name: 'Emily R.',
      rating: 5,
      comment: 'Love this pattern! The instructions are so clear and the finished product looks professional. Highly recommend!',
      created_at: '2024-02-10T00:00:00Z',
    },
    {
      id: '3',
      user_name: 'Jessica L.',
      rating: 4,
      comment: 'Great pattern for intermediate sewers. Takes some time but the result is worth it!',
      created_at: '2024-02-05T00:00:00Z',
    },
  ]

  return (
    <div className="bg-white border border-beige rounded-lg p-6">
      <h2 className="font-heading text-2xl font-semibold text-black mb-6">
        Customer Reviews
      </h2>

      {/* Rating Summary */}
      <div className="flex items-center gap-8 mb-8 pb-8 border-b border-beige">
        <div className="text-center">
          <div className="text-5xl font-heading font-semibold text-black mb-2">
            {rating_avg.toFixed(1)}
          </div>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating_avg)
                    ? 'fill-brown-warm text-brown-warm'
                    : 'text-gray-light'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-gray">
            {rating_count} reviews
          </div>
        </div>

        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const percentage = rating_count > 0 
                ? ((displayReviews.filter(r => r.rating === stars).length / displayReviews.length) * 100)
                : 0
              return (
                <div key={stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm text-gray">{stars}</span>
                    <Star className="w-3 h-3 fill-brown-warm text-brown-warm" />
                  </div>
                  <div className="flex-1 h-2 bg-beige rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brown-warm rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray w-12 text-right">
                    {Math.round(percentage)}%
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-heading font-semibold text-brown-warm mb-2">
            {sales_count}
          </div>
          <div className="text-sm text-gray">
            Sold
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {displayReviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-beige last:border-0 last:pb-0">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-brown-warm" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-medium text-black">{review.user_name}</div>
                    <div className="flex items-center gap-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-brown-warm text-brown-warm'
                              : 'text-gray-light'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-gray">
                    {new Date(review.created_at).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-gray leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {displayReviews.length > 3 && (
        <div className="text-center mt-6">
          <button className="text-brown-warm hover:text-brown-dark font-medium transition-smooth">
            View All Reviews ({rating_count})
          </button>
        </div>
      )}
    </div>
  )
}
