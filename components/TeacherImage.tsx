'use client'

import { useState } from 'react'

export default function TeacherImage() {
  const [showPlaceholder, setShowPlaceholder] = useState(false)

  return (
    <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-gray-100">
      {!showPlaceholder ? (
        <img
          src="/api/about/teacher-image"
          alt="Teacher"
          className="w-full h-full object-cover"
          onError={() => setShowPlaceholder(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center text-center">
          <div>
            <p className="text-gray-400 text-lg">Teacher Photo</p>
            <p className="text-gray-300 text-sm mt-2">Coming Soon</p>
          </div>
        </div>
      )}
    </div>
  )
}