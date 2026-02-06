import { ColoradoFlag } from './ColoradoFlag';
import { ElevationForm } from './ElevationForm';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        {/* Built in Colorado Header */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-5 py-3 rounded-full">
            <ColoradoFlag className="w-6 h-6" />
            <span className="font-medium">Built in Colorado, Built for Colorado</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 max-w-4xl mx-auto">
            Our Purpose is Simple: Help Coloradans Find Trusted Well Drillers
          </h1>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We started this service because we saw our neighbors struggle to find reliable well drilling companies.
            The process was opaque, prices varied wildly, and it was hard to know who to trust. We don't drill wells—we
            aggregate ratings, experience data, and verified reviews so you can make an informed decision.
          </p>
        </div>

        {/* Elevation Form */}
        <ElevationForm />
      </div>
    </div>
  );
}
