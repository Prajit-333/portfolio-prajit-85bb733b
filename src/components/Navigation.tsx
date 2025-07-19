import { useState, useEffect } from 'react';
import { List, X, GithubLogo, LinkedinLogo } from 'phosphor-react';
import { gsap } from 'gsap';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.mobile-menu', 
        { x: '100%', opacity: 0 },
        { x: '0%', opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
      gsap.fromTo('.mobile-menu-item',
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
      );
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { label: 'Home', href: 'hero' },
    { label: 'About', href: 'about' },
    { label: 'Projects', href: 'projects' },
    { label: 'Contact', href: 'contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass backdrop-blur-xl border-b border-border/50' : ''
      }`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Milad
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              
              {/* Social Icons */}
              <div className="flex items-center space-x-4 ml-8">
                <a
                  href="https://github.com"
                  className="p-2 rounded-lg glass hover:glow-cyan transition-all duration-300 hover:scale-110"
                >
                  <GithubLogo size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="p-2 rounded-lg glass hover:glow-purple transition-all duration-300 hover:scale-110"
                >
                  <LinkedinLogo size={20} />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg glass hover:glow-cyan transition-all duration-300"
            >
              {isOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mobile-menu fixed inset-0 z-30 md:hidden">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
          <div className="relative h-full flex flex-col items-center justify-center space-y-8">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                className="mobile-menu-item text-2xl font-medium text-foreground hover:text-primary transition-colors duration-300"
              >
                {item.label}
              </button>
            ))}
            
            <div className="mobile-menu-item flex items-center space-x-6 mt-8">
              <a
                href="https://github.com"
                className="p-3 rounded-lg glass hover:glow-cyan transition-all duration-300"
              >
                <GithubLogo size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="p-3 rounded-lg glass hover:glow-purple transition-all duration-300"
              >
                <LinkedinLogo size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;