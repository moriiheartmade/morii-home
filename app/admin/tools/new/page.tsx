'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Send, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

const categories = [
  'Essential Tools',
  'Other Supplies',
  'Machines',
  'Cutting Tools',
  'Measuring Tools',
  'Notions',
]

export default function NewToolPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    amazon_url: '',
    active: true,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.title || !form.category) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // TODO: Implement API call to save tool
      // For now, just show success message
      alert('Tool created successfully! (Demo mode - data not saved to database)')
      router.push('/admin/tools')
    } catch (err: any) {
      alert('Error: ' + (err.message || 'Could not create tool'))
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/tools" 
            className="p-2 text-gray-400 hover:text-brown-warm hover:bg-cream rounded-lg transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Tool</h1>
            <p className="text-sm text-gray-500">Add a new sewing tool with Amazon affiliate link</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl border p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              placeholder="e.g., Brother Electronic Sewing Machine"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              placeholder="Brief description of the tool..."
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              value={form.image_url}
              onChange={(e) => setForm({ ...form, image_url: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              placeholder="https://m.media-amazon.com/images/..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Paste the Amazon product image URL
            </p>
            
            {/* Image Preview */}
            {form.image_url && (
              <div className="mt-3 bg-gray-50 rounded-lg p-4 border">
                <p className="text-xs text-gray-500 mb-2">Preview:</p>
                <div className="w-32 h-32 bg-white rounded-lg border overflow-hidden">
                  <img
                    src={form.image_url}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect fill="%23f3f4f6" width="100" height="100"/><text fill="%239ca3af" font-size="12" x="50%" y="50%" text-anchor="middle" dy=".3em">No image</text></svg>'
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Amazon URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amazon Affiliate Link
            </label>
            <input
              type="url"
              value={form.amazon_url}
              onChange={(e) => setForm({ ...form, amazon_url: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              placeholder="https://www.amazon.com/dp/..."
            />
            <p className="text-xs text-gray-500 mt-1">
              Include your Amazon affiliate tag in the URL
            </p>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-3 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="rounded text-brown-warm focus:ring-brown-warm"
              />
              <span className="text-sm text-gray-700">Active (visible on website)</span>
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.push('/admin/tools')}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2 bg-brown-warm text-white rounded-lg text-sm font-medium hover:bg-brown-dark transition disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {loading ? 'Saving...' : 'Save Tool'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
