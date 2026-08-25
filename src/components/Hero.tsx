import React from 'react';
import { 
  Star, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Wifi, 
  Car, 
  Coffee, 
  Waves, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { MOTEL_INFO } from '../data/motelData';
import { BookingWidget } from './BookingWidget';
import { SearchQuery, ActivePage } from '../types';

interface HeroProps {
  onSearch: (query: SearchQuery) => void;
  onNavigate: (page: ActivePage) => void;
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onSearch,
  onNavigate,
  onOpenBooking,
  onOpenConcierge
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center bg-[#332D29] text-white overflow-hidden py-16 lg:py-24">
      {/* Background Image with warm natural tone gradient overlay & gentle scale/fade entrance */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.03 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85"
          alt="The Pinecrest Motel & Suites exterior with courtyard and pine trees"
          className="w-full h-full object-cover object-center filter brightness-75"
        />
        {/* Natural Tones dark overlay with #332D29 and subtle warm terracotta blend */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#332D29] via-[#332D29]/75 to-[#332D29]/50" />
        <div className="absolute inset-0 bg-[#8C6239]/10 mix-blend-overlay" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center">
        
        {/* Top Trust Pill */}
        <motion.div 
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs sm:text-sm font-semibold mb-6 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#8C6239] shrink-0"></span>
          <div className="flex items-center text-amber-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            ))}
          </div>
          <span className="text-white font-bold">{MOTEL_INFO.googleRating}</span>
          <span className="text-white/80 font-light">({MOTEL_INFO.totalReviewsCount} Verified Guest Reviews)</span>
          <span className="hidden sm:inline text-[#EAE4D9]">• Central Oregon Hwy 97</span>
        </motion.div>

        {/* Main Headline & Text Block */}
        <div className="text-center max-w-4xl mx-auto mb-8">
          <motion.h1 
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold font-serif tracking-tight text-white leading-tight drop-shadow-sm"
          >
            Comfortable Stays. Great Location. <br className="hidden sm:inline" />
            <span className="text-[#EAE4D9]">
              Easy Direct Booking.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-base sm:text-lg lg:text-xl text-white/90 font-light leading-relaxed max-w-2xl mx-auto drop-shadow"
          >
            Welcome to <span className="font-semibold text-white">The Pinecrest Motel & Suites</span> in Bend, Oregon. 
            Enjoy spotless king and queen rooms, doorstep parking, 300+ Mbps fiber Wi-Fi, 
            a heated outdoor pool, and warm local hospitality.
          </motion.p>

          {/* Quick Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full shadow-lg transition transform hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
            >
              <span>Book Your Stay Direct</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('rooms')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold uppercase tracking-wider text-xs sm:text-sm rounded-full border border-white/50 shadow-md backdrop-blur-md transition cursor-pointer"
            >
              Explore Rooms & Rates
            </button>

            <a
              href={`tel:${MOTEL_INFO.phone}`}
              className="px-5 py-3.5 bg-[#332D29]/80 hover:bg-[#332D29] text-[#EAE4D9] font-medium text-xs sm:text-sm rounded-full border border-[#EAE4D9]/40 shadow-md backdrop-blur-md transition flex items-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#8C6239]" />
              <span>Call Desk {MOTEL_INFO.phone}</span>
            </a>
          </motion.div>
        </div>

        {/* Quick Highlights Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 max-w-3xl w-full mx-auto mb-8 text-xs font-medium text-[#EAE4D9]"
        >
          <div className="flex items-center gap-2 bg-[#332D29]/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#EAE4D9]/20 justify-center">
            <Car className="w-4 h-4 text-[#8C6239] shrink-0" />
            <span>Doorstep Parking</span>
          </div>
          <div className="flex items-center gap-2 bg-[#332D29]/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#EAE4D9]/20 justify-center">
            <Wifi className="w-4 h-4 text-[#8C6239] shrink-0" />
            <span>Fast Wi-Fi 6 (300 Mbps)</span>
          </div>
          <div className="flex items-center gap-2 bg-[#332D29]/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#EAE4D9]/20 justify-center">
            <Coffee className="w-4 h-4 text-[#8C6239] shrink-0" />
            <span>Free Morning Waffles</span>
          </div>
          <div className="flex items-center gap-2 bg-[#332D29]/70 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#EAE4D9]/20 justify-center">
            <Waves className="w-4 h-4 text-[#8C6239] shrink-0" />
            <span>Heated Outdoor Pool</span>
          </div>
        </motion.div>

        {/* Prominent Quick Booking Widget */}
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl"
        >
          <BookingWidget onSearch={onSearch} />
        </motion.div>

      </div>
    </section>
  );
};
