# MODERN FERTILISERS

> **"Better Nutrition. Better Growth."**  
> *Precision nutrition for modern agriculture.*

A high-performance, futuristic agricultural e-commerce web application engineered with **Next.js 15**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

Designed as a flagship portfolio project for a **B.Tech Computer Science & Engineering (AI/ML)** student, built to showcase enterprise-grade frontend architecture, clean component design, responsive UI/UX, and comprehensive client-side state persistence.

---

## 🌟 Key Product Features

### 1. Futuristic Agriculture Brand & Visual Language
- **Clean Editorial Design**: Minimalist typography, deep forest green (`#04140d`), rich emerald accents, subtle lime bio-indicators, and crisp surface hierarchy.
- **Original Geometric Logo**: Custom SVG mark combining a geometric leaf, nutrient molecule, and upward trajectory line.
- **Zero Generic Template Look**: Apple-grade visual cleanliness tailored to modern Indian precision agriculture.

### 2. Crop-Focused Solutions & Discovery
- **Shop By Crop**: Dedicated solution pages for **Chilli** 🌶️, **Rice (Paddy)** 🌾, **Cotton** 🌿, and **Vegetables** 🥬.
- **Interactive Crop Stage Wizard**: 3-step interactive finder matching crop phenology (Early Growth, Vegetative, Flowering, Fruiting, Maturity) to lab-grade inputs.
- **Agronomic Phenology Calendars**: Stage durations, key risks (blossom drop, chlorosis, lodging), and target nutritional compositions.

### 3. Comprehensive Product Catalog & Detail Experience
- **24 Realistic Agricultural Formulations**: Spanning 5 core disciplines:
  - *Fertilisers* (Controlled-release polymers, soil conditioners)
  - *Water Soluble* (100% drip-grade 19:19:19, MKP 00:52:34, KNO3 13:00:45)
  - *Micronutrients* (Chelated Zinc EDTA 12%, Soluble Boron 20%, Multi-Trace cocktail)
  - *Bio Fertilisers* (Mycorrhizal fungi, PSB, nitrogen-fixing liquid cultures)
  - *Plant Nutrition* (Cold-extracted Ascophyllum seaweed, L-amino peptides, Humic-Fulvic matrix, Potassium Silicate)
- **Pack Size Switching**: Dynamic pricing and SKU recalculation across 500g, 1kg, 5kg, 25kg, and liquid variants.
- **Product Gallery**: High-res primary display, thumbnail switcher, and full-screen lightbox zoom.
- **Tabbed Specifications**: Chemical analysis percentages, crop phenology targets, dosage guidelines, water volumes, and biochemical mechanism notes.
- **Cross-Selling**: "Pairs well with" and "Recommended for your crop".
- **Recently Viewed**: Local history tracking with clear action.

### 4. Interactive E-Commerce Flows (Frontend-First)
- **Slide-Out Quick Cart Drawer**: Live subtotal calculation, free shipping progress meter (target: ₹999), and quantity microinteractions.
- **Dedicated Full Cart Page**: Line item reviews, removal controls, and interactive promo codes (`MODERN10`, `HARVEST15`, `GROW100`).
- **Wishlist System**: Heart toggle on cards and product details, instant badge indicators, and batch move to cart.
- **Multi-Step Checkout**:
  - Step 1: Contact Information (Full Name, Phone, Email)
  - Step 2: Farm / Delivery Address with Indian state selector and PIN code validation
  - Step 3: Delivery Method (Standard vs. Express Priority)
  - Step 4: Demo Payment Gateway (Demo UPI, Cash on Delivery, and Demo Card simulator)
  - Step 5: Order Summary Review
- **Order Generation & Lifecycle Simulation**:
  - Generates realistic reference codes: `MF-YYYYMMDD-XXXX`
  - Order confirmation page with animated confetti
  - Interactive Order Tracking Timeline: **Order Placed → Confirmed → Preparing & Quality Check → Dispatched from Hub → Delivered**
  - Interactive Recruiter Feature: *"Advance Logistics Stage"* button to step through fulfillment stages live!

---

## 🏗️ Technical Architecture

