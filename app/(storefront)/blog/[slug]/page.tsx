import { getSupabase, getSupabaseAdmin } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Calendar, ArrowLeft } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { mockBlogPosts } from '@/lib/mock-data'

export const revalidate = 3600

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const supabase = getSupabaseAdmin()

  const { data: postData, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  // Use mock data if Supabase returns no data
  let post = postData
  if (!post || error) {
    console.warn('Using mock data for blog post:', slug)
    post = mockBlogPosts.find(p => p.slug === slug)
  }

  if (!post) {
    notFound()
  }

  // Try to increment view count (will fail silently if using mock data)
  if (postData) {
    await supabase
      .from('blog_posts')
      .update({ view_count: (post.view_count || 0) + 1 })
      .eq('id', post.id)
  }

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-cream py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-brown-warm hover:text-brown-dark font-medium mb-6 transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>

          {post.category && (
            <span className="text-sm font-medium text-brown-warm mb-3 inline-block">
              {post.category}
            </span>
          )}

          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(post.published_at || post.created_at)}
            </span>
            <span>•</span>
            <span>{post.view_count || 0} views</span>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {post.cover_url && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
          <div className="relative aspect-video bg-beige rounded-lg overflow-hidden shadow-lg">
            <img
              src={post.cover_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <div
            className="text-gray leading-relaxed whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-beige">
            <h3 className="text-sm font-medium text-charcoal mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-cream text-gray text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {/* CTA */}
      <div className="bg-cream py-16 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-semibold text-black mb-4">
            Ready to Start Sewing?
          </h2>
          <p className="text-lg text-gray mb-8">
            Browse our collection of premium sewing patterns
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
          >
            View All Patterns
          </Link>
        </div>
      </div>
    </div>
  )
}
