import { useState } from "react";
import accommodations from "@/data/accommodations-data";
import HolidayFlyerUI from "@/components/HolidayFlyerUI";
import Header from "@/components/Header";
import { Search, Filter, MapPin, Star, Heart, X, Plus } from "lucide-react";

export default function Hotels() {
  const [selected, setSelected] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);

  const filteredAccommodations = accommodations
    .filter(acc => 
      acc.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.address?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return (a.price || 0) - (b.price || 0);
        case "price-high":
          return (b.price || 0) - (a.price || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return (a.name || '').localeCompare(b.name || '');
      }
    });

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) {
      newFavorites.delete(id);
    } else {
      newFavorites.add(id);
    }
    setFavorites(newFavorites);
  };

  const handleAddToCart = (accommodation) => {
    console.log("Add to cart:", accommodation.id);
    // Add real cart logic here
    setSelected(null);
  };

  return (
    <>
      <Header variant="default" />
      <main className="pt-20 sm:pt-28 px-4 max-w-7xl mx-auto pb-16">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Featured Accommodations
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto px-4">
            Discover amazing places to stay for your next adventure
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search accommodations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <input type="range" min="0" max="500" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <select className="w-full px-3 py-2 border border-gray-200 rounded-lg">
                    <option value="">Any Rating</option>
                    <option value="4">4+ Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                <div className="sm:col-span-2 lg:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
                  <div className="space-y-1">
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Free WiFi</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="mr-2" />
                      <span className="text-sm">Parking</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-gray-600 text-sm sm:text-base">
            {filteredAccommodations.length} accommodation{filteredAccommodations.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Accommodations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredAccommodations.map((acc) => (
            <div
              key={acc.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelected(acc)}
            >
              <div className="relative">
                <img 
                  src={acc.image} 
                  alt={acc.name} 
                  className="h-48 sm:h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => toggleFavorite(acc.id, e)}
                    className="bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow"
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors ${
                        favorites.has(acc.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`} 
                    />
                  </button>
                </div>
                {acc.price && (
                  <div className="absolute bottom-3 left-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md">
                    <span className="text-sm font-semibold text-green-600">${acc.price}/night</span>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {acc.rating && (
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < acc.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        fill="currentColor"
                      />
                    ))}
                    {acc.reviews && (
                      <span className="ml-1 text-xs text-gray-500">({acc.reviews})</span>
                    )}
                  </div>
                )}
                
                <h2 className="font-semibold text-lg text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                  {acc.name}
                </h2>
                
                <div className="flex items-start text-gray-600 mb-3">
                  <MapPin className="w-4 h-4 mr-1 mt-0.5 flex-shrink-0" />
                  <p className="text-sm line-clamp-2">{acc.address}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(acc);
                    }}
                    className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span className="hidden sm:inline">Add to Cart</span>
                    <span className="sm:hidden">Add</span>
                  </button>
                  <button
                    onClick={() => setSelected(acc)}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredAccommodations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No accommodations found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}

        {/* Modal */}
        {selected && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelected(null)}
          >
            <div 
              className="bg-white rounded-xl overflow-hidden w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl max-h-[95vh] overflow-y-auto relative my-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>

              <HolidayFlyerUI data={selected} />
              
              <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 p-4 sm:p-6 border-t bg-gray-50">
                <button
                  onClick={() => setSelected(null)}
                  className="px-6 py-2 text-gray-700 hover:text-red-600 transition-colors order-2 sm:order-1"
                >
                  Close
                </button>
                
                <div className="flex items-center gap-3 order-1 sm:order-2">
                  <button
                    onClick={() => toggleFavorite(selected.id, { stopPropagation: () => {} })}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        favorites.has(selected.id) ? 'text-red-500 fill-current' : 'text-gray-400'
                      }`} 
                    />
                    <span className="hidden sm:inline">
                      {favorites.has(selected.id) ? 'Saved' : 'Save'}
                    </span>
                  </button>
                  
                  <button
                    onClick={() => handleAddToCart(selected)}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-colors flex items-center gap-2 flex-1 sm:flex-none justify-center"
                  >
                    <Plus className="w-4 h-4" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}