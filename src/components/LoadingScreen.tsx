import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Initial setup
    gsap.set([textRef.current, progressRef.current], { opacity: 0, y: 30 });
    
    // Animation sequence
    tl.to([textRef.current, progressRef.current], {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power2.out"
    })
    .to(progressRef.current?.querySelector('.progress-fill'), {
      width: "100%",
      duration: 2.5,
      ease: "power2.out"
    })
    .to([textRef.current, progressRef.current], {
      opacity: 0,
      y: -30,
      duration: 0.6,
      stagger: 0.1
    })
    .to(containerRef.current, {
      opacity: 0,
      scale: 0.9,
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        onLoadingComplete();
      }
    });

    return () => {
      tl.kill();
    };
  }, [onLoadingComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="floating-orb w-64 h-64 bg-primary/20 -top-32 -left-32" />
        <div className="floating-orb w-48 h-48 bg-secondary/20 -bottom-24 -right-24" />
        <div className="floating-orb w-32 h-32 bg-accent/20 top-1/4 right-1/4" />
      </div>

      <div className="text-center space-y-8">
        {/* Logo/Name */}
        <div ref={textRef} className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Milad
          </h1>
          <p className="text-muted-foreground text-lg tracking-wide">
            Loading Portfolio...
          </p>
        </div>

        {/* Progress Bar */}
        <div ref={progressRef} className="w-80 mx-auto">
          <div className="relative h-1 bg-muted/30 rounded-full overflow-hidden">
            <div className="progress-fill absolute top-0 left-0 h-full w-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg glow-cyan" />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>0%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;