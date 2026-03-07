import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/app/globals.css'

export const metadata: Metadata = {
  title: 'The Transformed Mindset',
  description: 'Change your mindset – change your outcomes. Articles about mindset, discipline, growth, and life improvement.',
  keywords: ['mindset', 'discipline', 'growth', 'personal development', 'self-improvement'],
  openGraph: {
    title: 'The Transformed Mindset',
    description: 'Change your mindset – change your outcomes.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Source+Serif+Pro:wght@400;600&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-gray-900">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
