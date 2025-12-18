import { Hero } from './components/Hero';
import { ChatbotSection } from './components/ChatbotSection';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      <ChatbotSection />
      <Footer />
    </div>
  );
}