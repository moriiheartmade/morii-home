import { ChevronDown } from 'lucide-react'

export default function FAQPage() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'What are PDF sewing patterns?',
          a: 'PDF sewing patterns are digital downloadable files that contain all the pattern pieces, instructions, and diagrams you need to create a handmade item. You can print them at home and use them immediately.',
        },
        {
          q: 'Do I need special software to open the patterns?',
          a: 'No, you only need a PDF reader like Adobe Acrobat Reader (free) to view and print the patterns. Most devices come with a PDF reader pre-installed.',
        },
        {
          q: 'Can I use these patterns to sell items I make?',
          a: 'Yes! You can sell finished items made from our patterns. However, you cannot resell, share, or distribute the pattern files themselves.',
        },
      ],
    },
    {
      category: 'Purchasing & Downloads',
      questions: [
        {
          q: 'How do I download my pattern after purchase?',
          a: 'After completing your payment through PayPal, you\'ll receive an email with download links. You can also access your patterns from the success page immediately after purchase.',
        },
        {
          q: 'How long do I have to download my pattern?',
          a: 'Your download links are valid for 48 hours and you can download each pattern up to 5 times. We recommend saving the files to your device immediately.',
        },
        {
          q: 'What payment methods do you accept?',
          a: 'We accept all major credit cards, debit cards, and PayPal through our secure PayPal checkout.',
        },
        {
          q: 'Will I be charged in my local currency?',
          a: 'All prices are shown in USD. Your bank or PayPal will convert to your local currency at checkout.',
        },
      ],
    },
    {
      category: 'Printing & Assembly',
      questions: [
        {
          q: 'How do I print the pattern?',
          a: 'Open the PDF file and print on standard letter or A4 paper. Make sure to print at 100% scale (no scaling). Each pattern includes a test square to verify correct printing.',
        },
        {
          q: 'Do I need a large format printer?',
          a: 'No! Our patterns are designed to print on regular home printers. You\'ll print multiple pages and tape them together following the assembly guide included in each pattern.',
        },
        {
          q: 'How much paper will I need?',
          a: 'This varies by pattern, but most patterns use 10-30 sheets of paper. The exact number is listed in each pattern description.',
        },
      ],
    },
    {
      category: 'Pattern Details',
      questions: [
        {
          q: 'What skill level are the patterns?',
          a: 'Each pattern is clearly marked as Beginner, Intermediate, or Advanced. Beginner patterns include extra detailed instructions and are perfect for those new to sewing.',
        },
        {
          q: 'What\'s included in each pattern?',
          a: 'Each pattern includes: full-size pattern pieces, detailed step-by-step instructions with diagrams, fabric requirements, and a list of needed supplies.',
        },
        {
          q: 'Are seam allowances included?',
          a: 'Yes, all our patterns include seam allowances (typically 1/4" or 3/8"). This is clearly marked on each pattern.',
        },
        {
          q: 'Can I resize the patterns?',
          a: 'Our patterns come in multiple sizes where applicable. We don\'t recommend resizing patterns as it can affect proportions and fit.',
        },
      ],
    },
    {
      category: 'Support & Refunds',
      questions: [
        {
          q: 'What if I have questions while making the pattern?',
          a: 'We\'re here to help! Email us at moriiheartmade@gmail.com with any questions. We typically respond within 24 hours.',
        },
        {
          q: 'Do you offer refunds?',
          a: 'Due to the digital nature of our products, we cannot offer refunds once the pattern has been downloaded. However, if you experience technical issues with your download, please contact us and we\'ll help resolve it.',
        },
        {
          q: 'What if the download link doesn\'t work?',
          a: 'Contact us immediately at moriiheartmade@gmail.com with your order number, and we\'ll send you a new download link.',
        },
      ],
    },
  ]

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-black mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray">
            Find answers to common questions about our sewing patterns
          </p>
        </div>
      </div>

      {/* FAQs */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {faqs.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-12">
            <h2 className="text-2xl font-heading font-semibold text-black mb-6">
              {section.category}
            </h2>
            <div className="space-y-4">
              {section.questions.map((faq, faqIdx) => (
                <details
                  key={faqIdx}
                  className="group bg-white border border-beige rounded-lg overflow-hidden"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-cream transition-smooth">
                    <h3 className="font-medium text-charcoal pr-4">
                      {faq.q}
                    </h3>
                    <ChevronDown className="w-5 h-5 text-gray flex-shrink-0 group-open:rotate-180 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6 text-gray leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Contact CTA */}
      <div className="bg-cream py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-semibold text-black mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-gray mb-8">
            We're here to help! Send us an email and we'll get back to you within 24 hours.
          </p>
          <a
            href="mailto:moriiheartmade@gmail.com"
            className="inline-flex items-center gap-2 bg-brown-warm text-white px-8 py-4 rounded-lg font-medium hover:bg-brown-dark transition-smooth"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  )
}
