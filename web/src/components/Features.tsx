import { useState } from 'react';
import { MapPin, Star, DollarSign, FileText, Shield, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

const features = [
  {
    icon: MapPin,
    title: 'Local Company Directory',
    description: 'Access a comprehensive database of verified well drilling companies across all Colorado counties.',
    image: 'https://images.unsplash.com/photo-1754299096126-9d69cde326c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXAlMjBsb2NhdGlvbiUyMHBpbnxlbnwxfHx8fDE3NjI5NzcyMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    icon: Star,
    title: 'Verified Reviews',
    description: 'Read real reviews from Colorado homeowners who have used these drilling services.',
    image: 'https://images.unsplash.com/photo-1680824564256-23b8ed3ab519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXZlJTIwc3RhciUyMHJhdGluZ3xlbnwxfHx8fDE3NjI5Nzc4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    icon: DollarSign,
    title: 'Better Negotiation Power',
    description: 'Armed with multiple quotes and market data, negotiate the best price for your well drilling project.',
    image: 'https://images.unsplash.com/photo-1707779491435-000c45820db2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25leSUyMHNhdmluZ3MlMjBjYWxjdWxhdG9yfGVufDF8fHx8MTc2MzA2ODc2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    icon: FileText,
    title: 'Detailed Company Info',
    description: 'View licensing information, years in business, service areas, and specialties for each company.',
    image: 'https://images.unsplash.com/photo-1554224155-cfa08c2a758f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGRvY3VtZW50cyUyMGxpY2Vuc2V8ZW58MXx8fHwxNzYzMDY4NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    icon: Shield,
    title: 'Licensed & Insured',
    description: 'All listed companies are verified to have proper Colorado licensing and insurance coverage.',
    image: 'https://images.unsplash.com/photo-1743623179507-893a90372712?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN1cmFuY2UlMjBzaGllbGQlMjBwcm90ZWN0aW9ufGVufDF8fHx8MTc2MzAzNjM5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    icon: Clock,
    title: 'Instant Results',
    description: 'Get matched with qualified well drillers in your area within seconds of entering your zip code.',
    image: 'https://images.unsplash.com/photo-1761637755336-4191d69eb13b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXN0JTIwc3BlZWQlMjBpbnN0YW50fGVufDF8fHx8MTc2MzA2ODc2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export function Features() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Everything You Need to Find the Right Well Driller
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our comprehensive platform puts all the information you need at your fingertips.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => setActiveCard(activeCard === index ? null : index)}
              className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all overflow-hidden cursor-pointer"
            >
              {/* Image Background */}
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Icon overlay */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-lg flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>

                {/* Description overlay - appears over image on hover/active */}
                <div className={`absolute inset-0 bg-blue-900/95 backdrop-blur-sm flex items-center justify-center p-6 transition-opacity duration-300 ${
                  activeCard === index 
                    ? 'opacity-100' 
                    : 'opacity-0 md:group-hover:opacity-100 pointer-events-none md:group-hover:pointer-events-auto'
                }`}>
                  <p className="text-white text-center">
                    {feature.description}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl text-gray-900">{feature.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}