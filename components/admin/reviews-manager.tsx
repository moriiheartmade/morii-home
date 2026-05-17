'use client'

import { useState, useMemo } from 'react'
import { Plus, Trash2, Star, User, Edit2, RefreshCw, ArrowUpDown } from 'lucide-react'

interface Review {
  id?: string
  rating: number
  content: string
  reviewer_name: string
  reviewer_avatar?: string
  reviewer_gender?: string
  review_date?: string
}

interface ReviewsManagerProps {
  reviews: Review[]
  onChange: (reviews: Review[]) => void
  ratingAvg: number
  ratingCount: number
  salesCount: number
  onStatsChange: (stats: { ratingAvg: number; ratingCount: number; salesCount: number }) => void
}

export default function ReviewsManager({
  reviews,
  onChange,
  ratingAvg,
  ratingCount,
  salesCount,
  onStatsChange
}: ReviewsManagerProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'name'>('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [newReview, setNewReview] = useState<Review>({
    rating: 5,
    content: '',
    reviewer_name: '',
    reviewer_avatar: '',
    reviewer_gender: 'other',
    review_date: new Date().toISOString().split('T')[0]
  })

  const addReview = () => {
    if (newReview.reviewer_name && newReview.content) {
      if (editingIndex !== null) {
        const updatedReviews = [...reviews]
        updatedReviews[editingIndex] = { ...newReview, id: reviews[editingIndex].id }
        onChange(updatedReviews)
        setEditingIndex(null)
      } else {
        onChange([...reviews, { ...newReview, id: `temp-${Date.now()}` }])
      }
      setNewReview({
        rating: 5,
        content: '',
        reviewer_name: '',
        reviewer_avatar: '',
        reviewer_gender: 'other',
        review_date: new Date().toISOString().split('T')[0]
      })
      setShowForm(false)
    }
  }

  const editReview = (index: number) => {
    setNewReview(reviews[index])
    setEditingIndex(index)
    setShowForm(true)
  }

  const removeReview = (index: number) => {
    onChange(reviews.filter((_, i) => i !== index))
  }

  const cancelEdit = () => {
    setNewReview({
      rating: 5,
      content: '',
      reviewer_name: '',
      reviewer_avatar: '',
      reviewer_gender: 'other',
      review_date: new Date().toISOString().split('T')[0]
    })
    setEditingIndex(null)
    setShowForm(false)
  }

  const refreshStats = () => {
    if (reviews.length > 0) {
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      onStatsChange({ 
        ratingAvg: Math.round(avg * 10) / 10, 
        ratingCount: reviews.length,
        salesCount 
      })
    } else {
      onStatsChange({ ratingAvg: 0, ratingCount: 0, salesCount })
    }
  }

  const sortedReviews = useMemo(() => {
    const sorted = [...reviews]
    sorted.sort((a, b) => {
      let comparison = 0
      
      if (sortBy === 'date') {
        const dateA = new Date(a.review_date || 0).getTime()
        const dateB = new Date(b.review_date || 0).getTime()
        comparison = dateB - dateA
      } else if (sortBy === 'rating') {
        comparison = b.rating - a.rating
      } else if (sortBy === 'name') {
        comparison = (a.reviewer_name || '').localeCompare(b.reviewer_name || '')
      }
      
      return sortOrder === 'asc' ? -comparison : comparison
    })
    return sorted
  }, [reviews, sortBy, sortOrder])

  const toggleSort = (newSortBy: 'date' | 'rating' | 'name') => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(newSortBy)
      setSortOrder('desc')
    }
  }

  const StarRating = ({ rating, onChange: onRatingChange }: { rating: number; onChange?: (r: number) => void }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onRatingChange?.(star)}
          className={onRatingChange ? 'cursor-pointer' : 'cursor-default'}
        >
          <Star
            className={`w-5 h-5 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
          />
        </button>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-brown-warm/10 to-cream rounded-xl p-6 border border-brown-warm/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">⭐ Review Management</h3>
            <p className="text-sm text-gray-600">
              Average rating: <span className="font-bold text-brown-warm">{ratingAvg.toFixed(1)} ⭐</span> - {ratingCount} reviews
            </p>
          </div>
          <button
            type="button"
            onClick={refreshStats}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-brown-warm/20 rounded-lg text-sm font-medium text-brown-warm hover:bg-cream transition"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Average Rating (1-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={ratingAvg}
              onChange={(e) => onStatsChange({ ratingAvg: Number(e.target.value), ratingCount, salesCount })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Review Count</label>
            <input
              type="number"
              min="0"
              value={ratingCount}
              onChange={(e) => onStatsChange({ ratingAvg, ratingCount: Number(e.target.value), salesCount })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Sales Count</label>
            <input
              type="number"
              min="0"
              value={salesCount}
              onChange={(e) => onStatsChange({ ratingAvg, ratingCount, salesCount: Number(e.target.value) })}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Review Form */}
      {showForm ? (
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              {editingIndex !== null ? (
                <>
                  <Edit2 className="w-5 h-5 text-blue-600" /> Edit Review
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 text-blue-600" /> Add New Review
                </>
              )}
            </h3>
            <button
              type="button"
              onClick={cancelEdit}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ✕ Close
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                  className="w-16 border rounded-lg px-3 py-2 text-sm"
                />
                <StarRating rating={newReview.rating} onChange={(r) => setNewReview({ ...newReview, rating: r })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reviewer Name</label>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {newReview.reviewer_avatar ? (
                    <img src={newReview.reviewer_avatar} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <input
                  type="text"
                  value={newReview.reviewer_name}
                  onChange={(e) => setNewReview({ ...newReview, reviewer_name: e.target.value })}
                  placeholder="e.g., Sarah Johnson"
                  className="flex-1 border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Avatar URL (optional)</label>
            <input
              type="url"
              value={newReview.reviewer_avatar}
              onChange={(e) => setNewReview({ ...newReview, reviewer_avatar: e.target.value })}
              placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Review Date</label>
              <input
                type="date"
                value={newReview.review_date}
                onChange={(e) => setNewReview({ ...newReview, review_date: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <div className="flex items-center gap-4 mt-2">
                {['male', 'female', 'other'].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="gender"
                      checked={newReview.reviewer_gender === g}
                      onChange={() => setNewReview({ ...newReview, reviewer_gender: g })}
                      className="text-brown-warm"
                    />
                    <span className="text-sm capitalize">{g}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Review Content *</label>
            <textarea
              rows={3}
              value={newReview.content}
              onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
              placeholder="Share your experience with this pattern..."
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={cancelEdit}
              className="px-5 py-2.5 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={addReview}
              disabled={!newReview.reviewer_name || !newReview.content}
              className="flex items-center gap-2 px-5 py-2.5 bg-brown-warm text-white rounded-lg text-sm font-medium hover:bg-brown-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingIndex !== null ? (
                <>
                  <Edit2 className="w-4 h-4" /> Update Review
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" /> Add Review
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-4 border-2 border-dashed border-brown-warm/30 rounded-xl text-brown-warm hover:bg-cream transition font-medium"
        >
          <Plus className="w-5 h-5" /> Add New Review
        </button>
      )}

      {/* Reviews List */}
      {reviews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 text-lg">Reviews List ({reviews.length})</h3>
            
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Sort by:</span>
              <button
                type="button"
                onClick={() => toggleSort('date')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  sortBy === 'date' ? 'bg-brown-warm/10 text-brown-warm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Date
                {sortBy === 'date' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <button
                type="button"
                onClick={() => toggleSort('rating')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  sortBy === 'rating' ? 'bg-brown-warm/10 text-brown-warm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Rating
                {sortBy === 'rating' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <button
                type="button"
                onClick={() => toggleSort('name')}
                className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg transition ${
                  sortBy === 'name' ? 'bg-brown-warm/10 text-brown-warm' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Name
                {sortBy === 'name' && <ArrowUpDown className="w-3 h-3" />}
              </button>
              <span className="text-xs text-gray-400">
                {sortOrder === 'desc' ? '↓' : '↑'}
              </span>
            </div>
          </div>
          <div className="space-y-3">
            {sortedReviews.map((review, index) => (
              <div key={review.id || index} className="bg-white border-2 border-gray-100 rounded-xl p-5 hover:border-brown-warm/20 transition">
                <div className="flex gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brown-warm to-brown-dark flex items-center justify-center overflow-hidden flex-shrink-0 shadow-md">
                    {review.reviewer_avatar ? (
                      <img src={review.reviewer_avatar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-white font-bold text-lg">
                        {review.reviewer_name?.[0]?.toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-900">{review.reviewer_name}</span>
                          {review.reviewer_gender && (
                            <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full capitalize">
                              {review.reviewer_gender}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <StarRating rating={review.rating} />
                          {review.review_date && (
                            <span className="text-xs text-gray-400">
                              • {new Date(review.review_date).toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => editReview(reviews.findIndex(r => r.id === review.id))}
                          className="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
                          title="Edit review"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeReview(reviews.findIndex(r => r.id === review.id))}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete review"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">{review.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
