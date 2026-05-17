# ✅ FIX LỖI CART CONTEXT

**Hoàn thành**: May 13, 2026 at 11:05 PM

---

## 🐛 LỖI

**Error Message**:
```
Module not found: Can't resolve '@/contexts/cart-context'
```

**Nguyên nhân**:
- Components sử dụng `useCart()` hook
- Nhưng chưa có file `/contexts/cart-context.tsx`
- Layout import sai path: `@/lib/cart-context`

---

## ✅ GIẢI PHÁP

### 1. Tạo Cart Context

**File**: `/contexts/cart-context.tsx`

**Features**:
- ✅ React Context với TypeScript
- ✅ localStorage persistence
- ✅ Add, remove, update quantity
- ✅ Clear cart
- ✅ Get total & count
- ✅ Client-side only (useEffect)

**Interface**:
```typescript
export interface CartItem {
  id: string
  slug: string
  title: string
  price: number
  cover_url: string | null
  quantity: number
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  getCartCount: () => number
}
```

**Methods**:

1. **addToCart(item)**
   - Nếu item đã có → tăng quantity
   - Nếu chưa có → thêm mới

2. **removeFromCart(id)**
   - Xóa item khỏi cart

3. **updateQuantity(id, quantity)**
   - Cập nhật quantity
   - Nếu quantity < 1 → remove

4. **clearCart()**
   - Xóa toàn bộ cart

5. **getCartTotal()**
   - Tính tổng tiền: sum(price × quantity)

6. **getCartCount()**
   - Đếm số items: sum(quantity)

### 2. Fix Layout Import

**File**: `/app/layout.tsx`

**Trước**:
```typescript
import { CartProvider } from '@/lib/cart-context'
```

**Sau**:
```typescript
import { CartProvider } from '@/contexts/cart-context'
```

---

## 📦 CART CONTEXT DETAILS

### localStorage Key
```
'morii-cart'
```

### Data Structure
```json
[
  {
    "id": "1",
    "slug": "wallet-pattern",
    "title": "Minimalist Wallet",
    "price": 10.99,
    "cover_url": "https://...",
    "quantity": 2
  },
  {
    "id": "2",
    "slug": "tote-bag",
    "title": "Classic Tote Bag",
    "price": 12.99,
    "cover_url": "https://...",
    "quantity": 1
  }
]
```

### State Management
```typescript
const [items, setItems] = useState<CartItem[]>([])
const [mounted, setMounted] = useState(false)

// Load from localStorage on mount
useEffect(() => {
  const savedCart = localStorage.getItem('morii-cart')
  if (savedCart) {
    setItems(JSON.parse(savedCart))
  }
  setMounted(true)
}, [])

// Save to localStorage on change
useEffect(() => {
  if (mounted) {
    localStorage.setItem('morii-cart', JSON.stringify(items))
  }
}, [items, mounted])
```

---

## 🔄 USAGE

### In Components

```typescript
'use client'

import { useCart } from '@/contexts/cart-context'

export default function MyComponent() {
  const { 
    items, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    getCartTotal,
    getCartCount 
  } = useCart()

  // Add to cart
  const handleAdd = () => {
    addToCart({
      id: '1',
      slug: 'wallet-pattern',
      title: 'Minimalist Wallet',
      price: 10.99,
      cover_url: 'https://...',
      quantity: 1,
    })
  }

  // Remove from cart
  const handleRemove = (id: string) => {
    removeFromCart(id)
  }

  // Update quantity
  const handleUpdate = (id: string, qty: number) => {
    updateQuantity(id, qty)
  }

  return (
    <div>
      <p>Cart: {getCartCount()} items</p>
      <p>Total: ${getCartTotal().toFixed(2)}</p>
    </div>
  )
}
```

---

## ✅ CHECKLIST

- [x] Create `/contexts/cart-context.tsx`
- [x] Define CartItem interface
- [x] Define CartContextType interface
- [x] Implement CartProvider
- [x] Implement useCart hook
- [x] Add localStorage persistence
- [x] Implement addToCart method
- [x] Implement removeFromCart method
- [x] Implement updateQuantity method
- [x] Implement clearCart method
- [x] Implement getCartTotal method
- [x] Implement getCartCount method
- [x] Fix layout import path
- [x] Test cart functionality

---

## 🧪 TEST

### 1. Add to Cart
**URL**: http://localhost:3000/products/wallet-pattern

**Steps**:
1. Click "Add to Cart"
2. ✅ No error
3. ✅ Cart sidebar opens
4. ✅ Product appears in cart

### 2. localStorage Persistence
**Steps**:
1. Add product to cart
2. Refresh page
3. ✅ Cart items still there
4. ✅ Loaded from localStorage

### 3. Cart Operations
**Test**:
- ✅ Add item → quantity increases
- ✅ Remove item → item disappears
- ✅ Update quantity → updates correctly
- ✅ Total calculates correctly
- ✅ Count calculates correctly

### 4. Multiple Items
**Test**:
1. Add 3 different products
2. ✅ All appear in cart
3. ✅ Total = sum of all
4. ✅ Count = sum of quantities

---

## 🎊 HOÀN THÀNH!

**Cart Context đã hoạt động**:
✅ Context created
✅ localStorage persistence
✅ All methods working
✅ TypeScript types
✅ No errors
✅ Cart sidebar functional

**Test ngay**: http://localhost:3000/products/wallet-pattern 🚀
