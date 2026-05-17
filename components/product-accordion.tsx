'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

interface AccordionItem {
  title: string
  content: string | string[] | { tools: string[]; materials: string[] }
  isHtml?: boolean
}

interface ProductAccordionProps {
  items: AccordionItem[]
}

function renderContentWithLinks(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
  const parts: (string | React.ReactElement)[] = []
  let lastIndex = 0
  let match

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }
    parts.push(
      <Link
        key={match.index}
        href={match[2]}
        className="text-brown-warm hover:text-brown-dark font-medium underline"
      >
        {match[1]}
      </Link>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

export default function ProductAccordion({ items }: ProductAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="border border-beige rounded-lg overflow-hidden">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-cream transition-smooth"
          >
            <span className="font-heading text-lg font-semibold text-black">
              {item.title}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-gray transition-transform duration-300 ${
                openIndex === index ? 'rotate-180' : ''
              }`}
            />
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-300 ${
              openIndex === index ? 'max-h-[1000px]' : 'max-h-0'
            }`}
          >
            <div className="p-4 pt-0 text-gray leading-relaxed">
              {typeof item.content === 'object' && 'tools' in item.content ? (
                // What You Need section
                <div className="space-y-4">
                  {item.content.tools && item.content.tools.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-black mb-2">Tools</h4>
                      <ul className="space-y-1">
                        {item.content.tools.map((tool, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brown-warm mt-1">•</span>
                            <span>{tool}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {item.content.materials && item.content.materials.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-black mb-2">Materials</h4>
                      <ul className="space-y-1">
                        {item.content.materials.map((material, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-brown-warm mt-1">•</span>
                            <span>{material}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : Array.isArray(item.content) ? (
                <ul className="space-y-2">
                  {item.content.map((line, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-brown-warm mt-1">•</span>
                      <span>{renderContentWithLinks(line)}</span>
                    </li>
                  ))}
                </ul>
              ) : item.isHtml ? (
                <div 
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              ) : (
                <p className="whitespace-pre-line">{renderContentWithLinks(item.content)}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
