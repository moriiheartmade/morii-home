import { getSupabaseAdmin } from '@/lib/db'
import { Package, ShoppingCart, CheckCircle, Clock, TrendingUp } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export const revalidate = 0

export default async function AdminDashboardPage() {
  const supabase = getSupabaseAdmin()

  // Fetch stats
  const [
    { count: totalPatterns },
    { count: totalOrdersCompleted },
    { count: totalOrdersPending },
    { data: revenueData },
    { data: recentOrders },
  ] = await Promise.all([
    supabase.from('patterns').select('*', { count: 'exact', head: true }).eq('active', true),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'completed'),
    supabase.from('orders').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('orders').select('amount').eq('status', 'completed'),
    supabase
      .from('orders')
      .select('*, order_items(*, patterns(title))')
      .order('created_at', { ascending: false })
      .limit(10),
  ])

  const totalRevenue = revenueData?.reduce((sum, order) => sum + Number(order.amount || 0), 0) || 0

  const stats = [
    {
      label: 'Total Patterns',
      value: totalPatterns || 0,
      icon: Package,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      label: 'Completed Orders',
      value: totalOrdersCompleted || 0,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-50',
    },
    {
      label: 'Pending Orders',
      value: totalOrdersPending || 0,
      icon: Clock,
      color: 'text-yellow-600 bg-yellow-50',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(totalRevenue),
      icon: TrendingUp,
      color: 'text-purple-600 bg-purple-50',
    },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-black">Dashboard</h1>
        <p className="text-gray mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-lg border border-beige p-6">
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

      {/* Recent Orders */}
      <div className="bg-white rounded-lg border border-beige">
        <div className="p-6 border-b border-beige">
          <h2 className="text-xl font-heading font-semibold text-black">Recent Orders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Order Code</th>
                <th className="px-6 py-3 font-medium">Email</th>
                <th className="px-6 py-3 font-medium">Items</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders && recentOrders.length > 0 ? (
                recentOrders.map((order: any) => (
                  <tr key={order.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm font-medium text-purple-600">
                        {order.order_code}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">{order.email}</td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {order.order_items?.length || 0} items
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-black">
                      {formatCurrency(Number(order.amount || 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                          order.status === 'completed'
                            ? 'bg-green-50 text-green-700'
                            : order.status === 'pending'
                            ? 'bg-yellow-50 text-yellow-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray">
                    No orders yet
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
