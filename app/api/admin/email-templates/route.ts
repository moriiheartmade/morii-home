import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    const { data: templates, error } = await supabase
      .from('email_templates')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching templates:', error)
      return NextResponse.json(
        { error: 'Failed to fetch templates' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      templates: templates || [],
    })
  } catch (error) {
    console.error('Templates fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, slug, description, subject, html_content, text_content, type, active, variables } = body

    if (!name || !slug || !subject || !html_content) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    const { data: template, error } = await supabase
      .from('email_templates')
      .insert({
        name,
        slug,
        description: description || null,
        subject,
        html_content,
        text_content: text_content || null,
        type: type || 'newsletter',
        active: active ?? true,
        variables: variables || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating template:', error)
      return NextResponse.json(
        { error: 'Failed to create template' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      template,
    })
  } catch (error) {
    console.error('Template creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
