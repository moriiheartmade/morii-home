import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { nanoid } from 'nanoid'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { order_code, paypal_order_id, paypal_payer_id, paypal_capture_id } = body

    if (!order_code) {
      return NextResponse.json(
        { error: 'Missing order_code' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Get order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select('*')
      .eq('order_code', order_code)
      .single()

    if (orderError || !order) {
      console.error('Order not found:', orderError)
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Check if already completed
    if (order.status === 'completed') {
      return NextResponse.json({
        success: true,
        message: 'Order already completed',
      })
    }

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: 'completed',
        paypal_order_id: paypal_order_id || null,
        paypal_payer_id: paypal_payer_id || null,
        paypal_capture_id: paypal_capture_id || null,
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', order.id)

    if (updateError) {
      console.error('Error updating order:', updateError)
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      )
    }

    // Get order items with pattern details
    const { data: orderItems, error: itemsError } = await supabase
      .from('order_items')
      .select('*, patterns(*)')
      .eq('order_id', order.id)

    if (itemsError) {
      console.error('Error fetching order items:', itemsError)
    }

    // Create licenses and download tokens
    if (orderItems && orderItems.length > 0) {
      for (const item of orderItems) {
        if (!item.pattern_id) continue

        // Create license
        const { data: license, error: licenseError } = await supabase
          .from('licenses')
          .insert({
            order_id: order.id,
            pattern_id: item.pattern_id,
            email: order.email,
            download_quota: 5,
            download_count: 0,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (licenseError) {
          console.error('Error creating license:', licenseError)
          continue
        }

        // Create download token
        const token = nanoid(32)
        const expiresAt = new Date()
        expiresAt.setHours(expiresAt.getHours() + 48) // 48 hours

        await supabase
          .from('download_tokens')
          .insert({
            license_id: license.id,
            token,
            expires_at: expiresAt.toISOString(),
            created_at: new Date().toISOString(),
          })
      }
    }

    // Send confirmation email
    try {
      const downloadItems = (orderItems || []).map((item: any) => ({
        title: item.patterns?.title || 'Pattern',
        downloadUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/download?order=${order_code}`,
        coverUrl: item.patterns?.cover_url,
      }))

      await sendOrderConfirmationEmail({
        toEmail: order.email,
        orderId: order.id,
        items: downloadItems,
        totalAmount: order.amount,
        publicToken: order.public_token,
        userName: order.customer_name || undefined,
      })

      console.log('✅ Order confirmation email sent to:', order.email)
    } catch (emailError) {
      console.error('Error sending confirmation email:', emailError)
      // Don't fail the order completion if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Order completed successfully',
    })
  } catch (error: any) {
    console.error('Order completion error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
