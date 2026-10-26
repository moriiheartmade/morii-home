export default function ProductsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 bg-beige rounded animate-pulse w-64 mb-4"></div>
          <div className="h-4 bg-beige rounded animate-pulse w-96"></div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-beige rounded-full animate-pulse w-24"></div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white border border-beige rounded-lg overflow-hidden">
              <div className="aspect-square bg-beige animate-pulse"></div>
              <div className="p-4 space-y-3">
                <div className="h-6 bg-beige rounded animate-pulse"></div>
                <div className="h-4 bg-beige rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-beige rounded animate-pulse w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
