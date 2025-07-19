import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FullPage3DBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the 3D background container on load
    if (containerRef.current) {
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2, ease: 'power2.out', delay: 1 }
      );
    }

    // Add subtle parallax effect to the 3D background
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.1;
      
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          y: parallax,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-0 w-full h-full opacity-60"
      style={{ willChange: 'transform' }}
    >
      {/* Full-page 3D Spline Model */}
      <div className="relative w-full h-full">
        <iframe 
          src="https://my.spline.design/orb-5oFfv1TG84UKAf1p2DGpenyu/" 
          frameBorder="0" 
          width="100%" 
          height="100%"
          className="absolute inset-0"
          title="3D Background Animation"
          style={{ 
            filter: 'brightness(0.8)',
            transform: 'scale(1.05)'
          }}
        />
        
        {/* Minimal overlay for better text readability */}
        <div className="absolute inset-0 bg-background/10" />
        
        {/* Additional floating elements for depth */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-40 right-40 w-24 h-24 bg-secondary/15 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-accent/20 rounded-full blur-lg animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-primary/15 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
};

export default FullPage3DBackground;