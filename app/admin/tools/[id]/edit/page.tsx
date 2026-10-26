'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { ArrowLeft, Save, Trash2 } from 'lucide-react'
import Link from 'next/link'

const categories = [
  'Essential Tools',
  'Other Supplies',
  'Machines',
  'Cutting Tools',
  'Measuring Tools',
  'Notions',
]

// Mock data for demo
const mockTools: Record<string, any> = {
  '1': {
    id: '1',
    title: 'Brother Electronic Sewing Machine',
    description: 'The most basic machine I recommend. This is a perfectly adequate machine to start your sewing journey.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71VRNHd6sTL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00JBKVN8S',
    active: true,
  },
  '2': {
    id: '2',
    title: 'Steam Iron',
    description: 'High-quality iron with powerful steam, helps iron fabric quickly and efficiently.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61vJd+YoSQL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00L9J4L0A',
    active: true,
  },
  '3': {
    id: '3',
    title: 'Self-Healing Cutting Mat',
    description: 'Professional cutting mat 24" x 36", self-healing surface protects your rotary cutter blade.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71xQHqL8VoL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07MPB4GN4',
    active: true,
  },
  '4': {
    id: '4',
    title: 'Rotary Cutter',
    description: 'Essential tool for cutting fabric accurately and efficiently. Sharp blade, easy to replace.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61KvVHqW8LL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B000BNLLHW',
    active: true,
  },
  '5': {
    id: '5',
    title: 'Fabric Scissors',
    description: 'Sharp 8-inch fabric scissors with ergonomic design for easy and precise cutting.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61Y+pqGqVyL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00006IFN9',
    active: true,
  },
  '6': {
    id: '6',
    title: 'Quilting Ruler',
    description: 'Clear ruler with precise markings, ideal for measuring and cutting fabric accurately.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71nJRGQdJeL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B001AQXZZ8',
    active: true,
  },
  '7': {
    id: '7',
    title: 'Fabric Pins',
    description: 'Box of 100 high-quality pins with round heads, won\'t damage fabric.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71zKqNvLGgL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00114PXJW',
    active: true,
  },
  '8': {
    id: '8',
    title: 'Wristband Pin Cushion',
    description: 'Convenient wrist strap to hold pins, keeps pins within reach while sewing.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71QqXVqLvPL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B016TJHNHS',
    active: true,
  },
  '9': {
    id: '9',
    title: 'Measuring Tape',
    description: 'Flexible 60-inch tape measure, dual-sided with inches and cm, essential for measuring.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71hqYXqLVbL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B0001DSIVY',
    active: true,
  },
  '10': {
    id: '10',
    title: 'Multi-Color Thread Set',
    description: 'Set of 24 multi-color thread spools, high quality, suitable for all sewing projects.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/81vZKGZ8YnL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07FKDXNQD',
    active: true,
  },
  '11': {
    id: '11',
    title: 'Fabric Marking Pens',
    description: 'Set of self-erasing fabric markers, leaves no trace, ideal for marking seam lines.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71kQqXqLvPL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07FKDXNQD',
    active: false,
  },
  '12': {
    id: '12',
    title: 'Thread Snips',
    description: 'Compact 4-inch scissors, sharp, perfect for cutting excess thread and small details.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/61Y+pqGqVyL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B000YZVGQQ',
    active: true,
  },
}

export default function EditToolPage() {
  const router = useRouter()
  const params = useParams()
  const toolId = params.id as string
  
  const [loading, setLoading] = useState(false)
  const [notFound, setNotFound] = useState(false)
  
  const [form, setForm] = useState({
    title: '',
    description: '',
    category: '',
    image_url: '',
    amazon_url: '',
    active: true,
  })

  useEffect(() => {
    // Load tool data (using mock data for demo)
    const tool = mockTools[toolId]
    if (tool) {
      setForm({
        title: tool.title || '',
        description: tool.description || '',
        category: tool.category || '',
        image_url: tool.image_url || '',
        amazon_url: tool.amazon_url || '',
        active: tool.active ?? true,
      })
    } else {
      setNotFound(true)
    }
  }, [toolId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!form.title || !form.category) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // TODO: Implement API call to update tool
      alert('Tool updated successfully! (Demo mode - data not saved to database)')
      router.push('/admin/tools')
    } catch (err: any) {
      alert('Error: ' + (err.message || 'Could not update tool'))
    }
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this tool?')) return
    
    setLoading(true)
    try {
      // TODO: Implement API call to delete tool
      alert('Tool deleted successfully! (Demo mode)')
      router.push('/admin/tools')
    } catch (err: any) {
      alert('Error: ' + (err.message || 'Could not delete tool'))
    }
    setLoading(false)
  }

  if (notFound) {
    return (
      <div className="p-8">
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Tool Not Found</h1>
          <p className="text-gray-500 mb-6">The tool you're looking for doesn't exist.</p>
          <Link
            href="/admin/tools"
            className="inline-flex items-center gap-2 px-4 py-2 bg-brown-warm text-white rounded-lg hover:bg-brown-dark transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Tools
          </Link>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-bold text-gray-900">Edit Tool</h1>
            <p className="text-sm text-gray-500">Update tool information</p>
          </div>
        </div>
        
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 border border-red-200 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50 transition disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
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
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
