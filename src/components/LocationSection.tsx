import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Car, 
  Plane, 
  Clock, 
  ExternalLink, 
  Compass,
  Phone,
  Layers,
  Sparkles
} from 'lucide-react';
import { MOTEL_INFO, LOCAL_ATTRACTIONS } from '../data/motelData';

export const LocationSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Nature & Parks', 'Dining & Breweries', 'Culture & Downtown', 'Transit & Medical'];

  const filteredAttractions = selectedCategory === 'All'
    ? LOCAL_ATTRACTIONS
    : LOCAL_ATTRACTIONS.filter(a => a.category === selectedCategory);

  const getGoogleMapsDirectionsUrl = (destination: string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination)}`;
  };

  return (
    <section className="py-16 sm:py-20 bg-stone-100 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider border border-amber-300 mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Prime Central Oregon Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-stone-900">
            Location & Area Guide
          </h2>
          <p className="mt-2 text-stone-600 text-sm sm:text-base">
            Conveniently situated right on Scenic Highway 97 in Bend, OR. Minutes from downtown, world-class outdoor recreation, craft breweries, and regional transit.
          </p>
        </div>

        {/* Location & Interactive Map Hub Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-stone-200 shadow-xl mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Property Address</span>
                <h3 className="text-2xl font-bold font-serif text-stone-900 mt-1">{MOTEL_INFO.name}</h3>
                <p className="text-base text-stone-700 font-medium mt-1 flex items-start gap-2">
                  <MapPin className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  <span>{MOTEL_INFO.address}, {MOTEL_INFO.city}, {MOTEL_INFO.state} {MOTEL_INFO.zip}</span>
                </p>
              </div>

              {/* Distances Key List */}
              <div className="space-y-3 pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-amber-800" />
                    <span className="font-semibold text-stone-800">Highway 97 Access</span>
                  </div>
                  <span className="text-stone-500 font-medium">Direct Roadside Frontage</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-amber-800" />
                    <span className="font-semibold text-stone-800">Downtown Bend & Old Mill</span>
                  </div>
                  <span className="text-stone-700 font-bold">2.1 miles (5 mins)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Plane className="w-4 h-4 text-amber-800" />
                    <span className="font-semibold text-stone-800">Redmond Airport (RDM)</span>
                  </div>
                  <span className="text-stone-700 font-bold">16.2 miles (19 mins)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-100 text-xs">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-800" />
                    <span className="font-semibold text-stone-800">Mt. Bachelor Ski Resort</span>
                  </div>
                  <span className="text-stone-700 font-bold">21.0 miles (25 mins)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={getGoogleMapsDirectionsUrl(`${MOTEL_INFO.address}, ${MOTEL_INFO.city}, ${MOTEL_INFO.state}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[160px] px-5 py-3 bg-amber-800 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center justify-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>

                <a
                  href={`tel:${MOTEL_INFO.phone}`}
                  className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm rounded-xl border border-stone-300 transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>{MOTEL_INFO.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Map Visual / Interactive Embed (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-inner border border-stone-200 h-80 sm:h-96 bg-stone-900">
                {/* Visual Map Render with Pin */}
                <iframe
                  title="The Pinecrest Motel Location Map"
                  src="https://maps.google.com/maps?q=1420%20Highway%2097%20Bend%20OR%2097702&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full border-0 filter contrast-105"
                  loading="lazy"
                />

                {/* Floating Motel Info Overlay */}
                <div className="absolute top-4 left-4 bg-stone-900/90 text-white p-3.5 rounded-xl shadow-xl backdrop-blur-md border border-stone-700 max-w-xs text-xs pointer-events-none">
                  <div className="font-bold text-amber-400 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>The Pinecrest Motel & Suites</span>
                  </div>
                  <p className="text-stone-300 text-[11px] mt-0.5">
                    1420 Scenic Highway 97, Bend, OR
                  </p>
                  <div className="text-[10px] text-emerald-400 mt-1 font-semibold">
                    ✓ Direct Doorstep Parking On-Site
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Explore Nearby Attractions Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Local Travel Guide</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 mt-1">
                Explore Top Nearby Attractions
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Curated recommendations from our local front desk team.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCategory(c)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition cursor-pointer ${
                    selectedCategory === c
                      ? 'bg-amber-800 text-white shadow'
                      : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Attraction Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredAttractions.map((att) => (
              <div 
                key={att.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 w-full bg-stone-100 overflow-hidden">
                    <img
                      src={att.image}
                      alt={att.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-2.5 right-2.5 bg-stone-900/80 text-amber-300 text-[11px] font-bold px-2 py-0.5 rounded-full backdrop-blur">
                      {att.driveTime} drive
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-stone-900/80 text-white text-[10px] font-medium px-2 py-0.5 rounded backdrop-blur">
                      {att.tag}
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{att.distanceMiles} miles from motel</span>
                    </div>
                    <h4 className="text-base font-bold font-serif text-stone-900 line-clamp-1">
                      {att.name}
                    </h4>
                    <p className="text-xs text-stone-600 mt-1.5 line-clamp-3">
                      {att.description}
                    </p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-stone-50">
                  <a
                    href={getGoogleMapsDirectionsUrl(att.address || att.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 rounded-lg flex items-center justify-center gap-1.5 transition"
                  >
                    <span>Get Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
