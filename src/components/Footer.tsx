import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const footer = footerRef.current;
    
    if (!footer) return;

    // Footer slide up animation
    gsap.fromTo(contentRef.current,
      {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: footer,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Floating particles animation
    gsap.to('.footer-particle', {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: {
        each: 0.5,
        from: 'random'
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ];

  const socialLinks = [
    { icon: GithubLogo, href: 'https://github.com', label: 'GitHub' },
    { icon: LinkedinLogo, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: TwitterLogo, href: 'https://twitter.com', label: 'Twitter' },
  ];

  return (
    <footer 
      ref={footerRef}
      className="relative py-16 overflow-hidden border-t border-border/30"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
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
        
        {/* Gradient orbs */}
        <div className="absolute w-64 h-64 bg-primary/5 rounded-full blur-3xl -top-32 -left-32" />
        <div className="absolute w-48 h-48 bg-secondary/10 rounded-full blur-2xl -bottom-24 -right-24" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div ref={contentRef} className="space-y-12">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Brand Section */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Milad
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

            {/* Contact Info */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-foreground">Get In Touch</h4>
              <div className="space-y-3 text-muted-foreground">
                <p>📧 hello@miladdev.com</p>
                <p>📱 +1 (555) 123-4567</p>
                <p>📍 San Francisco, CA</p>
              </div>
              
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
              © 2024 Milad. All rights reserved.
            </p>
            
            <p className="flex items-center text-muted-foreground text-sm">
              Made with 
              <Heart size={16} className="mx-1 text-red-500 animate-pulse" />
              using React & GSAP
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;