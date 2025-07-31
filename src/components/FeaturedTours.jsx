import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Clock, Star, ArrowRight, Filter, Sparkles } from 'lucide-react';
import { tourData } from '../data/tour-data';

const filterOptions = ["Food", "Music", "Wellness", "Safari", "Culture"];

const FeaturedTours = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredTours = activeFilter === "All"
    ? tourData
    : tourData.filter(tour => tour.tags.includes(activeFilter));
  
  const highlightedTours = filteredTours.slice(0, 3);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <Sparkles className="w-2 h-2 text-yellow-300" />
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Header Section */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-white/90 text-sm font-medium">Discover Amazing Experiences</span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-yellow-200 to-purple-300 bg-clip-text text-transparent mb-6 leading-tight">
            Featured Tours
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Embark on extraordinary journeys crafted for the modern explorer
          </p>
        </div>

        {/* Advanced Filter System */}
        <div className={`flex flex-wrap justify-center gap-4 mb-16 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="flex items-center gap-3 p-1 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20">
            <Filter className="w-5 h-5 text-white/60 ml-4" />
            <button
              onClick={() => setActiveFilter("All")}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeFilter === "All"
                  ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400/30 transform scale-105"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              }`}
            >
              All Tours
            </button>
            {filterOptions.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeFilter === tag
                    ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-black shadow-lg shadow-yellow-400/30 transform scale-105"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
          {highlightedTours.map((tour, index) => (
            <div
              key={tour.id}
              className={`group relative transform transition-all duration-700 hover:scale-105 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
              }`}
              style={{ transitionDelay: `${500 + index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(tour.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className="relative h-[500px] rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Rating */}
                  {tour.rating && (
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-semibold text-sm">{tour.rating}</span>
                    </div>
                  )}

                  {/* Price Tag */}
                  {tour.price && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm">
                      ${tour.price}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 h-[236px] flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors duration-300">
                      {tour.title}
                    </h3>
                    <p className="text-white/70 mb-4 line-clamp-3 leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Tour Details */}
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-white/80">
                        <MapPin className="w-4 h-4 text-yellow-400" />
                        <span>{tour.category}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/80">
                        <Clock className="w-4 h-4 text-yellow-400" />
                        <span>{tour.duration}</span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="group/btn relative w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30 overflow-hidden"
                    >
                      <span className="relative z-10">Explore Tour</span>
                      <ArrowRight className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none ${
                  hoveredCard === tour.id ? 'opacity-100' : ''
                }`}></div>
              </div>

              {/* Floating Elements */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 rounded-3xl opacity-0 blur-xl transition-opacity duration-300 -z-10 ${
                hoveredCard === tour.id ? 'opacity-30' : ''
              }`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced See All Button */}
        <div className={`mt-20 text-center transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link
            href="/tours"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold text-lg transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">Discover All Adventures</span>
            <ArrowRight className="w-6 h-6 relative z-10 transition-transform duration-300 group-hover:translate-x-2" />
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;