import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlides from "@/data/hero-data";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalSlides = heroSlides.length;

  // Background image follows the currentSlide
  const backgroundImage = heroSlides[currentSlide].image;

  // Show next 3 thumbnails after currentSlide (wrap around)
  const visibleSlidesCount = Math.min(3, totalSlides - 1);

  const getVisibleSlides = () => {
    if (totalSlides <= 1) return [];
    let slides = [];
    for (let i = 1; i <= visibleSlidesCount; i++) {
      const idx = (currentSlide + i) % totalSlides;
      slides.push(heroSlides[idx]);
    }
    return slides;
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Pause auto-play when user interacts
  const handleUserInteraction = (action) => {
    setIsAutoPlaying(false);
    action();
    // Resume auto-play after 8 seconds of no interaction
    setTimeout(() => setIsAutoPlaying(true), 8000);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('${backgroundImage}')`,
        }}
      />

      {/* Main Content */}
      <div className="relative z-40 flex flex-col xl:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 xl:py-32 min-h-screen">
        {/* Left Content */}
        <div className="flex-1 max-w-full xl:max-w-2xl mb-8 sm:mb-12 xl:mb-0 text-center xl:text-left">
          <div className="text-xs sm:text-sm font-medium text-yellow-400 mb-3 sm:mb-4 tracking-wider uppercase">
            Experience Malawi
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight sm:leading-none mb-6 sm:mb-8">
            AFRICA'S WARM <br />
            <span className="text-yellow-400">HEART, WILD SOUL</span>
          </h1>

          <div className="flex flex-col sm:flex-row items-center justify-center xl:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-6 sm:mb-8">
            <div className="w-8 sm:w-12 h-0.5 bg-yellow-400"></div>
            <p className="text-gray-300 text-base sm:text-lg max-w-sm sm:max-w-md leading-relaxed text-center xl:text-left">
              Uncover untold stories, vibrant traditions, rich music, and wild adventures across Malawi.
            </p>
          </div>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-xs sm:text-sm tracking-wider transition-all duration-300 transform hover:scale-105">
            EXPLORE TOURS
          </button>
        </div>

        {/* Right Content - Carousel Thumbnails */}
        <div className="flex-1 w-full max-w-full xl:max-w-4xl">
          <div className="relative">
            {/* Mobile: Single slide view, Tablet: 2 slides, Desktop: 3 slides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
              {getVisibleSlides().map((slide, idx) => (
                <div
                  key={idx}
                  className={`relative group cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    idx === 1 ? "lg:scale-110 z-10" : "lg:scale-95"
                  } ${
                    idx >= 2 ? "hidden lg:block" : "" // Hide 3rd slide on mobile/tablet
                  } ${
                    idx >= 1 ? "hidden sm:block" : "" // Hide 2nd slide on mobile
                  }`}
                  onClick={() => {
                    // Find index in heroSlides and update currentSlide
                    const slideIndex = heroSlides.findIndex((s) => s.image === slide.image);
                    if (slideIndex !== -1) {
                      handleUserInteraction(() => setCurrentSlide(slideIndex));
                    }
                  }}
                >
                  <div className="relative h-48 sm:h-60 md:h-72 lg:h-80 rounded-xl sm:rounded-2xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-cover bg-center"
                      style={{
                        backgroundImage: `url('${slide.image}')`,
                        filter: idx === 1 ? "brightness(1.1)" : "brightness(0.75)",
                      }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    {/* Caption */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                      <p className="text-xs sm:text-sm text-yellow-400 font-semibold">{slide.caption}</p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-yellow-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <button
                  onClick={() => handleUserInteraction(prevSlide)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 group"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white" />
                </button>
                <button
                  onClick={() => handleUserInteraction(nextSlide)}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-yellow-500 hover:border-yellow-500 transition-all duration-300 group"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:text-white" />
                </button>
              </div>

              <div className="text-right">
                <div className="text-2xl sm:text-3xl font-bold">{String(currentSlide + 1).padStart(2, "0")}</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {String(currentSlide + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Indicators - Hidden on very small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-4 sm:left-8 z-40 hidden sm:block">
        <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400"></div>
          <div className="w-6 sm:w-8 h-0.5 bg-yellow-400"></div>
        </div>
      </div>

      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-40 hidden sm:block">
        <div className="flex flex-col items-center space-y-2">
          <div className="text-xs text-gray-400 rotate-90 origin-center whitespace-nowrap">SCROLL</div>
          <div className="w-0.5 h-8 sm:h-12 bg-gradient-to-b from-yellow-400 to-transparent"></div>
        </div>
      </div>
    </div>
  );
}