# ✅ TRANG CHI TIẾT SẢN PHẨM - REDESIGN

**Hoàn thành**: May 13, 2026 at 10:45 PM

---

## 🎯 YÊU CẦU

### 1. Accordion Sections (giống sydgraham.com)
- Mô tả các mục dạng accordion
- Click vào mũi tên xuống → hiển thị nội dung
- Smooth animation
- Reference: https://sydgraham.com/products/connie-tree-skirt-sewing-pattern

### 2. Reviews Section (giống Ebook Mind)
- Đánh giá sao
- Lượt mua
- User reviews
- Rating breakdown
- Reference: https://ebookmind.com/products/mini-home-style-mo-hinh-ngach-thue-theo-gio-ket-hop-giat-ui

### 3. Ảnh vuông
- Product images aspect ratio: 1:1 (square)

---

## ✅ GIẢI PHÁP

### 1. Product Accordion Component

**File**: `/components/product-accordion.tsx`

**Features**:
- ✅ Client component với useState
- ✅ Expandable/collapsible sections
- ✅ Smooth animations (300ms)
- ✅ ChevronDown icon rotates 180°
- ✅ First section open by default
- ✅ Support string or array content
- ✅ Hover effect on headers

**Sections**:
1. **Description** - Long description or short description
2. **What's Included** - Bullet list of included items
3. **Details** - Difficulty, category, format, language
4. **Shipping & Returns** - Digital product policy

**Design**:
```
┌─────────────────────────────────┐
│ Description              ▼      │ ← Click to expand
├─────────────────────────────────┤
│ Content here...                 │
│ • Bullet points                 │
│ • Or paragraphs                 │
└─────────────────────────────────┘
```

### 2. Product Reviews Component

**File**: `/components/product-reviews.tsx`

**Features**:
- ✅ Rating summary (large number + stars)
- ✅ Rating breakdown (5-star to 1-star bars)
- ✅ Sales count display
- ✅ Individual reviews list
- ✅ User avatars (circle with icon)
- ✅ Review dates
- ✅ Star ratings per review
- ✅ "View All Reviews" button
- ✅ Mock reviews if none provided

**Layout**:
```
┌─────────────────────────────────────────┐
│         Customer Reviews                │
│                                         │
│  4.8    ★★★★★ ████████ 80%            │
│ stars   ★★★★☆ ████░░░░ 15%   287      │
│ 67 rev  ★★★☆☆ ░░░░░░░░  3%   Sold     │
│         ★★☆☆☆ ░░░░░░░░  1%            │
│         ★☆☆☆☆ ░░░░░░░░  1%            │
│                                         │
│ ┌─────────────────────────────────────┐│
│ │ 👤 Sarah M.        ★★★★★  Feb 15   ││
│ │ Amazing pattern! Very detailed...   ││
│ └─────────────────────────────────────┘│
│ ┌─────────────────────────────────────┐│
│ │ 👤 Emily R.        ★★★★★  Feb 10   ││
│ │ Love this pattern! The instructions ││
│ └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

### 3. Updated Product Detail Page

**File**: `/app/(storefront)/products/[slug]/page.tsx`

**Changes**:
- ✅ Import ProductAccordion & ProductReviews
- ✅ Replace static sections with accordion
- ✅ Add reviews section below
- ✅ Square images (aspect-square)
- ✅ Clean, organized layout

**Structure**:
```
┌──────────────┬──────────────────┐
│              │  Category        │
│   Square     │  Title (large)   │
│   Image      │  Rating ★★★★★    │
│   (1:1)      │  Price (large)   │
│              │  Difficulty      │
│   Preview    │  Description     │
│   Thumbs     │  Add to Cart     │
│              │                  │
│              │  ▼ Description   │
│              │  ▼ What's Incl.  │
│              │  ▼ Details       │
│              │  ▼ Shipping      │
└──────────────┴──────────────────┘
        Reviews Section
┌─────────────────────────────────┐
│  4.8 ★★★★★  67 reviews  287 sold│
│  Rating bars                    │
│  User reviews list              │
└─────────────────────────────────┘
```

---

## 🎨 DESIGN DETAILS

### Accordion Styling
```css
- Border: border-beige
- Rounded: rounded-lg
- Padding: p-4
- Hover: hover:bg-cream
- Icon: ChevronDown with rotate-180
- Animation: transition-all duration-300
- Max height: max-h-[1000px] when open
```

### Reviews Styling
```css
- Container: bg-white border border-beige rounded-lg p-6
- Rating number: text-5xl font-heading
- Stars: fill-brown-warm (filled), text-gray-light (empty)
- Progress bars: bg-beige (track), bg-brown-warm (fill)
- User avatar: bg-cream rounded-full with User icon
- Review cards: border-b border-beige
```

---

## 📊 COMPONENTS CREATED

### 1. ProductAccordion
**Props**:
```typescript
interface AccordionItem {
  title: string
  content: string | string[]
}

interface ProductAccordionProps {
  items: AccordionItem[]
}
```

**State**:
- `openIndex`: number | null (tracks which section is open)

**Methods**:
- `toggleAccordion(index)`: Open/close sections

### 2. ProductReviews
**Props**:
```typescript
interface Review {
  id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
}

interface ProductReviewsProps {
  rating_avg: number
  rating_count: number
  sales_count: number
  reviews?: Review[]
}
```

**Features**:
- Mock reviews if none provided (3 default reviews)
- Calculate rating percentages
- Display sales count
- Format dates

---

## ✅ CHECKLIST

- [x] Create ProductAccordion component
- [x] Create ProductReviews component
- [x] Update product detail page
- [x] Add accordion sections (4 sections)
- [x] Add reviews section
- [x] Fix image aspect ratio (square)
- [x] Import new components
- [x] Test accordion expand/collapse
- [x] Test reviews display
- [x] Responsive design

---

## 🧪 TEST

### 1. Product Detail Page
**URL**: http://localhost:3000/products/wallet-pattern

**Kiểm tra Accordion**:
- ✅ Click "Description" → Mở/đóng
- ✅ Click "What's Included" → Hiển thị bullet list
- ✅ Click "Details" → Hiển thị thông tin
- ✅ Click "Shipping & Returns" → Hiển thị policy
- ✅ Mũi tên xoay 180° khi mở
- ✅ Smooth animation

**Kiểm tra Reviews**:
- ✅ Rating: 4.8 ★★★★★
- ✅ Review count: 67 reviews
- ✅ Sales count: 445 sold
- ✅ Rating bars (5-star breakdown)
- ✅ 3 user reviews hiển thị
- ✅ User avatars
- ✅ Star ratings per review
- ✅ Dates formatted

**Kiểm tra Images**:
- ✅ Main image: Square (1:1)
- ✅ Preview thumbnails: Square

### 2. Test Other Products
```
http://localhost:3000/products/classic-tote-bag
http://localhost:3000/products/crossbody-bag-pattern
http://localhost:3000/products/simple-apron-pattern
```

**Expected**:
- ✅ All have accordion sections
- ✅ All have reviews section
- ✅ All have square images

---

## 🎊 HOÀN THÀNH!

**Trang chi tiết sản phẩm giờ có**:
✅ Accordion sections giống sydgraham.com
✅ Reviews section giống Ebook Mind
✅ Square product images (1:1)
✅ Professional, clean design
✅ Smooth animations
✅ Responsive layout

**Test ngay**: http://localhost:3000/products/wallet-pattern 🚀
