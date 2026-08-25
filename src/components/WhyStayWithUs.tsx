import React from 'react';
import { 
  Sparkles, 
  Car, 
  Wifi, 
  Clock, 
  Waves, 
  DollarSign, 
  Coffee, 
  ShieldCheck 
} from 'lucide-react';

export const WhyStayWithUs: React.FC = () => {
  const benefits = [
    {
      icon: Sparkles,
      title: "Spotlessly Clean Rooms",
      description: "Our dedicated housekeeping team adheres to strict hospital-grade sanitization protocols for crisp, fresh linens and spotless bathrooms every stay."
    },
    {
      icon: Car,
      title: "Doorstep Parking at Your Door",
      description: "Classic roadside convenience with single-step parking right outside your entrance. Zero crowded parking garages, zero hauling luggage up long corridors."
    },
    {
      icon: DollarSign,
      title: "Best Rate Guarantee",
      description: "Book directly on this official website to save 10% to 25% off every stay compared to third-party travel websites with zero middleman fees."
    },
    {
      icon: Wifi,
      title: "Ultra-Fast Fiber Wi-Fi 6",
      description: "Stream 4K movies, connect multiple devices, and take video calls effortlessly with dedicated 300+ Mbps property-wide high-speed fiber internet."
    },
    {
      icon: Clock,
      title: "24/7 Front Desk Hospitality",
      description: "Arriving late after a long road trip? Our warm, local front desk staff is on-site around the clock to welcome you with a friendly smile and quick key handover."
    },
    {
      icon: Coffee,
      title: "Fresh Morning Roaster Bar",
      description: "Start every adventure with complimentary fresh Oregon roasted coffee, hot Belgian waffles, warm pastries, fresh fruit, and chilled juices."
    }
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7] text-[#332D29] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C6239]/10 border border-[#8C6239]/20 text-[#8C6239] text-[10px] font-bold uppercase tracking-widest mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Pinecrest Difference</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#332D29] tracking-tight">
            Why Travelers Choose The Pinecrest
          </h2>
          <p className="mt-3 text-[#6D635B] text-sm sm:text-base font-light leading-relaxed">
            We blend classic American roadside simplicity with modern amenities, crisp cleanliness, and thoughtful touches that make every stay comfortable.
          </p>
        </div>

        {/* 6 Grid Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-[#EAE4D9] shadow-xs hover:shadow-md transition duration-300 flex flex-col group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#8C6239]/10 border border-[#8C6239]/20 flex items-center justify-center text-[#8C6239] mb-5 group-hover:bg-[#8C6239] group-hover:text-white transition duration-300">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-serif text-[#332D29] mb-2">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6D635B] leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Direct Booking Highlight Banner */}
        <div className="mt-12 bg-[#332D29] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg border border-[#EAE4D9]/20">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-[#EAE4D9] text-[10px] font-bold uppercase tracking-widest">Official Website Guarantee</div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">Always Get the Best Price & VIP Direct Perks</h3>
            <p className="text-[#EAE4D9]/80 text-xs sm:text-sm max-w-xl font-light">
              Receive free 1-hour early check-in or late check-out, priority ground floor parking, free EV charging, and 100% free 24-hr cancellation.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="bg-[#8C6239] text-white px-4 py-2 rounded-xl font-mono text-sm font-bold shadow-sm">
              Code: DIRECT10
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
