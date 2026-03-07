'use client'

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import Link from 'next/link'
import { Article } from '@/lib/articles'
import ArticleImage from '@/components/ArticleImage'

export default function ArticlePage() {
  const [article, setArticle] = useState<Article | null>(null)
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const slug = params.slug as string

  useEffect(() => {
    async function fetchArticle() {
      try {
        // First fetch all articles
        const response = await fetch('/api/articles')
        if (response.ok) {
          const articles: Article[] = await response.json()
          const foundArticle = articles.find((a) => a.slug === slug)

          if (!foundArticle) {
            notFound()
            return
          }

          setArticle(foundArticle)

          // Get related articles (excluding current)
          const related = articles
            .filter((a) => a.id !== foundArticle.id)
            .slice(0, 3)
          setRelatedArticles(related)
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchArticle()
    }
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    )
  }

  if (!article) {
    notFound()
  }

  return (
    <div>
      {/* Article Header */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-8">
          <Link href="/articles" className="text-accent hover:text-accent-dark font-medium transition mb-4 inline-block">
            ← Back to Articles
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">{article.title}</h1>

          <time className="text-gray-600 text-lg">
            {new Date(article.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
        </header>

        {/* Featured Image */}
        {article.featuredImage ? (
          <ArticleImage
            src={article.featuredImage}
            alt={article.title}
          />
        ) : (
          <div className="w-full h-72 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg mb-12 flex items-center justify-center">
            <p className="text-gray-400 text-lg">No featured image</p>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="article-content space-y-6 text-gray-700"
            dangerouslySetInnerHTML={{
              __html: article.content
                .split('\n\n')
                .map((paragraph) => {
                  if (paragraph.startsWith('#')) {
                    const level = paragraph.match(/^#+/)?.[0].length || 1
                    const text = paragraph.substring(level).trim()
                    const tag = `h${Math.min(level, 6)}`
                    return `<${tag} class="text-gray-900 font-serif font-bold mt-8 mb-4">${text}</${tag}>`
                  }
                  if (paragraph.startsWith('- ')) {
                    const items = paragraph.split('\n').map((item) => item.substring(2))
                    return `<ul class="list-disc list-inside space-y-2">${items.map((i) => `<li>${i}</li>`).join('')}</ul>`
                  }
                  if (paragraph.startsWith('1. ')) {
                    const items = paragraph.split('\n').map((item) => item.replace(/^\d+\.\s/, ''))
                    return `<ol class="list-decimal list-inside space-y-2">${items.map((i) => `<li>${i}</li>`).join('')}</ol>`
                  }
                  return `<p>${paragraph}</p>`
                })
                .join(''),
            }}
          />
        </div>

        {/* Article Footer */}
        <div className="border-t border-gray-200 pt-8">
          <Link
            href="/articles"
            className="inline-block px-6 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition"
          >
            ← Back to Articles
          </Link>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="bg-gray-50 py-16 mt-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
                <div key={relatedArticle.id} className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">{relatedArticle.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{relatedArticle.excerpt}</p>
                  <Link
                    href={`/articles/${relatedArticle.slug}`}
                    className="text-accent hover:text-accent-dark font-medium transition"
                  >
                    Read More →
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  )
}
