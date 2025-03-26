
import React from 'react';
import Container from './ui/container';
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="text-xl font-semibold tracking-tight">
                <span className="text-primary">Local</span>
                <span className="text-foreground">Lift</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Supporting communities with local resources, career tools, and connections for those in transition.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <FooterLink href="/food-banks" label="Food Banks" />
              <FooterLink href="/job-centers" label="Job Centers" />
              <FooterLink href="/training" label="Training Programs" />
              <FooterLink href="/housing" label="Housing Support" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <FooterLink href="/resume" label="Resume Builder" />
              <FooterLink href="/events" label="Community Events" />
              <FooterLink href="/premium" label="Premium Features" />
              <FooterLink href="/submit" label="Submit a Resource" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <FooterLink href="/about" label="About Us" />
              <FooterLink href="/partners" label="Partners" />
              <FooterLink href="/privacy" label="Privacy Policy" />
              <FooterLink href="/terms" label="Terms of Service" />
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} LocalLift. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <SocialLink href="#" ariaLabel="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-1-4.8 4-7.6 7.5-4.9.6.5 1.2 1.1 1.5 1.9M22 4h-5"/></svg>
              </SocialLink>
              <SocialLink href="#" ariaLabel="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </SocialLink>
              <SocialLink href="#" ariaLabel="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </SocialLink>
              <SocialLink href="#" ariaLabel="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </SocialLink>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

const FooterLink = ({ href, label }: { href: string; label: string }) => (
  <li>
    <Link 
      to={href} 
      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
    >
      {label}
    </Link>
  </li>
);

const SocialLink = ({ 
  href, 
  ariaLabel, 
  children 
}: { 
  href: string; 
  ariaLabel: string; 
  children: React.ReactNode 
}) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={ariaLabel}
    className="text-muted-foreground hover:text-foreground transition-colors"
  >
    {children}
  </a>
);

export default Footer;
