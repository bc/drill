import { useState, useCallback } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Mail, Phone, Loader2, Mountain, Droplets, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleAddressAutocomplete, type AddressDetails } from './GoogleAddressAutocomplete';
import { getReservoirsForZipCode, compareElevations, type Reservoir } from '../lib/reservoirData';
import { getElevation } from '../lib/wellData';

type ContactMethod = 'email' | 'phone';

interface ElevationResult {
  elevation: number;
  address: string;
  zipCode: string;
  lat: number;
  lng: number;
  zoneName: string;
  reservoirs: Reservoir[];
  comparisons: {
    reservoir: Reservoir;
    difference: number;
    status: 'above' | 'below' | 'same';
  }[];
}

export function ElevationForm() {
  const [formspreeState, handleFormspreeSubmit] = useForm("mykjoqzw");
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [addressDetails, setAddressDetails] = useState<AddressDetails | null>(null);
  const [elevationResult, setElevationResult] = useState<ElevationResult | null>(null);
  const [isLoadingElevation, setIsLoadingElevation] = useState(false);
  const [elevationError, setElevationError] = useState<string | null>(null);

  const handleAddressSelect = useCallback(async (details: AddressDetails) => {
    setAddressDetails(details);
    setElevationError(null);
    setIsLoadingElevation(true);

    try {
      // Get elevation from API
      const elevation = await getElevation(details.lat, details.lng);

      if (elevation === null) {
        setElevationError('Could not retrieve elevation data. Please try again.');
        setElevationResult(null);
        return;
      }

      // Get reservoirs for this zip code
      const { zoneName, reservoirs } = getReservoirsForZipCode(details.zipCode);

      // Compare elevations
      const comparisons = compareElevations(elevation, reservoirs);

      setElevationResult({
        elevation,
        address: details.formattedAddress,
        zipCode: details.zipCode,
        lat: details.lat,
        lng: details.lng,
        zoneName,
        reservoirs,
        comparisons,
      });
    } catch (error) {
      console.error('Error getting elevation:', error);
      setElevationError('Failed to retrieve elevation data. Please try again.');
      setElevationResult(null);
    } finally {
      setIsLoadingElevation(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Build form data to send to Formspree
    const formData = new FormData();

    // Contact info
    if (contactMethod === 'email') {
      formData.append('email', email);
      formData.append('contact_method', 'email');
    } else {
      formData.append('phone', phone);
      formData.append('contact_method', 'phone');
    }

    // Address info
    formData.append('address', address);
    if (addressDetails) {
      formData.append('zip_code', addressDetails.zipCode);
      formData.append('city', addressDetails.city);
      formData.append('state', addressDetails.state);
      formData.append('latitude', addressDetails.lat.toString());
      formData.append('longitude', addressDetails.lng.toString());
    }

    // Elevation info
    if (elevationResult) {
      formData.append('elevation_feet', elevationResult.elevation.toString());
      formData.append('zone_name', elevationResult.zoneName);
      formData.append('reservoirs', elevationResult.reservoirs.map(r =>
        `${r.name}: ${r.elevation.toLocaleString()} ft`
      ).join('; '));
    }

    // Submit to Formspree
    await handleFormspreeSubmit(formData);
  };

  const isFormValid = () => {
    if (contactMethod === 'email') {
      return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && address && elevationResult;
    } else {
      return phone && /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone) && address && elevationResult;
    }
  };

  if (formspreeState.succeeded) {
    return (
      <Card className="p-8 max-w-2xl mx-auto">
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">
            Report Submitted!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest. We'll be in touch soon with your detailed well drilling assessment.
          </p>
          {elevationResult && (
            <div className="bg-gray-50 rounded-lg p-4 text-left">
              <p className="text-sm text-gray-500 mb-2">Your property elevation:</p>
              <p className="text-2xl font-bold text-blue-600">
                {elevationResult.elevation.toLocaleString()} feet
              </p>
            </div>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Free Elevation Report
        </h2>
        <p className="text-gray-600">
          Enter your address to see your property elevation and how it compares to nearby water reservoirs.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Method Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            How should we contact you?
          </label>
          <div className="relative bg-gray-100 rounded-lg p-1 flex">
            {/* Animated background */}
            <div
              className="absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-md shadow-sm transition-all duration-300 ease-out"
              style={{
                left: contactMethod === 'email' ? '4px' : 'calc(50% + 0px)',
              }}
            />
            <button
              type="button"
              onClick={() => setContactMethod('email')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                contactMethod === 'email'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Mail className="h-4 w-4" />
              Email
            </button>
            <button
              type="button"
              onClick={() => setContactMethod('phone')}
              className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-md text-sm font-medium transition-colors duration-200 ${
                contactMethod === 'phone'
                  ? 'text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Phone className="h-4 w-4" />
              Phone
            </button>
          </div>
        </div>

        {/* Contact Input - Animated Transition */}
        <div className="relative overflow-hidden">
          <div
            className={`transition-all duration-300 ease-out ${
              contactMethod === 'email'
                ? 'opacity-100 translate-x-0 h-auto'
                : 'opacity-0 -translate-x-4 h-0 overflow-hidden'
            }`}
          >
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-base pl-10"
              />
            </div>
            <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
          </div>

          <div
            className={`transition-all duration-300 ease-out ${
              contactMethod === 'phone'
                ? 'opacity-100 translate-x-0 h-auto'
                : 'opacity-0 translate-x-4 h-0 overflow-hidden'
            }`}
          >
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                name="phone"
                placeholder="(303) 555-1234"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="text-base pl-10"
              />
            </div>
            <ValidationError prefix="Phone" field="phone" errors={formspreeState.errors} />
          </div>
        </div>

        {/* Address Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Address
          </label>
          <GoogleAddressAutocomplete
            value={address}
            onChange={setAddress}
            onSelectAddress={handleAddressSelect}
            placeholder="Start typing your address..."
          />
          <p className="text-xs text-gray-500 mt-1">
            Select an address from the dropdown to see your elevation
          </p>
        </div>

        {/* Loading State */}
        {isLoadingElevation && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 text-blue-600 animate-spin mr-3" />
            <span className="text-gray-600">Fetching elevation data...</span>
          </div>
        )}

        {/* Error State */}
        {elevationError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-800">Unable to get elevation</p>
              <p className="text-sm text-red-600">{elevationError}</p>
            </div>
          </div>
        )}

        {/* Elevation Results */}
        {elevationResult && !isLoadingElevation && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Main Elevation Display */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Mountain className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Your Property Elevation</p>
                  <p className="text-3xl font-bold text-blue-700">
                    {elevationResult.elevation.toLocaleString()} <span className="text-lg font-normal">feet</span>
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                {elevationResult.address}
              </p>
            </div>

            {/* Reservoir Comparisons */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-500" />
                <h4 className="font-semibold text-gray-900">
                  Nearby Reservoirs - {elevationResult.zoneName}
                </h4>
              </div>
              <div className="divide-y divide-gray-100">
                {elevationResult.comparisons.map(({ reservoir, difference, status }) => (
                  <div key={reservoir.name} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{reservoir.name}</p>
                      <p className="text-sm text-gray-500">
                        {reservoir.elevation.toLocaleString()} ft elevation
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          status === 'above'
                            ? 'bg-green-100 text-green-800'
                            : status === 'below'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {status === 'above' && `+${Math.abs(difference).toLocaleString()} ft`}
                        {status === 'below' && `-${Math.abs(difference).toLocaleString()} ft`}
                        {status === 'same' && 'Same elevation'}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">
                        {status === 'above' ? 'You are higher' : status === 'below' ? 'You are lower' : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
              <p className="font-medium mb-1">Why does elevation matter?</p>
              <p>
                Your property's elevation relative to water reservoirs affects water pressure,
                pumping requirements, and well drilling considerations. Properties at higher
                elevations may require additional infrastructure for water delivery.
              </p>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full"
          disabled={!isFormValid() || formspreeState.submitting}
        >
          {formspreeState.submitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Sending...
            </>
          ) : (
            'Generate Report'
          )}
        </Button>

        <p className="text-xs text-center text-gray-500">
          By submitting, you agree to receive communications about your well drilling assessment.
        </p>
      </form>
    </Card>
  );
}
