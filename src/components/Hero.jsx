import Image from "next/image";
import { Drum, TreePalm, Utensils, Mountain, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const features = [
    {
      icon: <Mountain size={28} />,
      title: "Breathtaking Landscapes",
      desc: "Unspoiled lake shores, mountains and valleys that will take your breath away.",
    },
    {
      icon: <Drum size={28} />,
      title: "Vibrant Culture",
      desc: "Rich festivals, traditional music, studio tours, and local artisan experiences.",
    },
    {
      icon: <Utensils size={28} />,
      title: "Delicious Cuisine",
      desc: "Authentic food tours, street eats, and immersive kitchen experiences.",
    },
    {
      icon: <TreePalm size={28} />,
      title: "Warm Hospitality",
      desc: "Experience the renowned kindness and welcoming spirit of Malawian people.",
    },
  ];

  // Calculate how many cards to show based on screen size
  const getCardsToShow = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3; // lg screens
    if (window.innerWidth >= 768) return 2;  // md screens
    return 1; // sm screens
  };

  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      setCardsToShow(getCardsToShow());
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const maxIndex = features.length - cardsToShow;
        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, features.length, cardsToShow]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = features.length - cardsToShow;
      return prev >= maxIndex ? 0 : prev + 1;
    });
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const maxIndex = features.length - cardsToShow;
      return prev <= 0 ? maxIndex : prev - 1;
    });
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    const maxIndex = features.length - cardsToShow;
    setCurrentIndex(Math.min(index, maxIndex));
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-fixed transform scale-105"
        style={{ backgroundImage: "url('/assets/hero-bg.jpeg')" }}
      />
      
      {/* Enhanced overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
      
      {/* Main content container */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        
        {/* Hero content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-cream/10 backdrop-blur-sm rounded-full text-cream text-sm font-medium mb-6 border border-cream/20">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              The Warm Heart of Africa
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold mb-6 text-white leading-tight">
              Discover 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary"> Magical</span>
              <br />
              Memories
            </h1>
            
            {/* Subtitle */}
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 font-light max-w-3xl text-gray-200 leading-relaxed">
              Explore the untamed beauty of Malawi through unforgettable tours and authentic cultural experiences
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#tours"
                className="group inline-flex items-center bg-primary hover:bg-accent transition-all duration-500 text-white font-semibold px-8 py-4 rounded-full text-lg shadow-2xl hover:shadow-3xl transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto justify-center"
              >
                Explore Tours
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#about"
                className="inline-flex items-center bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 text-white font-medium px-8 py-4 rounded-full text-lg border border-white/30 hover:border-white/50 w-full sm:w-auto justify-center"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
        
        {/* Compact feature carousel footer */}
        <div className="relative backdrop-blur-md bg-gradient-to-t from-black/80 to-transparent py-4">
          {/* Compact header */}
          <div className="text-center mb-4">
            <h3 className="text-white text-lg font-serif font-semibold mb-1">
              Why Visit Malawi?
            </h3>
            <div className="w-12 h-0.5 bg-gradient-to-r from-accent to-primary mx-auto rounded-full"></div>
          </div>
          
          {/* Carousel container */}
          <div 
            className="relative overflow-hidden"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Cards container with smooth animation */}
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)`,
              }}
            >
              {features.map((item, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 px-2 sm:px-3"
                  style={{ width: `${100 / cardsToShow}%` }}
                >
                  <div className="group relative bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-xl p-4 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-xl border border-white/20 hover:border-white/40 h-full">
                    {/* Gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <div className="relative z-10 flex items-start space-x-3">
                      {/* Compact icon */}
                      <div className="flex-shrink-0 inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-accent to-primary rounded-lg text-white shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                        {item.icon}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-semibold text-white text-base mb-1 group-hover:text-cream transition-colors duration-300">
                          {item.title}
                        </h4>
                        <p className="text-gray-200 text-xs leading-relaxed group-hover:text-white transition-colors duration-300 line-clamp-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-full p-2 text-white transition-all duration-300 hover:scale-110 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-full p-2 text-white transition-all duration-300 hover:scale-110 z-10"
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          
          {/* Compact dot indicators */}
          <div className="flex justify-center mt-3 space-x-1">
            {Array.from({ length: Math.ceil(features.length / cardsToShow) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === Math.floor(currentIndex / cardsToShow) 
                    ? 'bg-accent w-4' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}