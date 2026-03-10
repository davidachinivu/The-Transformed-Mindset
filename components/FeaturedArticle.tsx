import Link from 'next/link'
import { Article } from '@/lib/articles'

export default function FeaturedArticle({ article }: { article: Article }) {
  return (
    <article className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-2xl overflow-hidden">
      <div className="absolute inset-y-0 left-0 w-2 bg-accent" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="p-10 md:py-12 md:px-12">
          <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide mb-4">
            Featured
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-slate-900">{article.title}</h2>
          <p className="text-lg text-slate-600 mb-6">{article.excerpt}</p>
          <Link
            href={`/articles/${article.slug}`}
            className="inline-flex items-center gap-2 bg-accent text-white font-semibold px-6 py-3 rounded-lg shadow-sm hover:bg-accent-dark transition"
          >
            Read full article
            <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="h-56 md:h-full flex items-center justify-center p-8">
          {article.featuredImage ? (
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover rounded-xl shadow-sm"
            />
          ) : (
            <div className="text-center">
              <p className="text-5xl font-serif font-bold text-slate-200">Featured</p>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}
