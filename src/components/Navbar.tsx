
import React, { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';
import Container from './ui/container';
import { Link } from 'react-router-dom';
import { UserMenu } from './Auth/UserMenu';
import { Button } from './ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover-transition">
            <MapPin className="w-6 h-6 text-primary" />
            <span className="text-xl font-semibold tracking-tight">
              <span className="text-primary">Local</span>
              <span className="text-foreground">Lift</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink href="/" label="Home" />
            <NavLink href="/resources" label="Resources" />
            <NavLink href="/resume" label="Resume Builder" />
            <NavLink href="/about" label="About" />
          </nav>
          
          <div className="flex items-center space-x-4">
            <Link 
              to="/get-help" 
              className="hidden md:inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 hover:shadow-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Get Help Now
            </Link>
            
            <div className="hidden md:block">
              <UserMenu />
            </div>
            
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4">
              <MobileNavLink href="/" label="Home" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/resources" label="Resources" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/resume" label="Resume Builder" onClick={() => setIsMobileMenuOpen(false)} />
              <MobileNavLink href="/about" label="About" onClick={() => setIsMobileMenuOpen(false)} />
              
              <div className="pt-2 flex items-center justify-between">
                <Link 
                  to="/get-help"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Get Help Now
                </Link>
                
                <div>
                  <UserMenu />
                </div>
              </div>
            </nav>
          </div>
        )}
      </Container>
    </header>
  );
};

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link 
    to={href} 
    className="text-sm font-medium text-foreground transition-colors hover:text-primary"
  >
    {label}
  </Link>
);

const MobileNavLink = ({ href, label, onClick }: { href: string; label: string; onClick: () => void }) => (
  <Link 
    to={href} 
    className="text-base font-medium text-foreground transition-colors hover:text-primary"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Navbar;
