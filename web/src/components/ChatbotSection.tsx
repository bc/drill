import { MessageCircle, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export function ChatbotSection() {
  const handleChatOpen = () => {
    // Placeholder for chatbot integration
    alert('Well drilling chatbot coming soon! We\'ll help you answer questions about permits, costs, regulations, and more.');
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl shadow-2xl p-8 lg:p-12 text-white">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full opacity-20 blur-xl"></div>
                <div className="relative bg-white/10 backdrop-blur-sm p-6 rounded-full border-2 border-white/20">
                  <MessageCircle className="h-16 w-16" />
                  <Sparkles className="absolute -top-1 -right-1 h-6 w-6 text-yellow-300" />
                </div>
              </div>
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl lg:text-4xl font-bold mb-3">
                Have Questions? Ask Our Well Expert
              </h2>
              <p className="text-lg text-blue-100 mb-6">
                Get instant answers about permits, water rights, drilling costs, regulations, and everything you need to know about well drilling in Douglas County.
              </p>
              <Button
                onClick={handleChatOpen}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with Well Expert
              </Button>
            </div>
          </div>

          {/* Sample Questions */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <p className="text-sm text-blue-100 mb-3">Popular questions:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'What permits do I need?',
                'Average cost for 300ft well?',
                'How long does drilling take?',
                'Water quality testing requirements'
              ].map((question) => (
                <button
                  key={question}
                  onClick={handleChatOpen}
                  className="text-sm bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 transition-all"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
