# 🚀 Morii Home - Deployment Checklist

## ✅ Hoàn thành các tính năng

### 1. **Patterns (Sản phẩm PDF)**
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ Rich text editor cho mô tả chi tiết
- ✅ Multiple images upload (cover + preview images)
- ✅ Difficulty levels (Beginner/Intermediate/Advanced)
- ✅ **Sale/Discount system** (% hoặc $ off)
- ✅ Reviews management (rating, comments, stats)
- ✅ SEO optimization (meta title, description, keywords, OG image)
- ✅ Accordion sections (What's Included, Tools, Materials, Sizing, Fabrics, Delivery, Disclaimer)
- ✅ Active/Featured/Bestseller flags

### 2. **Blog Posts**
- ✅ CRUD operations
- ✅ Cover images
- ✅ Markdown content support
- ✅ Published/Featured flags
- ✅ SEO optimization

### 3. **Tools (Amazon Affiliate)**
- ✅ List view trong admin
- ⚠️ **Chưa có:** Create/Edit form (cần tạo nếu muốn quản lý từ dashboard)

### 4. **E-commerce Features**
- ✅ Shopping cart
- ✅ PayPal integration
- ✅ Order management
- ✅ Download system với token & quota
- ✅ Email automation (order confirmation, download links)

### 5. **Admin Dashboard**
- ✅ Authentication (username/password)
- ✅ Statistics overview
- ✅ Patterns management
- ✅ Blog management
- ✅ Tools management
- ✅ Orders management

---

## 📋 Các bước để website hoạt động chính thức

### **BƯỚC 1: Chuẩn bị Database (Supabase)**

#### 1.1. Tạo Supabase Project
1. Truy cập https://supabase.com
2. Tạo project mới
3. Lấy các thông tin:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (Settings → API)

#### 1.2. Tạo Database Tables
Chạy các SQL scripts sau trong Supabase SQL Editor:

```sql
-- Table: categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: patterns
CREATE TABLE patterns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  category TEXT,
  difficulty TEXT DEFAULT 'beginner',
  price DECIMAL(10,2) NOT NULL,
  sale_type TEXT DEFAULT 'none',
  sale_value DECIMAL(10,2),
  cover_url TEXT,
  pdf_url TEXT,
  preview_images TEXT[],
  whats_included TEXT[],
  tools_needed TEXT[],
  materials_needed TEXT[],
  sizing_info TEXT,
  suitable_fabrics TEXT,
  delivery_info TEXT,
  disclaimer TEXT,
  active BOOLEAN DEFAULT true,
  featured BOOLEAN DEFAULT false,
  bestseller BOOLEAN DEFAULT false,
  rating_avg DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  og_image_url TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: blog_posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  meta_title TEXT,
  meta_description TEXT,
  keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: tools
CREATE TABLE tools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  image_url TEXT,
  amazon_url TEXT,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',
  paypal_order_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: order_items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES patterns(id),
  title TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: download_tokens
CREATE TABLE download_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  token TEXT UNIQUE NOT NULL,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  pattern_id UUID REFERENCES patterns(id),
  download_count INTEGER DEFAULT 0,
  max_downloads INTEGER DEFAULT 5,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE patterns ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Public can view active patterns" ON patterns
  FOR SELECT USING (active = true);

CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Public can view active tools" ON tools
  FOR SELECT USING (active = true);
```

#### 1.3. Setup Storage Buckets (nếu dùng Supabase Storage)
1. Tạo bucket `patterns` cho PDF files
2. Tạo bucket `images` cho cover images
3. Set public access policies

---

### **BƯỚC 2: Cấu hình PayPal**

#### 2.1. Tạo PayPal Business Account
1. Truy cập https://developer.paypal.com
2. Tạo app mới trong Dashboard
3. Lấy credentials:
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
4. Chọn mode:
   - `sandbox` cho testing
   - `live` cho production

#### 2.2. Test PayPal Integration
- Sử dụng PayPal Sandbox accounts để test
- Verify webhook notifications hoạt động

---

### **BƯỚC 3: Cấu hình Gmail (Email Automation)**

#### 3.1. Tạo Gmail App Password
1. Truy cập Google Account Settings
2. Security → 2-Step Verification → App Passwords
3. Tạo app password mới
4. Copy password (16 ký tự)

#### 3.2. Cấu hình Email Templates
- Order confirmation email
- Download link email
- Password reset (nếu có user accounts)

---

### **BƯỚC 4: Setup Environment Variables**

Tạo file `.env.local` với các giá trị sau:

```bash
# ============================================
# 1. SUPABASE (Database & Storage)
# ============================================
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# ============================================
# 2. PAYPAL (Payment Gateway)
# ============================================
PAYPAL_CLIENT_ID=AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=ELxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_MODE=live
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# ============================================
# 3. APP SETTINGS
# ============================================
NEXT_PUBLIC_APP_URL=https://moriihome.com
NEXT_PUBLIC_DOMAIN=moriihome.com

# Download Settings
DOWNLOAD_TOKEN_TTL_HOURS=48
DOWNLOAD_QUOTA_DEFAULT=5

# ============================================
# 4. GMAIL (Email Automation)
# ============================================
GMAIL_USER=moriiheartmade@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# ============================================
# 5. ADMIN AUTHENTICATION
# ============================================
NEXT_PUBLIC_ADMIN_USERNAME=admin_morii
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here

# ============================================
# 6. GOOGLE ANALYTICS (Optional)
# ============================================
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

---

### **BƯỚC 5: Deploy lên Vercel**

#### 5.1. Chuẩn bị Repository
```bash
# Initialize git (nếu chưa có)
git init
git add .
git commit -m "Initial commit"

# Push to GitHub
git remote add origin https://github.com/yourusername/morii-home.git
git push -u origin main
```

#### 5.2. Deploy trên Vercel
1. Truy cập https://vercel.com
2. Import GitHub repository
3. Add Environment Variables (copy từ `.env.local`)
4. Deploy!

#### 5.3. Cấu hình Domain
1. Trong Vercel Dashboard → Settings → Domains
2. Add custom domain: `moriihome.com`
3. Update DNS records theo hướng dẫn Vercel

---

### **BƯỚC 6: Testing & QA**

#### 6.1. Functional Testing
- [ ] Tạo pattern mới từ admin
- [ ] Upload images và PDF
- [ ] Test sale/discount display
- [ ] Add to cart → Checkout
- [ ] PayPal payment flow
- [ ] Nhận email confirmation
- [ ] Download PDF với token
- [ ] Test download quota limit

#### 6.2. SEO Testing
- [ ] Meta tags hiển thị đúng
- [ ] OG images hoạt động
- [ ] Sitemap.xml generate
- [ ] Google Search Console setup

#### 6.3. Performance Testing
- [ ] Lighthouse score > 90
- [ ] Image optimization
- [ ] Page load speed < 3s

---

### **BƯỚC 7: Post-Launch Tasks**

#### 7.1. Analytics & Monitoring
- [ ] Setup Google Analytics 4
- [ ] Setup error tracking (Sentry)
- [ ] Monitor server logs

#### 7.2. Marketing
- [ ] Submit to Google Search Console
- [ ] Create social media accounts
- [ ] Email marketing setup

#### 7.3. Backup & Security
- [ ] Setup automated Supabase backups
- [ ] Enable HTTPS (Vercel tự động)
- [ ] Regular security updates

---

## 🔧 Troubleshooting

### Issue: PayPal payment không hoạt động
- Kiểm tra `PAYPAL_MODE` đúng (sandbox/live)
- Verify webhook URL trong PayPal Dashboard
- Check PayPal credentials

### Issue: Email không gửi được
- Verify Gmail App Password
- Check 2-Step Verification enabled
- Test SMTP connection

### Issue: Download links hết hạn
- Kiểm tra `DOWNLOAD_TOKEN_TTL_HOURS`
- Verify token generation logic
- Check Supabase `download_tokens` table

---

## 📞 Support

Nếu gặp vấn đề, kiểm tra:
1. Vercel deployment logs
2. Supabase logs
3. Browser console errors
4. Network tab trong DevTools

---

## ✅ Final Checklist

- [ ] Database tables created
- [ ] Environment variables configured
- [ ] PayPal integration tested
- [ ] Email automation working
- [ ] Admin dashboard accessible
- [ ] Products displaying correctly
- [ ] Sale badges showing
- [ ] Checkout flow complete
- [ ] Download system working
- [ ] SEO optimized
- [ ] Domain configured
- [ ] SSL certificate active
- [ ] Analytics tracking
- [ ] Backup system enabled

**Khi tất cả đã xong → Website sẵn sàng hoạt động! 🎉**
