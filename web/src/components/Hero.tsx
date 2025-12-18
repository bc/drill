import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ColoradoFlag } from './ColoradoFlag';
import { FileText, MapPin, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export function Hero() {
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!address || !phone) {
      toast.error('Please enter both your address and phone number');
      return;
    }

    if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast.success('Success! We\'ll text your comprehensive well drilling report to your phone shortly.');
    setAddress('');
    setPhone('');
    setIsSubmitting(false);
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
            <ColoradoFlag className="w-4 h-4" />
            <span>Now Serving Douglas County, Colorado</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            Get Your Comprehensive<br />Well Drilling Report
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instantly receive detailed information about well drilling at your location—texted directly to your phone.
          </p>
        </div>

        {/* Main Report Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="123 Main St, Castle Rock, CO 80104"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="text-base pl-10"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (for text message report)
                </label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(303) 555-1234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Generating Your Report...'
                ) : (
                  <>
                    <FileText className="mr-2 h-5 w-5" />
                    Get My Free Well Report
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              Free • No credit card required • Report texted in minutes
            </p>
          </div>

          {/* What's Included */}
          <div className="mt-8 bg-blue-50 p-6 rounded-xl border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-4">Your report includes:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Nearby wells data & depth</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Licensed drilling companies</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Success rate statistics</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Soil & aquifer analysis</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Cost estimates by depth</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">Water quality insights</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}