import { getSupabaseAdmin } from '@/lib/db'
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

// Mock blog posts
const mockPosts = [
  {
    id: '1',
    title: 'Getting Started with Sewing: A Beginner\'s Guide',
    slug: 'getting-started-with-sewing',
    excerpt: 'Learn the basics of sewing with this comprehensive guide for beginners.',
    content: 'Full content here...',
    cover_image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800',
    published: true,
    featured: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: '10 Essential Sewing Tools Every Maker Needs',
    slug: '10-essential-sewing-tools',
    excerpt: 'Discover the must-have tools that will make your sewing projects easier and more enjoyable.',
    content: 'Full content here...',
    cover_image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
    published: true,
    featured: false,
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '3',
    title: 'How to Choose the Right Fabric for Your Project',
    slug: 'choosing-right-fabric',
    excerpt: 'A complete guide to selecting the perfect fabric for different sewing projects.',
    content: 'Full content here...',
    cover_image: 'https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=800',
    published: false,
    featured: false,
    created_at: '2024-01-05T00:00:00Z',
  },
]

export default async function AdminBlogPage() {
  const supabase = getSupabaseAdmin()

  const { data: postsData, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false })
  
  // Use mock data if Supabase returns no data
  const posts = postsData && postsData.length > 0 ? postsData : mockPosts

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-black">Blog Posts</h1>
          <p className="text-gray mt-1">Manage your blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 bg-brown-warm text-white px-4 py-2 rounded-lg hover:bg-brown-warm/90 transition-smooth"
        >
          <Plus className="w-5 h-5" />
          New Post
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-beige">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Image</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts && posts.length > 0 ? (
                posts.map((post: any) => (
                  <tr key={post.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-20 h-14 bg-beige rounded-lg overflow-hidden">
                        {post.featured_image ? (
                          <img
                            src={post.featured_image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray text-xs">
                            No image
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{post.title}</div>
                      <div className="text-sm text-gray truncate max-w-xs">
                        {post.excerpt?.substring(0, 60)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-beige text-charcoal">
                        {post.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${
                          post.published
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {post.published ? (
                          <>
                            <Eye className="w-3 h-3" /> Published
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Draft
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray">
                        <Calendar className="w-4 h-4" />
                        {new Date(post.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/blog/${post.id}/edit`}
                          className="p-2 text-gray hover:text-brown-warm transition-smooth"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button className="p-2 text-gray hover:text-red-500 transition-smooth">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray">
                    No blog posts yet. Click "New Post" to create your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
