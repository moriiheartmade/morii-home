import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    const { data: subscribers, error } = await supabase
      .from('email_subscribers')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching subscribers:', error)
      return NextResponse.json(
        { error: 'Failed to fetch subscribers' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      subscribers: subscribers || [],
    })
  } catch (error) {
    console.error('Subscribers fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
