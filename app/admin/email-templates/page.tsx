'use client'

import { useState, useEffect } from 'react'
import { Mail, Plus, Edit, Trash2, FileText } from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  slug: string
  description: string | null
  subject: string
  type: string
  active: boolean
  created_at: string
  updated_at: string
}

export default function EmailTemplatesPage() {
  const [templates, setTemplates] = useState<EmailTemplate[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)

  useEffect(() => {
    fetchTemplates()
  }, [])

  const fetchTemplates = async () => {
    try {
      const response = await fetch('/api/admin/email-templates')
      const data = await response.json()
      if (data.success) {
        setTemplates(data.templates)
      }
    } catch (error) {
      console.error('Error fetching templates:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingTemplate(null)
    setShowModal(true)
  }

  const handleEdit = (template: EmailTemplate) => {
    setEditingTemplate(template)
    setShowModal(true)
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading font-semibold text-black mb-2">
            Email Templates
          </h1>
          <p className="text-gray">
            Create and manage email templates
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 bg-brown-warm text-white px-4 py-2 rounded-lg hover:bg-brown-dark transition-smooth"
        >
          <Plus className="w-4 h-4" />
          New Template
        </button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center py-12 text-gray">
            Loading...
          </div>
        ) : templates.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray">
            No templates found. Create your first template!
          </div>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="bg-white rounded-lg border border-beige p-6 hover:shadow-md transition-smooth">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-cream rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-brown-warm" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{template.name}</h3>
                    <span className="text-xs text-gray capitalize">{template.type}</span>
                  </div>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  template.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {template.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              
              <p className="text-sm text-gray mb-4 line-clamp-2">
                {template.description || template.subject}
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEdit(template)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 border border-beige rounded-lg hover:bg-cream transition-smooth text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button className="px-3 py-2 border border-red-200 rounded-lg hover:bg-red-50 transition-smooth text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-heading font-semibold text-black mb-6">
              {editingTemplate ? 'Edit Template' : 'New Template'}
            </h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Template Name
                </label>
                <input
                  type="text"
                  defaultValue={editingTemplate?.name}
                  placeholder="e.g., Welcome Email"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  defaultValue={editingTemplate?.slug}
                  placeholder="e.g., welcome-email"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Type
                </label>
                <select
                  defaultValue={editingTemplate?.type || 'newsletter'}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
                >
                  <option value="newsletter">Newsletter</option>
                  <option value="welcome">Welcome</option>
                  <option value="order_confirmation">Order Confirmation</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  defaultValue={editingTemplate?.subject}
                  placeholder="e.g., Welcome to Morii Heartmade!"
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  HTML Content
                </label>
                <textarea
                  defaultValue={editingTemplate ? '' : ''}
                  placeholder="Enter HTML content..."
                  rows={10}
                  className="w-full px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-wont font-mono text-sm"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="active"
                  defaultChecked={editingTemplate?.active ?? true}
                  className="w-4 h-4 text-brown-warm rounded border-beige focus:ring-brown-warm"
                />
                <label htmlFor="active" className="text-sm text-gray">
                  Active
                </label>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-beige rounded-lg hover:bg-cream transition-smooth"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-brown-warm text-white rounded-lg hover:bg-brown-dark transition-smooth"
                >
                  Save Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
