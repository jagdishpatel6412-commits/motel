import React from 'react';
import { X, Check, Minus, Bed, Users, Maximize, Dog, Accessibility, Phone } from 'lucide-react';
import { Room } from '../types';
import { ROOMS_DATA, MOTEL_INFO } from '../data/motelData';

interface RoomComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoom: (room: Room) => void;
}

export const RoomComparisonModal: React.FC<RoomComparisonModalProps> = ({
  isOpen,
  onClose,
  onSelectRoom
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white w-full max-w-6xl rounded-2xl shadow-2xl overflow-hidden border border-stone-200 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between bg-stone-50">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900">Compare All Rooms & Suites</h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-0.5">Find the perfect room configuration for your stay in Bend, OR</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto p-4 sm:p-6">
          <table className="w-full text-left text-xs border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-stone-200">
                <th className="p-3 font-bold text-stone-700 bg-stone-100/80 w-44 rounded-l-lg">Feature</th>
                {ROOMS_DATA.map((r) => (
                  <th key={r.id} className="p-3 font-bold text-stone-900 text-center bg-stone-50 min-w-[130px]">
                    <div className="font-serif text-sm">{r.name}</div>
                    <div className="text-amber-800 font-extrabold text-base mt-1">
                      ${Math.round(r.basePrice * 0.9)}<span className="text-[10px] font-normal text-stone-500">/nt</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              
              {/* Bed Type */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50 flex items-center gap-1.5">
                  <Bed className="w-3.5 h-3.5 text-amber-800" />
                  <span>Bed Configuration</span>
                </td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center text-stone-600 font-medium">
                    {r.bedConfiguration}
                  </td>
                ))}
              </tr>

              {/* Max Occupancy */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-800" />
                  <span>Max Guests</span>
                </td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center font-bold text-stone-800">
                    {r.capacity.maxTotal} Guests
                  </td>
                ))}
              </tr>

              {/* Room Size */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50 flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-amber-800" />
                  <span>Room Size</span>
                </td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center text-stone-600">
                    {r.sizeSqFt} sq. ft.
                  </td>
                ))}
              </tr>

              {/* Floor & Access */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50">Floor & Access</td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center text-stone-600 text-[11px]">
                    {r.floor}
                  </td>
                ))}
              </tr>

              {/* Microwave & Mini Fridge */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50">Fridge & Microwave</td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center text-emerald-600">
                    <Check className="w-4 h-4 mx-auto" />
                  </td>
                ))}
              </tr>

              {/* Kitchenette */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50">Kitchenette Cooktop</td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center">
                    {r.id === 'king-studio-kitchenette' ? (
                      <span className="inline-flex items-center text-emerald-700 font-bold gap-1">
                        <Check className="w-4 h-4" /> Full Nook
                      </span>
                    ) : (
                      <Minus className="w-4 h-4 mx-auto text-stone-300" />
                    )}
                  </td>
                ))}
              </tr>

              {/* Pet Friendly */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50 flex items-center gap-1.5">
                  <Dog className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Pet Allowed</span>
                </td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center">
                    {r.petFriendly ? (
                      <span className="text-emerald-700 font-bold">Yes ($20/nt)</span>
                    ) : (
                      <span className="text-stone-400">No</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* ADA Accessible */}
              <tr>
                <td className="p-3 font-semibold text-stone-700 bg-stone-50 flex items-center gap-1.5">
                  <Accessibility className="w-3.5 h-3.5 text-blue-700" />
                  <span>ADA Compliant</span>
                </td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center">
                    {r.accessible ? (
                      <span className="text-blue-700 font-bold">ADA Roll-In</span>
                    ) : (
                      <span className="text-stone-400">Standard</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Booking CTA Row */}
              <tr>
                <td className="p-3 bg-stone-50 font-bold text-stone-900">Direct Reserve</td>
                {ROOMS_DATA.map((r) => (
                  <td key={r.id} className="p-3 text-center">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectRoom(r);
                      }}
                      className="w-full py-2 px-2 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-lg shadow-sm text-xs cursor-pointer"
                    >
                      Book Room
                    </button>
                  </td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 text-xs text-stone-600 flex flex-wrap items-center justify-between gap-2">
          <span>All direct reservations include free cancellation up to 24 hours prior to check-in.</span>
          <a href={`tel:${MOTEL_INFO.phone}`} className="text-amber-800 font-semibold flex items-center gap-1">
            <Phone className="w-3.5 h-3.5" /> Call {MOTEL_INFO.phone} for Group Bookings
          </a>
        </div>

      </div>
    </div>
  );
};
