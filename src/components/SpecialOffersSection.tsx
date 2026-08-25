import React from 'react';
import { 
  Tag, 
  Check, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  Percent, 
  Sparkles 
} from 'lucide-react';
import { SPECIAL_OFFERS, MOTEL_INFO } from '../data/motelData';
import { SpecialOffer } from '../types';

interface SpecialOffersSectionProps {
  onApplyOffer: (offer: SpecialOffer) => void;
}

export const SpecialOffersSection: React.FC<SpecialOffersSectionProps> = ({ onApplyOffer }) => {
  return (
    <section className="py-16 sm:py-20 bg-[#332D29] text-[#EAE4D9] border-b border-[#EAE4D9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#27221E] text-[#8C6239] text-xs font-bold uppercase tracking-wider border border-[#8C6239]/40 mb-3">
            <Tag className="w-3.5 h-3.5 text-[#8C6239]" />
            <span>Direct Booking Discounts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Special Offers & Packages
          </h2>
          <p className="mt-2 text-[#EAE4D9]/80 text-sm sm:text-base font-light">
            Book directly through our official website to unlock verified discounts, complimentary perks, and flexible cancellation.
          </p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SPECIAL_OFFERS.map((offer) => (
            <div 
              key={offer.id}
              className="bg-[#27221E] rounded-2xl overflow-hidden border border-[#EAE4D9]/20 shadow-xl flex flex-col justify-between group hover:border-[#8C6239]/60 transition duration-300"
            >
              <div>
                {/* Banner Image */}
                <div className="relative h-44 w-full bg-[#1F1B18] overflow-hidden">
                  <img
                    src={offer.bannerImage}
                    alt={offer.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#27221E] via-transparent to-transparent" />
                  
                  {/* Top Badge */}
                  <div className="absolute top-3 left-3 bg-[#8C6239] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow">
                    {offer.badge}
                  </div>

                  {/* Promo Code Pill */}
                  <div className="absolute bottom-3 right-3 bg-[#332D29]/90 text-white font-mono font-bold text-xs px-2.5 py-1 rounded-lg border border-[#EAE4D9]/30">
                    CODE: {offer.code}
                  </div>
                </div>

                {/* Offer Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold font-serif text-white mb-2">
                    {offer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#EAE4D9]/80 font-light leading-relaxed mb-4">
                    {offer.description}
                  </p>

                  {/* Perks list */}
                  <div className="space-y-2 mb-4 bg-[#332D29]/70 p-3.5 rounded-xl border border-[#EAE4D9]/15">
                    <span className="text-[11px] font-bold text-[#8C6239] uppercase tracking-wider block">
                      Included Package Perks:
                    </span>
                    {offer.perks.map((p, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#EAE4D9]">
                        <Check className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>

                  {/* Terms */}
                  <div className="text-[11px] text-[#A69D95]">
                    <strong>Terms:</strong> {offer.terms}
                  </div>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => onApplyOffer(offer)}
                  className="w-full py-3 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Apply Code {offer.code} & Book</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* AAA / AARP / Military Banner */}
        <div className="mt-12 bg-[#27221E] rounded-2xl p-6 border border-[#EAE4D9]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="text-[#EAE4D9]">
            <span className="text-white font-bold">Traveling for Business, State Government or Hospital Visit?</span>
            <p className="mt-0.5 text-[#A69D95]">We offer custom negotiated group rates and hospital patient family discounts. Call our front desk manager at (541) 555-7463.</p>
          </div>
          <a
            href={`tel:${MOTEL_INFO.phone}`}
            className="px-4 py-2.5 bg-[#8C6239] hover:bg-[#74512F] text-white font-bold uppercase tracking-wider rounded-lg shrink-0 transition"
          >
            Inquire Group Rates
          </a>
        </div>

      </div>
    </section>
  );
};
