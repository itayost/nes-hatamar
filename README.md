# נס התמר | Nes HaTamar

A bilingual (Hebrew/English) website for the book "Nes HaTamar" - A journey through the paths of our sacred Torah to the world of homeopathy and medicinal plants.

## Features

### 🌐 Bilingual Support
- Full Hebrew and English translations
- Automatic RTL (Right-to-Left) layout for Hebrew
- LTR (Left-to-Right) layout for English
- Easy language switching with a toggle button

### 📱 Responsive Design
- Mobile-first approach
- Optimized for tablets and desktop
- Touch-friendly navigation

### 🎨 Classic Design
- Traditional ornate decorative elements
- Gold and cream color palette matching the book cover
- Beautiful typography with Hebrew (Frank Ruhl Libre) and English (Playfair Display) fonts
- Corner ornaments and dividers throughout

### 📄 Pages

1. **Homepage** (`/`)
   - Hero section with book cover display
   - Book introduction and description
   - Feature highlights
   - Call-to-action button

2. **About Authors** (`/about`)
   - Dual author profiles for Tamar Eshel and Nissim Krispil
   - Beautiful layout with ornamental design
   - "Together" section explaining their collaboration

3. **Book Preview** (`/preview`)
   - Gallery of sample pages (placeholders for now)
   - Book content information
   - Visual showcase

4. **Purchase/Pre-order** (`/purchase`)
   - Book details and features
   - Contact form for pre-orders
   - Form validation
   - Success/error messaging

## Tech Stack

- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Internationalization**: next-intl
- **Fonts**: Google Fonts (Frank Ruhl Libre, Playfair Display)
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

1. Install dependencies (already done):
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

The website will automatically redirect to the Hebrew version (`/he`) by default.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
nes-hatamar/
├── app/
│   ├── [locale]/          # Locale-based routing
│   │   ├── page.tsx       # Homepage
│   │   ├── about/         # About Authors page
│   │   ├── preview/       # Book Preview page
│   │   ├── purchase/      # Purchase page
│   │   └── layout.tsx     # Locale-specific layout
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Page footer
│   ├── LanguageSwitcher.tsx  # Language toggle
│   ├── ContactForm.tsx    # Pre-order form
│   └── ornaments/         # Decorative components
├── lib/
│   └── i18n.ts           # Internationalization config
├── messages/
│   ├── he.json           # Hebrew translations
│   └── en.json           # English translations
└── public/
    └── images/           # Static images
```

## Customization

### Adding Real Images

Replace the placeholder images in `public/images/`:
- `cover.jpg` - Book cover image (400x600px recommended)
- Add author photos to `authors/`
- Add book sample pages to `preview/`

### Updating Content

Edit the translation files:
- Hebrew: `messages/he.json`
- English: `messages/en.json`

### Styling

The design uses CSS custom properties in `app/globals.css`:
- `--color-gold`: #C9A961 (Primary gold)
- `--color-cream`: #FFFEF7 (Background)
- `--color-dark`: #2C2416 (Text)

### Contact Form Integration

The contact form currently simulates submission. To make it functional:

1. Set up an email service (Resend, SendGrid, etc.)
2. Create API route: `app/api/contact/route.ts`
3. Update form handler in `components/ContactForm.tsx`

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import to [Vercel](https://vercel.com)
3. Deploy automatically

### Other Platforms
Works with Netlify, AWS Amplify, or self-hosted.

## Authors

**Tamar Eshel** - Homeopathy practitioner and Torah teacher
**Nissim Krispil** - Writer, researcher, and ethnobotanist

## License

All rights reserved © נס התמר | Nes HaTamar
