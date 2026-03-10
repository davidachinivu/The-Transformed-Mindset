'use client'

import { useState, useMemo, useEffect } from 'react'
import ArticleCard from '@/components/ArticleCard'
import SearchBar from '@/components/SearchBar'
import { Article } from '@/lib/articles'

export default function ArticlesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchArticles() {
      try {
        const response = await fetch('/api/articles')
        if (response.ok) {
          const data = await response.json()
          // Sort by newest first just in case
          const sorted = data.sort((a: Article, b: Article) => 
            new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
          )
          setArticles(sorted)
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const filteredArticles = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles
    }

    const query = searchQuery.toLowerCase()
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query)
    )
  }, [searchQuery, articles])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-serif">Loading latest insights...</p>
        </div>
      </div>
    )
  }

  // Layout Logic for the Magazine Style
  // If the user is searching, we just show a standard grid/list to make finding things easy.
  // If no search, we show the curated magazine layout.
  
  const isSearching = searchQuery.trim().length > 0;
  
  // Pluck articles for the magazine layout layout
  // 1. Top Headlines (Next 3 newest after featured)
  // 2. Main Featured (Newest article, or explicitly featured)
  // 3. The Feed (Everything else)
  
  const featuredArticle = articles.find(a => a.featured) || articles[0];
  const remainingArticles = articles.filter(a => a.id !== featuredArticle?.id);
  
  const topHeadlines = remainingArticles.slice(0, 3);
  const feedArticles = remainingArticles.slice(3);

  return (
    <div className="bg-white">
      {/* Magazine Header / Hero Section */}
      <section className="border-b-4 border-gray-900 py-12 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-serif font-black text-gray-900 tracking-tight uppercase mb-6 leading-none">
            CHANGE YOUR MINDSET<br/>
            <span className="text-accent">CHANGE YOUR OUTCOMES</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-serif italic">
            A publication dedicated to mindset, discipline, growth, and life improvement. Get strategies and insights to transform your life.
          </p>
        </div>
      </section>

      {/* Main Magazine Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {isSearching ? (
          /* ----- SEARCH RESULTS VIEW ----- */
          <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-gray-200">
               <div>
                 <h2 className="text-3xl font-serif font-bold text-gray-900">Search Results</h2>
                 <p className="text-gray-600 mt-2">
                    Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} for "{searchQuery}"
                 </p>
               </div>
               <div className="w-full md:w-96">
                 <SearchBar onSearch={setSearchQuery} placeholder="Search publications..." />
               </div>
            </div>
            
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} layout="grid" />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gray-50 rounded-sm border border-gray-100">
                <p className="text-xl text-gray-600 mb-6 font-serif">No articles match your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="px-6 py-3 bg-gray-900 text-white font-bold tracking-wide uppercase text-sm hover:bg-accent transition"
                >
                  Clear search & return to home
                </button>
              </div>
            )}
          </div>
        ) : (
          /* ----- MAGAZINE LAYOUT ----- */
          <>
            {/* Top Row: 3 Quick Headlines */}
            {topHeadlines.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 pb-12 border-b-2 border-gray-100">
                {topHeadlines.map(article => (
                  <ArticleCard key={article.id} article={article} layout="text-only" />
                ))}
              </div>
            )}

            {/* Main Content Area: 2 Columns (Content + Sidebar) */}
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* LEFT COLUMN: Main Articles (~70%) */}
              <div className="lg:w-2/3">
                {/* 1. Large Featured Article */}
                {featuredArticle && (
                  <ArticleCard article={featuredArticle} layout="featured" />
                )}

                {/* 2. The Feed (Horizontal List) */}
                {feedArticles.length > 0 && (
                  <div className="mt-12">
                    <h2 className="text-2xl font-serif font-black text-gray-900 uppercase tracking-widest border-b-2 border-gray-900 pb-4 mb-8">
                      Latest Publications
                    </h2>
                    <div className="flex flex-col gap-8">
                      {feedArticles.map(article => (
                        <ArticleCard key={article.id} article={article} layout="horizontal" />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RIGHT COLUMN: Sidebar (~30%) */}
              <aside className="lg:w-1/3">
                <div className="sticky top-8 space-y-10">
                  
                  {/* Search Widget */}
                  <div className="bg-gray-50 p-6 border border-gray-200 rounded-sm">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">
                      Search Archives
                    </h3>
                    <SearchBar onSearch={setSearchQuery} placeholder="Keyword or topic..." />
                  </div>

                  {/* About Author Widget */}
                  <div className="border border-gray-200 p-6 rounded-sm">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                       About the Author
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      A high school educator dedicated to helping students and adults alike build mental frameworks for lifelong success.
                    </p>
                    <a href="/about" className="text-accent font-bold text-sm uppercase tracking-wider hover:underline">
                      Read Full Bio →
                    </a>
                  </div>

                </div>
              </aside>

            </div>
          </>
        )}
      </section>
    </div>
  )
}