```
modern-fertilisers/
├── app/
│   ├── layout.tsx                     # Root layout with AnnouncementBar, Header, Providers, Footer
│   ├── page.tsx                       # Homepage with 10 structured sections
│   ├── globals.css                    # Tailwind CSS v4 layers & custom design tokens
│   ├── not-found.tsx                  # Agricultural-themed 404 page
│   ├── shop/page.tsx                  # Full catalog with dynamic query params
│   ├── products/[slug]/page.tsx       # SSG dynamic product detail page
│   ├── crops/[crop]/page.tsx          # Dedicated crop solutions & 5-stage schedule
│   ├── categories/[category]/page.tsx # Category showcases
│   ├── cart/page.tsx                  # Full cart page with coupon engine
│   ├── wishlist/page.tsx              # Saved formulations
│   ├── checkout/page.tsx              # Multi-step checkout with instant validation
│   ├── order-success/[orderId]/page.tsx # Order confirmation with celebration confetti
│   ├── orders/page.tsx                # Local order history archive
│   ├── orders/[orderId]/page.tsx      # Order details with animated timeline
│   ├── search/page.tsx                # Instant client-side search engine
│   └── about/page.tsx                 # Brand story and technology manifesto
├── components/
│   ├── layout/                        # Header, AnnouncementBar, MobileNav, Footer
│   ├── ui/                            # Logo mark, Buttons, Badges
│   ├── home/                          # Hero, TrustStrip, ShopByCrop, SmartCropWizard, FeaturedProducts, CategoriesGrid, BrandStory, QualityExperience, PromotionalSection, FinalCTA
│   ├── product/                       # ProductCard, ProductDetailView
│   ├── shop/                          # ShopCatalog, Sidebar Filters, Sort toolbar
│   ├── cart/                          # CartDrawer, CartPageView
│   ├── checkout/                      # CheckoutPageView
│   ├── order/                         # OrderSuccessView, OrdersListView, OrderDetailView
│   ├── crop/                          # CropSolutionView
│   ├── category/                      # CategoryView
│   └── search/                        # QuickSearchModal, SearchPageView
├── context/
│   ├── CartContext.tsx                # Cart state + delivery math + coupon engine
│   ├── WishlistContext.tsx            # Wishlist tracking
│   ├── OrdersContext.tsx              # Local orders + simulated logistics stage advancer
│   └── RecentlyViewedContext.tsx      # Recently viewed product history
├── data/
│   ├── products.ts                    # 24 detailed demo agricultural formulations & promo coupons
│   ├── crops.ts                       # Chilli, Rice, Cotton, and Vegetables phenology schedules
│   └── categories.ts                  # 5 core input categories & scientific descriptions
├── lib/
│   ├── utils.ts                       # Classnames merger, price formatters, date generators
│   └── storage.ts                     # Hydration-safe localStorage wrapper
└── types/
    ├── product.ts                     # Product, Crop, Category interfaces
    ├── cart.ts                        # CartItem, Coupon interfaces
    ├── order.ts                       # DemoOrder, DeliveryAddress, OrderStatus
    └── filter.ts                      # FilterState, SortOption types
```

---

## ⚙️ Tech Stack & Dependencies

- **Framework**: [Next.js 15 / 16](https://nextjs.org) (App Router, Server & Client Components, Turbopack)
- **Core Library**: [React 19](https://react.dev)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Motion & Delight**: [Framer Motion](https://www.framer.com/motion) & [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Class Utilities**: `clsx`, `tailwind-merge`

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js `v18.18+` or `v20+`
- npm `v9+` or `v10+`

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd "Modern Fertilisers"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Next.js development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🧪 Available Scripts

| Command | Action |
|---|---|
| `npm run dev` | Starts Turbopack development server on `localhost:3000` |
| `npm run build` | Compiles optimized production build with SSG for all 44 routes |
| `npm run start` | Starts production server locally after build |
| `npm run lint` | Runs ESLint 9 validation across all TypeScript and React files |

---

## 🌿 Demo Constraints & Clarifications

1. **Frontend-First Architecture**: No backend server or database is required. The application runs entirely within the client browser.
2. **Local Persistence**: Shopping cart, wishlist items, recently viewed history, and demo orders are persisted across browser tabs and refreshes using `localStorage`.
3. **Simulated Payments**: Cash on Delivery, Demo UPI, and Demo Card options are interactive simulations. No real financial credentials are collected or charged.
4. **Agronomic Notice**: Product specifications, dosages, and crop stages are realistic demonstration data created for educational and design showcase purposes.

---

## 🚢 Vercel Deployment Instructions

Deploying Modern Fertilisers to Vercel is instantaneous and requires **zero environment variables**:

### Option 1: Vercel Web Dashboard (Recommended)
1. Push your repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Modern Fertilisers e-commerce application"
   git branch -M main
   git remote add origin https://github.com/<your-username>/modern-fertilisers.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New..." → "Project"**.
3. Import your `modern-fertilisers` GitHub repository.
4. Leave all build settings at default (`Next.js` preset, `npm run build`).
5. Click **"Deploy"**. The site will be live within ~60 seconds!

### Option 2: Vercel CLI
```bash
npx vercel
```

---

## 👨‍💻 Author & Portfolio

**Modern Fertilisers** was conceptualized and developed as a portfolio showcase demonstrating:
- Production-grade frontend architecture in Next.js 15 and React 19
- Modern design systems with Tailwind CSS v4
- High-quality UX with accessibility and microinteractions
- Realistic domain modeling in Indian precision agriculture and e-commerce
