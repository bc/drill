import { MapPin, Mountain, FileText } from 'lucide-react';

const steps = [
  {
    icon: MapPin,
    number: '1',
    title: 'Enter Your Address',
    description: 'Start typing your property address. Our Google-powered autocomplete finds your exact location in seconds.',
  },
  {
    icon: Mountain,
    number: '2',
    title: 'See Your Elevation',
    description: 'Instantly view your property elevation and how it compares to nearby water reservoirs in your area.',
  },
  {
    icon: FileText,
    number: '3',
    title: 'Get Your Report',
    description: 'Receive a comprehensive report with nearby well data, aquifer information, and estimated drilling costs.',
  },
];

export function HowItWorks() {
  return (
    <div className="py-20 bg-gray-50" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get your property's well drilling assessment in three simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connecting Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-blue-200 z-0" />
              )}

              <div className="relative bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.number}
                </div>
                <div className="bg-blue-50 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl text-gray-900 mb-3 font-semibold">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
