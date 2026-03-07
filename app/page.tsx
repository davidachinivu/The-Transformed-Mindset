'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import FeaturedArticle from '@/components/FeaturedArticle'
import ArticleCard from '@/components/ArticleCard'
import { Article } from '@/lib/articles'

export default function Home() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (response.ok) {
          const data = await response.json()
          setArticles(data)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  const featuredArticle = articles.find((a) => a.featured) || articles[0]
  const recentArticles = articles.slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">
            CHANGE YOUR MINDSET
          </h1>
          <p className="text-2xl md:text-3xl font-serif text-accent mb-8">
            CHANGE YOUR OUTCOMES
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A publication dedicated to mindset, discipline, growth, and life improvement. Get strategies and insights to
            transform your life.
          </p>
          <Link
            href="/articles"
            className="inline-block px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition"
          >
            Explore Articles
          </Link>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FeaturedArticle article={featuredArticle} />
        </section>
      )}

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">Recent Articles</h2>
            <div className="w-20 h-1 bg-accent rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/articles"
              className="inline-block px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition"
            >
              View All Articles
            </Link>
          </div>
        </section>
      )}


      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Ready to Transform?</h2>
        <p className="text-gray-600 text-lg mb-8">
          Let's start your journey. Send me a message to discuss how I can help you achieve your goals.
        </p>
        <Link
          href="/contact"
          className="inline-block px-8 py-4 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  )
}
