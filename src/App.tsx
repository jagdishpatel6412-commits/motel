import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Bed, 
  Calendar, 
  Layers, 
  Phone, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Tag,
  Star,
  MapPin
} from 'lucide-react';

import { Room, SearchQuery, SpecialOffer } from './types';
import { ROOMS_DATA, MOTEL_INFO, SPECIAL_OFFERS } from './data/motelData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookingWidget } from './components/BookingWidget';
import { WhyStayWithUs } from './components/WhyStayWithUs';
import { RoomCard } from './components/RoomCard';
import { RoomDetailModal } from './components/RoomDetailModal';
import { RoomComparisonModal } from './components/RoomComparisonModal';
import { AmenitiesSection } from './components/AmenitiesSection';
import { GallerySection } from './components/GallerySection';
import { LocationSection } from './components/LocationSection';
import { SpecialOffersSection } from './components/SpecialOffersSection';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutSection } from './components/AboutSection';
import { PoliciesSection } from './components/PoliciesSection';
import { ContactSection } from './components/ContactSection';
import { BookingEngine } from './components/BookingEngine';
import { ReservationLookupModal } from './components/ReservationLookupModal';
import { ConciergeChatModal } from './components/ConciergeChatModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { IntroSplash } from './components/IntroSplash';
import { ScrollReveal } from './components/ScrollReveal';

