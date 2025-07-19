import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, TwitterLogo, Heart } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const IntegratedFooter = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const footerContentRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Lighter contact title animation - always visible
    gsap.fromTo(titleRef.current,
      {
        opacity: 0.4,
        y: 15
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Lighter form animation - more static
    if (formRef.current?.children) {
      gsap.set(formRef.current.children, {
        opacity: 0.6,
        x: -20
      });
      
      gsap.to(formRef.current.children,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Lighter footer content animation
    gsap.fromTo(footerContentRef.current,
      {
        opacity: 0.5,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: footerContentRef.current,
          start: 'top 95%',
          end: 'bottom 5%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Subtle social icons animation
    if (socialRef.current?.children) {
      gsap.set(socialRef.current.children, {
        opacity: 0.7,
        scale: 0.95
      });
      
      gsap.to(socialRef.current.children,
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: socialRef.current,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Reduced floating particles animation
    gsap.to('.footer-particle', {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.8,
        from: 'random'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    if (submitButton) {
      gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }

    toast({
      title: "Message Sent! 🚀",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });

    setFormData({ name: '', email: '', message: '' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Projects', href: 'projects' },
  ];

  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com', label: 'GitHub' },
    { icon: LinkedinLogo, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: TwitterLogo, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden border-t border-border/30"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-20 left-20" />
        <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-2xl bottom-20 right-20" />
        
        {/* Floating particles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className="footer-particle absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Contact Section */}
        <div className="mb-20">
          {/* Section Title */}
          <div ref={titleRef} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              <span className="text-foreground">Get In</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
                Touch
              </span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto mb-6" />
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="glass border-border/50 focus:border-primary focus:glow-cyan bg-background/50 backdrop-blur-sm"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="glass border-border/50 focus:border-primary focus:glow-cyan bg-background/50 backdrop-blur-sm"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="glass border-border/50 focus:border-primary focus:glow-cyan bg-background/50 backdrop-blur-sm resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full btn-glow bg-gradient-to-r from-primary to-secondary hover:glow-cyan text-primary-foreground font-medium py-4"
              >
                <PaperPlaneTilt size={20} className="mr-2" />
                Send Message
              </Button>
            </form>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="glass p-8 rounded-2xl space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Contact Information
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide">Email</p>
                    <p className="text-foreground font-medium">rprajit62@gmail.com</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide">Phone</p>
                    <p className="text-foreground font-medium">+1 (555) 123-4567</p>
                  </div>
                  
                  <div>
                    <p className="text-muted-foreground text-sm uppercase tracking-wide">Location</p>
                    <p className="text-foreground font-medium">Madurai, Tamil Nadu</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-6">Connect With Me</h3>
                <div ref={socialRef} className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 glass rounded-xl hover:glow-cyan transition-all duration-300 hover:scale-110"
                    >
                      <social.icon size={24} className="text-foreground" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Content */}
        <div ref={footerContentRef} className="space-y-12 border-t border-border/30 pt-16">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Prajit
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Crafting digital experiences that inspire and engage through innovative design and cutting-edge technology.
                </p>
              </div>
              
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 glass rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-110 group"
                    aria-label={social.label}
                  >
                    <social.icon size={20} className="text-foreground group-hover:text-primary transition-colors duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-foreground">Quick Links</h4>
              <nav className="space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => {
                      const element = document.getElementById(link.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="block text-muted-foreground hover:text-primary transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Back to Top */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-foreground">Navigation</h4>
              <button
                onClick={scrollToTop}
                className="inline-flex items-center px-4 py-2 glass rounded-lg hover:glow-cyan transition-all duration-300 hover:scale-105 text-foreground hover:text-primary"
              >
                ↑ Back to Top
              </button>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 Prajit. All rights reserved.
            </p>
            
            <p className="flex items-center text-muted-foreground text-sm">
              Made with 
              <Heart size={16} className="mx-1 text-red-500 animate-pulse" />
              using React & GSAP
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntegratedFooter;