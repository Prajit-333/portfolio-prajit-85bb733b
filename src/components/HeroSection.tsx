import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Initial states
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 0,
      y: 50,
      filter: 'blur(10px)'
    });
    
    gsap.set(splineRef.current, {
      opacity: 0,
      x: 100
    });

    // Animation sequence
    tl.to(titleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out'
    })
    .to(subtitleRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.8')
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power2.out'
    }, '-=0.6')
    .to(splineRef.current, {
      opacity: 1,
      x: 0,
      duration: 1.5,
      ease: 'power2.out'
    }, '-=1');

    // Floating orbs animation
    gsap.to('.hero-orb-1', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    });

    gsap.to('.hero-orb-2', {
      y: -15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 1
    });

    gsap.to('.hero-orb-3', {
      y: -25,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      delay: 2
    });

    return () => {
      tl.kill();
    };
  }, []);

  const handleCTAHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleCTALeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0">
        <div className="hero-orb-1 absolute w-96 h-96 bg-primary/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="hero-orb-2 absolute w-64 h-64 bg-secondary/15 rounded-full blur-2xl top-1/4 right-1/4" />
        <div className="hero-orb-3 absolute w-80 h-80 bg-accent/10 rounded-full blur-3xl -bottom-40 -right-40" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content Column */}
          <div className="text-center lg:text-left space-y-8">
            <h1 
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="block text-foreground">Hi, I'm</span>
              <span className="block bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Prajit
              </span>
              <span className="block text-foreground text-3xl md:text-4xl lg:text-5xl mt-2">
                Web Developer
              </span>
            </h1>

            <p 
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0"
            >
              Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg"
                className="btn-glow bg-gradient-to-r from-primary to-secondary hover:glow-cyan text-primary-foreground font-medium px-8 py-4 text-lg"
                onMouseEnter={handleCTAHover}
                onMouseLeave={handleCTALeave}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Hire Me
              </Button>
              
              <Button 
                variant="outline"
                size="lg"
                className="glass border-primary/50 hover:bg-primary/10 hover:border-primary text-foreground font-medium px-8 py-4 text-lg"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View Work
              </Button>
            </div>
          </div>

          {/* Content Display - No 3D model here anymore */}
          <div ref={splineRef} className="relative flex items-center justify-center">
            <div className="relative w-full h-96 lg:h-[600px] flex items-center justify-center">
              {/* Central glowing orb as focal point */}
              <div className="relative">
                <div className="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute inset-0 w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-2xl animate-glow" />
                
                {/* Floating particles around the orb */}
                <div className="absolute -top-8 -right-8 w-4 h-4 bg-primary rounded-full animate-bounce" />
                <div className="absolute -bottom-6 -left-6 w-3 h-3 bg-secondary rounded-full animate-bounce" style={{ animationDelay: '0.5s' }} />
                <div className="absolute top-1/2 -left-12 w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
                <div className="absolute -top-4 left-1/2 w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '1.5s' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;