export default function App() {
  // Current active page view: 'home' | 'rooms' | 'amenities' | 'gallery' | 'location' | 'offers' | 'reviews' | 'about' | 'policies' | 'contact' | 'booking' | 'admin'
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Modals state
  const [detailedRoom, setDetailedRoom] = useState<Room | null>(null);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);
  const [showLookupModal, setShowLookupModal] = useState<boolean>(false);
  const [showConciergeModal, setShowConciergeModal] = useState<boolean>(false);
  const [selectedOfferForBooking, setSelectedOfferForBooking] = useState<SpecialOffer | null>(null);
  const [selectedRoomForBooking, setSelectedRoomForBooking] = useState<Room | null>(null);

  // Search parameters from widget
  const [currentSearch, setCurrentSearch] = useState<SearchQuery | undefined>(undefined);

  // Rooms page filters
  const [roomCategoryFilter, setRoomCategoryFilter] = useState<string>('all');
  const [petOnlyFilter, setPetOnlyFilter] = useState<boolean>(false);
  const [adaOnlyFilter, setAdaOnlyFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recommended' | 'price-low' | 'price-high' | 'size'>('recommended');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Handlers
  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSearchRooms = (query: SearchQuery) => {
    setCurrentSearch(query);
    setCurrentPage('booking');
  };

  const handleBookRoom = (room: Room) => {
    setSelectedRoomForBooking(room);
    setCurrentPage('booking');
  };

  const handleApplyOffer = (offer: SpecialOffer) => {
    setSelectedOfferForBooking(offer);
    setCurrentPage('booking');
  };

  const handleOpenDirectBooking = () => {
    setSelectedRoomForBooking(null);
    setSelectedOfferForBooking(null);
    setCurrentPage('booking');
  };

  // Filtered rooms for the rooms section/page
  const filteredRooms = ROOMS_DATA.filter((room) => {
    if (roomCategoryFilter !== 'all' && room.category !== roomCategoryFilter) return false;
    if (petOnlyFilter && !room.petFriendly) return false;
    if (adaOnlyFilter && !room.accessible) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.basePrice - b.basePrice;
    if (sortBy === 'price-high') return b.basePrice - a.basePrice;
    if (sortBy === 'size') return b.sizeSqFt - a.sizeSqFt;
    return 0; // recommended
  });

  // If currently in Admin Dashboard
  if (currentPage === 'admin') {
    return <AdminDashboard onClose={() => setCurrentPage('home')} />;
  }

  // If in dedicated Booking Engine Flow
  if (currentPage === 'booking') {
    return (
      <BookingEngine
        initialSearch={currentSearch}
        selectedRoomPreload={selectedRoomForBooking}
        selectedOfferPreload={selectedOfferForBooking}
        onClose={() => setCurrentPage('home')}
        onNavigateHome={() => setCurrentPage('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#332D29] flex flex-col selection:bg-[#8C6239] selection:text-white pb-16 sm:pb-0">
      
      {/* Initial Page Entrance Shimmer / Intro Transition (0.75s) */}
      <IntroSplash />

      {/* Top Main Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenDirectBooking}
        onOpenLookup={() => setShowLookupModal(true)}
        onOpenAdmin={() => setCurrentPage('admin')}
        onOpenConcierge={() => setShowConciergeModal(true)}
      />

      {/* Main Content Dynamic Switch */}
      <main className="flex-1">
        
        {/* HOMEPAGE VIEW */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Banner with Title & Quick Value Badges */}
            <Hero 
              onSearch={handleSearchRooms}
              onNavigate={handleNavigate as any}
              onOpenBooking={handleOpenDirectBooking}
              onOpenConcierge={() => setShowConciergeModal(true)}
            />

            {/* Why Stay With Us 6-Benefit Section */}
            <ScrollReveal className="mt-8 sm:mt-12">
              <WhyStayWithUs />
            </ScrollReveal>

            {/* Featured Accommodations Showcase */}
            <ScrollReveal>
            <section className="py-16 sm:py-20 bg-[#FDFBF7] border-b border-[#EAE4D9]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
                  <div>
                    <span className="text-[10px] font-bold text-[#8C6239] uppercase tracking-widest bg-[#8C6239]/10 px-3 py-1 rounded-full border border-[#8C6239]/20">
                      Clean & Comfortable Accommodations
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#332D29] mt-2">
                      Featured Guest Rooms & Suites
                    </h2>
                    <p className="text-xs sm:text-sm text-[#6D635B] mt-1 font-light">
                      All units feature doorstep parking, plush bedding, 300+ Mbps Wi-Fi, and 4K Smart TVs.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setShowComparisonModal(true)}
                      className="px-4 py-2.5 bg-[#F7F3EE] hover:bg-[#EAE4D9] text-[#332D29] font-bold text-xs uppercase tracking-wider rounded-xl border border-[#EAE4D9] shadow-xs transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-[#8C6239]" />
                      <span>Compare All Rooms</span>
                    </button>

                    <button
                      onClick={() => handleNavigate('rooms')}
                      className="px-4 py-2.5 bg-[#8C6239] hover:bg-[#74512F] text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-sm transition flex items-center gap-1 cursor-pointer"
                    >
                      <span>View All Rooms</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 3 Featured Room Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {ROOMS_DATA.slice(0, 3).map((room) => (
                    <RoomCard
                      key={room.id}
                      room={room}
                      onSelectRoom={handleBookRoom}
                      onOpenDetails={setDetailedRoom}
                    />
                  ))}
                </div>

                {/* Direct Booking Callout */}
                <div className="mt-10 text-center bg-[#F7F3EE] rounded-2xl p-6 border border-[#EAE4D9] flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-left">
                    <span className="text-[10px] font-bold text-[#8C6239] uppercase tracking-widest">Save on Every Stay</span>
                    <h4 className="text-base font-bold font-serif text-[#332D29]">Direct booking always includes free cancellation and early check-in perks</h4>
                  </div>
                  <button
                    onClick={handleOpenDirectBooking}
                    className="px-6 py-2.5 bg-[#8C6239] hover:bg-[#74512F] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-sm transition cursor-pointer shrink-0"
                  >
                    Check All Dates & Availability
                  </button>
                </div>

              </div>
            </section>
            </ScrollReveal>

            {/* Amenities Section */}
            <ScrollReveal>
              <AmenitiesSection onOpenBooking={handleOpenDirectBooking} />
            </ScrollReveal>

            {/* Special Offers Section */}
            <ScrollReveal>
              <SpecialOffersSection onApplyOffer={handleApplyOffer} />
            </ScrollReveal>

            {/* Photo Gallery Section */}
            <ScrollReveal>
              <GallerySection />
            </ScrollReveal>

            {/* Location & Guide Section */}
            <ScrollReveal>
              <LocationSection />
            </ScrollReveal>

            {/* Verified Reviews Section */}
            <ScrollReveal>
              <ReviewsSection />
            </ScrollReveal>

            {/* About Section */}
            <ScrollReveal>
              <AboutSection onOpenBooking={handleOpenDirectBooking} />
            </ScrollReveal>

            {/* Policies & FAQ Section */}
            <ScrollReveal>
              <PoliciesSection />
            </ScrollReveal>

            {/* Contact Section */}
            <ScrollReveal>
              <ContactSection />
            </ScrollReveal>

          </div>
        )}

        {/* DEDICATED ROOMS PAGE */}
        {currentPage === 'rooms' && (
          <div className="py-12 sm:py-16 bg-[#FDFBF7]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto mb-10">
                <span className="text-[10px] font-bold text-[#8C6239] uppercase tracking-widest bg-[#8C6239]/10 px-3 py-1 rounded-full border border-[#8C6239]/20">
                  Accommodations Directory
                </span>
                <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#332D29] mt-3">
                  Our Guest Rooms & Suites
                </h1>
                <p className="mt-2 text-[#6D635B] text-sm sm:text-base font-light">
                  Choose from classic King rooms, Double Queen suites for families, Kitchenette suites, and Pet-Friendly accommodations in Bend, OR.
                </p>
              </div>

              {/* Filter Controls Bar */}
              <div className="bg-white rounded-2xl p-4 sm:p-5 border border-[#EAE4D9] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
                
                {/* Category Pills */}
                <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                  {[
                    { id: 'all', label: 'All Rooms (6)' },
                    { id: 'king', label: 'King Beds' },
                    { id: 'double-queen', label: 'Double Queens' },
                    { id: 'suite', label: 'Suites & Kitchenettes' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setRoomCategoryFilter(tab.id)}
                      className={`px-3.5 py-2 rounded-xl font-bold uppercase tracking-wider text-[11px] transition cursor-pointer ${
                        roomCategoryFilter === tab.id
                          ? 'bg-[#8C6239] text-white shadow-sm'
                          : 'bg-[#F7F3EE] text-[#6D635B] hover:bg-[#EAE4D9]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Toggles & Sort */}
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
                  <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-[#6D635B]">
                    <input
                      type="checkbox"
                      checked={petOnlyFilter}
                      onChange={(e) => setPetOnlyFilter(e.target.checked)}
                      className="accent-[#8C6239] rounded"
                    />
                    <span>Pet-Friendly</span>
                  </label>

                  <label className="flex items-center gap-1.5 cursor-pointer select-none font-semibold text-[#6D635B]">
                    <input
                      type="checkbox"
                      checked={adaOnlyFilter}
                      onChange={(e) => setAdaOnlyFilter(e.target.checked)}
                      className="accent-[#8C6239] rounded"
                    />
                    <span>ADA Accessible</span>
                  </label>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="p-2 bg-[#F7F3EE] border border-[#EAE4D9] rounded-xl text-[#332D29] font-medium focus:outline-none focus:border-[#8C6239]"
                  >
                    <option value="recommended">Sort: Recommended</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="size">Room Size: Largest</option>
                  </select>

                  <button
                    onClick={() => setShowComparisonModal(true)}
                    className="px-3.5 py-2 bg-[#332D29] hover:bg-[#4A433E] text-white rounded-xl font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5 shadow-sm transition"
                  >
                    <Layers className="w-3.5 h-3.5 text-[#8C6239]" />
                    <span>Compare Matrix</span>
                  </button>
                </div>

              </div>

              {/* Grid of All Filtered Rooms */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredRooms.map((room) => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    onSelectRoom={handleBookRoom}
                    onOpenDetails={setDetailedRoom}
                  />
                ))}
              </div>

              {filteredRooms.length === 0 && (
                <div className="text-center py-16 bg-white rounded-2xl border border-[#EAE4D9] p-8">
                  <p className="text-[#6D635B] text-sm">No rooms match your active filter combination.</p>
                  <button
                    onClick={() => {
                      setRoomCategoryFilter('all');
                      setPetOnlyFilter(false);
                      setAdaOnlyFilter(false);
                    }}
                    className="mt-3 px-4 py-2 bg-[#8C6239] text-white text-xs font-bold uppercase tracking-wider rounded-xl"
                  >
                    Reset Filters
                  </button>
                </div>
              )}

            </div>
          </div>
        )}

        {/* DEDICATED AMENITIES PAGE */}
        {currentPage === 'amenities' && (
          <ScrollReveal className="py-8">
            <AmenitiesSection onOpenBooking={handleOpenDirectBooking} />
          </ScrollReveal>
        )}

        {/* DEDICATED GALLERY PAGE */}
        {currentPage === 'gallery' && (
          <ScrollReveal className="py-8">
            <GallerySection />
          </ScrollReveal>
        )}

        {/* DEDICATED LOCATION & GUIDE PAGE */}
        {currentPage === 'location' && (
          <ScrollReveal className="py-8">
            <LocationSection />
          </ScrollReveal>
        )}

        {/* DEDICATED SPECIAL OFFERS PAGE */}
        {currentPage === 'offers' && (
          <ScrollReveal className="py-8">
            <SpecialOffersSection onApplyOffer={handleApplyOffer} />
          </ScrollReveal>
        )}

        {/* DEDICATED REVIEWS PAGE */}
        {currentPage === 'reviews' && (
          <ScrollReveal className="py-8">
            <ReviewsSection />
          </ScrollReveal>
        )}

        {/* DEDICATED ABOUT PAGE */}
        {currentPage === 'about' && (
          <ScrollReveal className="py-8">
            <AboutSection onOpenBooking={handleOpenDirectBooking} />
          </ScrollReveal>
        )}

        {/* DEDICATED POLICIES PAGE */}
        {currentPage === 'policies' && (
          <ScrollReveal className="py-8">
            <PoliciesSection />
          </ScrollReveal>
        )}

        {/* DEDICATED CONTACT PAGE */}
        {currentPage === 'contact' && (
          <ScrollReveal className="py-8">
            <ContactSection />
          </ScrollReveal>
        )}

      </main>

      {/* Floating Desktop AI Concierge Badge */}
      <button
        onClick={() => setShowConciergeModal(true)}
        className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center gap-2.5 px-4 py-3 bg-[#332D29] text-white rounded-full border border-[#8C6239]/40 shadow-2xl hover:bg-[#27221E] transition hover:scale-105 cursor-pointer group"
      >
        <div className="w-8 h-8 rounded-full bg-[#8C6239] flex items-center justify-center text-white shadow group-hover:bg-[#74512F] transition">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-left text-xs">
          <div className="font-bold font-serif text-white">Ask AI Concierge</div>
          <div className="text-[10px] text-[#A69D95]">24/7 Questions & Local Tips</div>
        </div>
      </button>

      {/* Mobile Sticky Booking Bar */}
      <StickyMobileBar
        onOpenBooking={handleOpenDirectBooking}
        onOpenConcierge={() => setShowConciergeModal(true)}
      />

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={handleOpenDirectBooking}
        onOpenLookup={() => setShowLookupModal(true)}
        onOpenAdmin={() => setCurrentPage('admin')}
        onOpenConcierge={() => setShowConciergeModal(true)}
      />

      {/* MODALS */}

      {/* Room Detail Modal */}
      {detailedRoom && (
        <RoomDetailModal
          room={detailedRoom}
          onClose={() => setDetailedRoom(null)}
          onBookRoom={handleBookRoom}
        />
      )}

      {/* Room Comparison Matrix Modal */}
      {showComparisonModal && (
        <RoomComparisonModal
          rooms={ROOMS_DATA}
          onClose={() => setShowComparisonModal(false)}
          onSelectRoom={handleBookRoom}
        />
      )}

      {/* Reservation Lookup Modal */}
      {showLookupModal && (
        <ReservationLookupModal
          onClose={() => setShowLookupModal(false)}
        />
      )}

      {/* AI Concierge Chat Modal */}
      {showConciergeModal && (
        <ConciergeChatModal
          onClose={() => setShowConciergeModal(false)}
          onOpenBooking={handleOpenDirectBooking}
        />
      )}

    </div>
  );
}
