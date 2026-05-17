import { getSupabase } from '@/lib/db'
import { ExternalLink } from 'lucide-react'

export const revalidate = 3600

// Mock data - sẽ được thay thế bằng database sau
const mockTools = [
  // Essential Tools
  {
    id: '1',
    title: 'Brother Electronic Sewing Machine',
    description: 'The most basic machine I recommend. This is a perfectly adequate machine to start your sewing journey.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71VRNHd6sTL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00JBKVN8S',
    active: true,
  },
  {
    id: '2',
    title: 'Steam Iron',
    description: 'High-quality iron with powerful steam, helps iron fabric quickly and efficiently.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61vJd+YoSQL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00L9J4L0A',
    active: true,
  },
  {
    id: '3',
    title: 'Self-Healing Cutting Mat',
    description: 'Professional cutting mat 24" x 36", self-healing surface protects your rotary cutter blade.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71xQHqL8VoL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07MPB4GN4',
    active: true,
  },
  {
    id: '4',
    title: 'Rotary Cutter',
    description: 'Essential tool for cutting fabric accurately and efficiently. Sharp blade, easy to replace.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61KvVHqW8LL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B000BNLLHW',
    active: true,
  },
  {
    id: '5',
    title: 'Fabric Scissors',
    description: 'Sharp 8-inch fabric scissors with ergonomic design for easy and precise cutting.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/61Y+pqGqVyL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00006IFN9',
    active: true,
  },
  {
    id: '6',
    title: 'Quilting Ruler',
    description: 'Clear ruler with precise markings, ideal for measuring and cutting fabric accurately.',
    category: 'Essential Tools',
    image_url: 'https://m.media-amazon.com/images/I/71nJRGQdJeL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B001AQXZZ8',
    active: true,
  },
  
  // Other Supplies
  {
    id: '7',
    title: 'Fabric Pins',
    description: 'Box of 100 high-quality pins with round heads, won\'t damage fabric.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71zKqNvLGgL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B00114PXJW',
    active: true,
  },
  {
    id: '8',
    title: 'Wristband Pin Cushion',
    description: 'Convenient wrist strap to hold pins, keeps pins within reach while sewing.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71QqXVqLvPL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B016TJHNHS',
    active: true,
  },
  {
    id: '9',
    title: 'Measuring Tape',
    description: 'Flexible 60-inch tape measure, dual-sided with inches and cm, essential for measuring.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71hqYXqLVbL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B0001DSIVY',
    active: true,
  },
  {
    id: '10',
    title: 'Multi-Color Thread Set',
    description: 'Set of 24 multi-color thread spools, high quality, suitable for all sewing projects.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/81vZKGZ8YnL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07FKDXNQD',
    active: true,
  },
  {
    id: '11',
    title: 'Fabric Marking Pens',
    description: 'Set of self-erasing fabric markers, leaves no trace, ideal for marking seam lines.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/71kQqXqLvPL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B07FKDXNQD',
    active: true,
  },
  {
    id: '12',
    title: 'Thread Snips',
    description: 'Compact 4-inch scissors, sharp, perfect for cutting excess thread and small details.',
    category: 'Other Supplies',
    image_url: 'https://m.media-amazon.com/images/I/61Y+pqGqVyL._AC_SL1500_.jpg',
    amazon_url: 'https://www.amazon.com/dp/B000YZVGQQ',
    active: true,
  },
]

export default async function ToolsPage() {
  const supabase = getSupabase()

  const { data: toolsData } = await supabase
    .from('tools')
    .select('*')
    .eq('active', true)
    .order('category', { ascending: true })
    .order('created_at', { ascending: false })

  // Use mock data if Supabase returns no data
  const tools = toolsData && toolsData.length > 0 ? toolsData : mockTools

  // Group tools by category
  const categories = Array.from(new Set(tools.map((tool: any) => tool.category)))

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            Sewing Tools & Supplies
          </h1>
          <p className="text-lg text-gray max-w-2xl mx-auto">
            My recommended tools and supplies for sewing. These are the products I use and trust.
          </p>
        </div>
      </div>

      {/* Tools by Category */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((category) => {
          const categoryTools = tools.filter((tool: any) => tool.category === category)
          
          return (
            <div key={category} className="mb-16 last:mb-0">
              <h2 className="text-3xl font-heading font-semibold text-black mb-8">
              {category}
            </h2>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTools.map((tool: any) => (
                  <div
                    key={tool.id}
                    className="bg-white border border-beige rounded-lg overflow-hidden hover-scale hover:shadow-md transition-smooth"
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-beige overflow-hidden">
                      {tool.image_url ? (
                        <img
                          src={tool.image_url}
                          alt={tool.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-light">
                          No image
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Title */}
                      <h3 className="font-heading text-xl font-semibold text-black mb-3">
                        {tool.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray text-sm mb-4 line-clamp-3">
                        {tool.description}
                      </p>

                      {/* Shop Button */}
                      <a
                        href={tool.amazon_url}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="inline-flex items-center gap-2 bg-brown-warm text-white px-6 py-3 rounded-lg font-medium hover:bg-brown-dark transition-smooth w-full justify-center"
                      >
                        View Now
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}

        {tools.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray text-lg">No tools available yet.</p>
            <p className="text-sm text-gray-light mt-2">Check back soon for recommended sewing tools!</p>
          </div>
        )}
      </div>

    </div>
  )
}
