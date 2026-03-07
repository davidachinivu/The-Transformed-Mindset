import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'

const articlesFilePath = path.join(process.cwd(), 'data', 'articles.json')
const imagesDir = path.join(process.cwd(), 'data', 'images')

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imagesDir)
  },
  filename: (req, file, cb) => {
    const uniqueName = uuidv4() + path.extname(file.originalname)
    cb(null, uniqueName)
  }
})

const upload = multer({ storage })

// Helper function to run multer middleware
function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }
      return resolve(result)
    })
  })
}

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

// GET /api/articles - Get all articles
export async function GET() {
  try {
    const articles = readArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Error reading articles:', error)
    return NextResponse.json({ error: 'Failed to read articles' }, { status: 500 })
  }
}

// POST /api/articles - Create new article
export async function POST(request: NextRequest) {
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
    const slug = generateSlug(title)
    const id = uuidv4()

    // Check if slug already exists
    const existingSlug = articles.find(article => article.slug === slug)
    if (existingSlug) {
      return NextResponse.json({ error: 'Article with this title already exists' }, { status: 400 })
    }

    let featuredImagePath: string | undefined

    // Handle file upload
    if (imageFile && imageFile.size > 0) {
      const fileName = id + path.extname(imageFile.name)
      const filePath = path.join(imagesDir, fileName)

      // Convert File to Buffer and save
      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      fs.writeFileSync(filePath, buffer)

      featuredImagePath = `/api/images/${fileName}`
    }

    const newArticle: Article = {
      id,
      slug,
      title,
      excerpt,
      content,
      publishDate: new Date().toISOString(),
      featuredImage: featuredImagePath,
      featured: featured || false,
    }

    articles.push(newArticle)
    writeArticles(articles)

    return NextResponse.json(newArticle, { status: 201 })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 })
  }
}