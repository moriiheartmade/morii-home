# Hướng dẫn Deploy Website moriiheartmade.com

## ✅ Code đã sẵn sàng trên GitHub

Code đã được commit và sẵn sàng để push lên repository: `moriiheartmade/morii-home`

**Để push code lên GitHub, bạn cần cấu hình xác thực:**

### Cách 1: Sử dụng GitHub CLI (Khuyên dùng)
```bash
# Cài đặt GitHub CLI nếu chưa có
brew install gh

# Đăng nhập
gh auth login

# Push code
git push origin main
```

### Cách 2: Sử dụng SSH Key
```bash
# Tạo SSH key
ssh-keygen -t ed25519 -C "moriiheartmade@gmail.com"

# Thêm vào SSH agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

Sau đó thêm key vào GitHub: Settings > SSH and GPG Keys > New SSH Key

Thay đổi remote URL sang SSH:
```bash
git remote set-url origin git@github.com:moriiheartmade/morii-home.git
git push origin main
```

---

## 🚀 Bước 1: Kết nối GitHub với Vercel

1. **Đăng ký/Đăng nhập Vercel**
   - Truy cập: https://vercel.com
   - Đăng ký bằng tài khoản GitHub

2. **Import Repository**
   - Click "Add New" > "Project"
   - Chọn repository `moriiheartmade/morii-home` từ GitHub
   - Click "Import"

3. **Cấu hình Project**
   - **Framework Preset**: Next.js (tự động nhận diện)
   - **Root Directory**: `./` (mặc định)
   - **Build Command**: `npm run build` (tự động)
   - **Output Directory**: `.next` (tự động)
   - Click "Deploy"

---

## 🔧 Bước 2: Cấu hình Environment Variables trên Vercel

Sau khi import project, thêm các biến môi trường:

### 1. Supabase (Bắt buộc)
Vào Supabase dashboard: https://supabase.com/dashboard
- Tạo project mới hoặc sử dụng project hiện có
- Lấy thông tin từ Settings > API

Thêm vào Vercel (Settings > Environment Variables):
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. App Settings
```
NEXT_PUBLIC_APP_URL=https://moriiheartmade.com
NEXT_PUBLIC_DOMAIN=moriiheartmade.com
DOWNLOAD_TOKEN_TTL_HOURS=48
DOWNLOAD_QUOTA_DEFAULT=5
```

### 3. Gmail (Email)
```
GMAIL_USER=moriiheartmade@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

*Lưu ý: App Password lấy từ Google Account > Security > 2-Step Verification > App Passwords*

### 4. Admin Authentication
```
NEXT_PUBLIC_ADMIN_USERNAME=admin_morii
NEXT_PUBLIC_ADMIN_PASSWORD=your_secure_password_here
```

### 5. PayPal (Tùy chọn - nếu dùng)
```
PAYPAL_CLIENT_ID=AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_CLIENT_SECRET=ELxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
PAYPAL_MODE=sandbox
NEXT_PUBLIC_PAYPAL_CLIENT_ID=AYxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 6. Google Analytics (Tùy chọn)
```
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"..."}
```

**Sau khi thêm variables:**
- Click "Redeploy" để áp dụng thay đổi

---

## 🗄️ Bước 3: Cấu hình Supabase Database

### 1. Chạy Migration Script
Vào Supabase dashboard > SQL Editor > New Query

Chạy script từ file: `supabase-migrations.sql`

Hoặc chạy script email-only nếu chỉ cần tính năng email: `supabase-migrations-email-only.sql`

### 2. Kiểm tra Tables
Sau khi chạy migration, kiểm tra các tables:
- `patterns` - sản phẩm
- `orders` - đơn hàng
- `downloads` - download tokens
- `blog_posts` - bài viết blog
- `newsletter_subscribers` - newsletter subscribers
- `email_templates` - email templates

---

## 🌐 Bước 4: Cấu hình Custom Domain moriiheartmade.com

### 1. Thêm Domain trên Vercel
- Vào Project Settings > Domains
- Click "Add Domain"
- Nhập: `moriiheartmade.com`
- Click "Add"

### 2. Cấu hình DNS tại Nhà cung cấp Domain

Nếu bạn mua domain tại Namecheap, GoDaddy, Cloudflare, v.v.:

**Thêm A Records:**
```
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600 (hoặc mặc định)
```

**Thêm CNAME Records:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (hoặc mặc định)
```

### 3. Xác thực trên Vercel
- Vercel sẽ tự động kiểm tra DNS configuration
- Chờ 5-10 phút để DNS propagate
- Khi green checkmark xuất hiện, domain đã sẵn sàng

### 4. Force HTTPS
- Vercel tự động cấu hình SSL certificate
- Website sẽ tự động redirect sang HTTPS

---

## ✅ Kiểm tra Deployment

1. **Kiểm tra Vercel URL**
   - Vercel sẽ cung cấp URL: `https://morii-home.vercel.app`
   - Test xem website có hoạt động không

2. **Kiểm tra Custom Domain**
   - Truy cập: `https://moriiheartmade.com`
   - Kiểm tra tất cả pages: Home, Products, Blog, About, Tools

3. **Kiểm tra Admin Panel**
   - Truy cập: `https://moriiheartmade.com/admin`
   - Đăng nhập với username/password đã cấu hình
   - Test thêm sản phẩm, blog post

4. **Kiểm tra Email**
   - Test newsletter subscription
   - Test order completion email

---

## 🔍 Troubleshooting

### Build Error trên Vercel
- Kiểm tra Environment Variables đã đầy đủ chưa
- Xem Build Logs ở Vercel dashboard

### Database Connection Error
- Kiểm tra Supabase URL và Keys
- Đảm bảo đã chạy migration script

### Domain không hoạt động
- Kiểm tra DNS records
- Chờ DNS propagation (có thể mất 24h)
- Kiểm tra Vercel dashboard xem có error không

### Email không gửi được
- Kiểm tra Gmail App Password
- Đảm bảo 2FA đã bật trên Google Account
- Kiểm tra Vercel logs

---

## 📝 Checklist Trước Khi Deploy

- [ ] Code đã push lên GitHub
- [ ] Repository đã import vào Vercel
- [ ] Environment variables đã cấu hình đầy đủ
- [ ] Supabase migration đã chạy
- [ ] Custom domain đã thêm và DNS đã cấu hình
- [ ] SSL certificate đã active (tự động)
- [ ] Test website trên custom domain
- [ ] Test admin panel
- [ ] Test email functionality

---

## 🎉 Sau Khi Deploy

Website của bạn sẽ:
- ✅ Tự động deploy khi push code mới lên GitHub
- ✅ Có HTTPS miễn phí
- ✅ CDN toàn cầu từ Vercel
- ✅ Database từ Supabase
- ✅ Email từ Gmail/Nodemailer

**Mọi thay đổi code sau này:**
```bash
git add .
git commit -m "description"
git push origin main
```
Vercel sẽ tự động redeploy!
