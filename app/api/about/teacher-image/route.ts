import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const TEACHER_IMAGE_PATH = path.join(process.cwd(), 'data', 'teacher-image.json')
const IMAGES_DIR = path.join(process.cwd(), 'data', 'images')

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.access(IMAGES_DIR)
  } catch {
    await fs.mkdir(IMAGES_DIR, { recursive: true })
  }
}

// Get current teacher image info
async function getTeacherImageInfo() {
  try {
    const data = await fs.readFile(TEACHER_IMAGE_PATH, 'utf-8')
    return JSON.parse(data)
  } catch {
    return null
  }
}

// Save teacher image info
async function saveTeacherImageInfo(info: { filename: string; originalName: string }) {
  await fs.writeFile(TEACHER_IMAGE_PATH, JSON.stringify(info, null, 2))
}

// GET - Retrieve teacher image
export async function GET() {
  try {
    const imageInfo = await getTeacherImageInfo()
    if (!imageInfo) {
      return new NextResponse('No teacher image found', { status: 404 })
    }

    const imagePath = path.join(IMAGES_DIR, imageInfo.filename)
    const imageBuffer = await fs.readFile(imagePath)

    // Determine content type based on file extension
    const ext = path.extname(imageInfo.filename).toLowerCase()
    const contentType = ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' :
                       ext === '.png' ? 'image/png' :
                       ext === '.gif' ? 'image/gif' :
                       'image/jpeg'

    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
      },
    })
  } catch (error) {
    console.error('Error retrieving teacher image:', error)
    return new NextResponse('Error retrieving image', { status: 500 })
  }
}

// POST - Upload teacher image
export async function POST(request: NextRequest) {
  try {
    await ensureDirectories()

    const formData = await request.formData()
    const file = formData.get('teacherImage') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 })
    }

    // Generate unique filename
    const ext = path.extname(file.name) || '.jpg'
    const filename = `teacher-${uuidv4()}${ext}`
    const filePath = path.join(IMAGES_DIR, filename)

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await fs.writeFile(filePath, buffer)

    // Save image info
    const imageInfo = {
      filename,
      originalName: file.name,
    }
    await saveTeacherImageInfo(imageInfo)

    return NextResponse.json({ success: true, filename })
  } catch (error) {
    console.error('Error uploading teacher image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

// DELETE - Remove teacher image
export async function DELETE() {
  try {
    const imageInfo = await getTeacherImageInfo()
    if (imageInfo) {
      // Delete the image file
      const imagePath = path.join(IMAGES_DIR, imageInfo.filename)
      try {
        await fs.unlink(imagePath)
      } catch (error) {
        console.warn('Could not delete image file:', error)
      }

      // Remove the info file
      try {
        await fs.unlink(TEACHER_IMAGE_PATH)
      } catch (error) {
        console.warn('Could not delete image info file:', error)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting teacher image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}