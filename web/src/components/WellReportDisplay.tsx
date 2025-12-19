import { type WellReport } from '../lib/wellData';
import { Card } from './ui/card';
import { Droplet, TrendingUp, DollarSign, Layers, MapPin, Phone, Mountain, Wrench, CheckCircle, Filter, Zap, FileText, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface WellReportDisplayProps {
  report: WellReport;
  phone: string;
}

export function WellReportDisplay({ report, phone }: WellReportDisplayProps) {
  const { nearestWells, aquifers, avgDepth, depthRange, estimatedCost, targetLocation } = report;

  const handleSendSMS = () => {
    // Simulate sending SMS with report
    alert(`Report would be texted to ${phone}!\n\nIncludes:\n- Map of nearby wells\n- Depth analysis\n- Cost estimates\n- Aquifer information\n- Recommended drilling companies`);
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className={`grid sm:grid-cols-2 gap-4 ${targetLocation.altitude ? 'lg:grid-cols-5' : 'lg:grid-cols-4'}`}>
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

        {targetLocation.altitude && (
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Elevation</p>
                <p className="text-2xl font-bold text-gray-900">{targetLocation.altitude.toLocaleString()}</p>
                <p className="text-xs text-gray-500">feet above sea level</p>
              </div>
              <Mountain className="h-8 w-8 text-indigo-500 opacity-70" />
            </div>
          </Card>
        )}
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

      {/* Complete Water System Services */}
      <Card className="p-6 border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50">
        <div className="flex items-start gap-3 mb-4">
          <Shield className="h-7 w-7 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Complete Water System Services</h3>
            <p className="text-gray-700 mb-6">
              Our vetted contractors handle everything from drilling to final installation. We manage all permitting, paperwork, secure available rebates, and ensure optimal system performance.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Core Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Wrench className="h-5 w-5 text-blue-600" />
              Core Well Services
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Complete Well Drilling</p>
                  <p className="text-sm text-gray-600">Professional drilling, casing, and well completion</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Pump Installation & Sizing</p>
                  <p className="text-sm text-gray-600">Submersible pumps properly sized for your needs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Pressure Tank Systems</p>
                  <p className="text-sm text-gray-600">Properly sized tanks for consistent water pressure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Complete Plumbing Integration</p>
                  <p className="text-sm text-gray-600">Connect well to your home's water system</p>
                </div>
              </div>
            </div>
          </div>

          {/* Water Treatment */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Water Treatment & Quality
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Water Filtration Systems</p>
                  <p className="text-sm text-gray-600">Sediment, carbon, and whole-house filtration</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Reverse Osmosis Systems</p>
                  <p className="text-sm text-gray-600">Point-of-use RO for drinking water quality</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Water Softeners</p>
                  <p className="text-sm text-gray-600">Remove hardness and protect appliances</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Water Quality Testing</p>
                  <p className="text-sm text-gray-600">Comprehensive testing and treatment recommendations</p>
                </div>
              </div>
            </div>
          </div>

          {/* Backup & Reliability */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Zap className="h-5 w-5 text-blue-600" />
              Backup Power & Reliability
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Backup Generator Systems</p>
                  <p className="text-sm text-gray-600">Automatic backup power for your well pump</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Battery Backup Systems</p>
                  <p className="text-sm text-gray-600">Silent, clean backup power during outages</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Solar-Powered Pump Systems</p>
                  <p className="text-sm text-gray-600">Off-grid and emergency water supply options</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Water Storage Tanks</p>
                  <p className="text-sm text-gray-600">Reserve supply for extended outages</p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Full-Service Support
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Permit & Paperwork Management</p>
                  <p className="text-sm text-gray-600">Handle all county and state requirements</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Water Rights Assistance</p>
                  <p className="text-sm text-gray-600">Navigate Colorado water rights regulations</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Rebate & Incentive Programs</p>
                  <p className="text-sm text-gray-600">Secure available tax credits and local rebates</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Ongoing Maintenance Plans</p>
                  <p className="text-sm text-gray-600">Annual inspections and system optimization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Services */}
        <div className="mt-6 pt-6 border-t border-blue-200">
          <h4 className="font-semibold text-gray-900 mb-4">Additional Water & Home Services</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span>Irrigation Systems</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span>Hot Water Heaters</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span>Tankless Water Systems</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Droplet className="h-4 w-4 text-blue-500" />
              <span>Greywater Recycling</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Heat Pump Water Heaters</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Whole-Home Generators</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Zap className="h-4 w-4 text-yellow-500" />
              <span>Solar Panel Integration</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <Shield className="h-4 w-4 text-green-500" />
              <span>System Warranties</span>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700">
            <strong className="text-gray-900">Vetted Contractors Only:</strong> All recommended drilling companies and service providers are licensed, insured, and have proven track records in Douglas County. We ensure quality workmanship and competitive pricing.
          </p>
        </div>
      </Card>
    </div>
  );
}
