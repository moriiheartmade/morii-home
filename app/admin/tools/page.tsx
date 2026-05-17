import { getSupabaseAdmin } from '@/lib/db'
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminToolsPage() {
  const supabase = getSupabaseAdmin()

  const { data: tools, error } = await supabase
    .from('tools')
    .select('*')
    .order('category', { ascending: true })
    .order('created_at', { ascending: false })

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
