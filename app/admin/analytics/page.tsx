import { getSupabaseAdmin } from '@/lib/db'
import {
  ShoppingCart,
  CheckCircle,
  Clock,
  TrendingUp,
  Calendar,
  CalendarDays,
  CalendarRange,
  Trophy,
  DollarSign,
} from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export const revalidate = 0

export default async function PaymentAnalyticsPage() {
  const supabase = getSupabaseAdmin()

  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - now.getDay())
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const startOfYear = new Date(now.getFullYear(), 0, 1)

  // Fetch all stats in parallel
  const [
    { count: totalOrders },
    { count: completedOrders },
    { count: pendingOrders },
    { data: allRevenue },
    { data: todayRevenue },
    { data: weekRevenue },
    { data: monthRevenue },
    { data: yearRevenue },
    { data: revenueByProvider },
    { data: revenueByPattern },
  ] = await Promise.all([
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('amount').eq('status', 'completed'),
    supabase
      .from('orders')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startOfToday.toISOString()),
    supabase
      .from('orders')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startOfWeek.toISOString()),
    supabase
      .from('orders')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startOfMonth.toISOString()),
    supabase
      .from('orders')
      .select('amount')
      .eq('status', 'completed')
      .gte('created_at', startOfYear.toISOString()),
    supabase
      .from('orders')
      .select('amount, paypal_order_id')
      .eq('status', 'completed'),
    supabase
      .from('order_items')
      .select('unit_price, quantity, patterns(title, cover_url)')
      .not('patterns', 'is', null),
  ])

  const totalRevenue = allRevenue?.reduce((sum, o) => sum + Number(o.amount || 0), 0) || 0
  const todayRev = todayRevenue?.reduce((sum, o) => sum + Number(o.amount || 0), 0) || 0
  const weekRev = weekRevenue?.reduce((sum, o) => sum + Number(o.amount || 0), 0) || 0
  const monthRev = monthRevenue?.reduce((sum, o) => sum + Number(o.amount || 0), 0) || 0
  const yearRev = yearRevenue?.reduce((sum, o) => sum + Number(o.amount || 0), 0) || 0

  // Calculate revenue by provider
  const paypalRevenue = revenueByProvider?.reduce((sum, o) => sum + Number(o.amount || 0), 0) || 0

  // Calculate revenue by pattern
  const patternRevenue = new Map<string, { title: string; revenue: number; count: number; cover_url: string | null }>()
  revenueByPattern?.forEach((item: any) => {
    if (item.patterns) {
      const title = item.patterns.title
      const revenue = Number(item.unit_price || 0) * Number(item.quantity || 1)
      const existing = patternRevenue.get(title)
      if (existing) {
        existing.revenue += revenue
        existing.count += Number(item.quantity || 1)
      } else {
        patternRevenue.set(title, {
          title,
          revenue,
          count: Number(item.quantity || 1),
          cover_url: item.patterns.cover_url,
        })
      }
    }
  })

  const topPatterns = Array.from(patternRevenue.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10)

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders || 0,
      icon: ShoppingCart,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Completed Orders',
      value: completedOrders || 0,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Pending Orders',
      value: pendingOrders || 0,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50',
      highlight: true,
    },
    {
      label: 'Today',
      value: formatCurrency(todayRev),
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'This Week',
      value: formatCurrency(weekRev),
      icon: CalendarDays,
      color: 'text-teal-600 bg-teal-50',
    },
    {
      label: 'This Month',
      value: formatCurrency(monthRev),
      icon: CalendarRange,
      color: 'text-orange-600 bg-orange-50',
    },
    {
      label: 'This Year',
      value: formatCurrency(yearRev),
      icon: Trophy,
      color: 'text-pink-600 bg-pink-50',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-black">Payment Analytics</h1>
        <p className="text-gray mt-1">Detailed revenue and payment statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white rounded-lg border p-6 ${
              stat.highlight ? 'border-purple-200 ring-2 ring-purple-100' : 'border-beige'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="text-3xl font-heading font-semibold text-black mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue by Payment Provider */}
        <div className="bg-white rounded-lg border border-beige p-6">
          <h2 className="text-xl font-heading font-semibold text-black mb-6">
            Revenue by Payment Provider
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <DollarSign className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="font-medium text-black">PayPal</div>
                  <div className="text-sm text-gray">{completedOrders || 0} transactions</div>
                </div>
              </div>
              <div className="text-xl font-heading font-semibold text-black">
                {formatCurrency(paypalRevenue)}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-lg border border-beige p-6">
          <h2 className="text-xl font-heading font-semibold text-black mb-6">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray">Average Order Value</span>
              <span className="font-semibold text-black">
                {formatCurrency(completedOrders ? totalRevenue / completedOrders : 0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray">Conversion Rate</span>
              <span className="font-semibold text-black">
                {totalOrders ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray">Total Patterns Sold</span>
              <span className="font-semibold text-black">
                {topPatterns.reduce((sum, p) => sum + p.count, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by Pattern */}
      <div className="bg-white rounded-lg border border-beige">
        <div className="p-6 border-b border-beige">
          <h2 className="text-xl font-heading font-semibold text-black">Top Selling Patterns</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Pattern</th>
                <th className="px-6 py-3 font-medium">Sales</th>
                <th className="px-6 py-3 font-medium">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topPatterns.length > 0 ? (
                topPatterns.map((pattern, idx) => (
                  <tr key={idx} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-16 bg-beige rounded overflow-hidden flex-shrink-0">
                          {pattern.cover_url && (
                            <img
                              src={pattern.cover_url}
                              alt={pattern.title}
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <span className="font-medium text-black">{pattern.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">{pattern.count} sold</td>
                    <td className="px-6 py-4 text-sm font-semibold text-black">
                      {formatCurrency(pattern.revenue)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-gray">
                    No sales data yet
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
