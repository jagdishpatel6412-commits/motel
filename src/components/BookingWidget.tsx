import React, { useState } from 'react';
import { Calendar, Users, Tag, ChevronRight, CheckCircle2, Shield } from 'lucide-react';
import { SearchQuery } from '../types';
import { ROOMS_DATA } from '../data/motelData';

interface BookingWidgetProps {
  initialSearch?: SearchQuery;
  onSearch: (query: SearchQuery) => void;
  compact?: boolean;
}

export const BookingWidget: React.FC<BookingWidgetProps> = ({
  initialSearch,
  onSearch,
  compact = false
}) => {
  // Default to today and tomorrow
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(initialSearch?.checkIn || getTodayStr());
  const [checkOut, setCheckOut] = useState(initialSearch?.checkOut || getTomorrowStr());
  const [adults, setAdults] = useState(initialSearch?.adults || 2);
  const [children, setChildren] = useState(initialSearch?.children || 0);
  const [roomType, setRoomType] = useState(initialSearch?.roomType || 'all');
  const [promoCode, setPromoCode] = useState(initialSearch?.promoCode || 'DIRECT10');
  const [appliedPromo, setAppliedPromo] = useState(true);

  // Validate checkOut is after checkIn
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCheckIn(val);
    if (new Date(val) >= new Date(checkOut)) {
      const nextDay = new Date(val);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      checkIn,
      checkOut,
      adults: Number(adults),
      children: Number(children),
      roomType: roomType === 'all' ? undefined : roomType,
      promoCode: promoCode.trim() ? promoCode.trim() : undefined
    });
  };

  return (
    <div className={`bg-white rounded-2xl shadow-xl border border-[#EAE4D9] ${compact ? 'p-4' : 'p-5 sm:p-6 lg:p-7'}`}>
      
      {/* Top Banner inside widget */}
      {!compact && (
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-[#EAE4D9] text-xs">
          <div className="flex items-center gap-2 text-[#8C6239] font-bold">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8C6239] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8C6239]"></span>
            </span>
            <span className="uppercase tracking-wide text-[11px]">Direct Booking Guaranteed Lowest Rates</span>
          </div>

          <div className="flex items-center gap-4 text-[#6D635B] text-xs">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Free 24-hr Cancellation</span>
            </span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>No Booking Fees</span>
            </span>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          
          {/* Check-In Date */}
          <div className="bg-[#F7F3EE] rounded-xl p-3 border border-[#EAE4D9] hover:border-[#8C6239]/50 transition">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A69D95] mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Check-In</span>
            </label>
            <input
              type="date"
              value={checkIn}
              min={getTodayStr()}
              onChange={handleCheckInChange}
              className="w-full bg-transparent text-[#332D29] text-sm font-semibold focus:outline-none cursor-pointer"
              required
            />
            <span className="text-[10px] text-[#A69D95] block mt-0.5 font-medium">From 3:00 PM</span>
          </div>

          {/* Check-Out Date */}
          <div className="bg-[#F7F3EE] rounded-xl p-3 border border-[#EAE4D9] hover:border-[#8C6239]/50 transition">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A69D95] mb-1 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Check-Out</span>
            </label>
            <input
              type="date"
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent text-[#332D29] text-sm font-semibold focus:outline-none cursor-pointer"
              required
            />
            <span className="text-[10px] text-[#A69D95] block mt-0.5 font-medium">Until 11:00 AM</span>
          </div>

          {/* Guests */}
          <div className="bg-[#F7F3EE] rounded-xl p-3 border border-[#EAE4D9] hover:border-[#8C6239]/50 transition">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A69D95] mb-1 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-[#8C6239]" />
              <span>Guests</span>
            </label>
            <div className="flex items-center gap-2">
              <select
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="bg-transparent text-[#332D29] text-sm font-semibold focus:outline-none cursor-pointer"
              >
                <option value={1} className="bg-white text-[#332D29]">1 Adult</option>
                <option value={2} className="bg-white text-[#332D29]">2 Adults</option>
                <option value={3} className="bg-white text-[#332D29]">3 Adults</option>
                <option value={4} className="bg-white text-[#332D29]">4 Adults</option>
                <option value={5} className="bg-white text-[#332D29]">5+ Adults</option>
              </select>
              <span className="text-[#A69D95]">|</span>
              <select
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="bg-transparent text-[#6D635B] text-xs font-medium focus:outline-none cursor-pointer"
              >
                <option value={0} className="bg-white text-[#332D29]">0 Kids</option>
                <option value={1} className="bg-white text-[#332D29]">1 Kid</option>
                <option value={2} className="bg-white text-[#332D29]">2 Kids</option>
                <option value={3} className="bg-white text-[#332D29]">3 Kids</option>
              </select>
            </div>
            <span className="text-[10px] text-[#A69D95] block mt-0.5 font-medium">Kids under 12 free</span>
          </div>

          {/* Room Type */}
          <div className="bg-[#F7F3EE] rounded-xl p-3 border border-[#EAE4D9] hover:border-[#8C6239]/50 transition">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-[#A69D95] mb-1">
              Room Category
            </label>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              className="w-full bg-transparent text-[#332D29] text-sm font-medium focus:outline-none cursor-pointer truncate"
            >
              <option value="all" className="bg-white text-[#332D29]">All Rooms & Suites</option>
              {ROOMS_DATA.map((r) => (
                <option key={r.id} value={r.id} className="bg-white text-[#332D29]">
                  {r.name} (from ${r.basePrice})
                </option>
              ))}
            </select>
            <span className="text-[10px] text-[#A69D95] block mt-0.5 font-medium">Pet & ADA options</span>
          </div>

          {/* Submit Button */}
          <div className="flex flex-col justify-end">
            <button
              type="submit"
              className="w-full h-full min-h-[52px] flex items-center justify-center gap-2 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] text-white font-bold uppercase tracking-widest text-xs rounded-xl shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
            >
              <span>Search Rooms</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Promo code & perk row */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-[#8C6239]" />
            <span className="text-[#6D635B] font-medium">Promo Code:</span>
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="e.g. DIRECT10"
              className="bg-[#F7F3EE] text-[#8C6239] font-mono font-bold px-2.5 py-1 rounded-lg border border-[#EAE4D9] text-xs uppercase w-28 focus:outline-none focus:border-[#8C6239]"
            />
            {promoCode.toUpperCase() === 'DIRECT10' && (
              <span className="text-[#8C6239] font-semibold text-[11px] flex items-center gap-1 bg-[#8C6239]/10 px-2 py-0.5 rounded border border-[#8C6239]/20">
                ✓ 10% Direct Discount Applied
              </span>
            )}
          </div>

          <div className="text-[#6D635B] text-[11px]">
            Prefer to call? <a href="tel:5415557463" className="text-[#8C6239] hover:underline font-bold">(541) 555-7463</a> (24/7 Desk)
          </div>
        </div>
      </form>
    </div>
  );
};
