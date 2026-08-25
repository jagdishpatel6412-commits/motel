import React, { useState } from 'react';
import { 
  Users, 
  Bed, 
  Maximize, 
  Wifi, 
  Tv, 
  Coffee, 
  Car, 
  Dog, 
  Accessibility, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Phone,
  Sparkles,
  Info
} from 'lucide-react';
import { Room } from '../types';
import { MOTEL_INFO } from '../data/motelData';

interface RoomCardProps {
  room: Room;
  onSelectRoom: (room: Room) => void;
  onOpenDetails: (room: Room) => void;
  nights?: number;
  promoDiscountPercent?: number;
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onSelectRoom,
  onOpenDetails,
  nights = 1,
  promoDiscountPercent = 10
}) => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  const directDiscountPrice = Math.round(room.basePrice * (1 - promoDiscountPercent / 100));
  const otaEstimatedPrice = Math.round(room.basePrice * 1.18); // Simulated third-party rate
  const otaSavings = otaEstimatedPrice - directDiscountPrice;

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIdx((prev) => (prev - 1 + room.images.length) % room.images.length);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-[#EAE4D9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* Image Container with Slider */}
      <div className="relative h-64 sm:h-72 w-full bg-[#EAE4D9] overflow-hidden">
        <img
          src={room.images[currentImageIdx]}
          alt={room.name}
          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient Overlay for Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#332D29]/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          {room.popularBadge ? (
            <span className="bg-[#8C6239] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md backdrop-blur-sm">
              {room.popularBadge}
            </span>
          ) : (
            <span className="bg-[#332D29]/80 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
              {room.bedConfiguration}
            </span>
          )}

          {room.petFriendly && (
            <span className="bg-[#332D29] text-[#EAE4D9] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow flex items-center gap-1 border border-[#EAE4D9]/30">
              <Dog className="w-3 h-3 text-[#8C6239]" />
              <span>Pet Friendly</span>
            </span>
          )}

          {room.accessible && (
            <span className="bg-[#332D29] text-[#EAE4D9] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow flex items-center gap-1 border border-[#EAE4D9]/30">
              <Accessibility className="w-3 h-3 text-[#8C6239]" />
              <span>ADA Compliant</span>
            </span>
          )}
        </div>

        {/* Image Navigation Arrows */}
        {room.images.length > 1 && (
          <div className="absolute inset-y-0 inset-x-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition">
            <button
              onClick={prevImage}
              className="p-1.5 rounded-full bg-[#332D29]/80 text-white hover:bg-[#332D29] transition"
              aria-label="Previous room photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="p-1.5 rounded-full bg-[#332D29]/80 text-white hover:bg-[#332D29] transition"
              aria-label="Next room photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Bottom Image Indicators & Floor */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="font-medium flex items-center gap-1 bg-[#332D29]/70 px-2.5 py-0.5 rounded-lg backdrop-blur-sm text-[11px]">
            <Car className="w-3 h-3 text-[#8C6239]" />
            <span>{room.floor}</span>
          </span>

          {/* Dots */}
          <div className="flex gap-1">
            {room.images.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentImageIdx ? 'w-4 bg-[#8C6239]' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Room Details Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          
          {/* Title & Key Specs */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <div>
              <h3 
                onClick={() => onOpenDetails(room)}
                className="text-xl font-bold font-serif text-[#332D29] hover:text-[#8C6239] transition cursor-pointer"
              >
                {room.name}
              </h3>
              <p className="text-xs text-[#A69D95] font-medium mt-0.5">{room.headline}</p>
            </div>
          </div>

          {/* Room Spec Chips */}
          <div className="flex flex-wrap items-center gap-2 py-3 border-y border-[#EAE4D9] text-xs text-[#6D635B] font-medium my-3">
            <span className="flex items-center gap-1 bg-[#F7F3EE] px-2.5 py-1 rounded-lg border border-[#EAE4D9]">
              <Users className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Up to {room.capacity.maxTotal} Guests</span>
            </span>
            <span className="flex items-center gap-1 bg-[#F7F3EE] px-2.5 py-1 rounded-lg border border-[#EAE4D9]">
              <Bed className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>{room.bedConfiguration}</span>
            </span>
            <span className="flex items-center gap-1 bg-[#F7F3EE] px-2.5 py-1 rounded-lg border border-[#EAE4D9]">
              <Maximize className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>{room.sizeSqFt} sq. ft.</span>
            </span>
          </div>

          {/* Key Feature Bullets */}
          <div className="space-y-1.5 mb-4">
            {room.features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-[#6D635B]">
                <Check className="w-3.5 h-3.5 text-[#8C6239] shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* Direct Booking Saving Callout */}
          <div className="bg-[#F7F3EE] rounded-xl p-2.5 border border-[#EAE4D9] mb-4 flex items-center justify-between text-xs">
            <div className="text-[#332D29]">
              <span className="font-bold text-[#8C6239]">Direct Booking Guarantee:</span>
              <div className="text-[11px] text-[#6D635B]">Save ${otaSavings}/night vs third-party OTAs</div>
            </div>
            <span className="bg-[#8C6239] text-white font-bold px-2 py-0.5 rounded-md text-[10px] uppercase tracking-wider">
              -10% Applied
            </span>
          </div>
        </div>

        {/* Pricing & CTA Section */}
        <div className="pt-2 border-t border-[#EAE4D9]">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-[#A69D95] line-through mr-1.5">${otaEstimatedPrice}</span>
              <span className="text-2xl font-serif font-bold text-[#332D29]">${directDiscountPrice}</span>
              <span className="text-xs text-[#6D635B] font-normal"> / night</span>
              <div className="text-[10px] text-[#8C6239] font-medium mt-0.5">
                Includes Free Parking, Wi-Fi & Breakfast
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6239] bg-[#8C6239]/10 px-2 py-0.5 rounded-full border border-[#8C6239]/20">
                {room.availableUnits} left today
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenDetails(room)}
              className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-[#332D29] bg-[#F7F3EE] hover:bg-[#EAE4D9] border border-[#EAE4D9] rounded-xl transition text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Details</span>
            </button>

            <button
              onClick={() => onSelectRoom(room)}
              className="py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-white bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] rounded-xl shadow-sm transition text-center flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Book Direct</span>
            </button>
          </div>

          <div className="mt-2 text-center">
            <a
              href={`tel:${MOTEL_INFO.phone}`}
              className="text-[11px] text-[#A69D95] hover:text-[#332D29] flex items-center justify-center gap-1 transition font-medium"
            >
              <Phone className="w-3 h-3 text-[#8C6239]" />
              <span>Or call {MOTEL_INFO.phone} to reserve</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
