import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

const faqs = [
  {
    question: 'What permits do I need for well drilling in Colorado?',
    answer: 'You must obtain a well permit from the Colorado Division of Water Resources (DWR) before drilling any groundwater well in Colorado. Most private domestic wells are "exempt" from the priority system and don\'t require augmentation. Exempt wells are limited to 15 gallons per minute and require non-evaporative wastewater systems. The two most common types are Household-Use Only wells and Domestic and Livestock wells. Well permits issued after May 8, 1972 on properties under 35 acres are typically permitted for household-use only—water can only be used inside the home.',
    source: 'Colorado Division of Water Resources',
    sourceUrl: 'https://dwr.colorado.gov/services/well-permitting',
  },
  {
    question: 'How much does it cost to drill a well in Colorado?',
    answer: 'Well drilling costs in Colorado range from $28 to $62+ per foot, depending on location and geology. Mountain wells in hard rock (granite, gneiss) cost more, while Eastern Plains wells in sand/gravel are less expensive. A complete private well system typically costs $10,000 to $50,000, depending on depth. Well permits cost $500 to $1,200 through the Colorado Division of Water Resources. Additional costs include pump installation ($1,500-$3,000), pressure tank, and hookup.',
    source: 'HomeGuide & Land Limited',
    sourceUrl: 'https://homeguide.com/costs/well-drilling-cost',
  },
  {
    question: 'How long does well drilling take?',
    answer: 'The complete process from permit to potable water takes 2 to 4 months. The Colorado DWR reviews permit applications in the order received, with complete applications taking up to 49 days (about 7 weeks). The drilling phase lasts 1 to 3 weeks depending on depth and geological conditions. Completion and testing require another 1 to 2 weeks for casing and pump installation. Within 60 days of completion, your contractor must submit a Well Construction and Yield Estimate Report to the DWR.',
    source: 'Colorado Division of Water Resources',
    sourceUrl: 'https://dwr.colorado.gov/services/well-permitting',
  },
  {
    question: 'What water quality testing is required?',
    answer: 'Colorado has no state regulations requiring private well water testing—private water supplies are not regulated by local or state agencies. However, the EPA and Colorado Department of Public Health recommend testing annually for coliform bacteria and nitrates. In some counties, testing is mandatory for real estate transactions. The standard is less than one coliform bacterium per 100mL. If bacteria are detected, do not consume the water until a follow-up test confirms it\'s safe. Testing costs $100-$350 depending on what\'s included.',
    source: 'Jefferson County & CDPHE',
    sourceUrl: 'https://www.jeffco.us/4676/Mandatory-Well-Water-Quality-Testing-Req',
  },
  {
    question: 'How deep will my well need to be?',
    answer: 'Well depth in Douglas County varies significantly by location, typically ranging from 200 to 800+ feet. The Dawson aquifer (shallowest, commonly used for domestic wells) has a maximum depth of about 600 feet. The Denver aquifer reaches approximately 1,300 feet, the Arapahoe up to 1,700 feet, and the Laramie-Fox Hills (deepest) can exceed 2,400 feet. Your required depth depends on which aquifer you\'re accessing and your specific location within the county.',
    source: 'Douglas County Government',
    sourceUrl: 'https://www.douglas.co.us/planning/water-resources/denver-basin-aquifer-info/',
  },
  {
    question: 'What aquifers are available in Douglas County?',
    answer: 'Douglas County sits above the Denver Basin, composed of four major bedrock aquifers stacked on top of each other. From shallowest to deepest: the Dawson aquifer (400-1,200 ft thick, max depth ~600 ft), the Denver aquifer (800-1,000 ft thick, max depth ~1,300 ft), the Arapahoe aquifer (up to 400 ft thick, max depth ~1,700 ft), and the Laramie-Fox Hills aquifer (up to 350 ft thick, max depth ~2,400 ft). The Dawson is most commonly tapped by domestic wells due to its shallow depth.',
    source: 'USGS & Douglas County',
    sourceUrl: 'https://www.usgs.gov/mission-areas/water-resources/science/denver-basin-aquifer-system',
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
            Expert answers about well drilling in Colorado, backed by official sources
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
                  openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {faq.answer}
                  </p>
                  <a
                    href={faq.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    <span>Source: {faq.source}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
