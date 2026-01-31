import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'What permits do I need for well drilling in Colorado?',
    answer: 'In Colorado, you need a well permit from the Colorado Division of Water Resources before drilling. The permit ensures your well complies with state water laws and won\'t interfere with existing water rights. Douglas County may also require additional local permits. The permitting process typically takes 2-4 weeks.',
  },
  {
    question: 'How much does it cost to drill a well in Douglas County?',
    answer: 'Well drilling costs in Douglas County typically range from $15-$30 per foot, depending on ground conditions and depth. Most residential wells are 300-500 feet deep, putting total drilling costs between $4,500-$15,000. Additional costs include the pump ($1,500-$3,000), pressure tank, and hookup which can add $3,000-$5,000.',
  },
  {
    question: 'How long does well drilling take?',
    answer: 'The actual drilling typically takes 1-3 days for a residential well. However, the complete process from permit application to a functioning well usually takes 4-8 weeks. This includes permitting (2-4 weeks), scheduling (1-2 weeks), drilling (1-3 days), and pump installation (1-2 days).',
  },
  {
    question: 'What water quality testing is required?',
    answer: 'Colorado requires testing for coliform bacteria before a well can be used for drinking water. Additional recommended tests include nitrates, pH, hardness, and common contaminants. Many homeowners also test for arsenic and uranium, which can occur naturally in Colorado groundwater. Testing typically costs $100-$300.',
  },
  {
    question: 'How deep will my well need to be?',
    answer: 'Well depth in Douglas County varies significantly by location. Most residential wells range from 200-600 feet, with some areas requiring depths over 800 feet. Our elevation report helps you understand what nearby wells have found, giving you a better estimate for your specific location.',
  },
  {
    question: 'What aquifers are available in Douglas County?',
    answer: 'Douglas County sits above several aquifers including the Denver Basin aquifers: Dawson, Denver, Arapahoe, and Laramie-Fox Hills. The Dawson is typically the shallowest (100-400 ft) while Laramie-Fox Hills is deepest (1,000+ ft). Your well report will show which aquifers nearby wells have tapped.',
  },
];

export function ChatbotSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about well drilling in Douglas County
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                )}
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
