"use client";
import { useState } from "react";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import carHireData from "@/data/carhire-data";
import { Car, Users, Star, MapPin, Phone, Mail, X, Filter, Grid, List, ChevronDown, Heart, Share2 } from "lucide-react";

export default function CarHire() {
  const [selectedCar, setSelectedCar] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [likedCars, setLikedCars] = useState(new Set());
  const [sortBy, setSortBy] = useState('name');

  const toggleLike = (carId, e) => {
    e.stopPropagation();
    const newLiked = new Set(likedCars);
    if (newLiked.has(carId)) {
      newLiked.delete(carId);
    } else {
      newLiked.add(carId);
    }
    setLikedCars(newLiked);
  };

  const sortedCars = [...carHireData].sort((a, b) => {
    if (sortBy === 'price') {
      const priceA = parseFloat(a.pricePerDay.replace(/[^0-9.]/g, ''));
      const priceB = parseFloat(b.pricePerDay.replace(/[^0-9.]/g, ''));
      return priceA - priceB;
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <>
      <Header variant="default" />
      
      {/* Hero Section */}
      <div className="relative pt-28 pb-16 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>
        
        <div className="relative px-4 max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white/90 mb-6">
            <Car className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Car Rentals</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
            Car Hire in <span className="text-yellow-400">Malawi</span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover Malawi with our premium fleet. Reliable, comfortable vehicles for city exploration or safari adventures. 
            Complete with airport pickup, comprehensive insurance, and 24/7 roadside support.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Airport Pickup</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4" />
              <span>Fully Insured</span>
            </div>
          </div>
        </div>
      </div>

      <main className="px-4 max-w-7xl mx-auto pb-16 -mt-8 relative z-10">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </button>
              
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Prices</option>
                    <option>Under $50</option>
                    <option>$50 - $100</option>
                    <option>Over $100</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All Types</option>
                    <option>SUV</option>
                    <option>Sedan</option>
                    <option>Hatchback</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All</option>
                    <option>Automatic</option>
                    <option>Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>All</option>
                    <option>2-4 Seats</option>
                    <option>5-7 Seats</option>
                    <option>8+ Seats</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Car Grid/List */}
        <div className={`${viewMode === 'grid' ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}`}>
          {sortedCars.map((car) => (
            <div
              key={car.id}
              className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1 ${viewMode === 'list' ? 'flex' : ''}`}
              onClick={() => setSelectedCar(car)}
            >
              <div className={`relative ${viewMode === 'list' ? 'w-80 flex-shrink-0' : ''}`}>
                <Image
                  src={car.image}
                  alt={car.name}
                  width={600}
                  height={400}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${viewMode === 'list' ? 'h-full' : 'h-56'}`}
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={(e) => toggleLike(car.id, e)}
                    className={`p-2 rounded-full backdrop-blur-sm transition-colors ${likedCars.has(car.id) ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'}`}
                  >
                    <Heart className={`w-4 h-4 ${likedCars.has(car.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Available
                  </span>
                </div>
              </div>
              
              <div className={`p-6 flex-1 ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {car.name}
                    </h2>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm text-gray-600">4.8</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {car.description}
                  </p>
                  
                  {car.features && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {car.features.slice(0, 3).map((feature, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                      {car.features.length > 3 && (
                        <span className="text-blue-600 text-sm font-medium">
                          +{car.features.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <span className="text-3xl font-bold text-blue-600">{car.pricePerDay}</span>
                    <span className="text-gray-500 ml-1">/ day</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCar(car);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Enhanced Modal */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <Image
                src={selectedCar.image}
                alt={selectedCar.name}
                width={800}
                height={500}
                className="w-full h-72 object-cover rounded-t-3xl"
              />
              <button
                onClick={() => setSelectedCar(null)}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-lg"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Available Now
                </span>
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Free Pickup
                </span>
              </div>
            </div>
            
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{selectedCar.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-500" />
                      <span>4.8 (124 reviews)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>Lilongwe, Malawi</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold text-blue-600">{selectedCar.pricePerDay}</div>
                  <div className="text-gray-500">per day</div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                {selectedCar.description}
              </p>
              
              {selectedCar.features && (
                <div className="mb-8">
                  <h4 className="text-xl font-semibold mb-4">Features & Amenities</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedCar.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                <h4 className="text-lg font-semibold mb-4">What&apos;s Included</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Airport Pickup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Full Insurance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>GPS Navigation</span>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button 
                  onClick={() => setSelectedCar(null)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-4 rounded-2xl font-semibold transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black py-4 rounded-2xl font-bold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}