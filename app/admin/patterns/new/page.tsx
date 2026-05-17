'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Send, BookOpen, Image as ImageIcon, FileText, Star, Search } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { convertDriveUrl } from '@/lib/utils'
import ReviewsManager from '@/components/admin/reviews-manager'
import SEOPanel from '@/components/admin/seo-panel'

const RichTextEditor = dynamic(() => import('@/components/admin/rich-text-editor'), { ssr: false })

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: BookOpen },
  { id: 'media', label: 'Images & Media', icon: ImageIcon },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'seo', label: 'SEO', icon: Search },
]

export default function NewPatternPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    long_description: '',
    category: '',
    difficulty: 'beginner',
    price: '',
    // Sale/Discount
    sale_type: 'none' as 'none' | 'percentage' | 'amount',
    sale_value: '',
    cover_url: '',
    pdf_url: '',
    preview_images: [] as string[],
    whats_included: [] as string[],
    // What You Need section
    tools_needed: [] as string[],
    materials_needed: [] as string[],
    // Accordion sections
    sizing_info: 'This pattern includes multiple size options to fit your needs. Detailed measurements are provided in the PDF file.',
    suitable_fabrics: 'Recommended fabrics: Cotton, linen, canvas, denim, or any medium-weight woven fabric. Avoid stretchy fabrics unless specified in the pattern.',
    delivery_info: 'Instant Download\n\nYour files will be available to download once payment is confirmed.\n\nInstant download items don\'t accept returns, exchanges or cancellations. Please contact us about any problems with your order.',
    disclaimer: 'This is a digital sewing pattern, not a finished product. You will receive a PDF file to download and print. No physical items will be shipped.\n\nAll patterns are for personal use only. Commercial use requires a separate license.',
    active: true,
    featured: false,
    bestseller: false,
    // SEO
    meta_title: '',
    meta_description: '',
    og_image_url: '',
    keywords: [] as string[],
    // Reviews
    rating_avg: 0,
    rating_count: 0,
    sales_count: 0,
  })

  const [reviews, setReviews] = useState<any[]>([])

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title || !form.category || !form.price) {
      alert('Please fill in all required fields')
      setActiveTab('basic')
      return
    }

    setLoading(true)
    try {
      // TODO: Implement API call
      alert('Pattern created successfully!')
      router.push('/admin/patterns')
    } catch (err: any) {
      alert('Error: ' + (err.message || 'Could not create pattern'))
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/patterns" className="p-2 text-gray-400 hover:text-brown-warm hover:bg-cream rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Add New Pattern</h1>
            <p className="text-sm text-gray-500">Create a new PDF sewing pattern</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleSubmit('draft')}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <button
            type="button"
            onClick={() => handleSubmit('published')}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2 bg-brown-warm text-white rounded-lg text-sm font-medium hover:bg-brown-dark transition disabled:opacity-50"
          >
            <Send className="w-4 h-4" /> Publish
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-xl overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              activeTab === tab.id
                ? 'bg-white text-brown-warm shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border p-6">
        {/* Tab: Basic Info */}
        {activeTab === 'basic' && (
          <div className="space-y-5 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pattern Name *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                  placeholder="e.g., Classic Tote Bag Pattern"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                />
                <p className="text-xs text-gray-400 mt-1">URL: moriiheartmade.com/products/{form.slug || 'slug'}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                placeholder="Brief description (shown on listing page)"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  value={form.category}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty *</label>
                <select
                  value={form.difficulty}
                  onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (USD) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  placeholder="12.99"
                />
              </div>
            </div>

            {/* Sale/Discount Section */}
            <div className="border-t pt-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Sale / Discount (Optional)</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                  <select
                    value={form.sale_type}
                    onChange={(e) => setForm({ ...form, sale_type: e.target.value as any, sale_value: '' })}
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
                      {form.sale_type === 'percentage' ? 'Discount Percentage' : 'Discount Amount'}
                    </label>
                    <input
                      type="number"
                      step={form.sale_type === 'percentage' ? '1' : '0.01'}
                      min="0"
                      max={form.sale_type === 'percentage' ? '100' : undefined}
                      value={form.sale_value}
                      onChange={(e) => setForm({ ...form, sale_value: e.target.value })}
                      className="w-full border rounded-lg px-3 py-2 text-sm"
                      placeholder={form.sale_type === 'percentage' ? '25' : '5.00'}
                    />
                  </div>
                )}
                {form.sale_type !== 'none' && form.sale_value && form.price && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sale Price Preview</label>
                    <div className="flex items-center gap-2 h-10">
                      <span className="text-gray-400 line-through">${Number(form.price).toFixed(2)}</span>
                      <span className="text-lg font-semibold text-green-600">
                        ${form.sale_type === 'percentage' 
                          ? (Number(form.price) * (1 - Number(form.sale_value) / 100)).toFixed(2)
                          : (Number(form.price) - Number(form.sale_value)).toFixed(2)
                        }
                      </span>
                      <span className="text-sm text-green-600 font-medium">
                        ({form.sale_type === 'percentage' 
                          ? `${form.sale_value}% off`
                          : `$${form.sale_value} off`
                        })
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.active}
                  onChange={(e) => setForm({ ...form, active: e.target.checked })}
                  className="rounded text-brown-warm"
                />
                <span className="text-sm text-gray-700">Active (visible on website)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                  className="rounded text-brown-warm"
                />
                <span className="text-sm text-gray-700">Featured</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.bestseller}
                  onChange={(e) => setForm({ ...form, bestseller: e.target.checked })}
                  className="rounded text-brown-warm"
                />
                <span className="text-sm text-gray-700">Bestseller</span>
              </label>
            </div>
          </div>
        )}

        {/* Tab: Media */}
        {activeTab === 'media' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (Google Drive) *</label>
              <input
                type="url"
                value={form.cover_url}
                onChange={(e) => setForm({ ...form, cover_url: convertDriveUrl(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                placeholder="https://drive.google.com/file/d/..."
              />
              {form.cover_url && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border">
                  <p className="text-xs text-gray-500 mb-2">Preview:</p>
                  <div className="relative w-40 h-60">
                    <img
                      src={form.cover_url}
                      alt="Cover preview"
                      className="w-full h-full object-cover rounded-lg border-2 border-brown-warm/20 shadow-md"
                    />
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Recommended: 400×600px (2:3 ratio)</p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF File (Google Drive) *</label>
              <input
                type="url"
                value={form.pdf_url}
                onChange={(e) => setForm({ ...form, pdf_url: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                placeholder="https://drive.google.com/file/d/..."
              />
              <p className="text-xs text-gray-500 mt-1">Upload PDF to Google Drive and paste the share link here</p>
            </div>
          </div>
        )}

        {/* Tab: Content */}
        {activeTab === 'content' && (
          <div className="space-y-8">
            {/* Item Details */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Item Details (Detailed Description)
              </label>
              <RichTextEditor
                content={form.long_description}
                onChange={(content) => setForm({ ...form, long_description: content })}
                placeholder="Write detailed introduction about the pattern... (supports H1-H4, bold, italic, links, images)"
              />
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accordion Sections Content</h3>
              <p className="text-sm text-gray-500 mb-6">Customize the content for each accordion section on the product page</p>

              {/* This Pattern Includes */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  This Pattern Includes
                </label>
                <p className="text-xs text-gray-500 mb-2">Add items included in this pattern (one per line)</p>
                <textarea
                  rows={5}
                  value={form.whats_included.join('\n')}
                  onChange={(e) => setForm({ ...form, whats_included: e.target.value.split('\n').filter(i => i.trim()) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent font-mono"
                  placeholder="Detailed, beginner-friendly instructions with clear illustrations&#10;Nested Print at Home Files (US Letter + A4 compatible) with layers&#10;Large Format File (A0/Copyshop)&#10;Projector File&#10;Detailed Video Tutorial"
                />
              </div>

              {/* What You Need - Tools */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What You Need - Tools
                </label>
                <p className="text-xs text-gray-500 mb-2">Add tools needed for this pattern (one per line)</p>
                <textarea
                  rows={6}
                  value={form.tools_needed.join('\n')}
                  onChange={(e) => setForm({ ...form, tools_needed: e.target.value.split('\n').filter(t => t.trim()) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent font-mono"
                  placeholder="Sewing machine&#10;Embroidery needle&#10;Erasable pen&#10;Turning tool (chopstick)&#10;Fabric scissors&#10;Paper scissors&#10;Ruler&#10;Pins&#10;Iron"
                />
              </div>

              {/* What You Need - Materials */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What You Need - Materials
                </label>
                <p className="text-xs text-gray-500 mb-2">Add materials needed for this pattern (one per line)</p>
                <textarea
                  rows={6}
                  value={form.materials_needed.join('\n')}
                  onChange={(e) => setForm({ ...form, materials_needed: e.target.value.split('\n').filter(m => m.trim()) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent font-mono"
                  placeholder="Sewing thread (100% polyester, same color as fabric)&#10;Stuffing&#10;Embroidery thread (for face embroidery)&#10;Decorative buttons&#10;Fabric (cotton, linen, etc.)"
                />
              </div>

              {/* Sizing */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizing Information
                </label>
                <textarea
                  rows={3}
                  value={form.sizing_info}
                  onChange={(e) => setForm({ ...form, sizing_info: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                  placeholder="This pattern includes multiple size options to fit your needs. Detailed measurements are provided in the PDF file."
                />
              </div>

              {/* Suitable Fabrics */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suitable Fabrics
                </label>
                <textarea
                  rows={3}
                  value={form.suitable_fabrics}
                  onChange={(e) => setForm({ ...form, suitable_fabrics: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                  placeholder="Recommended fabrics: Cotton, linen, canvas, denim, or any medium-weight woven fabric. Avoid stretchy fabrics unless specified in the pattern."
                />
              </div>

              {/* Delivery */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Information
                </label>
                <textarea
                  rows={4}
                  value={form.delivery_info}
                  onChange={(e) => setForm({ ...form, delivery_info: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                  placeholder="Instant Download&#10;&#10;Your files will be available to download once payment is confirmed.&#10;&#10;Instant download items don't accept returns, exchanges or cancellations. Please contact us about any problems with your order."
                />
              </div>

              {/* Disclaimer */}
              <div className="max-w-3xl mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disclaimer
                </label>
                <textarea
                  rows={4}
                  value={form.disclaimer}
                  onChange={(e) => setForm({ ...form, disclaimer: e.target.value })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                  placeholder="This is a digital sewing pattern, not a finished product. You will receive a PDF file to download and print. No physical items will be shipped.&#10;&#10;All patterns are for personal use only. Commercial use requires a separate license."
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab: Reviews */}
        {activeTab === 'reviews' && (
          <div className="max-w-3xl">
            <ReviewsManager
              reviews={reviews}
              onChange={setReviews}
              ratingAvg={form.rating_avg}
              ratingCount={form.rating_count}
              salesCount={form.sales_count}
              onStatsChange={(stats) => setForm({ 
                ...form, 
                rating_avg: stats.ratingAvg,
                rating_count: stats.ratingCount,
                sales_count: stats.salesCount
              })}
            />
          </div>
        )}

        {/* Tab: SEO */}
        {activeTab === 'seo' && (
          <div className="max-w-3xl">
            <SEOPanel
              title={form.title}
              description={form.description}
              slug={form.slug}
              coverUrl={form.cover_url}
              metaTitle={form.meta_title}
              metaDescription={form.meta_description}
              ogImageUrl={form.og_image_url}
              keywords={form.keywords}
              onMetaTitleChange={(v) => setForm({ ...form, meta_title: v })}
              onMetaDescriptionChange={(v) => setForm({ ...form, meta_description: v })}
              onOgImageChange={(v) => setForm({ ...form, og_image_url: v })}
              onKeywordsChange={(v) => setForm({ ...form, keywords: v })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
