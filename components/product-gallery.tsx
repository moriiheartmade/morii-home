'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ProductGalleryProps {
  images: string[]
  title: string
  badges?: {
    bestseller?: boolean
    featured?: boolean
  }
}

export default function ProductGallery({ images, title, badges }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const allImages = images.length > 0 ? images : ['/placeholder.jpg']

  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="flex gap-4">
      {/* Vertical Thumbnails - Etsy Style */}
      <div className="flex flex-col gap-2 w-20">
        {allImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className={`relative aspect-square bg-beige rounded-lg overflow-hidden border-2 transition-all ${
              selectedIndex === idx
                ? 'border-brown-warm'
                : 'border-transparent hover:border-beige'
            }`}
          >
            <Image
              src={img}
              alt={`${title} - Image ${idx + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1">
        <div className="relative aspect-square bg-beige rounded-lg overflow-hidden group">
          <Image
            src={allImages[selectedIndex]}
            alt={title}
            fill
            className="object-cover"
            priority
          />

          {/* Badges */}
          {badges && (
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
              {badges.bestseller && (
                <span className="bg-orange-100 text-orange-800 text-sm font-medium px-3 py-1.5 rounded border border-orange-200">
                  Bestseller
                </span>
              )}
              {badges.featured && (
                <span className="bg-black text-white text-sm font-medium px-3 py-1.5 rounded">
                  Featured
                </span>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {allImages.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 text-charcoal" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 text-charcoal" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {allImages.length > 1 && (
            <div className="absolute bottom-4 right-4 bg-black/70 text-white text-sm px-3 py-1.5 rounded">
              {selectedIndex + 1} / {allImages.length}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
