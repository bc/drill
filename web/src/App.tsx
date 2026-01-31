import { useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Features } from './components/Features';
import { About } from './components/About';
import { Testimonials } from './components/Testimonials';
import { ChatbotSection } from './components/ChatbotSection';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToReport = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <Navbar onGetReport={scrollToReport} />
        <div ref={heroRef}>
          <Hero />
        </div>
        <HowItWorks />
        <Features />
        <Testimonials />
        <About />
        <ChatbotSection />
        <Footer />
      </div>
    </ErrorBoundary>
  );
}
