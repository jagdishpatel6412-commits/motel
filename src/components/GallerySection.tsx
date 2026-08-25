import React, { useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles,
  Camera
} from 'lucide-react';
import { GALLERY_PHOTOS } from '../data/motelData';

export const GallerySection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const categories = ['All', 'Exterior & Grounds', 'Rooms & Suites', 'Pool & Relax', 'Bathrooms', 'Breakfast & Coffee'];

  const filteredPhotos = selectedCategory === 'All'
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter(p => p.category === selectedCategory);

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const closeLightbox = () => {
    setActivePhotoIndex(null);
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex !== null) {
      setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-[#FDFBF7] text-[#332D29] border-b border-[#EAE4D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8C6239]/10 text-[#8C6239] text-xs font-bold uppercase tracking-wider border border-[#8C6239]/20 mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Property Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-serif text-[#332D29]">
            Photo Gallery
          </h2>
          <p className="mt-2 text-[#6D635B] text-sm sm:text-base font-light">
            Take a visual tour of our newly updated rooms, heated outdoor swimming pool, courtyard grounds, and morning roaster bar.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-full transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#8C6239] text-white shadow-md'
                  : 'bg-[#F7F3EE] text-[#6D635B] hover:bg-[#EAE4D9] border border-[#EAE4D9]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative h-64 sm:h-72 rounded-2xl overflow-hidden bg-[#F7F3EE] cursor-pointer shadow-sm hover:shadow-xl transition duration-500 border border-[#EAE4D9]"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                loading="lazy"
              />

              {/* Dark Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#27221E] via-[#27221E]/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-between p-5">
                <div className="flex justify-end">
                  <span className="p-2 rounded-full bg-[#332D29]/80 text-white backdrop-blur">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-bold text-[#8C6239] uppercase tracking-wider block">
                    {photo.category}
                  </span>
                  <h4 className="text-base font-bold font-serif text-white mt-0.5">
                    {photo.title}
                  </h4>
                  <p className="text-xs text-[#EAE4D9]/90 mt-1 line-clamp-2 font-light">
                    {photo.caption}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Pill for Mobile */}
              <div className="sm:hidden absolute bottom-2 left-2 bg-[#27221E]/80 px-2 py-0.5 rounded text-[11px] text-white">
                {photo.title}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activePhotoIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 p-2 text-stone-300 hover:text-white transition cursor-pointer"
              aria-label="Close photo"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Photo Container */}
            <div className="relative w-full max-h-[75vh] flex items-center justify-center rounded-xl overflow-hidden bg-black">
              <img
                src={filteredPhotos[activePhotoIndex].url}
                alt={filteredPhotos[activePhotoIndex].title}
                className="max-w-full max-h-[75vh] object-contain"
              />

              {/* Prev / Next Arrows */}
              <button
                onClick={prevPhoto}
                className="absolute left-4 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextPhoto}
                className="absolute right-4 p-3 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white transition cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Photo Caption */}
            <div className="mt-4 text-center text-white max-w-2xl px-4">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                {filteredPhotos[activePhotoIndex].category} • {activePhotoIndex + 1} of {filteredPhotos.length}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-serif mt-1">
                {filteredPhotos[activePhotoIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-300 mt-1">
                {filteredPhotos[activePhotoIndex].caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
