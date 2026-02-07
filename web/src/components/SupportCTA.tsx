import { useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Mail, Phone, Smartphone, Loader2, CheckCircle2, MessageSquare } from 'lucide-react';
import { Card } from './ui/card';

type ContactMethod = 'email' | 'phone';

export function SupportCTA() {
  const [formspreeState, handleFormspreeSubmit] = useForm("mykjoqzw");
  const [contactMethod, setContactMethod] = useState<ContactMethod>('email');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('form_type', 'support_request');

    if (contactMethod === 'email') {
      formData.append('email', email);
      formData.append('contact_method', 'email');
    } else {
      formData.append('phone', phone);
      formData.append('contact_method', 'phone');
    }

    if (address) {
      formData.append('address', address);
    }

    if (message) {
      formData.append('message', message);
    }

    await handleFormspreeSubmit(formData);
  };

  const isFormValid = () => {
    if (contactMethod === 'email') {
      return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    return phone && /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
  };

  if (formspreeState.succeeded) {
    return (
      <div className="bg-white py-16" id="support">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-green-100 rounded-full mb-4">
              <CheckCircle2 className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              We'll be in touch!
            </h3>
            <p className="text-gray-600">
              One of our Colorado well-drilling experts will reach out to help you find the right contractor.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white py-16 border-t border-gray-100" id="support">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-4">
            <MessageSquare className="h-7 w-7 text-blue-600" />
          </div>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
            Need help finding the right well driller?
          </h2>
          <p className="text-gray-600">
            Tell us about your situation and we'll connect you with vetted contractors in Colorado who fit your needs.
          </p>
        </div>

        <Card className="p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Contact Input */}
            <div>
              <div
                className={`transition-all duration-300 ease-out ${
                  contactMethod === 'email'
                    ? 'opacity-100 translate-x-0 h-auto'
                    : 'opacity-0 -translate-x-4 h-0 overflow-hidden'
                }`}
              >
                <label htmlFor="support-email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="support-email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-base pl-10"
                  />
                </div>
                <ValidationError prefix="Email" field="email" errors={formspreeState.errors} />
                <button
                  type="button"
                  onClick={() => setContactMethod('phone')}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <Smartphone className="h-3.5 w-3.5" />
                  Use SMS / iMessage instead
                </button>
              </div>

              <div
                className={`transition-all duration-300 ease-out ${
                  contactMethod === 'phone'
                    ? 'opacity-100 translate-x-0 h-auto'
                    : 'opacity-0 translate-x-4 h-0 overflow-hidden'
                }`}
              >
                <label htmlFor="support-phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="support-phone"
                    type="tel"
                    name="phone"
                    placeholder="(303) 555-1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="text-base pl-10"
                  />
                </div>
                <ValidationError prefix="Phone" field="phone" errors={formspreeState.errors} />
                <button
                  type="button"
                  onClick={() => setContactMethod('email')}
                  className="mt-2 inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  Use email instead
                </button>
              </div>
            </div>

            {/* Property Address (optional) */}
            <div>
              <label htmlFor="support-address" className="block text-sm font-medium text-gray-700 mb-2">
                Property Address <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <Input
                id="support-address"
                type="text"
                placeholder="123 Main St, Castle Rock, CO"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="text-base"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="support-message" className="block text-sm font-medium text-gray-700 mb-2">
                How can we help? <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                id="support-message"
                placeholder="e.g., I need a well drilled on my 5-acre lot, looking for contractors with experience in rocky terrain..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="flex w-full rounded-md border border-input bg-input-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </div>

            {/* Submit */}
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
                'Get Help from an Expert'
              )}
            </Button>

            <p className="text-xs text-center text-gray-500">
              We connect you with vetted contractors—we do not provide drilling services directly.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
