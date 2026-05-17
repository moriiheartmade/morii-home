import { getSupabaseAdmin } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import { DollarSign, CheckCircle, XCircle, Clock, Search } from 'lucide-react'

export const revalidate = 0

// Mock payments data
const mockPayments = [
  {
    id: '1',
    order_id: 'ORD-2024-001',
    customer_email: 'customer1@example.com',
    amount: 45.97,
    status: 'completed',
    payment_method: 'stripe',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    order_id: 'ORD-2024-002',
    customer_email: 'customer2@example.com',
    amount: 12.99,
    status: 'completed',
    payment_method: 'paypal',
    created_at: '2024-01-14T15:20:00Z',
  },
  {
    id: '3',
    order_id: 'ORD-2024-003',
    customer_email: 'customer3@example.com',
    amount: 27.98,
    status: 'pending',
    payment_method: 'stripe',
    created_at: '2024-01-14T09:15:00Z',
  },
  {
    id: '4',
    order_id: 'ORD-2024-004',
    customer_email: 'customer4@example.com',
    amount: 14.99,
    status: 'failed',
    payment_method: 'stripe',
    created_at: '2024-01-13T14:45:00Z',
  },
]

export default async function AdminPaymentsPage() {
  const supabase = getSupabaseAdmin()

  const { data: paymentsData } = await supabase
    .from('payments')
    .select('*, orders(order_code, customer_email)')
    .order('created_at', { ascending: false })

  // Use mock data if Supabase returns no data
  const payments = paymentsData && paymentsData.length > 0 ? paymentsData : mockPayments

  // Calculate stats
  const totalRevenue = payments
    .filter((p: any) => p.status === 'completed')
    .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0)
  
  const completedCount = payments.filter((p: any) => p.status === 'completed').length
  const pendingCount = payments.filter((p: any) => p.status === 'pending').length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-green-50 text-green-700">
            <CheckCircle className="w-3 h-3" /> Completed
          </span>
        )
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-yellow-50 text-yellow-700">
            <Clock className="w-3 h-3" /> Pending
          </span>
        )
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded bg-red-50 text-red-700">
            <XCircle className="w-3 h-3" /> Failed
          </span>
        )
      default:
        return <span className="text-xs text-gray-500">{status}</span>
    }
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-semibold text-black">Payments</h1>
        <p className="text-gray mt-1">Track and manage payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-beige p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray">Total Revenue</p>
              <p className="text-2xl font-bold text-black mt-1">{formatCurrency(totalRevenue)}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-beige p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray">Completed</p>
              <p className="text-2xl font-bold text-black mt-1">{completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-beige p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray">Pending</p>
              <p className="text-2xl font-bold text-black mt-1">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg border border-beige">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray border-b bg-gray-50">
                <th className="px-6 py-3 font-medium">Order ID</th>
                <th className="px-6 py-3 font-medium">Customer</th>
                <th className="px-6 py-3 font-medium">Amount</th>
                <th className="px-6 py-3 font-medium">Method</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {payments && payments.length > 0 ? (
                payments.map((payment: any) => (
                  <tr key={payment.id} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <span className="font-medium text-black">{payment.order_id || payment.orders?.order_code}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {payment.customer_email || payment.orders?.customer_email}
                    </td>
                    <td className="px-6 py-4 font-semibold text-black">
                      {formatCurrency(Number(payment.amount || 0))}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-beige text-charcoal capitalize">
                        {payment.payment_method}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray">
                      {new Date(payment.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray">
                    No payments yet.
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
