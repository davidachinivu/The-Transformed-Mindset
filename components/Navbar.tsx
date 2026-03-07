'use client'

import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif font-bold text-gray-900">
          The Transformed Mindset
        </Link>
        <div className="flex gap-8 items-center">
          <Link href="/articles" className="text-gray-700 hover:text-accent font-medium transition">
            Articles
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-accent font-medium transition">
            About
          </Link>
          <Link href="/contact" className="text-gray-700 hover:text-accent font-medium transition">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  )
}
