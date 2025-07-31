import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import packageData from '../data/package-data';

const FeaturedHolidays = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-block px-4 py-2 bg-yellow-400/10 rounded-full mb-4">
            <span className="text-yellow-600 font-medium text-sm uppercase tracking-wide">
              Discover Amazing Destinations
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured
            <span className="text-yellow-400 ml-2">Holidays</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handpicked experiences that will create memories to last a lifetime
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {packageData.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 lg:h-56 overflow-hidden">
                <Image
                  src={pkg.coverImage}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold text-sm shadow-lg">
                  {pkg.price}
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                  📅 {pkg.duration}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 sm:p-7">
                <h3 className="text-xl sm:text-2xl font-bold mb-3 text-gray-900 group-hover:text-yellow-600 transition-colors duration-300">
                  {pkg.title}
                </h3>
                
                {/* Highlights */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {pkg.highlights.slice(0, 3).map((point, i) => (
                      <li key={i} className="flex items-start text-gray-600 text-sm">
                        <span className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0" />
                        <span className="leading-relaxed">{point}</span>
                      </li>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <li className="text-yellow-600 text-sm font-medium">
                        +{pkg.highlights.length - 3} more highlights
                      </li>
                    )}
                  </ul>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/holidays/${pkg.slug}`}
                  className="group/btn block w-full"
                >
                  <div className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-yellow-400 hover:to-yellow-500 text-white hover:text-gray-900 px-6 py-4 rounded-xl font-semibold text-center transition-all duration-300 transform group-hover/btn:scale-105 shadow-lg hover:shadow-xl">
                    <span className="flex items-center justify-center">
                      View Details
                      <svg 
                        className="w-5 h-5 ml-2 transition-transform group-hover/btn:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>

              {/* Bottom Accent Line */}
              <div className="h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 lg:mt-16">
          <Link
            href="/holidays"
            className="inline-flex items-center px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore All Holidays
            <svg 
              className="w-5 h-5 ml-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedHolidays;