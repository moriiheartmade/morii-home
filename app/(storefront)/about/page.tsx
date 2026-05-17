import { Heart, Star, Users, Award } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-cream py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-semibold text-black mb-6">
            About Morii Home
          </h1>
          <p className="text-xl text-gray leading-relaxed">
            One person's passion for sewing, shared with the world
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-6">
              My Story
            </h2>
            <div className="space-y-4 text-lg text-gray leading-relaxed">
              <p>
                Hi! I'm the creator behind Morii Home. What started as a personal love for sewing and home decor
                has grown into a passion project helping people create beautiful handmade items for their homes
                and businesses.
              </p>
              <p>
                Every pattern you find here is designed, tested, and proven by me personally. I use these exact
                patterns to create real products sold on my Shopee store - so you can trust they work! My customers
                love these designs for decorating their homes or starting their own handmade businesses.
              </p>
              <p>
                Whether you're looking to add a personal touch to your home decor, create thoughtful handmade gifts,
                or start a small business selling handmade items, my patterns are designed to help you succeed.
                I'm here to support you every step of the way!
              </p>
            </div>
          </div>
          <div className="bg-beige rounded-lg h-96 flex items-center justify-center">
            <p className="text-gray-light">Image: Workspace/Studio photo</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-8 mb-20">
          {[
            { icon: Users, label: 'Happy Customers', value: '10,000+' },
            { icon: Star, label: 'Patterns Created', value: '50+' },
            { icon: Award, label: 'Years Experience', value: '5+' },
            { icon: Heart, label: 'Projects Made', value: '50,000+' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cream rounded-full mb-4">
                <stat.icon className="w-8 h-8 text-brown-warm" />
              </div>
              <div className="text-3xl font-heading font-semibold text-black mb-2">
                {stat.value}
              </div>
              <div className="text-gray">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Shopee Store */}
        <div className="bg-cream rounded-lg p-12 mb-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-6">
              Proven Through My Shopee Store
            </h2>
            <p className="text-lg text-gray mb-8 leading-relaxed">
              Every pattern is battle-tested! I use these patterns to create real products sold on my Shopee store.
              Customers love them for home decor and as a foundation for their own handmade businesses.
              When you buy a pattern, you're getting a design that's proven to work in real life.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-heading font-semibold text-black mb-1">4.9/5</div>
                <div className="text-sm text-gray">Average Rating</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-heading font-semibold text-black mb-1">5,000+</div>
                <div className="text-sm text-gray">Shopee Sales</div>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="text-2xl font-heading font-semibold text-black mb-1">98%</div>
                <div className="text-sm text-gray">Satisfaction Rate</div>
              </div>
            </div>
            <a
              href="https://shopee.vn/moriiheartmade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brown-warm hover:text-brown-dark font-medium transition-smooth"
            >
              Visit my Shopee Store →
            </a>
          </div>
        </div>

        {/* YouTube Channel */}
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-8">
            Meet Me on YouTube
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-beige rounded-lg aspect-video flex items-center justify-center mb-8">
              <p className="text-gray-light">YouTube video embed</p>
            </div>
            <a
              href="https://youtube.com/@moriiheartmade"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-3 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
            >
              Subscribe on YouTube
            </a>
          </div>
        </div>

        {/* Values */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-12">
            My Promise to You
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality First',
                description: 'Every pattern is thoroughly tested and refined to ensure your success.',
              },
              {
                title: 'Clear Instructions',
                description: 'Detailed step-by-step guides with diagrams make sewing enjoyable.',
              },
              {
                title: 'Community Support',
                description: 'I\'m here to help you succeed with personal, responsive support.',
              },
            ].map((value, idx) => (
              <div key={idx} className="p-6">
                <h3 className="font-heading text-xl font-semibold text-black mb-3">
                  {value.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Policies Section */}
        <div className="bg-cream rounded-lg p-12 mb-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-8 text-center">
              Policies & Information
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: 'Commercial License',
                  description: 'Learn about selling products made with our patterns',
                  href: '/commercial-license',
                },
                {
                  title: 'FAQ',
                  description: 'Frequently asked questions about our patterns',
                  href: '/faq',
                },
                {
                  title: 'Learn to Sew',
                  description: 'Tutorials and guides for beginners',
                  href: '/learn-to-sew',
                },
                {
                  title: 'Tools & Supplies',
                  description: 'Recommended tools for your sewing projects',
                  href: '/tools',
                },
                {
                  title: 'Blog',
                  description: 'Tips, tutorials, and inspiration',
                  href: '/blog',
                },
                {
                  title: 'Contact Us',
                  description: 'Get in touch with any questions',
                  href: 'mailto:hello@moriiheartmade.com',
                },
              ].map((policy, idx) => (
                <Link
                  key={idx}
                  href={policy.href}
                  className="bg-white p-5 rounded-lg border border-beige hover:border-brown-warm hover:shadow-sm transition-smooth group"
                >
                  <h3 className="font-heading text-lg font-semibold text-black mb-2 group-hover:text-brown-warm transition-smooth">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray leading-relaxed">
                    {policy.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-black mb-6">
            Start Your Sewing Journey
          </h2>
          <p className="text-lg text-gray mb-8">
            Browse our collection of patterns and create something beautiful today
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
          >
            Browse Patterns
          </Link>
        </div>
      </div>
    </div>
  )
}
