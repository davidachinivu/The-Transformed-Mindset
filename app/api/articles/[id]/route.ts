import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const articlesFilePath = path.join(process.cwd(), 'data', 'articles.json')
const imagesDir = path.join(process.cwd(), 'data', 'images')

interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  publishDate: string
  featuredImage?: string
  featured?: boolean
}

function readArticles(): Article[] {
  try {
    const data = fs.readFileSync(articlesFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    return []
  }
}

function writeArticles(articles: Article[]): void {
  fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2))
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

// GET /api/articles/[id] - Get single article
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articles = readArticles()
    const article = articles.find(a => a.id === params.id)

    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error('Error reading article:', error)
    return NextResponse.json({ error: 'Failed to read article' }, { status: 500 })
  }
}

// PUT /api/articles/[id] - Update article
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const excerpt = formData.get('excerpt') as string
    const content = formData.get('content') as string
    const featured = formData.get('featured') === 'true'
    const imageFile = formData.get('featuredImage') as File | null

    if (!title || !excerpt || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const articles = readArticles()
    const articleIndex = articles.findIndex(a => a.id === params.id)

    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    const slug = generateSlug(title)

    // Check if slug already exists (excluding current article)
    const existingSlug = articles.find((article, index) =>
      article.slug === slug && index !== articleIndex
    )
    if (existingSlug) {
      return NextResponse.json({ error: 'Article with this title already exists' }, { status: 400 })
    }

    let featuredImagePath: string | undefined

    // Handle file upload
    if (imageFile && imageFile.size > 0) {
      const fileName = params.id + path.extname(imageFile.name)
      const filePath = path.join(imagesDir, fileName)

      // Convert File to Buffer and save
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      fs.writeFileSync(filePath, buffer)

      featuredImagePath = `/api/images/${fileName}`
    } else {
      // Keep existing image if no new file uploaded
      featuredImagePath = articles[articleIndex].featuredImage
    }

    const updatedArticle: Article = {
      ...articles[articleIndex],
      title,
      excerpt,
      content,
      slug,
      featuredImage: featuredImagePath,
      featured: featured || false,
    }

    articles[articleIndex] = updatedArticle
    writeArticles(articles)

    return NextResponse.json(updatedArticle)
  } catch (error) {
    console.error('Error updating article:', error)
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 })
  }
}

// DELETE /api/articles/[id] - Delete article
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const articles = readArticles()
    const articleIndex = articles.findIndex(a => a.id === params.id)

    if (articleIndex === -1) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 })
    }

    articles.splice(articleIndex, 1)
    writeArticles(articles)

    return NextResponse.json({ message: 'Article deleted successfully' })
  } catch (error) {
    console.error('Error deleting article:', error)
    return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 })
  }
}