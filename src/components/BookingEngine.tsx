import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Users, 
  Bed, 
  Check, 
  ShieldCheck, 
  CreditCard, 
  Phone, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  Dog, 
  Clock, 
  Coffee, 
  Car, 
  Printer, 
  Download, 
  Tag, 
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Room, SearchQuery, Reservation, SpecialOffer } from '../types';
import { ROOMS_DATA, MOTEL_INFO } from '../data/motelData';

interface BookingEngineProps {
  initialSearch?: SearchQuery;
  selectedRoomPreload?: Room | null;
  selectedOfferPreload?: SpecialOffer | null;
  onClose: () => void;
  onNavigateHome: () => void;
}

export const BookingEngine: React.FC<BookingEngineProps> = ({
  initialSearch,
  selectedRoomPreload,
  selectedOfferPreload,
  onClose,
  onNavigateHome
}) => {
  const getTodayStr = () => new Date().toISOString().split('T')[0];
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  // Step state: 1: Select Room, 2: Extras & Customization, 3: Guest Info, 4: Payment & Review, 5: Confirmation
  const [currentStep, setCurrentStep] = useState<number>(selectedRoomPreload ? 2 : 1);

  // Search parameters
  const [checkIn, setCheckIn] = useState(initialSearch?.checkIn || getTodayStr());
  const [checkOut, setCheckOut] = useState(initialSearch?.checkOut || getTomorrowStr());
  const [adults, setAdults] = useState(initialSearch?.adults || 2);
  const [children, setChildren] = useState(initialSearch?.children || 0);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [petFilter, setPetFilter] = useState<boolean>(false);
  const [adaFilter, setAdaFilter] = useState<boolean>(false);

  // Selected Room
  const [selectedRoom, setSelectedRoom] = useState<Room>(selectedRoomPreload || ROOMS_DATA[0]);

  // Extras
  const [addPet, setAddPet] = useState(false);
  const [addLateCheckout, setAddLateCheckout] = useState(true); // Free direct perk
  const [addSnackPack, setAddSnackPack] = useState(false);
  const [addRollaway, setAddRollaway] = useState(false);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [estimatedArrival, setEstimatedArrival] = useState('3:00 PM - 6:00 PM');

  // Promo & Payment
  const [promoCode, setPromoCode] = useState(selectedOfferPreload?.code || initialSearch?.promoCode || 'DIRECT10');
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(10);
  const [promoMessage, setPromoMessage] = useState<string>('DIRECT10: 10% Direct Booking Discount Applied');
  const [paymentMethod, setPaymentMethod] = useState<'credit_card' | 'pay_at_desk'>('credit_card');

  // Card details (simulation)
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardZip, setCardZip] = useState('');

  // Confirmation Result
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Calculate nights
  const calculateNights = () => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = d2.getTime() - d1.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const nights = calculateNights();

  // Price calculations
  const baseRate = selectedRoom.basePrice;
  const rawSubtotal = baseRate * nights;
  const discountAmount = Math.round((rawSubtotal * (promoDiscountPercent / 100)) * 100) / 100;
  const discountedSubtotal = rawSubtotal - discountAmount;
  
  const petFee = addPet ? 20 * nights : 0;
  const snackFee = addSnackPack ? 12 : 0;
  const rollawayFee = addRollaway ? 15 * nights : 0;
  const extrasTotal = petFee + snackFee + rollawayFee;

  const preTaxTotal = discountedSubtotal + extrasTotal;
  const taxesAndFees = Math.round((preTaxTotal * 0.108) * 100) / 100; // 10.8% State Lodging & County Room Tax
  const grandTotal = Math.round((preTaxTotal + taxesAndFees) * 100) / 100;

  // Handle promo validation
  const validatePromoCode = async (codeToTest: string) => {
    try {
      const res = await fetch('/api/offers/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: codeToTest, nights })
      });
      const data = await res.json();
      if (data.valid) {
        setPromoDiscountPercent(data.discountPercent || 10);
        setPromoMessage(`✓ ${data.code}: ${data.title}`);
        setErrorMessage(null);
      } else {
        setPromoDiscountPercent(0);
        setPromoMessage('');
        setErrorMessage(data.message || 'Invalid promo code');
      }
    } catch {
      if (codeToTest.toUpperCase() === 'DIRECT10') {
        setPromoDiscountPercent(10);
        setPromoMessage('✓ DIRECT10: 10% Direct Booking Discount Applied');
      }
    }
  };

  useEffect(() => {
    if (promoCode) {
      validatePromoCode(promoCode);
    }
  }, [nights]);

  // Trigger celebration on confirm
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // ignore
    }
  };

  // Submit Reservation
  const handleCompleteReservation = async () => {
    if (!guestName || !guestEmail) {
      setErrorMessage('Please fill in your name and email address.');
      setCurrentStep(3);
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    const bookingPayload = {
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      roomImage: selectedRoom.images[0],
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      guestName,
      guestEmail,
      guestPhone,
      specialRequests,
      estimatedArrival,
      addPet,
      addLateCheckout,
      addSnackPack,
      promoCode,
      discountAmount,
      nightlyRate: baseRate,
      subtotal: preTaxTotal,
      taxesAndFees,
      totalAmount: grandTotal,
      paymentMethod
    };

    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      });
      const data = await res.json();
      if (data.success) {
        setConfirmedReservation(data.reservation);
        setCurrentStep(5);
        triggerConfetti();
      } else {
        setErrorMessage(data.message || 'Failed to place booking. Please try again or call us.');
      }
    } catch (err: any) {
      // Fallback client-generated confirmation if offline
      const fallbackRes: Reservation = {
        id: `res-${Date.now()}`,
        confirmationCode: `PINECREST-${Math.floor(10000 + Math.random() * 90000)}`,
        roomId: selectedRoom.id,
        roomName: selectedRoom.name,
        roomImage: selectedRoom.images[0],
        checkIn,
        checkOut,
        nights,
        adults,
        children,
        guestName,
        guestEmail,
        guestPhone,
        specialRequests,
        estimatedArrival,
        addPet,
        addLateCheckout,
        addSnackPack,
        promoCode,
        discountAmount,
        nightlyRate: baseRate,
        subtotal: preTaxTotal,
        taxesAndFees,
        totalAmount: grandTotal,
        paymentMethod,
        status: 'confirmed',
        createdAt: new Date().toISOString()
      };
      setConfirmedReservation(fallbackRes);
      setCurrentStep(5);
      triggerConfetti();
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter available rooms
  const filteredRooms = ROOMS_DATA.filter((r) => {
    if (categoryFilter !== 'all' && r.category !== categoryFilter) return false;
    if (petFilter && !r.petFriendly) return false;
    if (adaFilter && !r.accessible) return false;
    return true;
  });

  return (
    <div className="bg-stone-900 text-stone-100 min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Top Direct Booking Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-800">
          <div>
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Official Direct Booking Portal</span>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-0.5">
              The Pinecrest Motel & Suites
            </h1>
            <p className="text-xs text-stone-400">1420 Scenic Hwy 97, Bend, OR • Front Desk: (541) 555-7463</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-semibold rounded-xl border border-stone-700 transition"
            >
              Exit to Website
            </button>
          </div>
        </div>

        {/* Multi-Step Indicator */}
        {currentStep < 5 && (
          <div className="mb-8 bg-stone-800/80 rounded-2xl p-4 border border-stone-700 flex items-center justify-between text-xs overflow-x-auto gap-2">
            {[
              { num: 1, label: 'Choose Room' },
              { num: 2, label: 'Customize Stay' },
              { num: 3, label: 'Guest Details' },
              { num: 4, label: 'Review & Confirm' }
            ].map((step) => {
              const isActive = currentStep === step.num;
              const isPast = currentStep > step.num;
              return (
                <div key={step.num} className="flex items-center gap-2 shrink-0">
                  <div 
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                      isActive 
                        ? 'bg-amber-600 text-white shadow-md' 
                        : isPast 
                          ? 'bg-emerald-700 text-white' 
                          : 'bg-stone-700 text-stone-400'
                    }`}
                  >
                    {isPast ? <Check className="w-4 h-4" /> : step.num}
                  </div>
                  <span className={`font-semibold ${isActive ? 'text-amber-300' : isPast ? 'text-stone-300' : 'text-stone-500'}`}>
                    {step.label}
                  </span>
                  {step.num < 4 && <span className="text-stone-600 ml-2 hidden sm:inline">→</span>}
                </div>
              );
            })}
          </div>
        )}

        {/* Main Grid: Left Flow / Right Price Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Left Content Area (8 cols or 12 for confirmation) */}
          <div className={`${currentStep === 5 ? 'lg:col-span-12' : 'lg:col-span-8'} space-y-6`}>
            
            {/* STEP 1: Select Room */}
            {currentStep === 1 && (
              <div className="space-y-6">
                
                {/* Search / Filter Bar */}
                <div className="bg-stone-800/90 p-4 sm:p-5 rounded-2xl border border-stone-700 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                    <div>
                      <label className="block text-amber-400 font-bold mb-1">Check-In</label>
                      <input
                        type="date"
                        value={checkIn}
                        min={getTodayStr()}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 p-2.5 rounded-lg text-white [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-amber-400 font-bold mb-1">Check-Out</label>
                      <input
                        type="date"
                        value={checkOut}
                        min={checkIn}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-700 p-2.5 rounded-lg text-white [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="block text-amber-400 font-bold mb-1">Adults</label>
                      <select
                        value={adults}
                        onChange={(e) => setAdults(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-700 p-2.5 rounded-lg text-white"
                      >
                        <option value={1}>1 Adult</option>
                        <option value={2}>2 Adults</option>
                        <option value={3}>3 Adults</option>
                        <option value={4}>4 Adults</option>
                        <option value={5}>5+ Adults</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-amber-400 font-bold mb-1">Children</label>
                      <select
                        value={children}
                        onChange={(e) => setChildren(Number(e.target.value))}
                        className="w-full bg-stone-900 border border-stone-700 p-2.5 rounded-lg text-white"
                      >
                        <option value={0}>0 Kids</option>
                        <option value={1}>1 Kid</option>
                        <option value={2}>2 Kids</option>
                        <option value={3}>3 Kids</option>
                      </select>
                    </div>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-700/80 text-xs">
                    <span className="text-stone-400 font-medium">Filter:</span>
                    <button
                      onClick={() => setPetFilter(!petFilter)}
                      className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                        petFilter ? 'bg-emerald-900 text-emerald-200 border-emerald-500' : 'bg-stone-900 text-stone-300 border-stone-700'
                      }`}
                    >
                      <Dog className="w-3.5 h-3.5" />
                      <span>Pet Friendly Only</span>
                    </button>
                    <button
                      onClick={() => setAdaFilter(!adaFilter)}
                      className={`px-3 py-1 rounded-full border transition flex items-center gap-1 ${
                        adaFilter ? 'bg-blue-900 text-blue-200 border-blue-500' : 'bg-stone-900 text-stone-300 border-stone-700'
                      }`}
                    >
                      <span>ADA Accessible</span>
                    </button>
                  </div>
                </div>

                {/* Available Rooms List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs text-stone-400">
                    <span>Showing {filteredRooms.length} Available Room Types for {nights} night(s)</span>
                    <span className="text-amber-400 font-semibold">Includes 10% Direct Discount</span>
                  </div>

                  {filteredRooms.map((room) => {
                    const discountedRate = Math.round(room.basePrice * (1 - promoDiscountPercent / 100));
                    const totalRoomCost = discountedRate * nights;
                    const isChosen = selectedRoom.id === room.id;

                    return (
                      <div
                        key={room.id}
                        className={`bg-stone-800/90 rounded-2xl p-5 border transition flex flex-col sm:flex-row gap-5 items-center justify-between ${
                          isChosen ? 'border-amber-500 ring-1 ring-amber-500/50' : 'border-stone-700 hover:border-stone-600'
                        }`}
                      >
                        {/* Room Image & Badges */}
                        <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-stone-900 shrink-0">
                          <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover" />
                          <div className="absolute top-2 left-2 bg-stone-900/80 text-[10px] font-bold text-amber-300 px-2 py-0.5 rounded backdrop-blur">
                            {room.bedConfiguration}
                          </div>
                        </div>

                        {/* Room Details */}
                        <div className="flex-1 space-y-1.5 w-full">
                          <div className="flex items-start justify-between">
                            <h3 className="text-lg font-bold font-serif text-white">{room.name}</h3>
                            {room.petFriendly && (
                              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                                Pet Friendly
                              </span>
                            )}
                          </div>

                          <p className="text-xs text-stone-400 line-clamp-2">{room.headline}</p>

                          <div className="flex flex-wrap gap-2 text-[11px] text-stone-300 pt-1">
                            <span className="bg-stone-900 px-2 py-0.5 rounded">Max {room.capacity.maxTotal} Guests</span>
                            <span className="bg-stone-900 px-2 py-0.5 rounded">{room.sizeSqFt} sq ft</span>
                            <span className="bg-stone-900 px-2 py-0.5 rounded">Doorstep Parking</span>
                          </div>
                        </div>

                        {/* Pricing & Select CTA */}
                        <div className="text-right sm:border-l sm:border-stone-700 sm:pl-5 w-full sm:w-auto flex sm:flex-col justify-between sm:justify-center items-end shrink-0">
                          <div>
                            <div className="text-xs text-stone-400 line-through">${room.basePrice}/nt</div>
                            <div className="text-2xl font-extrabold text-amber-400">${discountedRate}</div>
                            <div className="text-[10px] text-stone-400">Total: ${totalRoomCost} ({nights} nt)</div>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedRoom(room);
                              setCurrentStep(2);
                            }}
                            className="mt-3 px-5 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                          >
                            Select Room
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}

            {/* STEP 2: Customize Stay & Add-Ons */}
            {currentStep === 2 && (
              <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 2 of 4</span>
                    <h2 className="text-xl font-bold font-serif text-white">Customize Your Stay Options</h2>
                  </div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-stone-400 hover:text-white flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Change Room</span>
                  </button>
                </div>

                {/* Chosen Room Summary Card */}
                <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 flex items-center gap-4">
                  <img src={selectedRoom.images[0]} alt={selectedRoom.name} className="w-20 h-16 object-cover rounded-lg" />
                  <div>
                    <div className="text-sm font-bold text-white font-serif">{selectedRoom.name}</div>
                    <div className="text-xs text-amber-400 font-semibold">{selectedRoom.bedConfiguration} • {nights} Night(s)</div>
                    <div className="text-[11px] text-stone-400">Check-in: {checkIn} | Check-out: {checkOut}</div>
                  </div>
                </div>

                {/* Optional Add-Ons */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold font-serif text-stone-200">Optional Add-Ons & Extras</h3>
                  
                  {/* Late Checkout (Free Perk) */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900/80 border border-stone-700 cursor-pointer hover:border-amber-500/50 transition">
                    <input
                      type="checkbox"
                      checked={addLateCheckout}
                      onChange={(e) => setAddLateCheckout(e.target.checked)}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-400" />
                          <span>1-Hour Complimentary Late Check-Out (12:00 PM)</span>
                        </span>
                        <span className="text-emerald-400 font-bold">$0.00 (Direct Booking Perk)</span>
                      </div>
                      <p className="text-stone-400 mt-0.5">Enjoy an extra hour of rest before packing up for your journey.</p>
                    </div>
                  </label>

                  {/* Pet Fee */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900/80 border border-stone-700 cursor-pointer hover:border-amber-500/50 transition">
                    <input
                      type="checkbox"
                      checked={addPet}
                      onChange={(e) => setAddPet(e.target.checked)}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Dog className="w-4 h-4 text-emerald-400" />
                          <span>Traveling with Pet ($20 / night)</span>
                        </span>
                        <span className="text-stone-200 font-bold">${20 * nights}.00</span>
                      </div>
                      <p className="text-stone-400 mt-0.5">Includes complimentary dog bed, stainless steel bowls, and welcome treat kit.</p>
                    </div>
                  </label>

                  {/* Oregon Trail Snack Pack */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900/80 border border-stone-700 cursor-pointer hover:border-amber-500/50 transition">
                    <input
                      type="checkbox"
                      checked={addSnackPack}
                      onChange={(e) => setAddSnackPack(e.target.checked)}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Coffee className="w-4 h-4 text-amber-400" />
                          <span>Pacific Northwest Roadtrip Snack Basket</span>
                        </span>
                        <span className="text-stone-200 font-bold">$12.00</span>
                      </div>
                      <p className="text-stone-400 mt-0.5">Local Marionberry jam cookies, artisan trail mix, chocolate bar, and sparkling water in room upon arrival.</p>
                    </div>
                  </label>

                  {/* Rollaway Bed */}
                  <label className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-900/80 border border-stone-700 cursor-pointer hover:border-amber-500/50 transition">
                    <input
                      type="checkbox"
                      checked={addRollaway}
                      onChange={(e) => setAddRollaway(e.target.checked)}
                      className="mt-1 accent-amber-600 rounded"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center justify-between font-bold text-white">
                        <span className="flex items-center gap-1.5">
                          <Bed className="w-4 h-4 text-amber-400" />
                          <span>Rollaway Bed / Folding Cot ($15 / night)</span>
                        </span>
                        <span className="text-stone-200 font-bold">${15 * nights}.00</span>
                      </div>
                      <p className="text-stone-400 mt-0.5">Extra twin-size rollaway cot with fresh linens for additional guest.</p>
                    </div>
                  </label>
                </div>

                {/* Estimated Arrival Selection */}
                <div>
                  <label className="block text-xs font-bold text-stone-300 mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Estimated Arrival Time (Front desk open 24/7)</span>
                  </label>
                  <select
                    value={estimatedArrival}
                    onChange={(e) => setEstimatedArrival(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 p-2.5 rounded-xl text-stone-200 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option>3:00 PM - 5:00 PM (Standard Check-in)</option>
                    <option>5:00 PM - 8:00 PM (Evening)</option>
                    <option>8:00 PM - 11:00 PM (Late Evening)</option>
                    <option>After 11:00 PM (Late Night Arrival - 24/7 Desk on duty)</option>
                  </select>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-700">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 3: Guest Contact Details */}
            {currentStep === 3 && (
              <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700 space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 3 of 4</span>
                  <h2 className="text-xl font-bold font-serif text-white">Guest Information</h2>
                  <p className="text-xs text-stone-400 mt-0.5">Your confirmation and door check-in code will be sent to this email address.</p>
                </div>

                <div className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-300 mb-1">Primary Guest Full Name *</label>
                      <input
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. David Walker"
                        className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-300 mb-1">Email Address (For Confirmation) *</label>
                      <input
                        type="email"
                        required
                        value={guestEmail}
                        onChange={(e) => setGuestEmail(e.target.value)}
                        placeholder="david.walker@example.com"
                        className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-stone-300 mb-1">Mobile Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="(541) 555-0123"
                        className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-stone-300 mb-1">Vehicle License Plate (Optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. OR-892-XYZ (For Doorstep Parking Pass)"
                        className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500 uppercase"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-stone-300 mb-1">Special Requests or Accessibility Needs</label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. Ground floor preference, pack-n-play crib needed, boat trailer parking stall..."
                      className="w-full p-3 rounded-xl bg-stone-900 border border-stone-700 text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-700">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={() => {
                      if (!guestName || !guestEmail) {
                        setErrorMessage('Please enter your full name and email address.');
                        return;
                      }
                      setErrorMessage(null);
                      setCurrentStep(4);
                    }}
                    className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Payment & Review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            )}

            {/* STEP 4: Payment & Final Review */}
            {currentStep === 4 && (
              <div className="bg-stone-800/90 rounded-2xl p-6 border border-stone-700 space-y-6">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 4 of 4</span>
                  <h2 className="text-xl font-bold font-serif text-white">Review & Confirm Reservation</h2>
                  <p className="text-xs text-stone-400 mt-0.5">Instant booking confirmation with 100% Free 24-hr cancellation.</p>
                </div>

                {errorMessage && (
                  <div className="p-3.5 bg-rose-950 border border-rose-700 text-rose-200 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Payment Option Selection */}
                <div className="space-y-3 text-xs">
                  <div className="font-bold text-stone-200">Choose Payment Method:</div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div 
                      onClick={() => setPaymentMethod('credit_card')}
                      className={`p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'credit_card' 
                          ? 'bg-amber-950/40 border-amber-500 text-white' 
                          : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-amber-400" />
                          <span>Credit / Debit Card</span>
                        </span>
                        {paymentMethod === 'credit_card' && <Check className="w-4 h-4 text-amber-400" />}
                      </div>
                      <p className="text-[11px] text-stone-400">Secure 256-bit encrypted checkout. Card guaranteed.</p>
                    </div>

                    <div 
                      onClick={() => setPaymentMethod('pay_at_desk')}
                      className={`p-4 rounded-xl border cursor-pointer transition ${
                        paymentMethod === 'pay_at_desk' 
                          ? 'bg-amber-950/40 border-amber-500 text-white' 
                          : 'bg-stone-900 border-stone-700 text-stone-400 hover:border-stone-600'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm mb-1">
                        <span className="flex items-center gap-2">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                          <span>Pay at Check-In</span>
                        </span>
                        {paymentMethod === 'pay_at_desk' && <Check className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="text-[11px] text-stone-400">Hold your room now, pay upon arrival at front desk.</p>
                    </div>
                  </div>

                  {/* Card fields if credit card selected */}
                  {paymentMethod === 'credit_card' && (
                    <div className="bg-stone-900 p-4 rounded-xl border border-stone-700 space-y-3 mt-3">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-300 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="•••• •••• •••• ••••"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">Expiration</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">CVC / CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs font-mono"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-stone-300 mb-1">Billing ZIP</label>
                          <input
                            type="text"
                            placeholder="97702"
                            value={cardZip}
                            onChange={(e) => setCardZip(e.target.value)}
                            className="w-full p-2.5 rounded-lg bg-stone-950 border border-stone-700 text-white text-xs font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Policies Accordion / Notice */}
                <div className="bg-stone-900/60 p-3.5 rounded-xl border border-stone-700 text-[11px] text-stone-400 space-y-1">
                  <div className="font-bold text-amber-400">Direct Booking Guarantee & Cancellation Policy:</div>
                  <div>• 100% Free cancellation until 3:00 PM on the day before arrival ({checkIn}).</div>
                  <div>• Check-in time starts at 3:00 PM (Front desk staffed 24/7). Check-out is 11:00 AM (12:00 PM late check-out included).</div>
                  <div>• Valid photo ID and $50 refundable incidental hold required at check-in.</div>
                </div>

                {/* Submit Booking Button */}
                <div className="flex items-center justify-between pt-4 border-t border-stone-700">
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 text-white font-semibold text-xs rounded-xl transition"
                  >
                    Back
                  </button>

                  <button
                    onClick={handleCompleteReservation}
                    disabled={isProcessing}
                    className="px-8 py-3.5 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 active:from-amber-800 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl shadow-xl transition flex items-center gap-2 cursor-pointer"
                  >
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                    <span>{isProcessing ? 'Confirming Reservation...' : `Confirm & Book ($${grandTotal})`}</span>
                  </button>
                </div>

              </div>
            )}

            {/* STEP 5: Booking Confirmation Receipt */}
            {currentStep === 5 && confirmedReservation && (
              <div className="bg-white text-stone-900 rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-2xl space-y-8 animate-fadeIn max-w-4xl mx-auto">
                
                {/* Top Success Banner */}
                <div className="text-center space-y-2 pb-6 border-b border-stone-200">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                    Direct Reservation Confirmed
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900">
                    We're Excited to Host You, {confirmedReservation.guestName}!
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto">
                    A confirmation email with your digital room key voucher has been sent to <strong>{confirmedReservation.guestEmail}</strong>.
                  </p>
                </div>

                {/* Confirmation Code Card */}
                <div className="bg-stone-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-md">
                  <div>
                    <span className="text-xs text-amber-400 font-bold uppercase tracking-wider">Your Confirmation Number</span>
                    <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-widest mt-0.5">
                      {confirmedReservation.confirmationCode}
                    </div>
                    <div className="text-xs text-stone-400 mt-1">Keep this code to lookup or modify your stay anytime.</div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Summary</span>
                    </button>
                  </div>
                </div>

                {/* Reservation Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-stone-700">
                  
                  {/* Stay Info */}
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                    <h3 className="font-bold font-serif text-stone-900 text-sm">Stay Details</h3>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Room Category:</span>
                      <span className="font-bold text-stone-900">{confirmedReservation.roomName}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Check-In Date:</span>
                      <span className="font-bold text-stone-900">{confirmedReservation.checkIn} (From 3:00 PM)</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Check-Out Date:</span>
                      <span className="font-bold text-stone-900">{confirmedReservation.checkOut} (By 11:00 AM)</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Duration:</span>
                      <span className="font-bold text-stone-900">{confirmedReservation.nights} Night(s)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Guests:</span>
                      <span className="font-bold text-stone-900">{confirmedReservation.adults} Adults, {confirmedReservation.children} Children</span>
                    </div>
                  </div>

                  {/* Payment Breakdown */}
                  <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200 space-y-3">
                    <h3 className="font-bold font-serif text-stone-900 text-sm">Payment & Taxes</h3>
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">Nightly Rate:</span>
                      <span className="font-semibold text-stone-900">${confirmedReservation.nightlyRate} × {confirmedReservation.nights} nights</span>
                    </div>
                    {confirmedReservation.discountAmount > 0 && (
                      <div className="flex justify-between border-b border-stone-200 pb-2 text-emerald-700">
                        <span>Direct Booking Discount:</span>
                        <span className="font-bold">-${confirmedReservation.discountAmount}</span>
                      </div>
                    )}
                    <div className="flex justify-between border-b border-stone-200 pb-2">
                      <span className="text-stone-500">State & County Lodging Taxes:</span>
                      <span className="font-semibold text-stone-900">${confirmedReservation.taxesAndFees}</span>
                    </div>
                    <div className="flex justify-between pt-1 text-sm font-bold text-stone-900">
                      <span>Total Balance:</span>
                      <span className="text-amber-800 text-base">${confirmedReservation.totalAmount}</span>
                    </div>
                    <div className="text-[11px] text-stone-500">
                      Payment method: {confirmedReservation.paymentMethod === 'credit_card' ? 'Credit Card on file' : 'Pay at Front Desk'}
                    </div>
                  </div>

                </div>

                {/* Important Arrival Guide */}
                <div className="bg-amber-50 p-5 rounded-2xl border border-amber-200 text-xs space-y-2 text-stone-700">
                  <div className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-amber-800" />
                    <span>How to Check-In on Arrival</span>
                  </div>
                  <p>
                    1. Pull directly up to the main front desk office at <strong>1420 Scenic Highway 97, Bend, OR</strong>.
                  </p>
                  <p>
                    2. Provide your confirmation number (<strong>{confirmedReservation.confirmationCode}</strong>) or primary guest name.
                  </p>
                  <p>
                    3. Receive your RFID keycard and park directly in front of your assigned ground-floor entrance.
                  </p>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200">
                  <a
                    href={`tel:${MOTEL_INFO.phone}`}
                    className="text-xs text-stone-600 hover:text-stone-900 font-semibold flex items-center gap-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Front Desk Hotline: {MOTEL_INFO.phone}</span>
                  </a>

                  <button
                    onClick={onNavigateHome}
                    className="px-6 py-2.5 bg-amber-700 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow transition cursor-pointer"
                  >
                    Return to Homepage
                  </button>
                </div>

              </div>
            )}

          </div>

          {/* Right Summary Sidebar (4 cols) — shown during steps 1-4 */}
          {currentStep < 5 && (
            <div className="lg:col-span-4 bg-stone-800/95 rounded-2xl p-6 border border-stone-700 shadow-xl space-y-5 sticky top-24">
              <h3 className="text-base font-bold font-serif text-white pb-3 border-b border-stone-700 flex items-center justify-between">
                <span>Reservation Summary</span>
                <span className="text-xs font-sans font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded">
                  Direct Rate
                </span>
              </h3>

              {/* Room preview mini */}
              <div className="space-y-1 text-xs">
                <div className="text-stone-400">Selected Room:</div>
                <div className="font-bold text-white text-sm">{selectedRoom.name}</div>
                <div className="text-amber-400">{selectedRoom.bedConfiguration}</div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-stone-700/80">
                <div>
                  <span className="text-stone-400 block">Check-In:</span>
                  <span className="font-bold text-stone-200">{checkIn}</span>
                  <span className="text-[10px] text-stone-500 block">From 3:00 PM</span>
                </div>
                <div>
                  <span className="text-stone-400 block">Check-Out:</span>
                  <span className="font-bold text-stone-200">{checkOut}</span>
                  <span className="text-[10px] text-stone-500 block">By 11:00 AM</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-3 border-t border-stone-700/80 text-xs">
                <div className="flex justify-between text-stone-300">
                  <span>Room ({nights} nights @ ${baseRate}/nt)</span>
                  <span>${rawSubtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400 font-semibold">
                    <span>Direct Booking Discount ({promoDiscountPercent}%)</span>
                    <span>-${discountAmount}</span>
                  </div>
                )}

                {extrasTotal > 0 && (
                  <div className="flex justify-between text-stone-300">
                    <span>Selected Add-Ons</span>
                    <span>+${extrasTotal}</span>
                  </div>
                )}

                <div className="flex justify-between text-stone-300">
                  <span className="flex items-center gap-1">
                    <span>Lodging Taxes (10.8%)</span>
                    <HelpCircle className="w-3 h-3 text-stone-500" title="Oregon State & County Transient Occupancy Tax" />
                  </span>
                  <span>${taxesAndFees}</span>
                </div>

                <div className="pt-2 border-t border-stone-700 flex justify-between items-baseline font-bold">
                  <span className="text-white text-sm">Estimated Total:</span>
                  <span className="text-amber-400 text-xl font-extrabold">${grandTotal}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="pt-3 border-t border-stone-700/80 space-y-1.5">
                <label className="block text-[11px] font-bold text-stone-300 flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5 text-amber-400" />
                  <span>Promo / Discount Code</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                    placeholder="e.g. DIRECT10"
                    className="flex-1 p-2 rounded-lg bg-stone-900 border border-stone-700 text-amber-300 font-mono text-xs uppercase focus:outline-none focus:border-amber-500"
                  />
                  <button
                    onClick={() => validatePromoCode(promoCode)}
                    className="px-3 py-2 bg-stone-700 hover:bg-stone-600 text-white font-bold text-xs rounded-lg transition"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className="text-[11px] text-emerald-400 font-semibold">{promoMessage}</div>
                )}
              </div>

              {/* Direct Perks Guarantee */}
              <div className="bg-stone-900/90 p-3 rounded-xl border border-stone-700 text-[11px] space-y-1 text-stone-400">
                <div className="font-bold text-stone-200 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Your Direct Perks Included:</span>
                </div>
                <div>✓ Lowest Rate Guaranteed</div>
                <div>✓ 100% Free 24h Cancellation</div>
                <div>✓ Free Doorstep Parking & Wi-Fi</div>
                <div>✓ Free Morning Waffle Breakfast</div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
