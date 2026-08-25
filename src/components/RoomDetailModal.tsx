import React, { useState } from 'react';
import { 
  X, 
  Bed, 
  Users, 
  Maximize, 
  Car, 
  Wifi, 
  Coffee, 
  Tv, 
  Wind, 
  Check, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight,
  Dog,
  Accessibility
} from 'lucide-react';
import { Room } from '../types';
import { MOTEL_INFO } from '../data/motelData';

interface RoomDetailModalProps {
  room: Room | null;
  onClose: () => void;
  onBookRoom: (room: Room) => void;
}

export const RoomDetailModal: React.FC<RoomDetailModalProps> = ({
  room,
  onClose,
  onBookRoom
}) => {
  if (!room) return null;

  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const directPrice = Math.round(room.basePrice * 0.9); // 10% direct saving
  const otaPrice = Math.round(room.basePrice * 1.18);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Bar */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">{room.name}</h2>
              {room.petFriendly && (
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Dog className="w-3 h-3" />
                  <span>Pet Friendly</span>
                </span>
              )}
              {room.accessible && (
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded flex items-center gap-1">
                  <Accessibility className="w-3 h-3" />
                  <span>ADA</span>
                </span>
              )}
            </div>
            <p className="text-xs text-stone-500 mt-0.5">{room.headline}</p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {/* Main Gallery Carousel */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden bg-stone-900">
              <img
                src={room.images[activePhotoIdx]}
                alt={`${room.name} view ${activePhotoIdx + 1}`}
                className="w-full h-full object-cover"
              />
              
              {room.images.length > 1 && (
                <div className="absolute inset-y-0 inset-x-3 flex items-center justify-between">
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev - 1 + room.images.length) % room.images.length)}
                    className="p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActivePhotoIdx((prev) => (prev + 1) % room.images.length)}
                    className="p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-900 transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-3 right-3 bg-stone-900/80 text-white text-xs px-2.5 py-1 rounded backdrop-blur-sm">
                Photo {activePhotoIdx + 1} of {room.images.length}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {room.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActivePhotoIdx(i)}
                  className={`relative w-20 h-16 rounded-lg overflow-hidden shrink-0 border-2 transition ${
                    activePhotoIdx === i ? 'border-amber-600 scale-95' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Room Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-xl border border-stone-200 text-xs">
            <div className="flex items-center gap-2">
              <Bed className="w-4 h-4 text-amber-800 shrink-0" />
              <div>
                <div className="text-stone-400">Bedding</div>
                <div className="font-bold text-stone-800">{room.bedConfiguration}</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-800 shrink-0" />
              <div>
                <div className="text-stone-400">Occupancy</div>
                <div className="font-bold text-stone-800">Max {room.capacity.maxTotal} Guests</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Maximize className="w-4 h-4 text-amber-800 shrink-0" />
              <div>
                <div className="text-stone-400">Room Size</div>
                <div className="font-bold text-stone-800">{room.sizeSqFt} Sq. Ft.</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-amber-800 shrink-0" />
              <div>
                <div className="text-stone-400">Location</div>
                <div className="font-bold text-stone-800">{room.floor}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-2 font-serif">About This Room</h3>
            <p className="text-stone-700 text-sm leading-relaxed">{room.description}</p>
          </div>

          {/* Key Room Features */}
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-3 font-serif">Room Features & Comforts</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {room.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Amenities Checklist */}
          <div>
            <h3 className="text-base font-bold text-stone-900 mb-3 font-serif">Included In-Room Amenities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {room.amenities.map((am, idx) => (
                <div key={idx} className="bg-stone-100/80 px-3 py-2 rounded-lg text-xs font-medium text-stone-700 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                  <span>{am}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Room Specific Policies */}
          <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 text-xs space-y-1.5 text-stone-700">
            <div className="font-bold text-amber-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-800" />
              <span>Room Policies & Check-In</span>
            </div>
            <div>• <strong>Check-in:</strong> 3:00 PM (24/7 front desk arrival) | <strong>Check-out:</strong> 11:00 AM</div>
            <div>• <strong>Cancellation:</strong> 100% Free cancellation up to 24 hours prior to check-in</div>
            <div>• <strong>Smoking:</strong> Strictly 100% smoke-free room ($250 cleaning fee for violations)</div>
            {room.petFriendly ? (
              <div className="text-emerald-800 font-semibold">• <strong>Pet Friendly:</strong> $20/night cleaning fee. Welcoming well-behaved dogs and cats.</div>
            ) : (
              <div>• <strong>Pets:</strong> Not permitted in this specific room type (see Pet-Friendly Queen).</div>
            )}
          </div>

        </div>

        {/* Footer Direct Booking CTA Bar */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-xs text-stone-400 line-through">${otaPrice}</span>
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">${directPrice}</span>
              <span className="text-xs text-stone-300">/ night (Direct Price)</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              ✓ Direct Booking Guarantee • Save ${otaPrice - directPrice}/night vs OTAs
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${MOTEL_INFO.phone}`}
              className="flex-1 sm:flex-none px-4 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-xl border border-stone-700 transition flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              <span>Call to Book</span>
            </a>

            <button
              onClick={() => {
                onClose();
                onBookRoom(room);
              }}
              className="flex-1 sm:flex-none px-6 py-3 bg-amber-700 hover:bg-amber-600 active:bg-amber-800 text-white text-sm font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Direct Now</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
