import React, { useState } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  Calendar, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare,
  Search,
  Lock
} from 'lucide-react';
import { motion } from 'motion/react';
import { ActivePage } from '../types';
import { MOTEL_INFO } from '../data/motelData';

interface NavbarProps {
  currentPage?: ActivePage;
  activePage?: ActivePage;
  onNavigate?: (page: ActivePage) => void;
  setActivePage?: (page: ActivePage) => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenConcierge: () => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  activePage,
  onNavigate,
  setActivePage,
  onOpenBooking,
  onOpenLookup,
  onOpenConcierge,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentActive = currentPage || activePage || 'home';
  const handlePageChange = onNavigate || setActivePage || (() => {});

  const navItems: { label: string; page: ActivePage }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Rooms & Rates', page: 'rooms' },
    { label: 'Amenities', page: 'amenities' },
    { label: 'Gallery', page: 'gallery' },
    { label: 'Location & Area', page: 'location' },
    { label: 'Special Offers', page: 'offers' },
    { label: 'Reviews', page: 'reviews' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' }
  ];

  const handleNavClick = (page: ActivePage) => {
    handlePageChange(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md text-[#332D29] border-b border-[#EAE4D9] shadow-xs">
      {/* Top Direct Booking Benefit Bar */}
      <div className="bg-[#F7F3EE] text-[#6D635B] text-xs py-2 px-4 border-b border-[#EAE4D9]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-[#8C6239] text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
              Direct Perk
            </span>
            <span className="hidden sm:inline">Save 10% automatically with code <strong className="text-[#332D29]">DIRECT10</strong></span>
            <span className="sm:hidden">Book Direct & Save 10%</span>
            <span className="hidden md:inline text-[#8C6239]">• Best Price Guaranteed • Free 24h Cancellation</span>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium">
            <button 
              onClick={onOpenLookup} 
              className="text-[#6D635B] hover:text-[#8C6239] transition flex items-center gap-1 cursor-pointer"
              title="Lookup existing reservation"
            >
              <Search className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Find My Reservation</span>
            </button>
            <button 
              onClick={() => onOpenAdmin ? onOpenAdmin() : handleNavClick('admin')} 
              className="text-[#A69D95] hover:text-[#332D29] transition flex items-center gap-1 text-[11px] cursor-pointer"
              title="Staff Admin Portal"
            >
              <Lock className="w-3 h-3" />
              <span>Staff Login</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Nav Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Motel Logo & Brand (Animated Upward Fade) */}
          <motion.div 
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleNavClick('home')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-lg bg-[#8C6239] flex items-center justify-center text-white shadow-sm transition group-hover:bg-[#74512F]">
              {/* Custom Pine Tree Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L4 12h3l-3 6h6v4h4v-4h6l-3-6h3L12 2z" />
              </svg>
            </div>
            <div>
              <div className="text-xl font-bold tracking-tight text-[#332D29] font-serif flex items-center gap-1.5">
                <span>The Pinecrest</span>
                <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C6239] font-semibold px-1.5 py-0.5 bg-[#8C6239]/10 rounded border border-[#8C6239]/20">
                  Bend, OR
                </span>
              </div>
              <p className="text-xs text-[#A69D95] font-medium tracking-wide">Motel & Suites • Hwy 97</p>
            </div>
          </motion.div>

          {/* Desktop Navigation Links (Sequentially Staggered) */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item, idx) => {
              const isActive = currentActive === item.page;
              return (
                <motion.button
                  key={item.page}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.35, 
                    delay: 0.18 + (idx * 0.035), 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  onClick={() => handleNavClick(item.page)}
                  className={`text-xs font-semibold uppercase tracking-wider transition cursor-pointer py-1 ${
                    isActive 
                      ? 'text-[#8C6239] border-b-2 border-[#8C6239]' 
                      : 'text-[#6D635B] hover:text-[#8C6239]'
                  }`}
                >
                  {item.label}
                </motion.button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:flex items-center gap-3"
          >
            {/* AI Concierge quick button */}
            <button
              onClick={onOpenConcierge}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#8C6239] bg-[#8C6239]/10 hover:bg-[#8C6239]/20 border border-[#8C6239]/30 rounded-full transition cursor-pointer"
              title="Ask our Virtual Concierge anything about your stay"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Ask Concierge</span>
            </button>

            {/* Click to Call */}
            <a 
              href={`tel:${MOTEL_INFO.phone}`}
              className="text-xs font-bold text-[#8C6239] hover:text-[#74512F] transition flex items-center gap-1.5 px-2"
              title="Call 24/7 Front Desk"
            >
              <Phone className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>{MOTEL_INFO.phone}</span>
            </a>

            {/* Primary Book Now CTA */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-[#332D29] hover:bg-[#4A433E] active:bg-[#231F1C] rounded-full shadow-sm transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Stay</span>
            </button>
          </motion.div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white bg-[#8C6239] hover:bg-[#74512F] rounded-full"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#332D29] hover:text-[#8C6239] bg-[#F7F3EE] border border-[#EAE4D9] rounded-lg"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#EAE4D9] px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`text-left px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-lg ${
                  currentActive === item.page
                    ? 'bg-[#8C6239]/10 text-[#8C6239] font-bold border border-[#8C6239]/30'
                    : 'text-[#6D635B] hover:bg-[#F7F3EE]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#EAE4D9] space-y-2">
            <a
              href={`tel:${MOTEL_INFO.phone}`}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#8C6239] bg-[#F7F3EE] border border-[#EAE4D9] rounded-xl"
            >
              <Phone className="w-4 h-4" />
              <span>Call Front Desk {MOTEL_INFO.phone}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-bold uppercase tracking-wider text-[#8C6239] bg-[#8C6239]/10 border border-[#8C6239]/30 rounded-xl"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Ask Virtual Concierge (AI)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-white bg-[#332D29] hover:bg-[#4A433E] rounded-full shadow-sm"
            >
              Book Your Stay Direct
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
