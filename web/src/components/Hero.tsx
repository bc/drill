import { ColoradoFlag } from './ColoradoFlag';
import { CheckCircle } from 'lucide-react';
import { ElevationForm } from './ElevationForm';

export function Hero() {
  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            <ColoradoFlag className="w-4 h-4" />
            <span>Now Serving Douglas County, Colorado</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Check Your Property Elevation<br />& Water Access
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your address to instantly see your property's elevation compared to nearby water reservoirs—essential information for well drilling decisions.
          </p>
        </div>

        {/* Elevation Form */}
        <ElevationForm />

        {/* What's Included */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">What you'll get:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Your exact property elevation</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Nearby reservoir elevations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Elevation comparison analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Water pressure implications</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Zone-specific reservoir data</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Free detailed assessment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}