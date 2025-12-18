import { type WellReport } from '../lib/wellData';
import { Card } from './ui/card';
import { Droplet, TrendingUp, DollarSign, Layers, MapPin, Phone } from 'lucide-react';
import { Button } from './ui/button';

interface WellReportDisplayProps {
  report: WellReport;
  phone: string;
}

export function WellReportDisplay({ report, phone }: WellReportDisplayProps) {
  const { nearestWells, aquifers, avgDepth, depthRange, estimatedCost } = report;

  const handleSendSMS = () => {
    // Simulate sending SMS with report
    alert(`Report would be texted to ${phone}!\n\nIncludes:\n- Map of nearby wells\n- Depth analysis\n- Cost estimates\n- Aquifer information\n- Recommended drilling companies`);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Depth</p>
              <p className="text-2xl font-bold text-gray-900">{avgDepth}</p>
              <p className="text-xs text-gray-500">feet</p>
            </div>
            <Droplet className="h-8 w-8 text-blue-500 opacity-70" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Depth Range</p>
              <p className="text-xl font-bold text-gray-900">
                {depthRange.min}-{depthRange.max}
              </p>
              <p className="text-xs text-gray-500">feet</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-70" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Est. Cost</p>
              <p className="text-xl font-bold text-gray-900">
                ${(estimatedCost.low / 1000).toFixed(0)}K-${(estimatedCost.high / 1000).toFixed(0)}K
              </p>
              <p className="text-xs text-gray-500">drilling only</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500 opacity-70" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Nearby Wells</p>
              <p className="text-2xl font-bold text-gray-900">{nearestWells.length}</p>
              <p className="text-xs text-gray-500">within 5 miles</p>
            </div>
            <MapPin className="h-8 w-8 text-purple-500 opacity-70" />
          </div>
        </Card>
      </div>

      {/* Aquifer Information */}
      <Card className="p-6">
        <div className="flex items-start gap-3 mb-4">
          <Layers className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Available Aquifers</h3>
            <p className="text-sm text-gray-600 mb-3">
              Based on nearby wells, these aquifers are likely available at your location:
            </p>
            <div className="flex flex-wrap gap-2">
              {aquifers.map((aquifer) => (
                <span
                  key={aquifer}
                  className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                >
                  {aquifer}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Nearby Wells Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">10 Nearest Wells</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="text-left p-3 font-medium text-gray-700">Well Name</th>
                <th className="text-left p-3 font-medium text-gray-700">Distance</th>
                <th className="text-left p-3 font-medium text-gray-700">Depth</th>
                <th className="text-left p-3 font-medium text-gray-700">Primary Aquifers</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {nearestWells.map((well, index) => (
                <tr key={well.id} className="hover:bg-gray-50">
                  <td className="p-3">
                    <div className="font-medium text-gray-900">{well.name || `Well #${index + 1}`}</div>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-600">{well.distance_miles} mi</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-900 font-medium">{well.depth || 'N/A'}</span>
                  </td>
                  <td className="p-3">
                    <span className="text-gray-600 text-xs">
                      {well.aquifer && well.aquifer !== 'Unknown'
                        ? well.aquifer.split(',').slice(0, 2).join(', ')
                        : 'N/A'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Send SMS CTA */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Phone className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Get Full Report via Text
              </h3>
              <p className="text-sm text-gray-600">
                We'll text a comprehensive PDF report to {phone} with detailed maps, drilling companies, and cost breakdowns.
              </p>
            </div>
          </div>
          <Button onClick={handleSendSMS} size="lg" className="whitespace-nowrap">
            Text Me Report
          </Button>
        </div>
      </Card>

      {/* Cost Breakdown */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cost Estimate Breakdown</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Drilling ({avgDepth} ft @ $15-$30/ft)</span>
            <span className="font-semibold">${estimatedCost.low.toLocaleString()} - ${estimatedCost.high.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Pump & Equipment</span>
            <span className="font-semibold">$2,000 - $5,000</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Well Casing & Materials</span>
            <span className="font-semibold">$3,000 - $8,000</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b">
            <span className="text-gray-600">Permits & Testing</span>
            <span className="font-semibold">$1,500 - $3,000</span>
          </div>
          <div className="flex justify-between items-center py-3 bg-blue-50 -mx-2 px-2 rounded">
            <span className="font-semibold text-gray-900">Total Estimated Cost</span>
            <span className="font-bold text-blue-600 text-lg">
              ${(estimatedCost.low + 6500).toLocaleString()} - ${(estimatedCost.high + 16000).toLocaleString()}
            </span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          * Estimates are based on nearby wells and typical Douglas County drilling costs. Actual costs may vary based on geology, well depth, and contractor.
        </p>
      </Card>
    </div>
  );
}
