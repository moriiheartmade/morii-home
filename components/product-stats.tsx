interface ProductStatsProps {
  itemQuality: number
  shipping: number
  customerService: number
  buyersRecommend: number
}

export default function ProductStats({
  itemQuality = 5.0,
  shipping = 5.0,
  customerService = 5.0,
  buyersRecommend = 99,
}: ProductStatsProps) {
  const stats = [
    { label: 'Item quality', value: itemQuality.toFixed(1), isPercentage: false },
    { label: 'Shipping', value: shipping.toFixed(1), isPercentage: false },
    { label: 'Customer service', value: customerService.toFixed(1), isPercentage: false },
    { label: 'Buyers recommend', value: `${buyersRecommend}%`, isPercentage: true },
  ]

  return (
    <div className="bg-white border border-beige rounded-lg p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-brown-warm mb-2">
              <span className="text-xl font-heading font-semibold text-brown-warm">
                {stat.value}
              </span>
            </div>
            <div className="text-sm text-gray">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
