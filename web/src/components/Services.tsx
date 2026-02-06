import { Drill, Droplets, Settings } from 'lucide-react';

const services = [
  {
    icon: Drill,
    title: 'Well Drilling',
    description: 'Complete residential and commercial well drilling services. Our vetted contractors handle everything from permit applications to pump installation, with depths ranging from 200 to 800+ feet depending on your location.',
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
    description: 'Ensure your well water is safe and clean with professional water treatment services. From basic filtration to complete purification systems, protect your family from contaminants.',
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
    description: 'Keep your well system running efficiently with regular maintenance and repair services. Annual inspections extend pump life and prevent costly emergency repairs.',
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
            Services Our Network Provides
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your well report includes a detailed comparison of licensed contractors in your area offering these services.
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
