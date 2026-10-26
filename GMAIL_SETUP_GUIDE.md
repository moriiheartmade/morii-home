# 📧 Hướng Dẫn Cấu Hình Gmail SMTP cho Email Tự Động

Hướng dẫn này sẽ giúp bạn cấu hình Gmail SMTP để hệ thống có thể gửi email tự động cho:
- Newsletter subscription (chào mừng khi user đăng ký)
- Order confirmation (gửi link tải PDF khi user mua hàng thành công)

---

## 🔧 Bước 1: Bật 2-Step Verification (Xác thực 2 bước)

Gmail yêu cầu bật 2-Step Verification trước khi có thể tạo App Password.

1. Truy cập: https://myaccount.google.com/security
2. Tìm mục **"2-Step Verification"** (Xác thực 2 bước)
3. Click **"Get started"** (Bắt đầu) và làm theo hướng dẫn
4. Verify bằng số điện thoại của bạn
5. Đảm bảo tính năng này đã được bật thành công

---

## 🔑 Bước 2: Tạo App Password (Mật khẩu ứng dụng)

App Password là mật khẩu đặc biệt dùng cho ứng dụng bên thứ ba (như hệ thống của bạn) để truy cập Gmail mà không cần dùng mật khẩu chính.

1. Truy cập: https://myaccount.google.com/apppasswords
2. Nếu được yêu cầu đăng nhập lại, hãy đăng nhập
3. Chọn ứng dụng: **"Mail"** (Thư)
4. Chọn thiết bị: **"Other (Custom name)"** (Khác (Tên tùy chỉnh))
5. Nhập tên: **"Morii Heartmade - Production"** (hoặc tên bạn muốn)
6. Click **"Generate"** (Tạo)
7. Google sẽ hiển thị một chuỗi 16 ký tự (format: `xxxx xxxx xxxx xxxx`)
8. **Copy chuỗi này và lưu trữ cẩn thận** - bạn sẽ chỉ thấy nó một lần duy nhất!

---

## ⚙️ Bước 3: Cấu hình Environment Variables

### Cách 1: Local Development (.env.local)

1. Mở file `.env.local` trong thư mục dự án
2. Thêm hoặc cập nhật các biến sau:

```env
# Gmail SMTP Configuration
GMAIL_USER=moriiheartmade@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

**Lưu ý:**
- `GMAIL_USER`: Email Gmail của bạn (ví dụ: moriiheartmade@gmail.com)
- `GMAIL_APP_PASSWORD`: App Password 16 ký tự bạn vừa tạo (bao gồm cả khoảng trắng)

### Cách 2: Production (Vercel)

Nếu bạn deploy trên Vercel:

1. Truy cập Vercel Dashboard: https://vercel.com/dashboard
2. Chọn project: **pdf-morii**
3. Vào **Settings** → **Environment Variables**
4. Add 2 biến môi trường:

```
GMAIL_USER=moriiheartmade@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

5. Click **"Save"**
6. **Redeploy project** để áp dụng thay đổi

---

## ✅ Bước 4: Kiểm Tra Cấu Hình

### Test Local Development

1. Khởi động dev server:
```bash
npm run dev
```

2. Test đăng ký newsletter ở trang chủ http://localhost:3000
3. Kiểm tra console logs để xem email đã gửi thành công chưa:

```
✅ [NODEMAILER] Gmail credentials found: moriiheartmade@gmail.com
✅ [NODEMAILER] Email sent successfully
```

### Test Production

1. Sau khi deploy, test trên production URL
2. Kiểm tra Vercel logs:
   - Vào Vercel Dashboard → Project → Logs
   - Tìm logs với keyword `[NODEMAILER]`

---

## 📊 Luồng Email System

### 1. Newsletter Subscription Flow

```
User nhập email → API /api/newsletter/subscribe
                → Lưu vào database (email_subscribers)
                → Gửi welcome email qua Gmail SMTP
                → ✅ User nhận email chào mừng
```

### 2. Order Confirmation Flow

```
User thanh toán thành công → API /api/orders/complete
                          → Update order status = 'completed'
                          → Tạo license & download tokens
                          → Gửi confirmation email qua Gmail SMTP
                          → ✅ User nhận email với link tải PDF
```

---

## 🎨 Email Templates

Hệ thống đã có sẵn các email templates:

