import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo } from 'phosphor-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Title animation with bouncing effect
    gsap.fromTo(titleRef.current,
      {
        opacity: 0,
        scale: 0.5,
        rotation: -5,
        filter: 'blur(15px)'
      },
      {
        opacity: 1,
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        duration: 1.5,
        ease: 'elastic.out(1, 0.5)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Cards animation with morphing effects
    const cards = gridRef.current?.children;
    if (cards) {
      Array.from(cards).forEach((card, index) => {
        gsap.fromTo(card,
          {
            opacity: 0,
            y: 150,
            rotationX: 90,
            scale: 0.5,
            transformOrigin: "center bottom"
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 1.2,
            delay: index * 0.2,
            ease: 'back.out(2)',
            scrollTrigger: {
              trigger: card as Element,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Floating animation for each card
        gsap.to(card, {
          y: index % 2 === 0 ? -10 : 10,
          duration: 3 + (index * 0.3),
          repeat: -1,
          yoyo: true,
          ease: 'power1.inOut',
          delay: index * 0.5
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Modern e-commerce solution with React, TypeScript, and Stripe integration.",
      tech: ["React", "TypeScript", "Node.js", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      featured: true
    },
    {
      id: 2,
      title: "AI Dashboard",
      description: "Real-time analytics dashboard with machine learning insights.",
      tech: ["Next.js", "Python", "TensorFlow", "D3.js"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      featured: true
    },
    {
      id: 3,
      title: "Crypto Wallet",
      description: "Secure Web3 wallet with DeFi integration and portfolio tracking.",
      tech: ["React", "Web3.js", "Solidity", "Ethers.js"],
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      featured: false
    },
    {
      id: 4,
      title: "Social Media App",
      description: "Full-stack social platform with real-time messaging and content sharing.",
      tech: ["React Native", "Firebase", "Node.js", "Socket.io"],
      image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      featured: false
    },
    {
      id: 5,
      title: "Task Management Tool",
      description: "Collaborative project management with team synchronization.",
      tech: ["Vue.js", "Laravel", "MySQL", "Redis"],
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      featured: false
    },
    {
      id: 6,
      title: "AR Shopping Experience",
      description: "Augmented reality shopping app with 3D product visualization.",
      tech: ["Three.js", "WebXR", "React", "AR.js"],
      image: "https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=600&h=400&fit=crop",
      github: "#",
      live: "#",
      featured: false
    }
  ];

  const handleCardHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(e.currentTarget.querySelector('.project-glow'), {
      opacity: 1,
      duration: 0.3
    });
  };

  const handleCardLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: 'power2.out'
    });
    
    gsap.to(e.currentTarget.querySelector('.project-glow'), {
      opacity: 0,
      duration: 0.3
    });
  };

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-secondary/5 rounded-full blur-3xl top-40 left-20" />
        <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-2xl bottom-40 right-20" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Featured</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work, featuring cutting-edge technologies and innovative solutions.
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`relative group cursor-pointer ${
                project.featured ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
              onMouseEnter={handleCardHover}
              onMouseLeave={handleCardLeave}
            >
              {/* Glow effect */}
              <div className="project-glow absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 transition-opacity duration-300" />
              
              {/* Card */}
              <div className="relative glass rounded-2xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors duration-300">
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-primary/20 backdrop-blur-sm rounded-full text-primary text-xs font-medium border border-primary/30">
                      Featured
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span 
                        key={tech}
                        className="px-3 py-1 bg-muted/50 rounded-full text-xs font-medium text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="glass border-primary/30 hover:bg-primary/10 text-primary"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <GithubLogo size={16} className="mr-2" />
                        Code
                      </a>
                    </Button>
                    
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-primary to-secondary hover:glow-cyan text-primary-foreground"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight size={16} className="mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;