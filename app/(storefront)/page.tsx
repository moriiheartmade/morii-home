import Link from 'next/link'
import { ArrowRight, Scissors, Heart, Star, Package, Shirt, Home, Sparkles } from 'lucide-react'
import { mockPatterns, mockCategories } from '@/lib/mock-data'
import ProductCard from '@/components/product-card'

export default function HomePage() {
  // Get featured patterns
  const featuredPatterns = mockPatterns.filter(p => p.featured).slice(0, 3)
  const bestsellers = mockPatterns.filter(p => p.bestseller).slice(0, 3)
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cream py-24 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-heading font-semibold text-black mb-6">
              Morii Home
            </h1>
            <p className="text-xl md:text-2xl text-gray max-w-3xl mx-auto mb-8 leading-relaxed">
              PDF sewing patterns for home decor and handmade business.
              <br />
              From my creative space to yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
              >
                Browse Patterns
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 opacity-20">
          <Scissors className="w-16 h-16 text-brown-warm" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-20">
          <Heart className="w-16 h-16 text-brown-warm" />
        </div>
      </section>

      {/* About Morii Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-6">
                About Morii Home
              </h2>
              <p className="text-lg text-gray mb-4 leading-relaxed">
                Hi! I'm the creator behind Morii Home. I design detailed, beginner-friendly PDF sewing patterns
                for home decor, bags, and accessories - perfect for DIY enthusiasts and handmade business owners.
              </p>
              <p className="text-lg text-gray mb-6 leading-relaxed">
                Every pattern is tested in real life! I use these exact patterns to create products sold on my Shopee store,
                loved by customers who appreciate quality handmade items.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-brown-warm font-medium hover:text-brown-dark transition-smooth"
              >
                Learn more about my story
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-beige rounded-lg h-96 flex items-center justify-center">
              <p className="text-gray-light">Image placeholder</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-semibold text-black mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-gray">
              Find the perfect pattern for your next project
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => {
              const icons = {
                bags: Package,
                other: Shirt,
                accessories: Sparkles,
                'home-decor': Home,
              }
              const Icon = icons[category.slug as keyof typeof icons] || Package

              return (
                <Link
                  key={category.id}
                  href={`/products?category=${category.slug}`}
                  className="group bg-cream rounded-lg p-8 text-center hover-scale hover:bg-beige transition-smooth border border-beige"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 group-hover:bg-brown-warm group-hover:text-white transition-smooth">
                    <Icon className="w-8 h-8 text-brown-warm group-hover:text-white" />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-black mb-2 group-hover:text-brown-warm transition-smooth">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray">
                    {category.description}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* YouTube Channel */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
              Meet Me on YouTube!
            </h2>
            <p className="text-xl text-gray max-w-3xl mx-auto whitespace-nowrap">
              Daily life, building a small business, sewing tutorials, and behind-the-scenes content
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* YouTube Video - 3 columns */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg overflow-hidden border border-beige">
                <div className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                    title="Morii Home YouTube Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Content - 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-black mb-4">
                  Follow Morii Home
                </h3>
                <p className="text-lg text-gray mb-6 leading-relaxed">
                  The channel shares sewing tutorials, stories about building a small business, and my reflections on daily life. I hope they are useful to you.
                </p>
              </div>

              <a
                href="https://youtube.com/@moriiheartmade"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-brown-warm text-white px-6 py-3 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                Subscribe on YouTube
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shopee Showcase */}
      <section className="py-20 bg-cream border-b border-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
              Morii Home Patterns Are Trusted by Many Customers
            </h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Each pattern comes with detailed instructions. Loved by many customers and successfully sewn.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-5xl font-heading font-semibold text-brown-warm mb-2">
                10,000+
              </div>
              <div className="text-lg text-gray">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-heading font-semibold text-brown-warm mb-2">
                4.9/5
              </div>
              <div className="text-lg text-gray">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-heading font-semibold text-brown-warm mb-2">
                50,000+
              </div>
              <div className="text-lg text-gray">Projects Made</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-8 md:p-12 border border-beige">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-heading font-semibold text-black mb-4">
                  Proven Through My Store in Vietnam
                </h3>
                <p className="text-lg text-gray mb-6 leading-relaxed">
                  Products made from my pattern designs have been purchased and used by thousands of customers on the Shopee e-commerce platform.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray">5,000+ Shopee sales</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray">98% satisfaction rate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray">Verified customer reviews</span>
                  </div>
                </div>
                <a
                  href="https://shopee.vn/morii.byheartmade"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brown-warm hover:text-brown-dark font-medium transition-smooth"
                >
                  Visit our Shopee Store
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              <div className="bg-cream rounded-lg p-6">
                <div className="aspect-video bg-beige rounded-lg flex items-center justify-center mb-4">
                  <p className="text-gray-light">Shopee Store Screenshot</p>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="w-10 h-10 bg-brown-warm rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-medium">
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-sm text-gray">
                    <div className="font-medium text-black">1000+ reviews</div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-brown-warm text-brown-warm" />
                      <span>4.9 average rating</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray italic">
                  "The product is very beautiful and useful. The product design idea is good, I really appreciate it!"
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Patterns */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-heading font-semibold text-black mb-2">
                Popular Patterns
              </h2>
              <p className="text-lg text-gray">
                Our bestselling and most loved patterns - tried and tested by thousands of makers
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center gap-2 text-brown-warm hover:text-brown-dark font-medium transition-smooth"
            >
              Shop All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Show 6 patterns: mix of featured and bestsellers */}
            {mockPatterns.filter(p => p.featured || p.bestseller).slice(0, 6).map((pattern) => (
              <ProductCard key={pattern.id} pattern={pattern} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
            >
              Shop All Patterns
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-heading font-semibold text-black text-center mb-12">
            Why Choose Our Patterns?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Star,
                title: 'Tested & Proven',
                description: 'Every pattern is tested through our successful Shopee store with real customer feedback.',
              },
              {
                icon: Heart,
                title: 'Detailed Instructions',
                description: 'Step-by-step guides with clear diagrams make sewing enjoyable for all skill levels.',
              },
              {
                icon: Scissors,
                title: 'Instant Download',
                description: 'Get your pattern immediately after purchase. Start sewing right away!',
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-lg border border-beige hover-scale">
                <feature.icon className="w-12 h-12 text-brown-warm mb-4" />
                <h3 className="text-xl font-heading font-semibold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-semibold text-black mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-gray">
              Join thousands of happy makers worldwide
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah M.',
                text: 'The pattern instructions are very clear and easy to follow! I made my first bag and it turned out perfect. Highly recommended for beginners!',
                rating: 5,
              },
              {
                name: 'Emily R.',
                text: 'I\'ve purchased several patterns and they\'re all excellent quality. The instructions are detailed and the finished products look professional.',
                rating: 5,
              },
              {
                name: 'Jessica L.',
                text: 'I really love these pattern designs! I started a small business selling home decor accessories using these patterns. A great investment!',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-cream rounded-lg p-6 border border-beige">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-brown-warm text-brown-warm" />
                  ))}
                </div>
                <p className="text-gray mb-4 leading-relaxed">
                  "{testimonial.text}"
                </p>
                <p className="font-medium text-charcoal">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* Newsletter */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-semibold text-black mb-4">
            Stay Updated
          </h2>
          <p className="text-lg text-gray mb-8">
            Get new pattern releases, sewing tips, and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 border border-beige rounded-lg focus:outline-none focus:ring-2 focus:ring-brown-warm"
            />
            <button className="bg-brown-warm text-white px-8 py-3 rounded-lg font-medium hover:bg-brown-dark transition-smooth whitespace-nowrap">
              Subscribe
            </button>
          </div>
          <p className="text-sm text-gray mt-4">
            No spam, unsubscribe anytime
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-6">
            Ready to Start Sewing?
          </h2>
          <p className="text-xl text-gray mb-8">
            Browse our collection of patterns and create something beautiful today.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth text-lg"
          >
            View All Patterns
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
