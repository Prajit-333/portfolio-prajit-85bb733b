import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';
import LoadingScreen from './LoadingScreen';
import Navigation from './Navigation';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import IntegratedFooter from './IntegratedFooter';
import FullPage3DBackground from './FullPage3DBackground';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locomotiveScroll, setLocomotiveScroll] = useState<LocomotiveScroll | null>(null);

  useEffect(() => {
    if (!isLoading) {
      // Initialize Locomotive Scroll after loading
      const scroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
        smooth: true,
        multiplier: 1,
        class: 'is-reveal'
      });

      setLocomotiveScroll(scroll);

      // Update ScrollTrigger when Locomotive Scroll updates
      scroll.on('scroll', () => {
        ScrollTrigger.update();
      });

      // Sync ScrollTrigger with Locomotive Scroll
      ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        pinType: (document.querySelector('[data-scroll-container]') as HTMLElement)?.style.transform ? 'transform' : 'fixed'
      });

      // Refresh ScrollTrigger and Locomotive Scroll
      ScrollTrigger.addEventListener('refresh', () => scroll.update());
      ScrollTrigger.refresh();

      // Cleanup
      return () => {
        if (scroll) scroll.destroy();
        ScrollTrigger.removeEventListener('refresh', () => scroll.update());
      };
    }
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    
    // Enable scrolling after loading
    document.body.style.overflow = 'auto';
  };

  // Disable scrolling during loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    }
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="relative">
      <Navigation />
      
      <main data-scroll-container className="relative z-10">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <IntegratedFooter />
      </main>
    </div>
  );
};

export default Portfolio;