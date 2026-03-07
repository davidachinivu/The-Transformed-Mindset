<!-- Use this file to provide workspace-specific custom instructions to Copilot. -->

# The Transformed Mindset - Project Instructions

## Project Overview

This is a production-ready Next.js 14 web application for a professional personal development publication platform. The platform publishes articles about mindset, discipline, growth, and life improvement.

**Tagline:** CHANGE YOUR MINDSET – CHANGE YOUR OUTCOMES

## Technology Stack

- **Framework:** Next.js 14+ with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Library:** React
- **Deployment:** Vercel (ready for production)

## Key Features

1. **Home Page** - Hero section, featured article, recent articles grid
2. **Articles Page** - Full article listing with category filtering and search
3. **Dynamic Article Pages** - Individual article pages with related articles
4. **Contact Page** - Contact form with server-side validation
5. **API Routes** - Contact form endpoint
6. **Responsive Design** - Works seamlessly on all devices

## Design Principles

- **Minimal & Clean** - No excessive animations or visual clutter
- **Professional** - Authoritative publication aesthetic
- **Typography-Focused** - Serif fonts (Georgia) for headings, sans-serif for body text
- **Color Scheme** - White background, dark gray/black text, deep blue (#1e3a8a) accent
- **Large Spacing** - Clear visual hierarchy with generous whitespace
- **Performance-First** - Optimized for speed and Core Web Vitals

## Project Structure

```
├── app/                     # Next.js App Router
│   ├── api/                 # Backend API routes
│   ├── articles/            # Articles pages
│   ├── contact/             # Contact page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable React components
├── lib/                     # Utilities and data (articles.ts)
├── public/                  # Static assets
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
└── README.md                # Documentation
```

## Component Architecture

### Layout Components
- **Navbar** - Sticky navigation with links
- **Footer** - Footer with links and copyright

### Article Components
- **ArticleCard** - Card display for article previews
- **FeaturedArticle** - Large featured article section
- **CategoryFilter** - Filter buttons for article categories
- **SearchBar** - Search input for full-text search

### Form Components
- **ContactForm** - Contact form with validation

## Data Model

Articles are stored in `/lib/articles.ts` with the following structure:
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

Currently using mock data; ready to connect to any headless CMS or database.

## Development Guidelines

### Code Style
- Use TypeScript for all files
- Follow React hooks conventions
- Use server components where appropriate
- Keep components small and reusable
- Use absolute imports (@/path) via path alias

### Styling
- Use Tailwind CSS utility classes
- Define custom colors in tailwind.config.ts
- Maintain consistent spacing and sizing
- Use CSS Grid/Flexbox for layouts

### SEO & Accessibility
- Always include proper metadata per page
- Use semantic HTML (h1, h2, etc.)
- Label all form inputs
- Use ARIA attributes where needed
- Ensure high color contrast

### Performance
- Lazy load components when possible
- Minimize JavaScript bundles
- Use Image component for Next.js optimization
- Avoid heavy animations
- Optimize font loading

## API Endpoints

### POST /api/contact
- Handles contact form submissions
- Server-side validation of name, email, message
- Returns success/error response

The endpoint is ready to integrate with email services (Resend, SendGrid, etc.).

## Setup & Running

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

Development server runs at `http://localhost:3000`

## Future Enhancements

Priority areas for expansion:
1. Email service integration (contact forms, newsletters)
2. Admin dashboard for content management
3. CMS integration (Contentful, Sanity, etc.)
4. Advanced analytics
5. Comments/discussion system
6. Author authentication
7. Dark mode support
8. RSS feed
9. Social sharing features
10. Search engine optimization tokens

## Deployment

Ready for deployment on Vercel:
1. Push code to GitHub
2. Connect repository in Vercel dashboard
3. Deploy automatically

Environment variables for email services can be configured in Vercel settings.

## Performance Targets

- **Lighthouse Score** - 90+ on all categories
- **Core Web Vitals** - All green
- **Page Load** - < 2 seconds
- **Bundle Size** - Minimal and optimized

## Notes for Contributors

- This is a professional publication platform - maintain clean, professional design
- Follow existing patterns and conventions
- Keep changes minimal and focused
- Test thoroughly before deploying
- Run linting before committing
- Update README with significant changes

---

**Last Updated:** March 2024
