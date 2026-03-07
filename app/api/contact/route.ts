import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

interface ContactRequest {
  name: string
  email: string
  message: string
}

// Ensure this route has access to Node.js APIs (nodemailer needs it)
export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const body: ContactRequest = await request.json()

    // Server-side validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    if (body.name.length < 2 || body.name.length > 100) {
      return NextResponse.json({ error: 'Name must be between 2 and 100 characters' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    if (body.message.length < 10 || body.message.length > 5000) {
      return NextResponse.json({ error: 'Message must be between 10 and 5000 characters' }, { status: 400 })
    }

    // If the environment isn't configured yet, keep the behavior safe for local dev.
    const recipient = process.env.CONTACT_EMAIL_TO || process.env.EMAIL_TO

    if (!recipient) {
      console.warn('Contact email recipient not configured. Message will not be sent.')
      console.log('Contact form submission:', {
        name: body.name,
        email: body.email,
        message: body.message,
        timestamp: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message:
          'Message received. (Email sending is not configured yet; set CONTACT_EMAIL_TO in your environment.)',
      })
    }

    await sendEmail({
      to: recipient,
      subject: `New message from ${body.name} via The Transformed Mindset`,
      text: `Name: ${body.name}\nEmail: ${body.email}\n\nMessage:\n${body.message}`,
      html: `<p><strong>Name:</strong> ${body.name}</p><p><strong>Email:</strong> ${body.email}</p><p><strong>Message:</strong></p><p>${body.message}</p>`,
    })

    return NextResponse.json({ success: true, message: 'Message sent successfully' }, { status: 200 })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
  }
}
