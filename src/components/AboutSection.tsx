import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  MapPin, 
  Sparkles, 
  Clock, 
  Users, 
  Phone,
  ArrowRight
} from 'lucide-react';
import { MOTEL_INFO } from '../data/motelData';

interface AboutSectionProps {
  onOpenBooking: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#332D29] text-[#EAE4D9] border-b border-[#EAE4D9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left Text (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#27221E] text-[#8C6239] text-xs font-bold uppercase tracking-wider border border-[#8C6239]/40">
              <Heart className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Our Story & Hospitality Philosophy</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-white leading-tight">
              A Nostalgic Roadside Haven, <br />
              <span className="text-[#EAE4D9]">
                Thoughtfully Reimagined.
              </span>
            </h2>

            <p className="text-[#EAE4D9]/90 text-sm sm:text-base leading-relaxed font-light">
              Founded in {MOTEL_INFO.yearEstablished} and family-operated for over four decades, <strong className="text-white font-medium">The Pinecrest Motel & Suites</strong> was built on a simple promise: give travelers a spotlessly clean room, an extraordinarily comfortable bed, and genuine, welcoming hospitality right where Highway 97 meets the majestic Cascade mountains.
            </p>

            <p className="text-[#EAE4D9]/90 text-sm sm:text-base leading-relaxed font-light">
              In {MOTEL_INFO.renovatedYear}, we completed a full property refresh. We preserved the effortless convenience of single-story doorstep parking and open-air pine courtyards while outfitting every room with luxury Euro-top mattresses, high-speed fiber Wi-Fi 6, 4K Smart TVs, walk-in rain showers, and whisper-quiet climate control.
            </p>

            {/* Core Values 3 Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EAE4D9]/20 text-xs">
              <div className="bg-[#27221E] p-4 rounded-xl border border-[#EAE4D9]/20">
                <div className="font-bold text-[#8C6239] font-serif text-sm mb-1">Spotless Standards</div>
                <p className="text-[#A69D95]">Strict hospital-grade sanitization and fresh white linens on every turnover.</p>
              </div>

              <div className="bg-[#27221E] p-4 rounded-xl border border-[#EAE4D9]/20">
                <div className="font-bold text-[#8C6239] font-serif text-sm mb-1">Authentic Care</div>
                <p className="text-[#A69D95]">No corporate runaround. A local team on-site 24/7 ready to help with a smile.</p>
              </div>

              <div className="bg-[#27221E] p-4 rounded-xl border border-[#EAE4D9]/20">
                <div className="font-bold text-[#8C6239] font-serif text-sm mb-1">Fair Honest Value</div>
                <p className="text-[#A69D95]">Zero hidden resort fees. Free Wi-Fi, free parking, and free morning breakfast.</p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <span>Book Your Stay Direct</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`tel:${MOTEL_INFO.phone}`}
                className="px-4 py-3 bg-[#27221E] hover:bg-[#332D29] text-[#EAE4D9] font-semibold text-xs sm:text-sm rounded-xl border border-[#EAE4D9]/20 transition flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#8C6239]" />
                <span>Call Us {MOTEL_INFO.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Imagery Collage (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-md border border-[#EAE4D9]/20">
                <img
                  src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"
                  alt="Pinecrest Motel exterior lodge entrance"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-[#EAE4D9]/20">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  alt="Plush king guest room with timber accents"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 pt-6">
              <div className="h-56 sm:h-64 rounded-2xl overflow-hidden shadow-md border border-[#EAE4D9]/20">
                <img
                  src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80"
                  alt="Heated outdoor swimming pool"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="h-44 sm:h-52 rounded-2xl overflow-hidden shadow-md bg-[#27221E] p-4 flex flex-col justify-center text-center border border-[#EAE4D9]/20">
                <span className="text-3xl font-extrabold text-[#8C6239] font-serif">40+</span>
                <span className="text-xs font-bold uppercase tracking-wider text-white mt-1">Years of Hospitality</span>
                <span className="text-[11px] text-[#A69D95] mt-0.5">Welcoming travelers to Central Oregon</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
