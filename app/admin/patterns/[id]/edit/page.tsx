'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Send } from 'lucide-react'
import Link from 'next/link'
import { mockPatterns } from '@/lib/mock-data'

export default function EditPatternPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [id, setId] = useState<string>('')
  const [pattern, setPattern] = useState<any>(null)
  const [form, setForm] = useState<any>({})

  useEffect(() => {
    params.then(p => {
      setId(p.id)
      // Load pattern from mock data
      const found = mockPatterns.find(pat => pat.id === p.id)
      if (found) {
        setPattern(found)
        setForm({
          title: found.title,
          slug: found.slug,
          description: found.description,
          price: found.price,
          category: found.category,
          difficulty: found.difficulty,
          sale_type: found.sale_type || 'none',
          sale_value: found.sale_value || '',
          active: found.active,
          featured: found.featured,
          bestseller: found.bestseller,
        })
      }
    })
  }, [params])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      // TODO: Implement API call to update pattern
      alert('Pattern updated successfully!')
      router.push('/admin/patterns')
    } catch (err: any) {
      alert('Error: ' + (err.message || 'Could not update pattern'))
    }
    setLoading(false)
  }

  if (!pattern) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/patterns" className="p-2 text-gray-400 hover:text-brown-warm hover:bg-cream rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Pattern</h1>
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border p-6 text-center">
          <p className="text-gray-500">Loading pattern data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/patterns" className="p-2 text-gray-400 hover:text-brown-warm hover:bg-cream rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Edit Pattern</h1>
            <p className="text-sm text-gray-500">Update pattern details (ID: {id})</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-brown-warm text-white rounded-lg text-sm font-medium hover:bg-brown-dark transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border p-6 max-w-3xl">
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Pattern Name</label>
              <input
                type="text"
                value={form.title || ''}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                type="text"
                value={form.slug || ''}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={form.description || ''}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={form.category || ''}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                <option value="bags">Bags</option>
                <option value="other">Other</option>
                <option value="accessories">Accessories</option>
                <option value="home-decor">Home Decor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={form.difficulty || ''}
                onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD)</label>
              <input
                type="number"
                step="0.01"
                value={form.price || ''}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="border-t pt-5">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Sale / Discount</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                <select
                  value={form.sale_type || 'none'}
                  onChange={(e) => setForm({ ...form, sale_type: e.target.value, sale_value: '' })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="none">No Discount</option>
                  <option value="percentage">Percentage (%)</option>
                  <option value="amount">Fixed Amount ($)</option>
                </select>
              </div>
              {form.sale_type !== 'none' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {form.sale_type === 'percentage' ? 'Discount %' : 'Discount $'}
                  </label>
                  <input
                    type="number"
                    step={form.sale_type === 'percentage' ? '1' : '0.01'}
                    value={form.sale_value || ''}
                    onChange={(e) => setForm({ ...form, sale_value: e.target.value })}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active || false}
                onChange={(e) => setForm({ ...form, active: e.target.checked })}
                className="rounded text-brown-warm"
              />
              <span className="text-sm text-gray-700">Active</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured || false}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                className="rounded text-brown-warm"
              />
              <span className="text-sm text-gray-700">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.bestseller || false}
                onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
                className="rounded text-brown-warm"
              />
              <span className="text-sm text-gray-700">Bestseller</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}
