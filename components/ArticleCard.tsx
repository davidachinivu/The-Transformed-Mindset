import Link from 'next/link'
import { Article } from '@/lib/articles'

type CardLayout = 'grid' | 'text-only' | 'horizontal' | 'featured'

export default function ArticleCard({
  article,
  layout = 'grid',
}: {
  article: Article
  layout?: CardLayout
}) {
  const formattedDate = new Date(article.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })

  // 1. TEXT-ONLY LAYOUT (No Image, compact, usually for top headlines)
  if (layout === 'text-only') {
    return (
      <article className="py-4 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors duration-200 rounded-sm">
        <Link href={`/articles/${article.slug}`} className="block group">
          <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-accent group-hover:underline transition mb-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{article.excerpt}</p>
          <div className="flex items-center text-xs text-gray-500 uppercase tracking-widest font-semibold">
            {article.category && <span className="mr-3">{article.category}</span>}
            <time>{formattedDate}</time>
          </div>
        </Link>
      </article>
    )
  }

  // 2. HORIZONTAL LAYOUT (Image left, text right. Used in standard feed)
  if (layout === 'horizontal') {
    return (
      <article className="group flex flex-col sm:flex-row gap-6 py-6 border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors duration-200">
        <div className="sm:w-1/3 flex-shrink-0">
          <Link href={`/articles/${article.slug}`} className="block overflow-hidden rounded-sm aspect-video sm:aspect-square md:aspect-video bg-gray-100">
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/10 to-accent/5">
                <span className="text-accent/40 font-serif font-bold text-2xl px-4 text-center">{article.title.charAt(0)}</span>
              </div>
            )}
          </Link>
        </div>
        <div className="sm:w-2/3 flex flex-col justify-center">
          <Link href={`/articles/${article.slug}`} className="block">
            <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-accent group-hover:underline transition mb-3">
              {article.title}
            </h3>
            <p className="text-gray-700 text-base mb-4 line-clamp-3">{article.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500 font-medium">
              {article.category && <span className="text-accent uppercase tracking-wider mr-3">{article.category}</span>}
              <time>{formattedDate}</time>
            </div>
          </Link>
        </div>
      </article>
    )
  }

  // 3. FEATURED LAYOUT (Large image, prominent text for lead stories)
  if (layout === 'featured') {
    return (
      <article className="group mb-10 overflow-hidden relative border border-gray-200 shadow-sm rounded-sm">
        <Link href={`/articles/${article.slug}`} className="block">
          <div className="aspect-video md:aspect-[21/9] bg-gray-100 overflow-hidden relative">
            {article.featuredImage ? (
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
                <span className="text-white/20 font-serif font-bold text-6xl px-4 text-center">{article.title.charAt(0)}</span>
              </div>
            )}
            
            {/* Optional Overlay for text readability if you wanted text over image, 
                but keeping it distinct below is cleaner for a news site. */}
          </div>
          <div className="p-6 md:p-8 bg-white">
             {article.category && (
               <span className="inline-block px-2 py-1 bg-accent text-white text-xs uppercase tracking-widest font-bold mb-4">
                 {article.category}
               </span>
             )}
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 group-hover:text-accent transition mb-4 leading-tight">
              {article.title}
            </h3>
            <p className="text-gray-600 text-lg md:text-xl mb-6 line-clamp-2">{article.excerpt}</p>
            <div className="flex items-center text-sm text-gray-500 font-medium">
              <time>{formattedDate}</time>
               <span className="mx-2">•</span>
               <span className="text-accent group-hover:text-accent-dark transition">Read Full Article →</span>
            </div>
          </div>
        </Link>
      </article>
    )
  }

  // 4. DEFAULT GRID LAYOUT (The original layout)
  return (
    <article className="group h-full flex flex-col bg-white border border-gray-200 rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link href={`/articles/${article.slug}`} className="block flex-grow flex flex-col">
        {article.featuredImage ? (
          <div className="h-48 overflow-hidden bg-gray-100">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className="bg-gradient-to-br from-accent/10 to-accent/5 h-48 flex items-center justify-center">
            <div className="text-center px-4">
              <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-accent transition">
                {article.title}
              </h3>
            </div>
          </div>
        )}
        <div className="p-6 flex flex-col flex-grow">
           {article.category && (
             <span className="text-accent text-xs uppercase tracking-widest font-bold mb-2 block">
               {article.category}
             </span>
           )}
          <h3 className="text-xl font-serif font-bold text-gray-900 group-hover:text-accent transition mb-3 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">{article.excerpt}</p>
          <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
            <time className="text-xs text-gray-500 font-medium tracking-wide">
              {formattedDate}
            </time>
          </div>
        </div>
      </Link>
    </article>
  )
}
