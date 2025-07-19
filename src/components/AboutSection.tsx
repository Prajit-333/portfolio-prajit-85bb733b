import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '@/assets/profile-image.png';
import { 
  Code, 
  PaintBrush, 
  Rocket, 
  Lightning,
  Database,
  Globe
} from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Main animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Section fade in with blur effect
    tl.fromTo(section, 
      { 
        opacity: 0,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out'
      }
    );

    // Image animation
    tl.fromTo(imageRef.current,
      {
        x: -100,
        opacity: 0,
        scale: 0.8
      },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out'
      },
      '-=0.5'
    );

    // Content animation
    tl.fromTo(contentRef.current?.children,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
      },
      '-=0.8'
    );

    // Skills grid animation
    tl.fromTo(skillsRef.current?.children,
      {
        y: 30,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)'
      },
      '-=0.4'
    );

    // Image hover effects
    const imageContainer = imageRef.current;
    if (imageContainer) {
      imageContainer.addEventListener('mouseenter', () => {
        gsap.to(imageContainer, {
          scale: 1.05,
          rotationY: 5,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      imageContainer.addEventListener('mouseleave', () => {
        gsap.to(imageContainer, {
          scale: 1,
          rotationY: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: 'Frontend', icon: Code, color: 'text-primary' },
    { name: 'Design', icon: PaintBrush, color: 'text-secondary' },
    { name: 'Performance', icon: Lightning, color: 'text-accent' },
    { name: 'Innovation', icon: Rocket, color: 'text-primary' },
    { name: 'Backend', icon: Database, color: 'text-secondary' },
    { name: 'Web3', icon: Globe, color: 'text-accent' }
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-20 right-20" />
        <div className="absolute w-64 h-64 bg-secondary/10 rounded-full blur-2xl bottom-20 left-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="flex justify-center lg:justify-start">
            <div className="relative group">
              {/* Glowing frame */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Image container */}
              <div className="relative w-80 h-80 rounded-full overflow-hidden glass border-2 border-primary/30">
                <img 
                  src="/lovable-uploads/1cebfdde-5f4d-4a3c-834c-789217b7e79c.png"
                  alt="Milad - Web Developer"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
              </div>
              
              {/* Floating accent elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-secondary rounded-full animate-pulse delay-500" />
              <div className="absolute top-1/2 -right-6 w-4 h-4 bg-accent rounded-full animate-pulse delay-1000" />
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                <span className="text-foreground">About</span>
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
                  Me
                </span>
              </h2>
              
              <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
            </div>

            <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
              <p>
                I'm a passionate <span className="text-primary font-medium">full-stack developer</span> with 
                over 2 years of experience crafting digital experiences that push the boundaries of what's possible on the web.
              </p>
              
              <p>
                Specializing in <span className="text-secondary font-medium">React, TypeScript, and modern web technologies</span>, 
                I transform complex ideas into elegant, user-friendly solutions that deliver real business value.
              </p>
              
              <p>
                When I'm not coding, you'll find me exploring the latest in <span className="text-accent font-medium">
                Web3, AI, and immersive technologies</span> – always staying ahead of the curve to bring 
                cutting-edge solutions to my clients.
              </p>
            </div>

            {/* Skills Grid */}
            <div ref={skillsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
              {skills.map((skill, index) => (
                <div 
                  key={skill.name}
                  className="glass p-4 rounded-xl hover:glow-cyan transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <skill.icon 
                      size={32} 
                      className={`${skill.color} group-hover:scale-110 transition-transform duration-300`}
                    />
                    <span className="font-medium text-foreground">{skill.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;