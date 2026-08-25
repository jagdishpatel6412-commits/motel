import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Heart, 
  ExternalLink, 
  ArrowUp,
  Sparkles,
  Lock
} from 'lucide-react';
import { MOTEL_INFO } from '../data/motelData';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  onOpenLookup: () => void;
  onOpenAdmin: () => void;
  onOpenConcierge: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBooking,
  onOpenLookup,
  onOpenAdmin,
  onOpenConcierge
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#332D29] text-[#EAE4D9] border-t border-[#EAE4D9]/20 text-xs">
      
      {/* Top Banner: Direct Benefits */}
      <div className="border-b border-[#EAE4D9]/20 bg-[#27221E] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6239]/20 border border-[#8C6239]/40 flex items-center justify-center text-[#8C6239] shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#8C6239]" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Best Rate Guarantee</div>
              <div className="text-[11px] text-[#A69D95]">Save 10-25% booking direct</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6239]/20 border border-[#8C6239]/40 flex items-center justify-center text-[#8C6239] shrink-0">
              <Clock className="w-5 h-5 text-[#8C6239]" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Free 24h Cancellation</div>
              <div className="text-[11px] text-[#A69D95]">Flexible roadtrip plans</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6239]/20 border border-[#8C6239]/40 flex items-center justify-center text-[#8C6239] shrink-0">
              <MapPin className="w-5 h-5 text-[#8C6239]" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Doorstep Parking</div>
              <div className="text-[11px] text-[#A69D95]">Park directly at your door</div>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#8C6239]/20 border border-[#8C6239]/40 flex items-center justify-center text-[#8C6239] shrink-0">
              <Sparkles className="w-5 h-5 text-[#8C6239]" />
            </div>
            <div>
              <div className="font-bold text-white text-xs">Spotless Clean</div>
              <div className="text-[11px] text-[#A69D95]">Hospital-grade sanitized</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#8C6239] flex items-center justify-center text-white border border-[#EAE4D9]/30 shadow-md">
                <span className="font-serif font-bold text-lg">P</span>
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-white block">
                  The Pinecrest Motel & Suites
                </span>
                <span className="text-[10px] text-[#EAE4D9] font-bold tracking-widest uppercase">
                  Central Oregon Roadside Hospitality
                </span>
              </div>
            </div>

            <p className="text-xs text-[#EAE4D9]/80 font-light leading-relaxed max-w-sm">
              An independent American motel combining effortless doorstep parking and pine courtyards with updated plush bedding, fiber Wi-Fi, and 24/7 warm local service in Bend, Oregon.
            </p>

            <div className="space-y-1.5 text-xs text-[#EAE4D9]">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#8C6239] shrink-0" />
                <span>{MOTEL_INFO.address}, {MOTEL_INFO.city}, {MOTEL_INFO.state} {MOTEL_INFO.zip}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#8C6239] shrink-0" />
                <span>Front Desk: {MOTEL_INFO.phone} (Staffed 24/7)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#8C6239] shrink-0" />
                <span>{MOTEL_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Accommodations */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">
              Accommodations
            </h4>
            <ul className="space-y-2 text-[#EAE4D9]/80 text-xs">
              <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition">Deluxe King Rooms</button></li>
              <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition">Double Queen Suites</button></li>
              <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition">Kitchenette Studio Suites</button></li>
              <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition">Pet-Friendly Rooms</button></li>
              <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition">Two-Room Family Suites</button></li>
              <li><button onClick={() => onNavigate('rooms')} className="hover:text-white transition">ADA Accessible King</button></li>
            </ul>
          </div>

          {/* Column 3: Property & Guide */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">
              Explore Property
            </h4>
            <ul className="space-y-2 text-[#EAE4D9]/80 text-xs">
              <li><button onClick={() => onNavigate('amenities')} className="hover:text-white transition">All Amenities</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-white transition">Photo Gallery</button></li>
              <li><button onClick={() => onNavigate('location')} className="hover:text-white transition">Location & Directions</button></li>
              <li><button onClick={() => onNavigate('offers')} className="hover:text-white transition">Special Offers & Deals</button></li>
              <li><button onClick={() => onNavigate('reviews')} className="hover:text-white transition">Guest Reviews (4.8★)</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-white transition">About Our Motel</button></li>
            </ul>
          </div>

          {/* Column 4: Guest Services & Staff */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-widest text-[11px]">
              Guest Services
            </h4>
            <ul className="space-y-2 text-[#EAE4D9]/80 text-xs">
              <li><button onClick={onOpenLookup} className="hover:text-white font-bold text-[#8C6239] transition">Look Up Reservation</button></li>
              <li><button onClick={onOpenConcierge} className="hover:text-white flex items-center gap-1 transition"><Sparkles className="w-3 h-3 text-[#8C6239]" /> Virtual AI Concierge</button></li>
              <li><button onClick={() => onNavigate('policies')} className="hover:text-white transition">Check-in & Pet Policies</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-white transition">Contact Front Desk</button></li>
              <li><button onClick={onOpenAdmin} className="hover:text-white text-[#A69D95] flex items-center gap-1 transition pt-2"><Lock className="w-3 h-3" /> Staff Portal</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="mt-12 pt-8 border-t border-[#EAE4D9]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#A69D95] text-[11px]">
          <div>
            © {new Date().getFullYear()} The Pinecrest Motel & Suites. All rights reserved. 
            <span className="hidden sm:inline"> • Designed for direct guest bookings & comfort.</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#EAE4D9] hover:text-white transition cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#8C6239]" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
