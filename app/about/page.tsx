import type { Metadata } from 'next'
import TeacherImage from '@/components/TeacherImage'

export const metadata: Metadata = {
  title: 'About - The Transformed Mindset',
  description: 'Learn about our mission to help you develop a balanced, meaningful, and strategic mindset.',
}

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">About</h1>
          <p className="text-lg text-gray-600">Learn about my mission and what I can help you achieve.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Teacher Image */}
          <div className="order-2 md:order-1">
            <TeacherImage />
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-8">What I Can Offer You</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p className="text-lg">Greetings and welcome to my website.</p>

              <p>
                My mission is to assist you in establishing a more balanced, meaningful, strategic, and holistic mindset
                that promotes personal growth, fulfillment, and better health. By working together, we can help you
                consistently live out your personal life purpose and achieve more successful outcomes.
              </p>

              <p>I look forward to the opportunity to support you in creating a better version of yourself.</p>

              <div className="pt-6">
                <a
                  href="/contact"
                  className="inline-block px-8 py-3 bg-accent text-white font-semibold rounded-lg hover:bg-accent-dark transition"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-12 text-center">Core Values</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Mindset</h3>
              <p className="text-gray-600">
                Transform how you think about challenges and opportunities. Your mindset shapes your reality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Growth</h3>
              <p className="text-gray-600">
                Continuous improvement through discipline, intention, and strategic action toward your goals.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">Purpose</h3>
              <p className="text-gray-600">
                Live intentionally aligned with your values, creating meaningful outcomes and lasting fulfillment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
