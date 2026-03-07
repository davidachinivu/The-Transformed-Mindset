import Link from 'next/link'
import { Article } from '@/lib/articles'

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="group h-full flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {article.featuredImage ? (
        <div className="h-40 overflow-hidden">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      ) : (
        <div className="bg-gradient-to-br from-accent/10 to-accent/5 h-40 flex items-center justify-center">
          <div className="text-center px-4">
            <h3 className="text-lg font-serif font-bold text-gray-900 group-hover:text-accent transition">
              {article.title}
            </h3>
          </div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">{article.excerpt}</p>
        <div className="flex justify-between items-center">
          <time className="text-xs text-gray-500">
            {new Date(article.publishDate).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </time>
          <Link
            href={`/articles/${article.slug}`}
            className="text-accent hover:text-accent-dark font-medium text-sm transition"
          >
            Read →
          </Link>
        </div>
      </div>
    </article>
  )
}
