import { Clock, X, Heart, Share2, Star, MapPin, Calendar, Users } from "lucide-react";
import { useState } from "react";

export default function HolidayFlyerUI({ data, onClose }) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  if (!data) return null;
  
  const {
    name,
    gallery,
    features,
    originalPrice,
    discountPrice,
    type,
    rating,
    reviews,
    address,
  } = data;

  const handleAddToCart = () => {
    console.log("Add to cart:", data.id);
    // Add real cart logic here
    if (onClose) onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this amazing ${type}!`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-2 sm:p-4">
      <div className="relative bg-white shadow-2xl w-full max-w-xs sm:max-w-2xl md:max-w-4xl lg:max-w-6xl max-h-[95vh] rounded-lg sm:rounded-xl overflow-hidden flex flex-col">
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 bg-white text-slate-600 hover:text-red-600 p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}

        {/* Action Buttons */}
        <div className="absolute top-2 right-12 sm:top-4 sm:right-16 z-50 flex gap-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Heart 
              className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                isFavorite ? 'text-red-500 fill-current' : 'text-slate-600'
              }`} 
            />
          </button>
          <button
            onClick={handleShare}
            className="bg-white text-slate-600 hover:text-blue-600 p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            <Share2 className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Header with Split */}
          <div className="flex flex-col lg:flex-row h-auto lg:h-80 xl:h-96">
            <div className="w-full lg:w-1/2 bg-gradient-to-br from-slate-700 to-slate-800 text-white flex flex-col justify-center px-4 sm:px-6 md:px-8 py-6 sm:py-8 relative">
              <div className="space-y-2 sm:space-y-3 mt-6 sm:mt-8">
                <div className="flex items-center gap-2 text-sm sm:text-base opacity-90">
                  {address && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="truncate max-w-[200px]">{address}</span>
                    </div>
                  )}
                </div>
                
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight">
                  {name}
                </h1>
                
                {(rating || reviews) && (
                  <div className="flex items-center gap-3 text-sm">
                    {rating && (
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3 h-3 sm:w-4 sm:h-4 ${i < rating ? 'text-yellow-400' : 'text-gray-400'}`}
                            fill="currentColor"
                          />
                        ))}
                        <span className="ml-1">{rating}</span>
                      </div>
                    )}
                    {reviews && (
                      <span className="opacity-75">({reviews} reviews)</span>
                    )}
                  </div>
                )}
                
                <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                  {type}
                </div>
              </div>
              
              {/* Decorative element - hidden on small screens */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[60px] sm:border-t-[80px] border-r-[24px] sm:border-r-[32px] border-t-slate-700 border-r-transparent hidden sm:block"></div>
            </div>
            
            <div className="w-full lg:w-1/2 h-48 sm:h-64 lg:h-full relative">
              <img
                src={gallery?.[activeImageIndex] || gallery?.[0]}
                alt="main gallery"
                className="w-full h-full object-cover"
              />
              
              {/* Image counter */}
              {gallery?.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                  {activeImageIndex + 1} / {gallery.length}
                </div>
              )}
            </div>
          </div>

          {/* Gallery Strip - Thumbnails */}
          {gallery?.length > 1 && (
            <div className="flex gap-1 sm:gap-2 p-2 sm:p-4 bg-gray-50 overflow-x-auto">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    activeImageIndex === i ? 'border-blue-500 shadow-md' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`gallery ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row">
            {/* Features */}
            <div className="w-full lg:w-2/3 p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-lg sm:text-xl font-bold text-slate-800 border-b pb-2">
                  What's Included
                </h2>
                
                {features?.length > 0 ? (
                  <div className="grid gap-3 sm:gap-4">
                    {features.map((feat, idx) => {
                      // Safely get the icon, fallback to Clock if not found
                      let Icon = Clock;
                      try {
                        const iconComponent = require("lucide-react")[feat.icon];
                        if (iconComponent) Icon = iconComponent;
                      } catch (e) {
                        // Icon not found, use Clock as fallback
                      }
                      
                      return (
                        <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-slate-600 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-slate-700 mb-1 text-sm sm:text-base">
                              {feat.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                              {feat.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Feature details will be updated soon</p>
                  </div>
                )}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="w-full lg:w-1/3 bg-gradient-to-br from-slate-700 to-slate-800 text-white p-4 sm:p-6 flex flex-col justify-center">
              <div className="text-center space-y-3 sm:space-y-4">
                <div className="space-y-1">
                  <h2 className="text-base sm:text-lg font-semibold opacity-90">
                    {type}
                  </h2>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="w-4 h-4 opacity-75" />
                    <span className="text-sm opacity-75">Perfect for your group</span>
                  </div>
                </div>

                <div className="space-y-2">
                  {originalPrice && originalPrice !== discountPrice && (
                    <div className="text-center">
                      <span className="text-sm sm:text-base line-through opacity-75">
                        ${originalPrice}
                      </span>
                      <span className="ml-2 bg-red-500 text-white px-2 py-0.5 rounded text-xs font-bold">
                        SAVE ${originalPrice - discountPrice}
                      </span>
                    </div>
                  )}
                  
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                    ${discountPrice}
                  </div>
                  
                  <div className="text-xs sm:text-sm opacity-75">
                    PER PERSON • TERMS & CONDITIONS APPLY
                  </div>
                </div>

                <div className="pt-2 sm:pt-4 space-y-3">
                  <button 
                    onClick={handleAddToCart}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white text-slate-800 font-bold rounded-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                  >
                    Add to Cart
                  </button>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors text-xs sm:text-sm">
                      Learn More
                    </button>
                    <button className="flex-1 px-3 py-2 border border-white border-opacity-30 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors text-xs sm:text-sm">
                      Contact Us
                    </button>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-xs opacity-75">
                    <Clock className="w-3 h-3" />
                    <span>Limited Time Offer</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}