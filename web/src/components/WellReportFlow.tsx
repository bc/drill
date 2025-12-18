import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Phone, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { geocodeAddress, getElevation, loadWells, findNearestWells, generateWellReport, type WellReport } from '../lib/wellData';
import { WellMap } from './WellMap';
import { WellReportDisplay } from './WellReportDisplay';
import { AddressAutocomplete } from './AddressAutocomplete';

type Step = 'input' | 'verifying' | 'generating' | 'report';

export function WellReportFlow() {
  const [step, setStep] = useState<Step>('input');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<WellReport | null>(null);
  const [verificationCode, setVerificationCode] = useState('');

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

    setIsLoading(true);
    setStep('verifying');

    try {
      // Simulate Twilio SMS verification
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success(`Verification code sent to ${phone}! (Enter any 6-digit code)`, {
        duration: 5000,
      });
    } catch (error) {
      toast.error('Failed to send verification code');
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();

    // Accept any 6-digit code
    if (!/^\d{6}$/.test(verificationCode)) {
      toast.error('Please enter a 6-digit code');
      return;
    }

    setIsLoading(true);
    setStep('generating');

    try {
      // Geocode address
      toast.info('Locating your property...');
      const location = await geocodeAddress(address);

      if (!location) {
        toast.error('Could not locate address. Please try a different format.');
        setStep('input');
        setIsLoading(false);
        return;
      }

      // Verify it's in Douglas County
      if (!location.displayName.toLowerCase().includes('douglas')) {
        toast.error('Address must be in Douglas County, Colorado');
        setStep('input');
        setIsLoading(false);
        return;
      }

      // Fetch elevation data
      toast.info('Getting elevation data...');
      const altitude = await getElevation(location.lat, location.lon);

      toast.info('Loading well data...');
      const allWells = await loadWells();

      toast.info('Finding nearest wells...');
      const nearestWells = findNearestWells(location.lat, location.lon, allWells, 10);

      toast.info('Generating comprehensive report...');
      const wellReport = generateWellReport(nearestWells, address, location.lat, location.lon, altitude || undefined);

      setReport(wellReport);
      setStep('report');

      toast.success('Your well drilling report is ready!');
    } catch (error) {
      console.error('Error generating report:', error);
      toast.error('Failed to generate report. Please try again.');
      setStep('input');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep('input');
    setAddress('');
    setPhone('');
    setVerificationCode('');
    setReport(null);
  };

  if (step === 'report' && report) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Your Well Drilling Report</h2>
          <Button variant="outline" onClick={handleStartOver}>
            Generate Another Report
          </Button>
        </div>
        <WellMap report={report} />
        <WellReportDisplay report={report} phone={phone} />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'input' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'
            }`}>
              {step === 'input' ? '1' : <CheckCircle2 className="h-5 w-5" />}
            </div>
            <span className="text-sm font-medium">Enter Details</span>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-4"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'verifying' || step === 'generating' || step === 'report'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
            <span className="text-sm font-medium">Verify Phone</span>
          </div>
          <div className="h-px flex-1 bg-gray-300 mx-4"></div>
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'generating' || step === 'report'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-600'
            }`}>
              3
            </div>
            <span className="text-sm font-medium">Get Report</span>
          </div>
        </div>

        {/* Step 1: Input */}
        {step === 'input' && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Property Address
              </label>
              <AddressAutocomplete
                value={address}
                onChange={setAddress}
                placeholder="Start typing your address..."
              />
              <p className="text-xs text-gray-500 mt-1">Must be in Douglas County, Colorado</p>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(303) 555-1234"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="text-base pl-10"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">We'll send a verification code via SMS</p>
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Code...
                </>
              ) : (
                'Continue'
              )}
            </Button>
          </form>
        )}

        {/* Step 2: Verification */}
        {step === 'verifying' && (
          <form onSubmit={handleVerifyCode} className="space-y-6">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <Phone className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Verification Code Sent
              </h3>
              <p className="text-sm text-gray-600">
                Enter the 6-digit code sent to {phone}
              </p>
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="text-center text-2xl tracking-widest"
                maxLength={6}
                autoFocus
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isLoading || verificationCode.length !== 6}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                'Verify & Generate Report'
              )}
            </Button>

            <button
              type="button"
              onClick={() => setStep('input')}
              className="w-full text-sm text-gray-600 hover:text-gray-900"
            >
              Change phone number
            </button>
          </form>
        )}

        {/* Step 3: Generating */}
        {step === 'generating' && (
          <div className="text-center py-12">
            <Loader2 className="h-16 w-16 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generating Your Report
            </h3>
            <p className="text-sm text-gray-600">
              Analyzing well data, aquifers, and costs for your location...
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
