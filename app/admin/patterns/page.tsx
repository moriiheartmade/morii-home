import { getSupabaseAdmin } from '@/lib/db'
import { formatCurrency, convertDriveUrl } from '@/lib/utils'
import { Plus, Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { mockPatterns } from '@/lib/mock-data'

export const revalidate = 0

export default async function AdminPatternsPage() {
  const supabase = getSupabaseAdmin()

  const { data: patternsData, error } = await supabase
    .from('patterns')
    .select('*')
    .order('created_at', { ascending: false })
  
  // Use mock data if Supabase returns no data
  const patterns = patternsData && patternsData.length > 0 ? patternsData : mockPatterns

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-black">Patterns</h1>
          <p className="text-gray mt-1">Manage your PDF patterns</p>
        </div>
        <Link
          href="/admin/patterns/new"
          className="flex items-center gap-2 bg-brown-warm text-white px-4 py-2 rounded-lg hover:bg-brown-warm/90 transition-smooth"
        >
          <Plus className="w-5 h-5" />
          Add Pattern
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
                <th className="px-6 py-3 font-medium">Price</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patterns && patterns.length > 0 ? (
                patterns.map((pattern: any) => (
                  <tr key={pattern.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-20 bg-beige rounded-lg overflow-hidden">
                        {pattern.cover_url ? (
                          <img
                            src={convertDriveUrl(pattern.cover_url)}
                            alt={pattern.title}
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
                      <div className="font-medium text-black">{pattern.title}</div>
                      <div className="text-sm text-gray truncate max-w-xs">
                        {pattern.description?.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-beige text-charcoal">
                        {pattern.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-black">
                      {formatCurrency(Number(pattern.price || 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${
                          pattern.active
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {pattern.active ? (
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
                          href={`/admin/patterns/${pattern.id}/edit`}
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
                    No patterns yet. Click "Add Pattern" to create your first one.
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
