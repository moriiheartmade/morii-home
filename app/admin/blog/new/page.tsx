'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Send, FileText, Image as ImageIcon, Search } from 'lucide-react'
import Link from 'next/link'
import { convertDriveUrl } from '@/lib/utils'

const tabs = [
  { id: 'basic', label: 'Basic Info', icon: FileText },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'seo', label: 'SEO', icon: Search },
]

export default function NewBlogPostPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('basic')
  
  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published: false,
    featured: false,
    // SEO
    meta_title: '',
    meta_description: '',
    keywords: [] as string[],
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleSubmit = async (status: 'draft' | 'published') => {
    if (!form.title || !form.excerpt) {
      alert('Please fill in all required fields')
      setActiveTab('basic')
      return
    }

    setLoading(true)
    try {
      // TODO: Implement API call
      alert('Blog post created successfully!')
      router.push('/admin/blog')
    } catch (err: any) {
      alert('Error: ' + (err.message || 'Could not create blog post'))
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/blog" className="p-2 text-gray-400 hover:text-brown-warm hover:bg-cream rounded-lg transition">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">New Blog Post</h1>
            <p className="text-sm text-gray-500">Create a new blog article</p>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Post Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })}
                  className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                  placeholder="e.g., Getting Started with Sewing"
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
                <p className="text-xs text-gray-400 mt-1">URL: moriiheartmade.com/blog/{form.slug || 'slug'}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt *</label>
              <textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                placeholder="Brief summary (shown on blog listing)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image (Google Drive)</label>
              <input
                type="url"
                value={form.cover_image}
                onChange={(e) => setForm({ ...form, cover_image: convertDriveUrl(e.target.value) })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
                placeholder="https://drive.google.com/file/d/..."
              />
              {form.cover_image && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4 border">
                  <p className="text-xs text-gray-500 mb-2">Preview:</p>
                  <div className="relative w-full h-48">
                    <img
                      src={form.cover_image}
                      alt="Cover preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded text-brown-warm"
                />
                <span className="text-sm text-gray-700">Published (visible on website)</span>
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
            </div>
          </div>
        )}

        {/* Tab: Content */}
        {activeTab === 'content' && (
          <div className="space-y-6 max-w-4xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Content</label>
              <textarea
                rows={20}
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent font-mono"
                placeholder="Write your blog content here... (supports Markdown)"
              />
              <p className="text-xs text-gray-500 mt-1">Supports Markdown formatting</p>
            </div>
          </div>
        )}

        {/* Tab: SEO */}
        {activeTab === 'seo' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
              <input
                type="text"
                value={form.meta_title}
                onChange={(e) => setForm({ ...form, meta_title: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Leave empty to use post title"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
              <textarea
                rows={3}
                value={form.meta_description}
                onChange={(e) => setForm({ ...form, meta_description: e.target.value })}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                placeholder="Leave empty to use excerpt"
              />
              <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
