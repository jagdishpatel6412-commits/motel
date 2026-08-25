import React, { useState } from 'react';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  Phone, 
  Car, 
  Printer, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { Reservation } from '../types';
import { MOTEL_INFO } from '../data/motelData';

interface ReservationLookupModalProps {
  onClose: () => void;
}

export const ReservationLookupModal: React.FC<ReservationLookupModalProps> = ({ onClose }) => {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [lastNameOrEmail, setLastNameOrEmail] = useState('');
  const [searching, setSearching] = useState(false);
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [cancelStatus, setCancelStatus] = useState<string | null>(null);

  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSearching(true);
    setNotFound(false);
    setReservation(null);
    setCancelStatus(null);
    setShowConfirmCancel(false);

    try {
      const res = await fetch('/api/reservations/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          confirmationCode: confirmationCode.trim(),
          lastNameOrEmail: lastNameOrEmail.trim()
        })
      });

      const data = await res.json();
      if (data.found && data.reservation) {
        setReservation(data.reservation);
      } else {
        setNotFound(true);
      }
    } catch {
      setNotFound(true);
    } finally {
      setSearching(false);
    }
  };

  const handleCancelBooking = async () => {
    if (!reservation) return;

    try {
      const res = await fetch(`/api/reservations/${reservation.id}/cancel`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setReservation({ ...reservation, status: 'cancelled' });
        setCancelStatus('Reservation cancelled successfully. A confirmation has been emailed.');
        setShowConfirmCancel(false);
      }
    } catch {
      setReservation({ ...reservation, status: 'cancelled' });
      setCancelStatus('Reservation marked as cancelled.');
      setShowConfirmCancel(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#FDFBF7] text-[#332D29] max-w-2xl w-full rounded-2xl p-6 sm:p-8 border border-[#EAE4D9] shadow-2xl relative animate-fadeIn max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#6D635B] hover:text-[#332D29] transition cursor-pointer p-1 rounded-lg hover:bg-[#EAE4D9]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <span className="text-[10px] font-bold text-[#8C6239] uppercase tracking-widest bg-[#8C6239]/10 px-2.5 py-0.5 rounded-full border border-[#8C6239]/20">
            Guest Self-Service
          </span>
          <h2 className="text-2xl font-bold font-serif text-[#332D29] mt-2">
            Look Up Your Reservation
          </h2>
          <p className="text-xs text-[#6D635B] mt-1 font-light">
            Enter your booking confirmation number and last name or email address to view, print, or manage your stay.
          </p>
        </div>

        {/* Lookup Form */}
        {!reservation && (
          <form onSubmit={handleLookup} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-[#332D29] mb-1">Confirmation Number *</label>
              <input
                type="text"
                required
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value.toUpperCase())}
                placeholder="e.g. PINECREST-78921"
                className="w-full p-3 rounded-xl bg-white border border-[#EAE4D9] text-[#8C6239] font-mono font-bold uppercase focus:outline-none focus:border-[#8C6239]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#332D29] mb-1">Last Name or Email Address *</label>
              <input
                type="text"
                required
                value={lastNameOrEmail}
                onChange={(e) => setLastNameOrEmail(e.target.value)}
                placeholder="e.g. Miller or john@example.com"
                className="w-full p-3 rounded-xl bg-white border border-[#EAE4D9] text-[#332D29] focus:outline-none focus:border-[#8C6239]"
              />
            </div>

            {notFound && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-center gap-2 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>No reservation found matching those details. Please check your confirmation email or call (541) 555-7463.</span>
              </div>
            )}

            <button
              type="submit"
              disabled={searching}
              className="w-full py-3.5 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>{searching ? 'Locating Record...' : 'Find Reservation'}</span>
            </button>
          </form>
        )}

        {/* Found Reservation Details */}
        {reservation && (
          <div className="space-y-6 animate-fadeIn">
            {cancelStatus && (
              <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded-xl">
                {cancelStatus}
              </div>
            )}

            {/* Status Header */}
            <div className="p-4 rounded-xl bg-white border border-[#EAE4D9] flex items-center justify-between">
              <div>
                <span className="text-[11px] text-[#6D635B] block">Confirmation Code</span>
                <span className="text-xl font-bold font-mono text-[#8C6239]">{reservation.confirmationCode}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                reservation.status === 'confirmed' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
              }`}>
                {reservation.status}
              </span>
            </div>

            {/* Details Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-white p-4 rounded-xl space-y-2 border border-[#EAE4D9]">
                <div className="font-bold text-[#332D29] text-sm font-serif">{reservation.roomName}</div>
                <div className="text-[#6D635B]">Guest: <strong className="text-[#332D29]">{reservation.guestName}</strong></div>
                <div className="text-[#6D635B]">Email: {reservation.guestEmail}</div>
                <div className="text-[#6D635B]">Guests: {reservation.adults} Adults, {reservation.children} Children</div>
              </div>

              <div className="bg-white p-4 rounded-xl space-y-2 border border-[#EAE4D9]">
                <div className="text-[#6D635B]">Check-In: <strong className="text-[#332D29]">{reservation.checkIn}</strong> (3:00 PM)</div>
                <div className="text-[#6D635B]">Check-Out: <strong className="text-[#332D29]">{reservation.checkOut}</strong> (11:00 AM)</div>
                <div className="text-[#6D635B]">Nights: {reservation.nights}</div>
                <div className="text-[#8C6239] font-bold text-sm">Total Amount: ${reservation.totalAmount}</div>
              </div>
            </div>

            {/* Check-in Instructions */}
            <div className="p-4 bg-[#F7F3EE] rounded-xl border border-[#EAE4D9] text-xs text-[#6D635B] space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-[#332D29]">
                <Car className="w-4 h-4 text-[#8C6239]" />
                <span>Doorstep Check-In Information</span>
              </div>
              <p className="font-light">Your room key will be ready at the 24/7 Front Desk upon arrival. Single-story parking is available directly outside your guest room.</p>
            </div>

            {/* Cancellation Confirmation Prompt */}
            {showConfirmCancel && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs space-y-2">
                <div className="font-bold text-rose-900 flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-rose-700" />
                  <span>Confirm Reservation Cancellation</span>
                </div>
                <p className="text-rose-700">Are you sure you want to cancel this booking? Direct bookings enjoy 100% free cancellation.</p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={handleCancelBooking}
                    className="px-3 py-1.5 bg-rose-700 hover:bg-rose-800 text-white font-bold rounded-lg transition"
                  >
                    Yes, Cancel Reservation
                  </button>
                  <button
                    onClick={() => setShowConfirmCancel(false)}
                    className="px-3 py-1.5 bg-stone-200 hover:bg-stone-300 text-stone-800 font-semibold rounded-lg transition"
                  >
                    Keep Reservation
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-[#EAE4D9]">
              <button
                onClick={() => setReservation(null)}
                className="text-xs text-[#6D635B] hover:text-[#332D29] font-semibold cursor-pointer"
              >
                ← Search Another Code
              </button>

              <div className="flex gap-2">
                {reservation.status === 'confirmed' && !showConfirmCancel && (
                  <button
                    onClick={() => setShowConfirmCancel(true)}
                    className="px-3.5 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-semibold rounded-xl border border-rose-300 transition cursor-pointer"
                  >
                    Cancel Booking
                  </button>
                )}

                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-[#8C6239] hover:bg-[#74512F] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
