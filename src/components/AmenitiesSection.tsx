import React, { useState } from 'react';
import { 
  Wifi, 
  Car, 
  Waves, 
  Coffee, 
  Dog, 
  Refrigerator, 
  Clock, 
  Zap, 
  Sparkles, 
  Wind, 
  Utensils, 
  Ban,
  CheckCircle2,
  Tv,
  PhoneCall
} from 'lucide-react';
import { AMENITIES_DATA, MOTEL_INFO } from '../data/motelData';

// Map icon string names to actual Lucide components
const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Wifi,
  Car,
  Waves,
  Coffee,
  Dog,
  Refrigerator,
  Clock,
  Zap,
  Sparkles,
  Wind,
  Utensils,
  Ban,
  Tv
};

interface AmenitiesSectionProps {
  onOpenBooking: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'room' | 'property' | 'service' | 'wellness'>('all');

  const categories = [
    { id: 'all', label: 'All Amenities' },
    { id: 'property', label: 'Property & Parking' },
    { id: 'room', label: 'In-Room Conveniences' },
    { id: 'wellness', label: 'Pool & Recreation' },
    { id: 'service', label: 'Services & Perks' }
  ];

  const filtered = activeCategory === 'all' 
    ? AMENITIES_DATA 
    : AMENITIES_DATA.filter(a => a.category === activeCategory);

  return (
    <section className="py-16 sm:py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-amber-800 text-xs font-bold uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            Comfort & Convenience
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900 mt-3">
            Designed for Modern Travelers & Roadtrippers
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Every amenity at The Pinecrest has been carefully selected to make your stay effortless, relaxing, and refreshingly uncomplicated.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-amber-800 text-white shadow-md'
                  : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Amenity Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => {
            const IconComponent = iconMap[item.iconName] || Sparkles;
            return (
              <div 
                key={item.id}
                className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 group-hover:bg-amber-700 group-hover:text-white transition">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    {item.highlight && (
                      <span className="text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full">
                        {item.highlight}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold font-serif text-stone-900 mb-1.5">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.image && (
                  <div className="mt-4 pt-4 border-t border-stone-100">
                    <div className="h-32 rounded-lg overflow-hidden bg-stone-100">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Extra Full Property Checklist */}
        <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
          <h3 className="text-lg font-bold font-serif text-stone-900 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Complete On-Site Amenities Checklist</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 text-xs text-stone-700">
            <div className="flex items-center gap-1.5">✓ 300+ Mbps Fiber Wi-Fi</div>
            <div className="flex items-center gap-1.5">✓ Doorstep Parking at Room</div>
            <div className="flex items-center gap-1.5">✓ Heated Outdoor Pool</div>
            <div className="flex items-center gap-1.5">✓ Morning Roaster Bar</div>
            <div className="flex items-center gap-1.5">✓ Fresh Waffles & Pastries</div>
            <div className="flex items-center gap-1.5">✓ In-Room Microwave</div>
            <div className="flex items-center gap-1.5">✓ In-Room Mini-Fridge</div>
            <div className="flex items-center gap-1.5">✓ Keurig Coffee Maker</div>
            <div className="flex items-center gap-1.5">✓ 55" 4K Smart TVs</div>
            <div className="flex items-center gap-1.5">✓ Dual Level-2 EV Chargers</div>
            <div className="flex items-center gap-1.5">✓ 24/7 Staffed Front Desk</div>
            <div className="flex items-center gap-1.5">✓ 100% Smoke-Free Rooms</div>
            <div className="flex items-center gap-1.5">✓ Pet Friendly Rooms & Lawn</div>
            <div className="flex items-center gap-1.5">✓ ADA Accessible King Rooms</div>
            <div className="flex items-center gap-1.5">✓ Guest Laundry Facility</div>
            <div className="flex items-center gap-1.5">✓ Outdoor BBQ & Picnic Area</div>
            <div className="flex items-center gap-1.5">✓ Ice & Cold Vending</div>
            <div className="flex items-center gap-1.5">✓ Organic Bath Toiletries</div>
            <div className="flex items-center gap-1.5">✓ Iron & Full Ironing Board</div>
            <div className="flex items-center gap-1.5">✓ Oversized RV/Trailer Stalls</div>
          </div>

          <div className="mt-6 pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs text-stone-500 font-medium">
              Have specific questions about amenities or equipment?
            </span>
            <div className="flex items-center gap-3">
              <a
                href={`tel:${MOTEL_INFO.phone}`}
                className="text-xs font-semibold text-stone-800 hover:text-amber-800 flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call {MOTEL_INFO.phone}</span>
              </a>
              <button
                onClick={onOpenBooking}
                className="px-4 py-2 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs rounded-lg shadow cursor-pointer"
              >
                Book Your Room
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
