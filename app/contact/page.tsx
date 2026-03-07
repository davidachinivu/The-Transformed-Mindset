import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact - The Transformed Mindset',
  description: 'Get in touch with us. Send a message and let\'s start your transformation journey.',
}

export default function ContactPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">Get in Touch</h1>
          <p className="text-lg text-gray-600">
            Have a question or want to connect? Send me a message and I'll get back to you as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Contact Info */}
          <div className="md:col-span-1">
            <div className="space-y-8">
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">
                  For inquiries, use the form or reach out directly.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600">
                  I typically respond within 24-48 hours.
                </p>
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">Follow</h3>
                <p className="text-gray-600">
                  Stay updated with new articles and insights.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6">Why Connect?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                Interested in partnerships, guest articles, or speaking opportunities? Let's talk about how we can work
                together.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">Feedback</h3>
              <p className="text-gray-600">
                Your feedback helps me create better content. Share your thoughts on articles, suggestions, or topics
                you'd like to explore.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">Questions</h3>
              <p className="text-gray-600">
                Have questions about mindset, discipline, or personal development? I'm here to help and provide guidance.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                Join our growing community of people committed to personal transformation and continuous improvement.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
