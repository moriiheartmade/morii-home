import { getSupabase } from '@/lib/db'
import Link from 'next/link'
import { Calendar, Clock } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { mockBlogPosts } from '@/lib/mock-data'

export const revalidate = 3600

export default async function BlogPage() {
  const supabase = getSupabase()

  const { data: postsData } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false })

  const { data: featuredPostData } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .eq('featured', true)
    .order('published_at', { ascending: false })
    .limit(1)
    .single()

  // Use mock data if Supabase returns no data
  const posts = postsData && postsData.length > 0 ? postsData : mockBlogPosts
  const featuredPost = featuredPostData || mockBlogPosts.find(p => p.featured)

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            Sewing Blog
          </h1>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            Tips, tutorials, and inspiration for your sewing projects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Post */}
        {featuredPost && (
          <Link href={`/blog/${featuredPost.slug}`} className="block mb-16 group">
            <div className="grid lg:grid-cols-2 gap-8 bg-cream rounded-lg overflow-hidden hover-scale">
              <div className="relative aspect-video lg:aspect-auto bg-beige">
                {featuredPost.cover_url ? (
                  <img
                    src={featuredPost.cover_url}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-light">
                    No image
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-brown-warm text-white text-sm font-medium px-3 py-1.5 rounded">
                  Featured
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                {featuredPost.category && (
                  <span className="text-sm font-medium text-brown-warm mb-2">
                    {featuredPost.category}
                  </span>
                )}
                <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-4 group-hover:text-brown-warm transition-smooth">
                  {featuredPost.title}
                </h2>
                <p className="text-gray text-lg mb-4 line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(featuredPost.published_at || featuredPost.created_at)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    5 min read
                  </span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Blog Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post: any) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-white border border-beige rounded-lg overflow-hidden hover-scale hover:shadow-md transition-smooth"
              >
                {/* Image */}
                <div className="relative aspect-video bg-beige">
                  {post.cover_url ? (
                    <img
                      src={post.cover_url}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-light">
                      No image
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {post.category && (
                    <span className="text-xs font-medium text-brown-warm mb-2 inline-block">
                      {post.category}
                    </span>
                  )}
                  <h3 className="font-heading text-xl font-semibold text-black mb-2 line-clamp-2 group-hover:text-brown-warm transition-smooth">
                    {post.title}
                  </h3>
                  <p className="text-gray text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.published_at || post.created_at)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray text-lg">No blog posts yet.</p>
            <p className="text-sm text-gray-light mt-2">Check back soon for sewing tips and tutorials!</p>
          </div>
        )}
      </div>
    </div>
  )
}
