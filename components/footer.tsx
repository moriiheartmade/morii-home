import Link from 'next/link'
import { Mail, Youtube, Instagram } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-semibold text-white mb-4">
              Morii Heartmade
            </h3>
            <p className="text-gray-light text-sm leading-relaxed">
              PDF sewing patterns for home decor and handmade business. From my creative space to yours.
            </p>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="mailto:moriiheartmade@gmail.com"
                className="text-gray-light hover:text-white transition-smooth"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@moriiheartmade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-light hover:text-white transition-smooth"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/moriiheartmade"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-light hover:text-white transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Sewing Patterns */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">Sewing Patterns</h4>
            <ul className="space-y-2 text-sm text-gray-light">
              <li>
                <Link href="/products?category=home-decor" className="hover:text-white transition-smooth">
                  Home Decor
                </Link>
              </li>
              <li>
                <Link href="/products?category=bags" className="hover:text-white transition-smooth">
                  Bags
                </Link>
              </li>
              <li>
                <Link href="/products?category=keychains-plushies" className="hover:text-white transition-smooth">
                  Keychains/Plushies
                </Link>
              </li>
              <li>
                <Link href="/products?category=accessories" className="hover:text-white transition-smooth">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/products?category=other" className="hover:text-white transition-smooth">
                  Other
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2 text-sm text-gray-light">
              <li>
                <Link href="/about" className="hover:text-white transition-smooth">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-smooth">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-smooth">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-smooth">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/commercial-license" className="hover:text-white transition-smooth">
                  Commercial License
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-base font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-light">
              <li>
                <Link href="/tools" className="hover:text-white transition-smooth">
                  Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-smooth">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-smooth">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray text-center text-sm text-gray-light">
          <p>
            &copy; {new Date().getFullYear()} Morii Heartmade. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
