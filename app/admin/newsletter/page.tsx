'use client'

import { useState, useEffect } from 'react'
import { Mail, Users, Plus, Trash2, Search, Filter } from 'lucide-react'

interface Subscriber {
  id: string
  email: string
  name: string | null
  active: boolean
  verified: boolean
  email_count: number
  created_at: string
  unsubscribed_at: string | null
}

export default function NewsletterPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

  useEffect(() => {
    fetchSubscribers()
  }, [])

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/admin/newsletter/subscribers')
      const data = await response.json()
      if (data.success) {
        setSubscribers(data.subscribers)
      }
    } catch (error) {
      console.error('Error fetching subscribers:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = sub.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (sub.name && sub.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesFilter = filter === 'all' || 
                          (filter === 'active' && sub.active) ||
                          (filter === 'inactive' && !sub.active)
    return matchesSearch && matchesFilter
  })

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.active).length,
    verified: subscribers.filter(s => s.verified).length,
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-black mb-2">
          Newsletter Management
        </h1>
        <p className="text-gray">
          Manage email subscribers and campaigns
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 border border-beige">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-5 h-5 text-brown-warm" />
            <span className="text-sm text-gray">Total Subscribers</span>
          </div>
          <div className="text-3xl font-heading font-semibold text-black">
            {stats.total}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-beige">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-brown-warm" />
            <span className="text-sm text-gray">Active</span>
          </div>
          <div className="text-3xl font-heading font-semibold text-black">
            {stats.active}
          </div>
        </div>
        <div className="bg-white rounded-lg p-6 border border-beige">
          <div className="flex items-center gap-3 mb-2">
            <Filter className="w-5 h-5 text-brown-warm" />
            <span className="text-sm text-gray">Verified</span>
          </div>
          <div className="text-3xl font-heading font-semibold text-black">
            {stats.verified}
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray" />
          <input
            type="text"
            placeholder="Search subscribers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
          className="px-4 py-2 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-lg border border-beige overflow-hidden">
        <table className="w-full">
          <thead className="bg-cream">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Emails Sent</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Subscribed</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-black">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray">
                  Loading...
                </td>
              </tr>
            ) : filteredSubscribers.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-gray">
                  No subscribers found
                </td>
              </tr>
            ) : (
              filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-t border-beige">
                  <td className="px-6 py-4 text-sm text-black">{subscriber.email}</td>
                  <td className="px-6 py-4 text-sm text-gray">{subscriber.name || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      subscriber.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {subscriber.active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray">{subscriber.email_count}</td>
                  <td className="px-6 py-4 text-sm text-gray">
                    {new Date(subscriber.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
