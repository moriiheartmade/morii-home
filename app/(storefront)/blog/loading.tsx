export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 bg-beige rounded animate-pulse w-48 mx-auto mb-4"></div>
          <div className="h-4 bg-beige rounded animate-pulse w-96 mx-auto"></div>
        </div>
      </div>

      {/* Featured Post */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-8 bg-cream rounded-lg overflow-hidden mb-16">
          <div className="aspect-video bg-beige animate-pulse"></div>
          <div className="p-8 space-y-4">
            <div className="h-4 bg-beige rounded animate-pulse w-24"></div>
            <div className="h-8 bg-beige rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-beige rounded animate-pulse w-full"></div>
            <div className="h-4 bg-beige rounded animate-pulse w-2/3"></div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white border border-beige rounded-lg overflow-hidden">
              <div className="aspect-video bg-beige animate-pulse"></div>
              <div className="p-6 space-y-3">
                <div className="h-4 bg-beige rounded animate-pulse w-20"></div>
                <div className="h-6 bg-beige rounded animate-pulse"></div>
                <div className="h-4 bg-beige rounded animate-pulse w-full"></div>
                <div className="h-4 bg-beige rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
