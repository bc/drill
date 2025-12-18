import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Sarah Mitchell',
    location: 'Boulder County',
    rating: 5,
    text: 'This service saved me thousands! I was able to get quotes from 5 different well drillers and negotiate a fair price. Highly recommend.',
  },
  {
    name: 'Tom Reynolds',
    location: 'El Paso County',
    rating: 5,
    text: 'The reviews were incredibly helpful. I found a licensed driller with great feedback who did an excellent job on my property.',
  },
  {
    name: 'Jennifer Park',
    location: 'Larimer County',
    rating: 5,
    text: 'Fast, free, and exactly what I needed. Within minutes I had contact info for reputable well drilling companies near me.',
  },
];

export function Testimonials() {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            Trusted by Colorado Homeowners
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what others are saying about our service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl border border-gray-200"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
              <div>
                <div className="text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
