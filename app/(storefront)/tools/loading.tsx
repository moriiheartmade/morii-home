export default function ToolsLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-cream py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="h-8 bg-beige rounded animate-pulse w-64 mx-auto mb-3"></div>
          <div className="h-4 bg-beige rounded animate-pulse w-96 mx-auto"></div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {[1, 2].map((section) => (
          <div key={section} className="mb-16">
            <div className="h-8 bg-beige rounded animate-pulse w-48 mb-8"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white border border-beige rounded-lg overflow-hidden">
                  <div className="aspect-[4/3] bg-beige animate-pulse"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-5 bg-beige rounded animate-pulse"></div>
                    <div className="h-3 bg-beige rounded animate-pulse w-full"></div>
                    <div className="h-3 bg-beige rounded animate-pulse w-2/3"></div>
                    <div className="h-8 bg-beige rounded animate-pulse w-full mt-4"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
