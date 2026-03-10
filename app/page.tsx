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
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,rgba(30,58,138,0.25),transparent_55%)] pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative">
          <div className="max-w-2xl mx-auto text-center">
            <p className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold tracking-wide mb-6">
              Thoughtful perspectives • Practical steps • Lasting habits
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight text-slate-900 leading-tight">
              Change your mindset,
              <br className="hidden md:block" />
              change your outcomes.
            </h1>
            <p className="mt-6 text-lg text-slate-600 leading-relaxed">
              Practical articles and proven strategies to build discipline, foster growth, and unlock your potential. Discover new habits and mindsets you can apply today.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/articles"
                className="inline-flex items-center justify-center px-9 py-4 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-dark transition"
              >
                Explore Articles
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-9 py-4 border border-slate-200 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition"
              >
                Contact the Author
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <FeaturedArticle article={featuredArticle} />
        </section>
      )}

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900">How it works</h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Browse, learn, and take action. Each article is designed to help you build momentum and make progress.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
              <span className="text-xl">📖</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Read with intention</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Start with articles that match your goals and gain clarity on the next step to take.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
              <span className="text-xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Take action</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Apply practical frameworks and exercises that help you turn insights into habits.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
              <span className="text-xl">📈</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Measure progress</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Track what works and adapt as you grow—small wins build into meaningful change.
            </p>
          </div>
        </div>
      </section>

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
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-2xl bg-slate-50 border border-slate-200 p-10 text-center">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Ready to accelerate your growth?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Reach out to start a conversation, ask a question, or share what you’re working on. I’m here to help you stay on track.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-9 py-4 bg-accent text-white font-semibold rounded-lg shadow-md hover:bg-accent-dark transition"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  )
}
