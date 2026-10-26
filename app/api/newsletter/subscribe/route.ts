import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, name } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Check if email already exists
    const { data: existingSubscriber } = await supabase
      .from('email_subscribers')
      .select('id, active')
      .eq('email', email)
      .single()

    if (existingSubscriber) {
      // If exists but inactive, reactivate
      if (!existingSubscriber.active) {
        await supabase
          .from('email_subscribers')
          .update({ 
            active: true, 
            unsubscribed_at: null,
            updated_at: new Date().toISOString()
          })
          .eq('email', email)
      }

      return NextResponse.json({
        success: true,
        message: 'Email already subscribed',
      })
    }

    // Insert new subscriber
    const { error: insertError } = await supabase
      .from('email_subscribers')
      .insert({
        email,
        name: name || null,
        active: true,
        verified: false,
        source: 'homepage',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })

    if (insertError) {
      console.error('Error inserting subscriber:', insertError)
      return NextResponse.json(
        { error: 'Failed to subscribe' },
        { status: 500 }
      )
    }

    // Send welcome email
    try {
      await sendWelcomeEmail(email, name || undefined)
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError)
      // Don't fail the subscription if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed',
    })
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
