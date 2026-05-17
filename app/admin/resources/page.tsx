import { getSupabaseAdmin } from '@/lib/db'
import { Plus, Edit, Trash2, Download, Eye, EyeOff, FileText } from 'lucide-react'
import Link from 'next/link'

export const revalidate = 0

export default async function AdminResourcesPage() {
  const supabase = getSupabaseAdmin()

  const { data: resources, error } = await supabase
    .from('free_resources')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-black">Free Resources</h1>
          <p className="text-gray mt-1">Manage free downloadable resources</p>
        </div>
        <Link
          href="/admin/resources/new"
          className="flex items-center gap-2 bg-brown-warm text-white px-4 py-2 rounded-lg hover:bg-brown-warm/90 transition-smooth"
        >
          <Plus className="w-5 h-5" />
          Add Resource
        </Link>
      </div>

      <div className="bg-white rounded-lg border border-beige">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Preview</th>
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Downloads</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {resources && resources.length > 0 ? (
                resources.map((resource: any) => (
                  <tr key={resource.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 bg-beige rounded-lg overflow-hidden flex items-center justify-center">
                        {resource.preview_image ? (
                          <img
                            src={resource.preview_image}
                            alt={resource.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FileText className="w-8 h-8 text-gray" />
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-black">{resource.title}</div>
                      <div className="text-sm text-gray truncate max-w-xs">
                        {resource.description?.substring(0, 50)}...
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-purple-50 text-purple-700 uppercase">
                        {resource.file_type || 'PDF'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm font-medium text-black">
                        <Download className="w-4 h-4 text-gray" />
                        {resource.download_count || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded ${
                          resource.active
                            ? 'bg-green-50 text-green-700'
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {resource.active ? (
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
                          href={`/admin/resources/${resource.id}/edit`}
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
                    No free resources yet. Click "Add Resource" to create your first one.
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
