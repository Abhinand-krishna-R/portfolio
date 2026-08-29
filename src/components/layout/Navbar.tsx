import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '../ui/Logo';

const NavLink: React.FC<{ to: string; onClick?: (e: any) => void; children: React.ReactNode }> = ({ to, onClick, children }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="relative px-3 py-2 text-[14px] font-medium text-neutral-300 hover:text-white transition-colors duration-200 outline-none"
    >
      <span>{children}</span>
    </Link>
  );
};

interface NavbarProps {
  loadReady?: boolean;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { label: 'About', path: '/#about' },
    { label: 'Work', path: '/#projects' },
    { label: 'Experience', path: '/#experience' },
    { label: 'Contact', path: '/#contact' },
  ];


  const handleLinkClick = (e: any, path: string) => {
    if (path.startsWith('/#')) {
      const elementId = path.split('#')[1];
      if (location.pathname === '/') {
        e.preventDefault();
        const element = document.getElementById(elementId);
        if (element) {
          const navHeight = 84;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth',
          });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#09090B]/85 backdrop-blur-md shadow-lg py-3.5 px-5 sm:px-8 md:px-12'
          : 'bg-transparent py-5 px-5 sm:px-8 md:px-12'
      } flex items-center justify-between`}
    >
      <Link
        to="/"
        onClick={(e) => {
          if (location.pathname === '/') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        className="outline-none"
        aria-label="Home"
      >
        <Logo size="nav" />
      </Link>

      <nav className="hidden md:flex items-center gap-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            onClick={(e) => handleLinkClick(e, item.path)}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="block md:hidden text-neutral-300 p-2 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
        aria-expanded={mobileMenuOpen}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-[#09090B] p-6 flex flex-col md:hidden z-40 border-t border-white/10">
          <nav className="flex flex-col gap-4" role="menu">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                role="menuitem"
                onClick={(e) => handleLinkClick(e, item.path)}
                className="text-lg font-medium text-neutral-300 hover:text-white transition-colors py-2 border-b border-white/5"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/resume"
              role="menuitem"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium text-[#9F7AEA] hover:text-[#B794F4] transition-colors py-2 mt-2"
            >
              Resume
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;

