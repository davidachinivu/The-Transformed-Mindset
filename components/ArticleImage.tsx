'use client'

import { useState } from 'react'

interface ArticleImageProps {
  src: string
  alt: string
  className?: string
}

export default function ArticleImage({ src, alt, className = '' }: ArticleImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setImageLoaded(true)
  }

  return (
    <div className={`w-full mb-12 ${className}`}>
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className={`w-full max-h-[600px] object-contain rounded-lg shadow-lg mx-auto block transition-opacity duration-300 ${
          imageLoaded
            ? 'opacity-100'
            : 'opacity-0'
        }`}
      />
      {!imageLoaded && (
        <div className="w-full h-72 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center">
          <div className="animate-pulse">
            <div className="w-12 h-12 bg-accent/20 rounded-full"></div>
          </div>
        </div>
      )}
    </div>
  )
}