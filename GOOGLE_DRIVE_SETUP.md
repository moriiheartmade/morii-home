# Hướng dẫn sử dụng Google Drive cho Morii Home

## Tại sao dùng Google Drive?

- **Tiết kiệm chi phí**: Không tốn quota Vercel và Supabase (chỉ dùng gói free)
- **Dung lượng lớn**: Google Drive free có 15GB
- **Tốc độ tốt**: Google CDN nhanh và ổn định
- **Dễ quản lý**: Upload/xóa file trực tiếp trên Drive

## Cách lấy link Google Drive

### 1. Upload file lên Google Drive
- Vào https://drive.google.com
- Upload ảnh bìa pattern (400x600px khuyến nghị) hoặc file PDF

### 2. Chia sẻ file
- Click chuột phải vào file → **Get link** (hoặc **Chia sẻ**)
- Chọn **Anyone with the link** (Bất kỳ ai có link)
- Click **Copy link**

### 3. Sử dụng link
Link bạn copy sẽ có dạng:
```
https://drive.google.com/file/d/1ABC123xyz_FILE_ID_HERE/view?usp=sharing
```

**Paste link này vào admin dashboard**, hệ thống sẽ tự động convert sang dạng tối ưu!

## Ví dụ

### Link gốc (từ Google Drive):
```
https://drive.google.com/file/d/1ABC123xyz456/view?usp=sharing
```

### Link sau khi convert (tự động):
```
https://drive.google.com/thumbnail?id=1ABC123xyz456&sz=w1000
```

## Lưu ý quan trọng

1. **Đảm bảo file được public**: Chọn "Anyone with the link" khi chia sẻ
2. **Không xóa file trên Drive**: Nếu xóa, ảnh sẽ không hiển thị trên website
3. **Tổ chức thư mục**: Nên tạo folder riêng cho từng loại (covers, preview images, PDFs)
4. **Kích thước ảnh khuyến nghị**:
   - Ảnh bìa pattern: 400x600px (tỷ lệ 2:3)
   - Ảnh preview: 800x600px
   - File PDF: Không giới hạn

## Cấu trúc thư mục đề xuất

```
Morii Home/
├── Pattern Covers/
│   ├── simple-apron-cover.jpg
│   ├── tote-bag-cover.jpg
│   └── ...
├── Pattern PDFs/
│   ├── simple-apron-pattern.pdf
│   ├── tote-bag-pattern.pdf
│   └── ...
├── Preview Images/
│   ├── simple-apron-preview-1.jpg
│   ├── simple-apron-preview-2.jpg
│   └── ...
└── Tools/
    ├── sewing-machine.jpg
    └── ...
```

## Troubleshooting

### Ảnh không hiển thị?
1. Kiểm tra link có public chưa
2. Thử mở link trong trình duyệt ẩn danh
3. Đảm bảo file chưa bị xóa trên Drive

### Link không convert được?
- Đảm bảo link có dạng `drive.google.com/file/d/...`
- Không dùng link rút gọn (bit.ly, goo.gl)
- Copy link trực tiếp từ Google Drive

## Hỗ trợ

Nếu gặp vấn đề, liên hệ: hello@moriiheartmade.com
