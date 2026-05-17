import Link from 'next/link'
import { Check, X, ShoppingBag, Users, Building, HelpCircle } from 'lucide-react'

export const metadata = {
  title: 'Commercial License - Morii Home',
  description: 'Learn about selling products made from Morii Home sewing patterns. Commercial license information and terms.',
}

export default function CommercialLicensePage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-heading font-semibold text-black mb-4">
            Commercial License
          </h1>
          <p className="text-lg text-gray leading-relaxed">
            Everything you need to know about selling products made from my patterns
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Good News Section */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 mb-12">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-heading font-semibold text-black mb-3">
                Good News! You Can Sell Your Handmade Items
              </h2>
              <p className="text-gray leading-relaxed">
                When you purchase a pattern from Morii Home, you are automatically granted the right to sell 
                finished products made from that pattern. No additional license purchase is required for 
                small-scale handmade businesses.
              </p>
            </div>
          </div>
        </div>

        {/* License Tiers */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-black mb-8 text-center">
            License Types
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Personal License */}
            <div className="border border-beige rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-cream rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-brown-warm" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-black">Personal License</h3>
                  <p className="text-sm text-gray">Included with every pattern</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Make unlimited items for personal use</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Give as gifts to friends & family</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Sell up to 1000 finished items per year</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Sell at craft fairs, markets, Shopee, Etsy</span>
                </li>
              </ul>
              
              <div className="bg-cream rounded-lg p-4 text-center">
                <span className="text-2xl font-heading font-semibold text-brown-warm">FREE</span>
                <p className="text-sm text-gray">Included with pattern purchase</p>
              </div>
            </div>

            {/* Extended Commercial License */}
            <div className="border-2 border-brown-warm rounded-lg p-6 relative">
              <div className="absolute -top-3 left-4 bg-brown-warm text-white text-xs px-3 py-1 rounded-full">
                For Large Businesses
              </div>
              
              <div className="flex items-center gap-3 mb-4 mt-2">
                <div className="w-10 h-10 bg-brown-warm/10 rounded-full flex items-center justify-center">
                  <Building className="w-5 h-5 text-brown-warm" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-semibold text-black">Extended License</h3>
                  <p className="text-sm text-gray">For high-volume sellers</p>
                </div>
              </div>
              
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Everything in Personal License</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Sell unlimited finished items</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Use for manufacturing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-charcoal">Hire others to sew for you</span>
                </li>
              </ul>
              
              <div className="bg-cream rounded-lg p-4 text-center">
                <span className="text-2xl font-semibold text-brown-warm">$600</span>
                <p className="text-sm text-gray mb-4">Commercial license for all patterns</p>
                <button className="w-full bg-brown-warm text-white px-6 py-3 rounded-lg font-medium hover:bg-brown-dark transition-smooth">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* What's NOT Allowed */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-black mb-6">
            What's NOT Allowed
          </h2>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal">
                  <strong>Reselling or sharing the pattern files</strong> - The PDF pattern itself cannot be 
                  resold, shared, or distributed in any form
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal">
                  <strong>Mass production</strong> - Without an Extended License, you cannot produce more 
                  than 1000 items per pattern per year
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal">
                  <strong>Teaching or creating tutorials</strong> - You cannot use the pattern to create 
                  paid courses or tutorials without permission
                </span>
              </li>
              <li className="flex items-start gap-3">
                <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-charcoal">
                  <strong>Claiming the design as your own</strong> - Please credit "Pattern by Morii Home" 
                  when selling finished items
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Credit Requirements */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-black mb-6">
            How to Credit
          </h2>
          
          <div className="bg-cream rounded-lg p-6">
            <p className="text-gray mb-4">
              When selling finished items, I kindly ask that you include a credit to Morii Home. 
              Here are some examples:
            </p>
            <div className="space-y-3">
              <div className="bg-white rounded p-4 border border-beige">
                <p className="text-charcoal italic">"Made using a pattern by Morii Home"</p>
              </div>
              <div className="bg-white rounded p-4 border border-beige">
                <p className="text-charcoal italic">"Pattern: @moriihome"</p>
              </div>
              <div className="bg-white rounded p-4 border border-beige">
                <p className="text-charcoal italic">"Design by Morii Home - moriihome.com"</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-semibold text-black mb-6">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Can I sell items made from your patterns on Shopee/Etsy?",
                a: "Yes! You can sell finished items on any platform including Shopee, Etsy, Facebook, Instagram, or at local markets and craft fairs."
              },
              {
                q: "Do I need to buy a separate commercial license?",
                a: "No, for small businesses selling up to 1000 items per pattern per year, the license is included with your pattern purchase."
              },
              {
                q: "Can I modify the pattern design?",
                a: "Yes, you can make modifications to suit your style or customer needs. However, you still cannot share or resell the modified pattern file."
              },
              {
                q: "What if I want to sell more than 1000 items?",
                a: "Contact me for an Extended License. I'll work with you to find a fair arrangement based on your business needs."
              },
              {
                q: "Can I hire someone to sew for me?",
                a: "With the Personal License, you should be doing the sewing yourself. If you need to outsource production, please contact me for an Extended License."
              },
            ].map((faq, idx) => (
              <div key={idx} className="border border-beige rounded-lg p-5">
                <div className="flex items-start gap-3">
                  <HelpCircle className="w-5 h-5 text-brown-warm flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-black mb-2">{faq.q}</h3>
                    <p className="text-gray text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-cream rounded-lg p-8 text-center">
          <h2 className="text-2xl font-heading font-semibold text-black mb-4">
            Have Questions?
          </h2>
          <p className="text-gray mb-6">
            If you have any questions about commercial use or need an Extended License, 
            feel free to reach out!
          </p>
          <a
            href="mailto:moriiheartmade@gmail.com"
            className="inline-flex items-center gap-2 bg-brown-warm text-white px-6 py-3 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
          >
            Contact Me
          </a>
        </div>
      </div>
    </div>
  )
}
