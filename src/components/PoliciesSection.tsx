import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Dog, 
  Ban, 
  CreditCard, 
  Car, 
  Accessibility, 
  Volume2,
  HelpCircle,
  Phone
} from 'lucide-react';
import { PROPERTY_POLICIES, FAQS, MOTEL_INFO } from '../data/motelData';

export const PoliciesSection: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIdx(openFaqIdx === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Transparency & Guest Comfort</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Property Policies & FAQs
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Clear, upfront information so you can plan your stay with absolute confidence and peace of mind.
          </p>
        </div>

        {/* 2-Column Split: Policies (Left 6 cols) & FAQs (Right 6 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Property Policies */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold font-serif text-stone-900 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-800" />
              <span>Motel House Rules & Policies</span>
            </h3>

            <div className="space-y-3.5">
              {PROPERTY_POLICIES.map((pol, i) => (
                <div key={i} className="bg-white rounded-xl p-4 sm:p-5 border border-stone-200 shadow-sm">
                  <div className="font-bold text-stone-900 text-sm sm:text-base flex items-center justify-between">
                    <span>{pol.title}</span>
                  </div>
                  <div className="text-xs font-semibold text-amber-800 mt-0.5">
                    {pol.summary}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    {pol.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive FAQs */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-xl font-bold font-serif text-stone-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-800" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3">
              {FAQS.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm transition"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 text-stone-900 hover:text-amber-800 transition cursor-pointer"
                    >
                      <span className="font-bold text-xs sm:text-sm font-serif">{faq.question}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-amber-800 shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-stone-600 border-t border-stone-100 leading-relaxed bg-stone-50/50">
                        <p className="mt-2">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Need More Assistance Box */}
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200 mt-6 text-xs text-stone-700">
              <div className="font-bold text-amber-900 text-sm mb-1">Still have a question?</div>
              <p className="text-stone-600 mb-3">
                Our front desk is staffed 24/7. Give us a call or chat with our Virtual AI Concierge.
              </p>
              <a
                href={`tel:${MOTEL_INFO.phone}`}
                className="inline-flex items-center gap-1.5 font-bold text-amber-900 bg-amber-200/80 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call (541) 555-7463</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
