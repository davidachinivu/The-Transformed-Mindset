'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminAboutPage() {
  const [teacherImage, setTeacherImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setTeacherImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUpload = async () => {
    if (!teacherImage) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append('teacherImage', teacherImage)

      const response = await fetch('/api/about/teacher-image', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        alert('Teacher image uploaded successfully!')
        router.refresh()
      } else {
        alert('Failed to upload image')
      }
    } catch (error) {
      console.error('Upload error:', error)
      alert('Error uploading image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemoveImage = async () => {
    if (!confirm('Are you sure you want to remove the teacher image?')) return

    try {
      const response = await fetch('/api/about/teacher-image', {
        method: 'DELETE',
      })

      if (response.ok) {
        setTeacherImage(null)
        setImagePreview(null)
        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        alert('Teacher image removed successfully!')
        router.refresh()
      } else {
        alert('Failed to remove image')
      }
    } catch (error) {
      console.error('Remove error:', error)
      alert('Error removing image')
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Manage About Page</h1>

      {/* Teacher Image Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Teacher Image</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Teacher Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-dark"
            />
          </div>

          {imagePreview && (
            <div className="flex items-center space-x-4">
              <img
                src={imagePreview}
                alt="Teacher preview"
                className="w-32 h-32 object-cover rounded-lg border"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50"
                >
                  {isUploading ? 'Uploading...' : 'Upload Image'}
                </button>
                <button
                  onClick={() => {
                    setTeacherImage(null)
                    setImagePreview(null)
                    if (fileInputRef.current) {
                      fileInputRef.current.value = ''
                    }
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Current Image Display */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Current Image:</h3>
            <div className="flex items-center space-x-4">
              <img
                src="/api/about/teacher-image"
                alt="Current teacher image"
                className="w-32 h-32 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <button
                onClick={handleRemoveImage}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* About Content Section */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About Content</h2>
        <p className="text-gray-600">
          The about page content is currently static. If you need to edit the text content,
          please let me know and I can make it editable as well.
        </p>
      </div>
    </div>
  )
}