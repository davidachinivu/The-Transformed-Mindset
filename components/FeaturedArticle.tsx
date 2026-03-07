import Link from 'next/link'
import { Article } from '@/lib/articles'

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="bg-gradient-to-r from-accent to-accent-dark text-white rounded-lg overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-8 md:py-12 md:px-10">
          <div className="inline-block mb-4 px-3 py-1 bg-white/20 rounded-full">
            <span className="text-sm font-semibold uppercase tracking-wide">Featured</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">{article.title}</h2>
          <p className="text-lg text-white/90 mb-6">{article.excerpt}</p>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-block bg-white text-accent font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            Read Full Article →
          </Link>
        </div>
        <div className="h-48 md:h-full flex items-center justify-center p-8">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="text-center">
              <p className="text-5xl font-serif font-bold text-white/20">Featured</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
