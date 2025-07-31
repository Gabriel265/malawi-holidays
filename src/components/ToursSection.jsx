// src/components/ToursSection.jsx

import { useState } from "react";
import Image from "next/image";
import { tourData } from "@/data/tour-data";

const categories = [...new Set(tourData.map(t => t.category))];
const durations = [...new Set(tourData.map(t => t.duration))];
const themes = [...new Set(tourData.map(t => t.theme))];

export default function ToursSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDuration, setSelectedDuration] = useState("All");
  const [selectedTheme, setSelectedTheme] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filteredTours = tourData.filter((tour) => {
    return (
      (selectedCategory === "All" || tour.category === selectedCategory) &&
      (selectedDuration === "All" || tour.duration === selectedDuration) &&
      (selectedTheme === "All" || tour.theme === selectedTheme)
    );
  });

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedDuration("All");
    setSelectedTheme("All");
  };

  const hasActiveFilters = selectedCategory !== "All" || selectedDuration !== "All" || selectedTheme !== "All";

  return (
    <section id="tours" className="py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4">
            Discover the Heart of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Malawi
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            From the shimmering shores of Lake Malawi to the majestic peaks of Mount Mulanje, 
            let us craft your perfect African adventure
          </p>
          <div className="mt-6 w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto rounded-full"></div>
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between bg-white border-2 border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            <span className="font-medium text-gray-700">
              {hasActiveFilters ? "Filters Applied" : "Filter Tours"}
            </span>
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              )}
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                  showFilters ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? "block" : "hidden"} md:block mb-8 md:mb-12`}>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 md:p-6 shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-6">
              {/* Category Filter */}
              <div className="flex-1 md:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2 md:hidden">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
                >
                  <option value="All">All Categories</option>
                  {categories.map((cat, i) => (
                    <option key={i} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Duration Filter */}
              <div className="flex-1 md:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2 md:hidden">
                  Duration
                </label>
                <select
                  value={selectedDuration}
                  onChange={(e) => setSelectedDuration(e.target.value)}
                  className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
                >
                  <option value="All">All Durations</option>
                  {durations.map((dur, i) => (
                    <option key={i} value={dur}>{dur}</option>
                  ))}
                </select>
              </div>

              {/* Theme Filter */}
              <div className="flex-1 md:flex-none">
                <label className="block text-sm font-medium text-gray-700 mb-2 md:hidden">
                  Theme
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full md:w-auto px-4 py-3 border-2 border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white text-gray-700"
                >
                  <option value="All">All Themes</option>
                  {themes.map((th, i) => (
                    <option key={i} value={th}>{th}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters Button */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="md:ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                {filteredTours.length === 0 
                  ? "No tours found" 
                  : `${filteredTours.length} tour${filteredTours.length !== 1 ? 's' : ''} available`}
              </p>
            </div>
          </div>
        </div>

        {/* Tour Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredTours.map((tour) => (
            <div
              key={tour.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-52 md:h-56 w-full overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100">
                  <svg className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg md:text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                    {tour.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    {tour.description.slice(0, 120)}...
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                      {tour.duration}
                    </span>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                      {tour.theme}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {tour.category}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto">
                  <a
                    href={`/tours/${tour.slug}`}
                    className="group/btn w-full inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-xl text-sm font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Explore This Adventure
                    <svg className="w-4 h-4 ml-2 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTours.length === 0 && (
          <div className="text-center py-12 md:py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-green-100 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              We couldn't find any tours matching your criteria. Try adjusting your filters or browse all our amazing destinations.
            </p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors duration-200"
            >
              View All Tours
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 md:mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Can't find what you're looking for?
            </h3>
            <p className="text-lg md:text-xl mb-6 opacity-90">
              Let us create a custom tour just for you! Our local experts are ready to craft your perfect Malawi experience.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
              Plan My Custom Tour
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
