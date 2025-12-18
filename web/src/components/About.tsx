import { ImageWithFallback } from './figma/ImageWithFallback';
import { ColoradoFlag } from './ColoradoFlag';
import { Heart, Users, Target, Award } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Colorado Pride',
    description: 'Born and raised in the Centennial State, we understand the unique challenges of drilling wells in Colorado\'s diverse terrain.',
  },
  {
    icon: Users,
    title: 'Community First',
    description: 'We connect neighbors with trusted local businesses, strengthening Colorado communities one well at a time.',
  },
  {
    icon: Target,
    title: 'Transparency',
    description: 'No hidden fees, no bias. Just honest information to help you make the best decision for your property.',
  },
  {
    icon: Award,
    title: 'Verified Quality',
    description: 'Every company in our directory is vetted for proper licensing, insurance, and a track record of excellence.',
  },
];

export function About() {
  return (
    <div className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left Column - Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-3 bg-blue-50 text-blue-700 px-5 py-3 rounded-full">
              <ColoradoFlag className="w-6 h-6" />
              <span className="font-medium">Built in Colorado, Built for Colorado</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl text-gray-900">
              Our Purpose is Simple: Help Coloradans Find Trusted Well Drillers
            </h2>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                We started this service because we saw our neighbors and friends struggle to find reliable well drilling companies. 
                The process was opaque, prices varied wildly, and it was hard to know who to trust with such an important investment.
              </p>
              
              <p>
                As Colorado natives, we know that access to clean water isn't just a convenience—it's essential. 
                Whether you're in the Front Range, the Western Slope, or the Eastern Plains, finding the right well driller 
                can make all the difference for your home or business.
              </p>
              
              <p>
                That's why we created Colorado Well Finder: a free, transparent directory that puts you in control. 
                We've done the research, verified the licenses, and collected real reviews so you don't have to.
              </p>
            </div>

            <div className="pt-4">
              <div className="flex items-center gap-2 text-gray-900">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="text-lg">Made with pride in the Rocky Mountains</span>
              </div>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1468711007652-03aab17ae4d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NreSUyMG1vdW50YWlucyUyMGNvbG9yYWRvfGVufDF8fHx8MTc2MzA2OTY0OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Colorado Rocky Mountains"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-xl p-6">
                <div className="flex items-center gap-3 mb-2">
                  <ColoradoFlag className="w-10 h-10" />
                  <div>
                    <div className="text-gray-900">Serving All 64 Counties</div>
                    <div className="text-sm text-gray-600">From the plains to the peaks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <div>
          <h3 className="text-3xl text-gray-900 text-center mb-12">
            What We Stand For
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-xl text-gray-900 mb-2">{value.title}</h4>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
