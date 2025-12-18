import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ColoradoFlag } from './ColoradoFlag';
import { Search } from 'lucide-react';
import { toast } from 'sonner';

export function Hero() {
  const [zipCode, setZipCode] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!zipCode || !email) {
      toast.error('Please enter both your zip code and email address');
      return;
    }

    if (!/^\d{5}$/.test(zipCode)) {
      toast.error('Please enter a valid 5-digit zip code');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Success! Check your email for verified well drilling companies in your area.');
    setZipCode('');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-10">
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1635822160039-046f414c7206?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmFkbyUyMGxhbmRzY2FwZSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjMwNjgzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Colorado Mountains"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full">
              <ColoradoFlag className="w-5 h-5" />
              <span>Serving All of Colorado</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl text-gray-900">
              Find Trusted Well Drilling Companies Near You
            </h1>
            
            <p className="text-xl text-gray-600">
              Get instant access to verified Colorado well drilling contractors, compare reviews, and negotiate better prices with our comprehensive directory.
            </p>

            {/* Sign Up Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="zipCode" className="block text-sm text-gray-700 mb-2">
                      Your Zip Code
                    </label>
                    <Input
                      id="zipCode"
                      type="text"
                      placeholder="80201"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      maxLength={5}
                      className="text-lg"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Your Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="text-lg"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg hover:shadow-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Finding Companies...'
                    ) : (
                      <>
                        <Search className="mr-2 h-5 w-5" />
                        Find Well Drillers
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 text-center">
                Free service • No credit card required • Instant results
              </p>
            </form>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div>
                <div className="text-3xl text-blue-600">250+</div>
                <div className="text-sm text-gray-600">Verified Companies</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600">5,000+</div>
                <div className="text-sm text-gray-600">Reviews</div>
              </div>
              <div>
                <div className="text-3xl text-blue-600">100%</div>
                <div className="text-sm text-gray-600">Free to Use</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1563883980716-df710d018a53?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWxsJTIwZHJpbGxpbmclMjBlcXVpcG1lbnR8ZW58MXx8fHwxNzYzMDY4Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Well Drilling Equipment"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}