import { Play, Youtube } from 'lucide-react'

export default function LearnToSewPage() {
  // Sample YouTube videos - replace with actual video IDs
  const tutorials = [
    {
      id: '1',
      title: 'Sewing Basics for Beginners',
      videoId: 'dQw4w9WgXcQ', // Replace with actual YouTube video ID
      category: 'Basics',
      duration: '15:30',
    },
    {
      id: '2',
      title: 'How to Read a Sewing Pattern',
      videoId: 'dQw4w9WgXcQ',
      category: 'Basics',
      duration: '12:45',
    },
    {
      id: '3',
      title: 'Essential Sewing Techniques',
      videoId: 'dQw4w9WgXcQ',
      category: 'Techniques',
      duration: '20:15',
    },
    {
      id: '4',
      title: 'Making Your First Tote Bag',
      videoId: 'dQw4w9WgXcQ',
      category: 'Projects',
      duration: '25:00',
    },
    {
      id: '5',
      title: 'Zipper Installation Made Easy',
      videoId: 'dQw4w9WgXcQ',
      category: 'Techniques',
      duration: '18:20',
    },
    {
      id: '6',
      title: 'Fabric Selection Guide',
      videoId: 'dQw4w9WgXcQ',
      category: 'Tips',
      duration: '10:30',
    },
  ]

  const categories = ['All', 'Basics', 'Techniques', 'Projects', 'Tips']

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            Learn To Sew
          </h1>
          <p className="text-lg text-gray max-w-2xl mx-auto mb-6">
            Free video tutorials to help you master sewing techniques and create beautiful handmade items.
          </p>
          <a
            href="https://youtube.com/@moriiheartmade"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-brown-warm hover:text-brown-dark font-medium transition-smooth"
          >
            <Youtube className="w-5 h-5" />
            Subscribe to our YouTube channel
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-12 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              className="px-4 py-2 rounded-lg border border-beige text-sm font-medium text-charcoal hover:bg-cream hover:border-brown-warm transition-smooth"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Videos Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white border border-beige rounded-lg overflow-hidden hover-scale hover:shadow-md transition-smooth group cursor-pointer"
            >
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-beige">
                <img
                  src={`https://img.youtube.com/vi/${tutorial.videoId}/maxresdefault.jpg`}
                  alt={tutorial.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-smooth flex items-center justify-center">
                  <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-smooth">
                    <Play className="w-8 h-8 text-brown-warm ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                  {tutorial.duration}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <span className="text-xs font-medium text-brown-warm mb-2 inline-block">
                  {tutorial.category}
                </span>
                <h3 className="font-heading text-lg font-semibold text-black group-hover:text-brown-warm transition-smooth">
                  {tutorial.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video Section */}
        <div className="mt-16 bg-cream rounded-lg p-8">
          <h2 className="text-3xl font-heading font-semibold text-black mb-6 text-center">
            Featured Tutorial
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative aspect-video bg-beige rounded-lg overflow-hidden">
              {/* YouTube Embed - Replace with actual video ID */}
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Featured Tutorial"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-heading font-semibold text-black mb-2">
                Complete Beginner's Guide to Sewing
              </h3>
              <p className="text-gray">
                Everything you need to know to start your sewing journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
