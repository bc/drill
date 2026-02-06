import { Building2, DollarSign, AlertTriangle, MapPin, Star, Shield } from 'lucide-react';

const reportFeatures = [
  {
    icon: Building2,
    title: 'Local Contractor Profiles',
    description: 'Detailed profiles of licensed well drilling companies servicing your zip code, including years in business and specializations.',
  },
  {
    icon: DollarSign,
    title: 'Pricing Estimates',
    description: 'Cost ranges based on your specific location and estimated well depth, so you know what to expect before getting quotes.',
  },
  {
    icon: AlertTriangle,
    title: 'Service Limitations',
    description: 'Know upfront which contractors can handle your specific needs—depth requirements, terrain challenges, or specialty services.',
  },
  {
    icon: MapPin,
    title: 'Service Area Coverage',
    description: 'See exactly which companies service your address, their typical response times, and proximity to your property.',
  },
  {
    icon: Star,
    title: 'Verified Reviews',
    description: 'Real feedback from Colorado homeowners who have used these services, so you can make an informed decision.',
  },
  {
    icon: Shield,
    title: 'License Verification',
    description: 'Every contractor in our directory is verified for proper Colorado licensing, bonding, and insurance coverage.',
  },
];

export function Features() {
  return (
    <div className="py-20 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What's in Your Well Report
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A detailed comparison of all well drilling companies servicing your zip code—with pricing estimates, services offered, and limitations clearly explained.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportFeatures.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-gray-200 hover:border-blue-200 hover:bg-blue-50/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
