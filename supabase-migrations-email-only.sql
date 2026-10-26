-- ============================================
-- PDF MORII - Email Tables Migration (Safe)
-- ============================================
-- Chạy script này nếu các bảng email đã tồn tại một phần
-- Script sẽ chỉ tạo các bảng chưa tồn tại

-- ============================================
-- EMAIL SUBSCRIBERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  
  -- Status
  active BOOLEAN DEFAULT true,
  verified BOOLEAN DEFAULT false,
  verification_token TEXT,
  
  -- Stats
  email_count INTEGER DEFAULT 0,
  last_sent_at TIMESTAMPTZ,
  
  -- Metadata
  source TEXT DEFAULT 'homepage', -- homepage, checkout, admin
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ
);

-- ============================================
-- EMAIL TEMPLATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  
  -- Template content
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  
  -- Template type
  type TEXT CHECK (type IN ('newsletter', 'welcome', 'order_confirmation', 'other')) DEFAULT 'newsletter',
  
  -- Status
  active BOOLEAN DEFAULT true,
  
  -- Metadata
  variables TEXT[], -- List of available variables like {{name}}, {{email}}
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMAIL CAMPAIGNS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
  
  -- Campaign settings
  subject TEXT NOT NULL,
  html_content TEXT NOT NULL,
  text_content TEXT,
  
  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'sending', 'sent', 'paused')),
  
  -- Stats
  total_recipients INTEGER DEFAULT 0,
  sent_count INTEGER DEFAULT 0,
  failed_count INTEGER DEFAULT 0,
  
  -- Scheduling
  scheduled_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  
  -- Metadata
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- EMAIL LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES email_campaigns(id) ON DELETE SET NULL,
  subscriber_id UUID REFERENCES email_subscribers(id) ON DELETE SET NULL,
  template_id UUID REFERENCES email_templates(id) ON DELETE SET NULL,
  
  -- Email details
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed', 'bounced')),
  
  -- Error details
  error_message TEXT,
  
  -- Metadata
  metadata JSONB,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  sent_at TIMESTAMPTZ
);

-- ============================================
-- INDEXES (Create if not exists)
-- ============================================

-- Email indexes
CREATE INDEX IF NOT EXISTS idx_email_subscribers_email ON email_subscribers(email);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_active ON email_subscribers(active);
CREATE INDEX IF NOT EXISTS idx_email_subscribers_verified ON email_subscribers(verified);

CREATE INDEX IF NOT EXISTS idx_email_templates_slug ON email_templates(slug);
CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(type);
CREATE INDEX IF NOT EXISTS idx_email_templates_active ON email_templates(active);

CREATE INDEX IF NOT EXISTS idx_email_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_email_campaigns_template_id ON email_campaigns(template_id);

CREATE INDEX IF NOT EXISTS idx_email_logs_campaign_id ON email_logs(campaign_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_subscriber_id ON email_logs(subscriber_id);
CREATE INDEX IF NOT EXISTS idx_email_logs_status ON email_logs(status);
CREATE INDEX IF NOT EXISTS idx_email_logs_created_at ON email_logs(created_at);

-- ============================================
-- RLS POLICIES (Enable if not already enabled)
-- ============================================

-- Email subscribers: Public can insert (for newsletter signup)
ALTER TABLE email_subscribers ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can insert subscribers" ON email_subscribers;
CREATE POLICY "Public can insert subscribers" ON email_subscribers FOR INSERT WITH CHECK (true);

-- Email templates: Admin only (no public access needed)
ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No public access to templates" ON email_templates;
CREATE POLICY "No public access to templates" ON email_templates FOR ALL USING (false);

-- Email campaigns: Admin only
ALTER TABLE email_campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No public access to campaigns" ON email_campaigns;
CREATE POLICY "No public access to campaigns" ON email_campaigns FOR ALL USING (false);

-- Email logs: Admin only
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "No public access to logs" ON email_logs;
CREATE POLICY "No public access to logs" ON email_logs FOR ALL USING (false);

-- ============================================
-- DONE
-- ============================================
-- Kiểm tra các bảng đã được tạo:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('email_subscribers', 'email_templates', 'email_campaigns', 'email_logs')
ORDER BY table_name;