### Welcome Email (Newsletter)
- Gửi ngay khi user đăng ký newsletter
- Nội dung: Chào mừng, giới thiệu về Morii Heartmade, link xem patterns

### Order Confirmation Email
- Gửi khi user thanh toán thành công
- Nội dung: Cảm ơn, danh sách patterns đã mua, link tải PDF

### Custom Templates
Bạn có thể tạo thêm templates tại:
- Dashboard: http://localhost:3000/admin/email-templates
- Hoặc production: https://yourdomain.com/admin/email-templates

---

## 📈 Quản Lý Email trong Dashboard

### 1. Newsletter Subscribers
- URL: http://localhost:3000/admin/newsletter
- Xem danh sách subscribers
- Lọc theo trạng thái (active/inactive)
- Tìm kiếm theo email hoặc tên

### 2. Email Templates
- URL: http://localhost:3000/admin/email-templates
- Tạo mới template
- Chỉnh sửa template có sẵn
- Kích hoạt/vô hóa template

---

## ⚠️ Gmail Limits & Best Practices

### Giới hạn Gmail
- **Daily limit:** ~500 emails/ngày
- **Rate limit:** ~100 emails/giờ
- **Spam protection:** Gmail có thể block nếu gửi quá nhiều

### Best Practices
1. **Dùng Gmail cho testing/small scale:** Phù hợp cho < 500 emails/ngày
2. **Larger scale:** Cân nhắc dùng email service chuyên nghiệp như:
   - SendGrid
   - Mailgun
   - Brevo (formerly Sendinblue)
   - AWS SES
3. **Monitor logs:** Theo dõi Vercel logs thường xuyên
4. **Handle bounces:** Xử lý email bị bounce/fail

---

## 🔐 Security Tips

1. **Không bao giờ commit .env.local vào Git**
   - File này đã được thêm vào .gitignore
2. **App Password an toàn hơn real password:**
   - Có thể revoke bất cứ lúc nào
   - Chỉ có quyền gửi email, không có quyền khác
3. **Store trong Vercel env vars:**
   - Vercel encrypts environment variables
   - Không hiển thị trong logs

---

## 🐛 Troubleshooting

### Error: "Invalid login"
**Nguyên nhân:** App Password sai hoặc 2-Step Verification chưa bật

**Giải pháp:**
1. Kiểm tra lại App Password (đúng 16 ký tự, bao gồm khoảng trắng)
2. Đảm bảo 2-Step Verification đã bật
3. Tạo lại App Password mới

### Error: "Daily limit exceeded"
**Nguyên nhân:** Đã gửi quá 500 emails trong ngày

**Giải pháp:**
1. Chờ 24h để reset limit
2. Hoặc dùng email Gmail khác
3. Hoặc chuyển sang email service chuyên nghiệp

### Email vào Spam
**Nguyên nhân:** Normal cho lần đầu gửi từ domain mới

**Giải pháp:**
1. User cần mark "Not spam" trong Gmail
2. Sau vài lần sẽ vào inbox tự động
3. Thêm SPF, DKIM records cho domain (nếu dùng custom domain)

### Email không gửi được
**Kiểm tra:**
1. Console logs có error gì?
2. GMAIL_USER và GMAIL_APP_PASSWORD có đúng không?
3. Network có ổn định không?

---

## 📝 Tóm Tắt Các Biến Môi Trường Cần Thiết

```env
# Gmail SMTP (BẮT BUỘC cho email tự động)
GMAIL_USER=moriiheartmade@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx

# App URL (cho link trong email)
NEXT_PUBLIC_APP_URL=https://moriipatterns.com
```

---

## 🎯 Next Steps

Sau khi cấu hình xong:

1. ✅ Test newsletter subscription trên trang chủ
2. ✅ Test order completion (có thể dùng PayPal sandbox)
3. ✅ Kiểm tra email nhận được
4. ✅ Xem logs trong Vercel (nếu deploy)
5. ✅ Quản lý subscribers trong Dashboard
6. ✅ Tạo custom email templates nếu cần

---

**Cần hỗ trợ?** Nếu gặp vấn đề, kiểm tra:
- Console logs (development)
- Vercel logs (production)
- Gmail App Password settings
- Environment variables configuration

**Setup xong là email sẽ tự động gửi!** 🎉
