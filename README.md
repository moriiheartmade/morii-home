# Morii Patterns - Sewing Patterns E-commerce Platform

A modern, minimalist e-commerce platform for selling PDF sewing patterns. Built with Next.js 16, Supabase, and PayPal integration.

## 🎨 Design Philosophy

- **Minimalist & Earthy**: Clean design with white, beige, brown, and gray tones
- **Typography**: Cormorant Garamond (headings) + Inter (body)
- **Natural Feel**: Subtle textures, organic shapes, generous white space

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Payment**: PayPal
- **Email**: Nodemailer (Gmail SMTP)
- **Hosting**: Vercel
- **Icons**: Lucide React

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- PayPal Business account
- Gmail account (for email automation)

## 🔧 Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/pdf-morii.git
cd pdf-morii
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials (see Setup Guide).

4. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
pdf-morii/
├── app/
│   ├── (storefront)/          # Public pages
│   │   ├── page.tsx           # Home
│   │   ├── products/          # Products
│   │   ├── tools/             # Free resources
│   │   ├── learn-to-sew/      # Tutorials
│   │   ├── blog/              # Blog
│   │   ├── about/             # About
│   │   └── faq/               # FAQ
│   ├── admin/                 # Admin dashboard
│   ├── api/                   # API routes
│   ├── checkout/              # Checkout flow
│   └── globals.css            # Global styles
├── components/
│   ├── ui/                    # shadcn/ui components
│   └── ...                    # Custom components
├── lib/
│   ├── db.ts                  # Supabase client
│   ├── config.ts              # Configuration
│   └── utils.ts               # Utilities
└── public/                    # Static assets
```

## 🎯 Features

### Storefront
- ✅ Minimalist home page
- ⏳ Product catalog with filters
- ⏳ Product detail pages
- ⏳ Shopping cart
- ⏳ PayPal checkout
- ⏳ Free resources section
- ⏳ Sewing tutorials
- ⏳ Blog
- ⏳ FAQ

### Admin Dashboard
- ⏳ Dashboard overview
- ⏳ Payment analytics (revenue stats, transactions)
- ⏳ Google Analytics integration
- ⏳ Product management (CRUD)
- ⏳ Order management
- ⏳ Blog CMS
- ⏳ Free resources management

### E-commerce
- ⏳ PayPal integration
- ⏳ Automated email delivery
- ⏳ Download system with expiry
- ⏳ Order tracking

## 📚 Documentation

- [Setup Guide](/.windsurf/plans/pdf-morii-setup-guide-4bad4a.md)
- [Project Plan](/.windsurf/plans/pdf-morii-project-plan-4bad4a.md)

## 🚀 Deployment

See [Setup Guide](/.windsurf/plans/pdf-morii-setup-guide-4bad4a.md) for detailed deployment instructions.

## 📝 License

Private - All rights reserved.

## 🙏 Acknowledgments

- Design inspiration: [sydgraham.com](https://sydgraham.com)
- Code structure reference: Ebook Mind project
