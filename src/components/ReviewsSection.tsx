import React, { useState } from 'react';
import { 
  Star, 
  CheckCircle2, 
  MessageSquare, 
  ThumbsUp, 
  ShieldCheck, 
  Plus, 
  X,
  Sparkles
} from 'lucide-react';
import { GUEST_REVIEWS, MOTEL_INFO } from '../data/motelData';
import { GuestReview } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<GuestReview[]>(GUEST_REVIEWS);
  const [showReviewModal, setShowReviewModal] = useState(false);
  
  // New review form state
  const [authorName, setAuthorName] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [roomStayed, setRoomStayed] = useState('Deluxe King Room');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: GuestReview = {
      id: `rev-${Date.now()}`,
      authorName,
      location: location || 'Verified Traveler',
      rating,
      date: 'Just now',
      title,
      content,
      roomStayed,
      verifiedDirectGuest: true,
      source: 'Direct Guest',
      cleanlinessScore: rating,
      comfortScore: rating,
      serviceScore: rating
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowReviewModal(false);
      // Reset
      setAuthorName('');
      setLocation('');
      setTitle('');
      setContent('');
    }, 2000);
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300 mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-700 text-amber-700" />
            <span>Verified Guest Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Real Reviews From Real Roadtrippers
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            See why families, couples, pet owners, and outdoor adventurers consistently rate The Pinecrest as Central Oregon's best independent motel.
          </p>
        </div>

        {/* Rating Overview Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-lg mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Big Score (4 cols) */}
            <div className="md:col-span-4 text-center md:text-left md:border-r md:border-stone-200 md:pr-6">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <span className="text-5xl sm:text-6xl font-extrabold text-stone-900 font-serif">4.8</span>
                <div>
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <div className="text-xs text-stone-500 mt-1 font-semibold">
                    Based on {MOTEL_INFO.totalReviewsCount}+ verified reviews
                  </div>
                </div>
              </div>
              <p className="text-xs text-stone-600 mt-3">
                Consistently ranked in the top 5% of independent accommodations in Central Oregon.
              </p>
            </div>

            {/* Middle Category Scores (5 cols) */}
            <div className="md:col-span-5 space-y-2.5 text-xs font-semibold text-stone-700">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Cleanliness & Sanitization</span>
                  <span className="text-amber-900 font-bold">4.9 / 5.0</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Location & Accessibility (Hwy 97)</span>
                  <span className="text-amber-900 font-bold">4.8 / 5.0</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full w-[96%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Value for Money</span>
                  <span className="text-amber-900 font-bold">4.9 / 5.0</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 rounded-full w-[98%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span>Friendly Service & 24/7 Desk</span>
                  <span className="text-amber-900 font-bold">4.8 / 5.0</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-600 rounded-full w-[96%]" />
                </div>
              </div>
            </div>

            {/* Right Action (3 cols) */}
            <div className="md:col-span-3 text-center md:text-right">
              <button
                onClick={() => setShowReviewModal(true)}
                className="w-full sm:w-auto px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow transition flex items-center justify-center gap-2 cursor-pointer mx-auto md:ml-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Write a Guest Review</span>
              </button>
              <span className="text-[11px] text-stone-400 block mt-2">Verified stay required</span>
            </div>

          </div>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Rating & Source Badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                    {rev.source}
                  </span>
                </div>

                {/* Review Title */}
                <h4 className="text-base font-bold font-serif text-stone-900 mb-2">
                  "{rev.title}"
                </h4>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-4">
                  {rev.content}
                </p>
              </div>

              {/* Author & Verification */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-stone-800">{rev.authorName}</div>
                  <div className="text-[11px] text-stone-500">{rev.location} • Stayed in {rev.roomStayed}</div>
                </div>

                {rev.verifiedDirectGuest && (
                  <div className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]" title="Verified Booking Guest">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-stone-200 relative animate-fadeIn">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-xl font-bold font-serif text-stone-900 mb-1">Share Your Stay Experience</h3>
            <p className="text-xs text-stone-500 mb-4">Your honest feedback helps fellow travelers and our team.</p>

            {submittedMessage ? (
              <div className="p-6 bg-emerald-50 text-emerald-800 rounded-xl text-center font-semibold text-sm">
                ✓ Thank you for your review! It has been posted to our guest book.
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="e.g. Sarah & Mark Miller"
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Your City / State</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Seattle, WA"
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-stone-700 mb-1">Room Category</label>
                    <select
                      value={roomStayed}
                      onChange={(e) => setRoomStayed(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                    >
                      <option>Deluxe King Room</option>
                      <option>Double Queen Suite</option>
                      <option>King Studio Suite with Kitchenette</option>
                      <option>Pet-Friendly Queen Room</option>
                      <option>Two-Room Family Suite</option>
                      <option>Accessible King Room (ADA)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Star Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`p-2 rounded-lg border flex items-center gap-1 ${
                          rating >= star ? 'bg-amber-100 border-amber-400 text-amber-800' : 'bg-stone-50 border-stone-200 text-stone-400'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                        <span className="font-bold">{star}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Headline / Summary</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Incredibly clean and peaceful night of sleep!"
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Review Details</label>
                  <textarea
                    rows={3}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tell us what you enjoyed about the room, bed comfort, parking, staff or amenities..."
                    className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:border-amber-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-amber-700 hover:bg-amber-600 text-white font-bold rounded-xl shadow transition"
                >
                  Submit Review
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
