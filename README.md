# The Transformed Mindset

A professional personal development publication platform built with Next.js 14, React, TypeScript, and Tailwind CSS.

**Tagline:** CHANGE YOUR MINDSET – CHANGE YOUR OUTCOMES

## Overview

The Transformed Mindset is a clean, minimal, and professional web application for publishing articles about mindset, discipline, growth, and life improvement. The platform is designed to be authoritative and publication-focused while maintaining excellent performance and SEO optimization.

## Features

✨ **Modern Design**
- Clean, minimal aesthetic without unnecessary animations
- Professional typography with serif headings and sans-serif body text
- Responsive design that works across all devices
- Deep blue accent color (#1e3a8a) for visual hierarchy

📝 **Content Management**
- Dynamic article pages with SEO-optimized metadata
- Mock article data with 6 sample articles
- Article categorization (Mindset, Discipline, Growth, Life)
- Easy-to-extend data structure for future CMS integration

🔍 **Discovery & Search**
- Featured article section on homepage
- Article filtering by category
- Full-text search across article titles, excerpts, and content
- Grid layout with responsive design

📧 **Engagement**
- Contact form with server-side validation
- API endpoint for contact form submissions

🎨 **Technical Excellence**
- Server components for optimal performance
- TypeScript for type safety
- Tailwind CSS for styling
- SEO-friendly metadata per page
- Semantic HTML
- Accessible form inputs and labels

## Project Structure

```
├── app/
│   ├── api/                    # API routes
│   │   └── contact/route.ts    # Contact form endpoint
│   ├── articles/
│   │   ├── [slug]/page.tsx     # Dynamic article page
│   │   └── page.tsx            # Articles listing page
│   ├── contact/page.tsx        # Contact page
│   ├── layout.tsx              # Root layout
│   ├── page.tsx               # Home page
│   └── globals.css            # Global styles
├── components/
│   ├── Navbar.tsx             # Navigation bar
│   ├── Footer.tsx             # Footer
│   ├── ArticleCard.tsx        # Article card component
│   ├── FeaturedArticle.tsx    # Featured article section
│   ├── ContactForm.tsx        # Contact form
│   ├── CategoryFilter.tsx     # Category filter buttons
│   └── SearchBar.tsx          # Search input
├── lib/
│   └── articles.ts            # Mock article data
├── public/                    # Static assets
├── package.json              # Dependencies
├── tsconfig.json            # TypeScript config
├── tailwind.config.ts       # Tailwind configuration
├── next.config.js           # Next.js configuration
└── README.md                # This file
```

## Getting Started

### Prerequisites
- Node.js 18+ or higher
- npm or your preferred package manager

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Configure environment variables (required for email):**
Create a `.env.local` file at the project root and add your email settings.

### Recommended: Use Resend
```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM=you@yourdomain.com
CONTACT_EMAIL_TO=you@yourdomain.com
```

### Alternative: Use SMTP
```env
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-username
SMTP_PASS=your-smtp-password
CONTACT_EMAIL_TO=you@yourdomain.com
```

> If you do not configure these variables, the contact form will still work locally, but it will only log submissions to the server console instead of sending an email.

4. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Development

- **Build for production:**
```bash
npm run build
```

- **Start production server:**
```bash
npm start
```

- **Run linting:**
```bash
npm run lint
```

## Pages

### Home Page (`/`)
- Hero section with tagline
- Featured article highlight
- Recent articles grid (6 articles)
- Call-to-action to articles page

### Articles Page (`/articles`)
- Complete article listing
- Category filtering
- Full-text search
- Responsive grid layout

### Article Page (`/articles/[slug]`)
- Full article content with formatted markdown
- Category badge
- Publication date
- Featured image placeholder
- Related articles section
- Back to articles navigation

### Contact Page (`/contact`)
- Contact form with validation
- Three-column layout
- Form submission to `/api/contact`
- Contact information sections

## Data Model

### Article Interface
```typescript
interface Article {
  id: string
  slug: string
  title: string
  category: 'Mindset' | 'Discipline' | 'Growth' | 'Life'
  excerpt: string
  content: string
  publishDate: string
  featured?: boolean
}
```

Articles are stored in `/lib/articles.ts` and can be easily replaced with a CMS or database integration.

## API Endpoints

### POST `/api/contact`
Handles contact form submissions with server-side validation.

**Request body:**
```json
{
  "name": "string (2-100 characters)",
  "email": "string (valid email)",
  "message": "string (10-5000 characters)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Message received"
}
```

## Styling

The application uses Tailwind CSS with custom configuration for:
- **Colors:** Accent color (#1e3a8a) with dark variant
- **Typography:** Georgia serif for headings, Inter sans-serif for body
- **Spacing:** Large, clean spacing for readability

Customize colors and fonts in `tailwind.config.ts`.

## Future Enhancements

- [ ] Integrate with email service (Resend, SendGrid, ConvertKit)
- [ ] Add author bio and social links
- [ ] Implement reading time estimates
- [ ] Add comment system
- [ ] Create admin dashboard for content management
- [ ] Integrate with Vercel Analytics
- [ ] Add dark mode support
- [ ] Implement RSS feed
- [ ] Add related articles recommendations
- [ ] Create email templates for forms

## Deployment

This project is ready for deployment on **Vercel** with zero configuration:

1. Push your code to GitHub
2. Connect repository to Vercel
3. Deploy with a single click

Environment variables (for email services) can be added in Vercel dashboard.

## SEO Optimization

- Full metadata support per page
- Dynamic metadata generation for articles
- Semantic HTML structure
- Proper heading hierarchy
- Mobile-responsive design
- Open Graph tags for social sharing

## Accessibility

- Semantic HTML with proper heading structure
- Labeled form inputs
- Keyboard-navigable components
- ARIA-compliant forms
- High contrast colors
- Clear focus states

## Performance

- Optimized bundle size with Tree-shaking
- Static generation for articles
- Image optimization ready
- CSS-in-JS with Tailwind (minimal CSS)
- No unnecessary animations
- Modern JavaScript (ES2017+)

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Node.js** - Runtime

## License

This project is private and intended for personal or portfolio use.

## Support

For questions or issues, open the contact form on the website.

---

**Built with ♦ by The Transformed Mindset | 2024**
