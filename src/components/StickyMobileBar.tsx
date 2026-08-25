import React from 'react';
import { Phone, Calendar, Sparkles } from 'lucide-react';
import { MOTEL_INFO } from '../data/motelData';

interface StickyMobileBarProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({
  onOpenBooking,
  onOpenConcierge
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#332D29]/95 backdrop-blur-md border-t border-[#EAE4D9]/20 p-3 sm:hidden shadow-2xl animate-slideUp">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        
        {/* Call Button */}
        <a
          href={`tel:${MOTEL_INFO.phone}`}
          className="p-3 bg-[#27221E] hover:bg-[#332D29] text-[#EAE4D9] rounded-xl border border-[#EAE4D9]/20 flex items-center justify-center shrink-0"
          aria-label="Call Motel Front Desk"
        >
          <Phone className="w-5 h-5 text-[#8C6239]" />
        </a>

        {/* AI Concierge quick button */}
        <button
          onClick={onOpenConcierge}
          className="p-3 bg-[#27221E] hover:bg-[#332D29] text-[#8C6239] rounded-xl border border-[#EAE4D9]/20 flex items-center justify-center shrink-0"
          aria-label="Virtual AI Concierge"
        >
          <Sparkles className="w-5 h-5" />
        </button>

        {/* Main Book Direct CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-1 py-3 px-4 bg-[#8C6239] active:bg-[#74512F] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-between transition cursor-pointer"
        >
          <div className="text-left leading-tight">
            <span className="block text-[10px] text-[#EAE4D9] uppercase font-bold tracking-wider">Best Rate Direct</span>
            <span className="font-extrabold text-sm">From $119 / nt</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-[#332D29]/40 px-2.5 py-1 rounded-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span>Book Direct</span>
          </div>
        </button>

      </div>
    </div>
  );
};
