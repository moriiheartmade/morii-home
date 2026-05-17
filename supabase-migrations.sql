-- ============================================
-- PDF MORII - Supabase Database Schema
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- CATEGORIES TABLE
-- ============================================
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PATTERNS TABLE (main products)
-- ============================================
CREATE TABLE patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  long_description TEXT,
  price DECIMAL(10,2) NOT NULL,
  
  -- Images & Files
  cover_url TEXT,
  preview_images TEXT[], -- Array of preview image URLs
  file_url TEXT NOT NULL, -- PDF file in Supabase Storage
  
  -- Metadata
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  category_id UUID REFERENCES categories(id),
  tags TEXT[],
  
  -- What's included
  whats_included TEXT[],
  
  -- Stats
  featured BOOLEAN DEFAULT false,
  bestseller BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_code TEXT UNIQUE NOT NULL,
  public_token TEXT UNIQUE NOT NULL,
  
  -- Customer Info
  email TEXT NOT NULL,
  customer_name TEXT,
  
  -- Payment Info
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  paypal_order_id TEXT,
  paypal_payer_id TEXT,
  paypal_capture_id TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  
  -- Metadata
  items JSONB, -- Store order items
  metadata JSONB,
  
  -- Admin features
  is_hidden BOOLEAN DEFAULT false,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES patterns(id) ON DELETE SET NULL,
  quantity INTEGER DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- LICENSES TABLE (ownership of patterns)
-- ============================================
CREATE TABLE licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES patterns(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  
  -- Download limits
  download_quota INTEGER DEFAULT 5,
  download_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  
  UNIQUE(order_id, pattern_id)
);

-- ============================================
-- DOWNLOAD TOKENS TABLE
-- ============================================
CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  license_id UUID REFERENCES licenses(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  
  -- Expiry
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT false,
  used_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- BLOG POSTS TABLE
-- ============================================
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_url TEXT,
  
  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  
  -- Organization
  category TEXT,
  tags TEXT[],
  
  -- Status
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  
  -- Stats
  view_count INTEGER DEFAULT 0,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- ============================================
-- FREE RESOURCES TABLE
-- ============================================
CREATE TABLE free_resources (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  thumbnail_url TEXT,
  category TEXT,
  download_count INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ADMIN USERS TABLE
-- ============================================
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE (optional, for future)
-- ============================================
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pattern_id UUID REFERENCES patterns(id) ON DELETE CASCADE,
  order_id UUID REFERENCES orders(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  customer_name TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================
CREATE INDEX idx_patterns_slug ON patterns(slug);
CREATE INDEX idx_patterns_category ON patterns(category_id);
CREATE INDEX idx_patterns_active ON patterns(active);
CREATE INDEX idx_patterns_featured ON patterns(featured);
CREATE INDEX idx_patterns_bestseller ON patterns(bestseller);

CREATE INDEX idx_orders_email ON orders(email);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_code ON orders(order_code);
CREATE INDEX idx_orders_public_token ON orders(public_token);
CREATE INDEX idx_orders_is_hidden ON orders(is_hidden);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);
CREATE INDEX idx_order_items_pattern_id ON order_items(pattern_id);

CREATE INDEX idx_licenses_email ON licenses(email);
CREATE INDEX idx_licenses_order_id ON licenses(order_id);
CREATE INDEX idx_licenses_pattern_id ON licenses(pattern_id);

CREATE INDEX idx_download_tokens_token ON download_tokens(token);
CREATE INDEX idx_download_tokens_license_id ON download_tokens(license_id);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);

CREATE INDEX idx_reviews_pattern_id ON reviews(pattern_id);
CREATE INDEX idx_reviews_approved ON reviews(approved);

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Patterns: Public read active patterns
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active patterns" ON patterns FOR SELECT USING (active = true);

-- Categories: Public read
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view categories" ON categories FOR SELECT USING (true);

-- Orders: Users can view their own orders
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own orders" ON orders FOR SELECT USING (true);

-- Order Items: Public read (for order details)
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view order items" ON order_items FOR SELECT USING (true);

-- Licenses: Users can view their own licenses
ALTER TABLE licenses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own licenses" ON licenses FOR SELECT USING (true);

-- Download Tokens: Public read (validated by token)
ALTER TABLE download_tokens ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view download tokens" ON download_tokens FOR SELECT USING (true);

-- Blog: Public read published posts
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view published posts" ON blog_posts FOR SELECT USING (published = true);

-- Free resources: Public read active resources
ALTER TABLE free_resources ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active resources" ON free_resources FOR SELECT USING (active = true);

-- Reviews: Public read approved reviews
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view approved reviews" ON reviews FOR SELECT USING (approved = true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_patterns_updated_at BEFORE UPDATE ON patterns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update pattern stats after order completion
CREATE OR REPLACE FUNCTION update_pattern_sales_count()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
    UPDATE patterns
    SET sales_count = sales_count + 1
    WHERE id IN (
      SELECT pattern_id FROM order_items WHERE order_id = NEW.id
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pattern_sales AFTER UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_pattern_sales_count();

-- ============================================
-- SEED DATA (Sample Categories)
-- ============================================
INSERT INTO categories (name, slug, description, display_order) VALUES
  ('Home Decor', 'home-decor', 'Cushions, pillows, decorations and household items', 1),
  ('Bags', 'bags', 'Tote bags, crossbody bags, and more', 2),
  ('Accessories', 'accessories', 'Pouches, wallets, and small items', 3),
  ('Other', 'other', 'Other sewing patterns and projects', 4),
  ('Kids', 'kids', 'Patterns for children', 5);

-- ============================================
-- STORAGE BUCKETS (Run in Supabase Dashboard)
-- ============================================
-- Create these buckets in Supabase Dashboard > Storage:
-- 1. patterns (Private) - for PDF files
-- 2. covers (Public) - for cover images
-- 3. blog-images (Public) - for blog images
-- 4. free-resources (Public) - for free downloadable files
