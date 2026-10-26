# Hướng dẫn Tạo GitHub Personal Access Token (Classic)

## Bước 1: Đăng nhập GitHub

Truy cập: https://github.com và đăng nhập với tài khoản của bạn

## Bước 2: Vào Settings

1. Click vào avatar ở góc phải trên cùng
2. Chọn **Settings** từ dropdown menu

## Bước 3: Tạo Personal Access Token

1. Ở menu bên trái, scroll xuống và chọn **Developer settings**
2. Chọn **Personal access tokens** > **Tokens (classic)**
3. Click nút **Generate new token (classic)**

## Bước 4: Cấu hình Token

### Token name
- Nhập tên: `morii-home-deploy` hoặc bất kỳ tên nào bạn muốn

### Expiration
- Chọn thời gian hết hạn (khuyên dùng: **90 days** hoặc **No expiration**)

### Select scopes (Quan trọng - phải chọn đúng)
Check các ô sau:
- ✅ **repo** (Full control of private repositories)
  - repo:status
  - repo_deployment
  - public_repo
  - repo:invite
  - security_events

### Generate token
- Click nút xanh **Generate token** ở dưới cùng

## Bước 5: Copy Token

⚠️ **QUAN TRỌNG:** Token chỉ hiển thị một lần duy nhất!

1. Copy token (dạng: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`)
2. Lưu lại ở nơi an toàn

## Bước 6: Cập nhật Git Remote

Quay lại terminal tại project `/Users/admin/Documents/pdf-morii`:

```bash
# Thay YOUR_NEW_TOKEN bằng token bạn vừa copy
git remote set-url origin https://YOUR_NEW_TOKEN@github.com/moriiheartmade/morii-home.git
```

Ví dụ:
```bash
git remote set-url origin https://ghp_abc123xyz456@github.com/moriiheartmade/morii-home.git
```

## Bước 7: Push Code

```bash
git push origin main
```

---

## ✅ Sau khi push thành công

Code của bạn sẽ có trên GitHub tại: https://github.com/moriiheartmade/morii-home

Sau đó tiếp tục theo hướng dẫn trong `DEPLOYMENT_GUIDE.md` để deploy lên Vercel.

---

## 🔒 Lưu ý bảo mật

- ❌ KHÔNG bao giờ commit token vào code
- ❌ KHÔNG chia sẻ token với người khác
- ✅ Lưu token ở nơi an toàn (password manager)
- ✅ Nếu token bị lộ, revoke ngay lập tức trong GitHub Settings
