import { Download, FileText, Sparkles, User } from 'lucide-react'

interface ProductHighlightsProps {
  designer?: string
  fileType?: string
  difficulty?: string
}

export default function ProductHighlights({ 
  designer = 'Morii Home',
  fileType = 'PDF',
  difficulty = 'Beginner-friendly'
}: ProductHighlightsProps) {
  const highlights = [
    {
      icon: User,
      label: 'Designed by',
      value: designer,
    },
    {
      icon: Sparkles,
      label: 'Perfect for',
      value: 'Home decor & business',
    },
    {
      icon: Download,
      label: 'Digital download',
      value: 'Instant access',
    },
    {
      icon: FileText,
      label: 'Digital file type',
      value: fileType,
    },
  ]

  return (
    <div className="bg-cream rounded-lg p-6 border border-beige">
      <h3 className="font-heading text-xl font-semibold text-black mb-4">
        Highlights
      </h3>
      <div className="space-y-3">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <item.icon className="w-5 h-5 text-brown-warm flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm text-gray">{item.label}</div>
              <div className="font-medium text-charcoal">{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
