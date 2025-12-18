import { MapPin } from 'lucide-react';
import { ColoradoFlag } from './ColoradoFlag';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <ColoradoFlag className="w-6 h-6" />
              <span className="text-white text-xl font-semibold">Drill</span>
            </div>
            <p className="text-sm text-gray-400">
              Comprehensive well drilling reports and expert guidance for Douglas County property owners.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Service Area</h3>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-blue-400" />
              <span>Douglas County, Colorado</span>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              Expanding to additional counties soon
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Drill. Free well drilling reports for Colorado homeowners.</p>
        </div>
      </div>
    </footer>
  );
}
