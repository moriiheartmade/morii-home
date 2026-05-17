'use client'

import { useState } from 'react'
import { Search, CheckCircle, AlertCircle, Info, Eye } from 'lucide-react'

interface SEOPanelProps {
  title: string
  description: string
  slug: string
  coverUrl: string
  metaTitle: string
  metaDescription: string
  ogImageUrl: string
  keywords: string[]
  onMetaTitleChange: (value: string) => void
  onMetaDescriptionChange: (value: string) => void
  onOgImageChange: (value: string) => void
  onKeywordsChange: (value: string[]) => void
}

export default function SEOPanel({
  title,
  description,
  slug,
  coverUrl,
  metaTitle,
  metaDescription,
  ogImageUrl,
  keywords,
  onMetaTitleChange,
  onMetaDescriptionChange,
  onOgImageChange,
  onKeywordsChange
}: SEOPanelProps) {
  const [keywordInput, setKeywordInput] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const autoGenerateMetaTitle = () => {
    const generated = `${title} - Morii Home`.slice(0, 60)
    onMetaTitleChange(generated)
  }

  const autoGenerateMetaDescription = () => {
    const generated = description.slice(0, 160)
    onMetaDescriptionChange(generated)
  }

  const autoGenerateOgImage = () => {
    onOgImageChange(coverUrl)
  }

  const autoGenerateKeywords = () => {
    const words = title.toLowerCase()
      .split(/\s+/)
      .filter(w => w.length > 3)
      .slice(0, 5)
    onKeywordsChange([...new Set([...keywords, ...words])])
  }

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      onKeywordsChange([...keywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const removeKeyword = (keyword: string) => {
    onKeywordsChange(keywords.filter(k => k !== keyword))
  }

  const calculateSEOScore = () => {
    let score = 0
    const checks: { label: string; passed: boolean; tip: string }[] = []

    const titleLen = (metaTitle || title).length
    const titleOk = titleLen >= 50 && titleLen <= 60
    checks.push({
      label: `Meta Title (${titleLen}/60 characters)`,
      passed: titleOk,
      tip: titleOk ? 'Good length' : titleLen < 50 ? 'Should be longer than 50 characters' : 'Should be shorter than 60 characters'
    })
    if (titleOk) score += 20

    const descLen = (metaDescription || description).length
    const descOk = descLen >= 150 && descLen <= 160
    checks.push({
      label: `Meta Description (${descLen}/160 characters)`,
      passed: descOk,
      tip: descOk ? 'Good length' : descLen < 150 ? 'Should be longer than 150 characters' : 'Should be shorter than 160 characters'
    })
    if (descOk) score += 20

    const hasImage = !!(ogImageUrl || coverUrl)
    checks.push({
      label: 'OG Image',
      passed: hasImage,
      tip: hasImage ? 'Has OG image' : 'Add OG image for better social sharing'
    })
    if (hasImage) score += 20

    const hasKeywords = keywords.length >= 3
    checks.push({
      label: `Keywords (${keywords.length} keywords)`,
      passed: hasKeywords,
      tip: hasKeywords ? 'Sufficient keywords' : 'Should have at least 3 keywords'
    })
    if (hasKeywords) score += 20

    const slugOk = !!(slug && !slug.includes(' ') && slug.length > 5)
    checks.push({
      label: 'URL Slug',
      passed: slugOk,
      tip: slugOk ? 'Good slug' : 'Slug should be longer than 5 characters and have no spaces'
    })
    if (slugOk) score += 20

    return { score, checks }
  }

  const { score, checks } = calculateSEOScore()

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 bg-green-50'
    if (s >= 60) return 'text-yellow-600 bg-yellow-50'
    return 'text-red-600 bg-red-50'
  }

  return (
    <div className="space-y-6">
      {/* SEO Score */}
      <div className="bg-gradient-to-r from-brown-warm/10 to-cream rounded-xl p-5 border border-brown-warm/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-brown-warm" />
            SEO Score
          </h3>
          <div className={`text-2xl font-bold px-4 py-1 rounded-full ${getScoreColor(score)}`}>
            {score}/100
          </div>
        </div>

        <div className="space-y-2">
          {checks.map((check, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {check.passed ? (
                <CheckCircle className="w-4 h-4 text-green-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-yellow-500" />
              )}
              <span className={check.passed ? 'text-gray-700' : 'text-gray-500'}>
                {check.label}
              </span>
              <span className="text-xs text-gray-400">— {check.tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Meta Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Meta Title</label>
          <button
            type="button"
            onClick={autoGenerateMetaTitle}
            className="text-xs text-brown-warm hover:text-brown-dark"
          >
            Auto-generate
          </button>
        </div>
        <input
          type="text"
          value={metaTitle}
          onChange={(e) => onMetaTitleChange(e.target.value)}
          placeholder={`${title} - Morii Home`}
          maxLength={60}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-1">{metaTitle.length}/60 characters</p>
      </div>

      {/* Meta Description */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Meta Description</label>
          <button
            type="button"
            onClick={autoGenerateMetaDescription}
            className="text-xs text-brown-warm hover:text-brown-dark"
          >
            Auto-generate
          </button>
        </div>
        <textarea
          rows={3}
          value={metaDescription}
          onChange={(e) => onMetaDescriptionChange(e.target.value)}
          placeholder={description.slice(0, 160)}
          maxLength={160}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
        />
        <p className="text-xs text-gray-400 mt-1">{metaDescription.length}/160 characters</p>
      </div>

      {/* OG Image */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">OG Image URL</label>
          <button
            type="button"
            onClick={autoGenerateOgImage}
            className="text-xs text-brown-warm hover:text-brown-dark"
          >
            Use cover image
          </button>
        </div>
        <input
          type="url"
          value={ogImageUrl}
          onChange={(e) => onOgImageChange(e.target.value)}
          placeholder={coverUrl || 'https://...'}
          className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
        />
      </div>

      {/* Keywords */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Keywords</label>
          <button
            type="button"
            onClick={autoGenerateKeywords}
            className="text-xs text-brown-warm hover:text-brown-dark"
          >
            Suggest from title
          </button>
        </div>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
            placeholder="Add keyword..."
            className="flex-1 border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brown-warm focus:border-transparent"
          />
          <button
            type="button"
            onClick={addKeyword}
            className="px-4 py-2 bg-brown-warm text-white rounded-lg text-sm hover:bg-brown-dark transition"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 rounded-full text-sm"
            >
              {kw}
              <button
                type="button"
                onClick={() => removeKeyword(kw)}
                className="text-gray-400 hover:text-red-500"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Google Preview */}
      <div>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-brown-warm"
        >
          <Eye className="w-4 h-4" />
          {showPreview ? 'Hide' : 'Show'} Google preview
        </button>

        {showPreview && (
          <div className="mt-3 p-4 bg-white border rounded-lg">
            <p className="text-xs text-gray-400 mb-2">Google Search Result Preview</p>
            <div className="text-blue-600 text-lg hover:underline cursor-pointer">
              {metaTitle || `${title} - Morii Home`}
            </div>
            <div className="text-green-700 text-sm">
              moriiheartmade.com › products › {slug}
            </div>
            <div className="text-gray-600 text-sm mt-1">
              {metaDescription || description.slice(0, 160)}
            </div>
          </div>
        )}
      </div>

      {/* Schema Preview */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Info className="w-4 h-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-700">Schema Markup (JSON-LD)</span>
        </div>
        <pre className="text-xs text-gray-500 overflow-auto max-h-32">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": title,
  "description": metaDescription || description.slice(0, 160),
  "image": ogImageUrl || coverUrl,
  "url": `https://moriiheartmade.com/products/${slug}`,
  "keywords": keywords.join(", ")
}, null, 2)}
        </pre>
      </div>
    </div>
  )
}
