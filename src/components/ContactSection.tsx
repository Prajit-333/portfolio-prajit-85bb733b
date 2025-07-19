import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, TwitterLogo } from 'phosphor-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const { toast } = useToast();

  useEffect(() => {
    const section = sectionRef.current;
    
    if (!section) return;

    // Title animation
    gsap.fromTo(titleRef.current,
      {
        opacity: 0,
        y: 50,
        filter: 'blur(10px)'
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Form animation
    gsap.fromTo(formRef.current?.children,
      {
        opacity: 0,
        x: -50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Social icons animation
    gsap.fromTo(socialRef.current?.children,
      {
        opacity: 0,
        scale: 0.5,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: socialRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );

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
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    const submitButton = e.currentTarget.querySelector('button[type="submit"]');
    if (submitButton) {
      gsap.to(submitButton, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      });
    }

    // Show success message
    toast({
      title: "Message Sent! 🚀",
      description: "Thanks for reaching out! I'll get back to you soon.",
    });

    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleSocialHover = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1.1,
      y: -5,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleSocialLeave = (e: React.MouseEvent) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 bg-primary/5 rounded-full blur-3xl top-20 left-20" />
        <div className="absolute w-64 h-64 bg-accent/10 rounded-full blur-2xl bottom-20 right-20" />
        
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
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

          {/* Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact Details */}
            <div className="glass p-8 rounded-2xl space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Contact Information
              </h3>
              
              <div className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">Email</p>
                  <p className="text-foreground font-medium">hello@miladdev.com</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">Phone</p>
                  <p className="text-foreground font-medium">+1 (555) 123-4567</p>
                </div>
                
                <div>
                  <p className="text-muted-foreground text-sm uppercase tracking-wide">Location</p>
                  <p className="text-foreground font-medium">San Francisco, CA</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-xl font-bold text-foreground mb-6">Connect With Me</h3>
              <div ref={socialRef} className="flex gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover:glow-cyan transition-all duration-300"
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <GithubLogo size={24} className="text-foreground" />
                </a>
                
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover:glow-purple transition-all duration-300"
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <LinkedinLogo size={24} className="text-foreground" />
                </a>
                
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 glass rounded-xl hover:glow-cyan transition-all duration-300"
                  onMouseEnter={handleSocialHover}
                  onMouseLeave={handleSocialLeave}
                >
                  <TwitterLogo size={24} className="text-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;