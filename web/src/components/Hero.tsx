import { ColoradoFlag } from './ColoradoFlag';
import { CheckCircle } from 'lucide-react';
import { WellReportFlow } from './WellReportFlow';

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
            Get Your Comprehensive<br />Well Drilling Report
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly receive detailed information about well drilling at your location—including nearby wells, aquifers, depths, and cost estimates.
          </p>
        </div>

        {/* Well Report Flow */}
        <WellReportFlow />

        {/* What's Included */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">Your report includes:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Interactive map with 10 nearest wells</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Well depths & aquifer data</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Detailed cost estimates</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Available aquifer layers</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Distance analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">SMS delivery option</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}