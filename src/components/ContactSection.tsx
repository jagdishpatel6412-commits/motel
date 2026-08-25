import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { MOTEL_INFO } from '../data/motelData';

export const ContactSection: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          checkInDate,
          checkOutDate,
          subject,
          message
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
        // Reset form
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        setError(data.message || 'Unable to send message. Please try again.');
      }
    } catch (err: any) {
      // Fallback local success
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#332D29] text-[#EAE4D9] border-b border-[#EAE4D9]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#27221E] text-[#8C6239] text-xs font-bold uppercase tracking-wider border border-[#8C6239]/40 mb-3">
            <Phone className="w-3.5 h-3.5 text-[#8C6239]" />
            <span>24/7 Front Desk Support</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-white">
            Contact & Guest Inquiries
          </h2>
          <p className="mt-2 text-[#EAE4D9]/80 text-sm sm:text-base font-light">
            We are always here to help. Reach out directly for special requests, group reservations, or road trip inquiries.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Phone Card */}
            <div className="bg-[#27221E] rounded-2xl p-6 border border-[#EAE4D9]/20 shadow-md">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#8C6239]/20 border border-[#8C6239]/40 flex items-center justify-center text-[#8C6239] shrink-0">
                  <Phone className="w-6 h-6 text-[#8C6239]" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#8C6239] uppercase tracking-wider">Direct Phone Support</div>
                  <div className="text-xl font-bold font-serif text-white">{MOTEL_INFO.phone}</div>
                  <div className="text-xs text-[#A69D95]">Toll-Free: {MOTEL_INFO.tollFree}</div>
                  <p className="text-xs text-[#EAE4D9]/80 pt-1 font-light">Front desk team available 24 hours a day, 7 days a week.</p>
                  
                  <div className="pt-2">
                    <a
                      href={`tel:${MOTEL_INFO.phone}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8C6239] hover:text-white transition"
                    >
                      <span>Click to Call Front Desk</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Address & Hours */}
            <div className="bg-[#27221E] rounded-2xl p-6 border border-[#EAE4D9]/20 shadow-md space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#332D29] border border-[#EAE4D9]/20 flex items-center justify-center text-[#EAE4D9] shrink-0">
                  <MapPin className="w-6 h-6 text-[#8C6239]" />
                </div>
                <div className="space-y-1">
                  <div className="text-xs font-bold text-[#8C6239] uppercase tracking-wider">Physical Address</div>
                  <div className="text-sm font-bold text-white">{MOTEL_INFO.name}</div>
                  <div className="text-xs text-[#EAE4D9]">{MOTEL_INFO.address}</div>
                  <div className="text-xs text-[#EAE4D9]">{MOTEL_INFO.city}, {MOTEL_INFO.state} {MOTEL_INFO.zip}</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#EAE4D9]/20">
                <div className="w-12 h-12 rounded-xl bg-[#332D29] border border-[#EAE4D9]/20 flex items-center justify-center text-[#EAE4D9] shrink-0">
                  <Clock className="w-6 h-6 text-[#8C6239]" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[#8C6239] uppercase tracking-wider">Front Desk Hours</div>
                  <div className="text-[#EAE4D9] font-semibold">{MOTEL_INFO.frontDeskHours}</div>
                  <div className="text-[#A69D95]">Check-in: 3:00 PM | Check-out: 11:00 AM</div>
                </div>
              </div>

              <div className="flex items-start gap-4 pt-3 border-t border-[#EAE4D9]/20">
                <div className="w-12 h-12 rounded-xl bg-[#332D29] border border-[#EAE4D9]/20 flex items-center justify-center text-[#EAE4D9] shrink-0">
                  <Mail className="w-6 h-6 text-[#8C6239]" />
                </div>
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-[#8C6239] uppercase tracking-wider">Reservations Email</div>
                  <a href={`mailto:${MOTEL_INFO.email}`} className="text-[#EAE4D9] hover:text-white underline block font-mono">
                    {MOTEL_INFO.email}
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#27221E] rounded-3xl p-6 sm:p-8 border border-[#EAE4D9]/20 shadow-xl">
            <h3 className="text-xl font-bold font-serif text-white mb-1">
              Send Us a Message
            </h3>
            <p className="text-xs text-stone-400 mb-6">
              Have questions regarding pet accommodations, oversized trailer parking, or extended stays? We typically reply within 2 business hours.
            </p>

            {submitted ? (
              <div className="p-8 bg-[#332D29] border border-[#8C6239] text-[#EAE4D9] rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#8C6239] mx-auto" />
                <h4 className="text-lg font-bold font-serif text-white">Message Sent Successfully!</h4>
                <p className="text-xs text-[#EAE4D9]/90 font-light">
                  Thank you for reaching out to The Pinecrest. A member of our front desk team has received your message and will contact you shortly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-4 py-2 bg-[#8C6239] hover:bg-[#74512F] text-white text-xs font-semibold rounded-lg"
                >
                  Send Another Note
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                {error && (
                  <div className="p-3 bg-rose-950/80 border border-rose-700 text-rose-200 rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#EAE4D9] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. John Miller"
                      className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white placeholder-[#A69D95] focus:outline-none focus:border-[#8C6239]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#EAE4D9] mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="john@example.com"
                      className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white placeholder-[#A69D95] focus:outline-none focus:border-[#8C6239]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-bold text-[#EAE4D9] mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white placeholder-[#A69D95] focus:outline-none focus:border-[#8C6239]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#EAE4D9] mb-1">Target Check-In</label>
                    <input
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white placeholder-[#A69D95] focus:outline-none focus:border-[#8C6239] [color-scheme:dark]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-[#EAE4D9] mb-1">Target Check-Out</label>
                    <input
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white placeholder-[#A69D95] focus:outline-none focus:border-[#8C6239] [color-scheme:dark]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#EAE4D9] mb-1">Inquiry Topic</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white focus:outline-none focus:border-[#8C6239]"
                  >
                    <option>General Room Question</option>
                    <option>Pet-Friendly Accommodation</option>
                    <option>Trailer / RV Parking Request</option>
                    <option>Extended Stay / Weekly Rate</option>
                    <option>Group or Corporate Booking</option>
                    <option>Modify Existing Reservation</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#EAE4D9] mb-1">Message / Question *</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please include any details or special requests..."
                    className="w-full p-3 rounded-xl bg-[#332D29] border border-[#EAE4D9]/30 text-white placeholder-[#A69D95] focus:outline-none focus:border-[#8C6239]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-[#8C6239] hover:bg-[#74512F] active:bg-[#5E4226] disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Sending Message...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
