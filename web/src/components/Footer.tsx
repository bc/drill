import { Droplet } from 'lucide-react';
import { ColoradoFlag } from './ColoradoFlag';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Droplet className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl text-white">Colorado Well Finder</span>
              <ColoradoFlag className="w-6 h-6 ml-2 opacity-60" />
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted directory for finding licensed and insured well drilling companies throughout Colorado.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Well Drilling Costs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Colorado Regulations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">List Your Company</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; 2025 Colorado Well Finder. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}