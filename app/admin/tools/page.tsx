import { getSupabaseAdmin, supabaseQueryWithTimeout } from '@/lib/db'
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

// Mock data for tools
const mockTools = [
  {
    id: '1',
    title: 'Brother Electronic Sewing Machine',
    description: 'The most basic machine I recommend. This is a perfectly adequate machine to start your sewing journey.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71VRNHd6sTL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00JBKVN8S',
    active: true,
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Steam Iron',
    description: 'High-quality iron with powerful steam, helps iron fabric quickly and efficiently.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61vJd+YoSQL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00L9J4L0A',
    active: true,
    created_at: '2024-01-14T00:00:00Z',
  },
  {
    id: '3',
    title: 'Self-Healing Cutting Mat',
    description: 'Professional cutting mat 24" x 36", self-healing surface protects your rotary cutter blade.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71xQHqL8VoL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07MPB4GN4',
    active: true,
    created_at: '2024-01-13T00:00:00Z',
  },
  {
    id: '4',
    title: 'Rotary Cutter',
    description: 'Essential tool for cutting fabric accurately and efficiently. Sharp blade, easy to replace.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61KvVHqW8LL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B000BNLLHW',
    active: true,
    created_at: '2024-01-12T00:00:00Z',
  },
  {
    id: '5',
    title: 'Fabric Scissors',
    description: 'Sharp 8-inch fabric scissors with ergonomic design for easy and precise cutting.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61Y+pqGqVyL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00006IFN9',
    active: true,
    created_at: '2024-01-11T00:00:00Z',
  },
  {
    id: '6',
    title: 'Quilting Ruler',
    description: 'Clear ruler with precise markings, ideal for measuring and cutting fabric accurately.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71nJRGQdJeL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B001AQXZZ8',
    active: true,
    created_at: '2024-01-10T00:00:00Z',
  },
  {
    id: '7',
    title: 'Fabric Pins',
    description: 'Box of 100 high-quality pins with round heads, won\'t damage fabric.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71zKqNvLGgL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00114PXJW',
    active: true,
    created_at: '2024-01-09T00:00:00Z',
  },
  {
    id: '8',
    title: 'Wristband Pin Cushion',
    description: 'Convenient wrist strap to hold pins, keeps pins within reach while sewing.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71QqXVqLvPL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B016TJHNHS',
    active: true,
    created_at: '2024-01-08T00:00:00Z',
  },
  {
    id: '9',
    title: 'Measuring Tape',
    description: 'Flexible 60-inch tape measure, dual-sided with inches and cm, essential for measuring.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71hqYXqLVbL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B0001DSIVY',
    active: true,
    created_at: '2024-01-07T00:00:00Z',
  },
  {
    id: '10',
    title: 'Multi-Color Thread Set',
    description: 'Set of 24 multi-color thread spools, high quality, suitable for all sewing projects.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/81vZKGZ8YnL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07FKDXNQD',
    active: true,
    created_at: '2024-01-06T00:00:00Z',
  },
  {
    id: '11',
    title: 'Fabric Marking Pens',
    description: 'Set of self-erasing fabric markers, leaves no trace, ideal for marking seam lines.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71kQqXqLvPL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07FKDXNQD',
    active: false,
    created_at: '2024-01-05T00:00:00Z',
  },
  {
    id: '12',
    title: 'Thread Snips',
    description: 'Compact 4-inch scissors, sharp, perfect for cutting excess thread and small details.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/61Y+pqGqVyL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B000YZVGQQ',
    active: true,
    created_at: '2024-01-04T00:00:00Z',
  },
]

export default async function AdminToolsPage() {
  const supabase = getSupabaseAdmin()

  const result = await supabaseQueryWithTimeout(
    supabase
      .from('tools')
      .select('*')
      .order('category', { ascending: true })
      .order('created_at', { ascending: false }),
    5000,
    { data: [] }
  )
  const toolsData = result.data

  // Use mock data if no data from Supabase
  const tools = toolsData && toolsData.length > 0 ? toolsData : mockTools

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-black">Sewing Tools</h1>
          <p className="text-gray mt-1">Manage Amazon affiliate tools and supplies</p>
        </div>
        <Link
          href="/admin/tools/new"
          className="flex items-center gap-2 bg-brown-warm text-white px-4 py-2 rounded-lg hover:bg-brown-warm/90 transition-smooth"
        >
          <Plus className="w-5 h-5" />
          Add Tool
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
                <th className="px-6 py-3 font-medium">Amazon Link</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tools && tools.length > 0 ? (
                tools.map((tool: any) => (
                  <tr key={tool.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 bg-beige rounded-lg overflow-hidden">
                        {tool.image_url ? (
                          <img
                            src={tool.image_url}
                            alt={tool.title}
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
                      <div className="font-medium text-black">{tool.title}</div>
                      <div className="text-sm text-gray truncate max-w-xs">
                        {tool.description?.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-beige text-charcoal">
                        {tool.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {tool.amazon_url ? (
                        <a
                          href={tool.amazon_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-brown-warm hover:text-brown-dark"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View
                        </a>
                      ) : (
                        <span className="text-sm text-gray">No link</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${
                          tool.active
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {tool.active ? (
                          <>
                            <Eye className="w-3 h-3" /> Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3" /> Hidden
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/admin/tools/${tool.id}/edit`}
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
                    No tools yet. Click "Add Tool" to create your first one.
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
