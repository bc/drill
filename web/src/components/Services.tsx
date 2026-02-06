import { Drill, Droplets, Settings } from 'lucide-react';

const services = [
  {
    icon: Drill,
    title: 'Well Drilling',
    description: 'Compare licensed well drillers in your area. We track contractor experience with different depths (200–800+ ft), permit success rates, and customer satisfaction scores.',
    details: [
      'New well construction',
      'Replacement wells',
      'Permit assistance',
      'Site evaluation',
    ],
  },
  {
    icon: Droplets,
    title: 'Treatment & Purification',
    description: 'Find water treatment specialists with verified reviews. Our database includes contractors offering filtration, UV disinfection, and purification systems.',
    details: [
      'Water quality testing',
      'Filtration systems',
      'UV disinfection',
      'Water softening',
    ],
  },
  {
    icon: Settings,
    title: 'Pump Maintenance',
    description: 'Locate pump service technicians with proven track records. We monitor response times, repair success rates, and pricing transparency across providers.',
    details: [
      'Annual inspections',
      'Pump repair & replacement',
      'Pressure tank service',
      'Flow rate testing',
    ],
  },
];

export function Services() {
  return (
    <div className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Find Contractors for These Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We track ratings, experience, and pricing data on contractors offering these services. Your report compares options in your area.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="bg-blue-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
                <service.icon className="h-7 w-7 text-blue-600" />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
