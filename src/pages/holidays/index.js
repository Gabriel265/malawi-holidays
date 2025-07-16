/* eslint-disable react/no-unescaped-entities */

import packageData from "@/data/package-data";
import Header from "@/components/Header";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

const themes = ["all", "safari", "honeymoon", "family"];

export default function HolidayPackages() {
  const [filter, setFilter] = useState("all");
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const filteredPackages =
    filter === "all"
      ? packageData
      : packageData.filter((pkg) => pkg.theme === filter);

  const getThemeEmoji = (theme) => {
    const emojis = {
      all: "",
      safari: "",
      honeymoon: "",
      family: ""
    };
    return emojis[theme] || "";
  };

  const getThemeGradient = (theme) => {
    const gradients = {
      all: "from-blue-500 to-purple-600",
      safari: "from-orange-500 to-red-600",
      honeymoon: "from-pink-500 to-rose-600",
      family: "from-green-500 to-emerald-600"
    };
    return gradients[theme] || "from-blue-500 to-purple-600";
  };

  return (
    <>
      <Header variant="default" />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-purple-100/50"></div>
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e0e7ff' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 shadow-lg">
              <span className="text-2xl">✈️</span>
              <span className="text-sm font-medium text-gray-700">Discover Malawi's Hidden Gems</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold mb-6 text-gray-900 leading-tight">
              Explore Our
              <span className="block bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Holiday Packages
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you're seeking a romantic retreat, thrilling safari adventure, or unforgettable family memories—Malawi offers something truly magical for everyone.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Expert Local Guides</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Sustainable Tourism</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
                <span>Customizable Experiences</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Enhanced Filters */}
        <div className="mb-12 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Filter by Experience</h2>
              <div className="text-sm text-gray-500">
                {filteredPackages.length} package{filteredPackages.length !== 1 ? 's' : ''} found
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:flex sm:justify-center gap-3">
              {themes.map((theme) => (
                <button
                  key={theme}
                  onClick={() => setFilter(theme)}
                  className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 ${
                    filter === theme
                      ? `bg-gradient-to-r ${getThemeGradient(theme)} text-white shadow-lg`
                      : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">{getThemeEmoji(theme)}</span>
                    <span className="capitalize">{theme}</span>
                  </span>
                  
                  {filter === theme && (
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/20 to-white/5 pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Package Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredPackages.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`
              }}
              onMouseEnter={() => setHoveredCard(pkg.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <Image
                  src={pkg.coverImage}
                  alt={pkg.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Theme Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-r ${getThemeGradient(pkg.theme)} shadow-lg`}>
                    {getThemeEmoji(pkg.theme)}
                    <span className="capitalize">{pkg.theme}</span>
                  </span>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white bg-black/50 backdrop-blur-sm">
                    <span>⏱️</span>
                    {pkg.duration}
                  </span>
                </div>
                
                {/* Hover Content */}
                <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                  hoveredCard === pkg.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Link href={`/holidays/${pkg.slug}`}>
                    <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                      View Details →
                    </button>
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/holidays/${pkg.slug}`}>
                  <h3 className="font-serif font-bold text-xl mb-3 text-gray-900 hover:text-primary transition-colors duration-200 line-clamp-2">
                    {pkg.title}
                  </h3>
                </Link>
                
                {/* Highlights */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">✨ Highlights</h4>
                  <div className="space-y-1">
                    {pkg.highlights.slice(0, 3).map((highlight, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Starting from</span>
                    <span className="font-bold text-xl text-primary">{pkg.price}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    <a
                      href="/contact"
                      className="inline-flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary-dark transition-all duration-200 hover:shadow-lg text-sm"
                    >
                      <span>📧</span>
                      Enquire
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No packages found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to see more options.</p>
            <button
              onClick={() => setFilter("all")}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors"
            >
              Show All Packages
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Let us create a custom package tailored just for you and your travel dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <span>💬</span>
              Get Custom Quote
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3 rounded-lg font-medium hover:bg-white/10 transition-all duration-200"
            >
              <span>ℹ️</span>
              Learn More
            </a>
          </div>
        </div>
      </main>
    </>
  );
}