// components/Gallery.jsx
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { GalleryData } from "@/data/gallery-data";
import { X, Share2, ChevronLeft, ChevronRight, Download, Heart, Grid, Square } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [gridLayout, setGridLayout] = useState("masonry"); // masonry, uniform, featured

  const filteredImages = selectedCategory === "All"
    ? GalleryData
    : GalleryData.filter(img => img.category === selectedCategory);

  const categories = [
    "All", "Landscapes", "Wildlife", "Food", 
    "People & Culture", "Festivals", "Iconic Landmarks"
  ];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      switch (e.key) {
        case 'Escape':
          setSelectedImage(null);
          break;
        case 'ArrowLeft':
          navigateImage(-1);
          break;
        case 'ArrowRight':
          navigateImage(1);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, currentImageIndex]);

  // Navigate between images
  const navigateImage = useCallback((direction) => {
    const newIndex = currentImageIndex + direction;
    if (newIndex >= 0 && newIndex < filteredImages.length) {
      setCurrentImageIndex(newIndex);
      setSelectedImage(filteredImages[newIndex]);
    }
  }, [currentImageIndex, filteredImages]);

  // Open image in lightbox
  const openImage = (img, index) => {
    setSelectedImage(img);
    setCurrentImageIndex(index);
  };

  // Toggle favorite
  const toggleFavorite = (index) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(index)) {
        newFavorites.delete(index);
      } else {
        newFavorites.add(index);
      }
      return newFavorites;
    });
  };

  // Download image
  const downloadImage = (src, title) => {
    const link = document.createElement('a');
    link.href = src;
    link.download = `${title.replace(/\s+/g, '_')}.jpg`;
    link.click();
  };

  // Share functionality
  const shareImage = async (img) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: img.title,
          text: `Check out this amazing photo from Malawi: ${img.title}`,
          url: img.src
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(img.src)}`,
        '_blank'
      );
    }
  };

  // Get grid item class based on layout and index
  const getGridItemClass = (index, totalImages) => {
    if (gridLayout === "masonry") {
      // Dynamic masonry patterns that work with any number of images
      const patterns = [
        "col-span-1 row-span-1 sm:col-span-2 sm:row-span-2", // Large feature every 8th
        "col-span-1 row-span-1", // Regular
        "col-span-1 row-span-1 sm:row-span-2", // Tall every 3rd
        "col-span-1 row-span-1 sm:col-span-2", // Wide every 5th
        "col-span-1 row-span-1", // Regular
        "col-span-1 row-span-1", // Regular
        "col-span-1 row-span-1 sm:col-span-2", // Wide
        "col-span-1 row-span-1 sm:row-span-2", // Tall
      ];
      return patterns[index % patterns.length];
    } else if (gridLayout === "featured") {
      // Featured layout with dynamic sizing
      if (totalImages === 1) return "col-span-full row-span-2";
      if (index === 0 && totalImages > 4) return "col-span-1 sm:col-span-2 lg:col-span-3 row-span-2";
      if (index === 0 && totalImages <= 4) return "col-span-1 sm:col-span-2 row-span-2";
      return "col-span-1 row-span-1";
    }
    return "col-span-1 row-span-1";
  };

  const getImageAspectClass = (index, totalImages) => {
    if (gridLayout === "masonry") {
      // Dynamic aspect ratios for visual variety
      const patterns = [
        "aspect-square", // Large feature
        "aspect-[4/3]", // Regular
        "aspect-[3/4]", // Tall
        "aspect-[3/2]", // Wide
        "aspect-square", // Square
        "aspect-[4/3]", // Regular
        "aspect-[3/2]", // Wide
        "aspect-[3/4]", // Tall
      ];
      return patterns[index % patterns.length];
    } else if (gridLayout === "featured") {
      if (totalImages === 1) return "aspect-[3/2]";
      if (index === 0) return "aspect-[3/2]";
      return "aspect-square";
    }
    return "aspect-square";
  };

  // Get dynamic grid container class
  const getGridContainerClass = () => {
    const imageCount = filteredImages.length;
    
    if (gridLayout === "masonry") {
      // Responsive masonry grid
      return `grid gap-3 sm:gap-4 lg:gap-6 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        auto-rows-[200px] sm:auto-rows-[250px] lg:auto-rows-[300px]`;
    } else if (gridLayout === "featured") {
      // Featured layout adapts to image count
      if (imageCount <= 2) return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 auto-rows-[250px]";
      if (imageCount <= 6) return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px]";
      return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[200px]";
    }
    
    // Uniform grid adapts to image count
    if (imageCount <= 2) return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 auto-rows-[250px]";
    if (imageCount <= 4) return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 auto-rows-[250px]";
    if (imageCount <= 9) return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[250px]";
    return "grid gap-3 sm:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[250px]";
  };

  return (
    <section id="gallery" className="relative py-8 sm:py-12 lg:py-16 bg-[#f9f5f0] text-[#1a1a1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold mb-2 sm:mb-3 text-[#1a1a1a]">
            Explore Malawi
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-[#1a1a1a]/70 max-w-2xl mx-auto">
            Captivating images of the warm heart of Africa
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 sm:mb-8">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border-2 transition-all duration-300 whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-[#9e1b1b] text-white border-[#9e1b1b] shadow-lg shadow-[#9e1b1b]/30"
                    : "bg-white text-[#1a1a1a] border-[#1a1a1a]/20 hover:bg-[#c54d42] hover:text-white hover:border-[#c54d42]"
                }`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setIsLoading(true);
                  setTimeout(() => setIsLoading(false), 300);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center gap-2 bg-white rounded-full p-1 shadow-md">
            <button
              onClick={() => setGridLayout("masonry")}
              className={`p-2 rounded-full transition-all duration-200 ${
                gridLayout === "masonry" 
                  ? "bg-[#9e1b1b] text-white shadow-sm" 
                  : "text-[#1a1a1a] hover:bg-[#f9f5f0]"
              }`}
              title="Masonry Layout"
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setGridLayout("featured")}
              className={`p-2 rounded-full transition-all duration-200 ${
                gridLayout === "featured" 
                  ? "bg-[#9e1b1b] text-white shadow-sm" 
                  : "text-[#1a1a1a] hover:bg-[#f9f5f0]"
              }`}
              title="Featured Layout"
            >
              <Square size={16} />
            </button>
            <button
              onClick={() => setGridLayout("uniform")}
              className={`p-2 rounded-full transition-all duration-200 ${
                gridLayout === "uniform" 
                  ? "bg-[#9e1b1b] text-white shadow-sm" 
                  : "text-[#1a1a1a] hover:bg-[#f9f5f0]"
              }`}
              title="Uniform Grid"
            >
              <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
                <div className="bg-current rounded-sm"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9e1b1b]"></div>
          </div>
        )}

        {/* Image Grid */}
        <div className={`${getGridContainerClass()} transition-all duration-500 ${
          isLoading ? 'opacity-50' : 'opacity-100'
        }`}>
          {filteredImages.map((img, idx) => (
            <div
              key={`${selectedCategory}-${idx}`}
              className={`relative group cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${getGridItemClass(idx, filteredImages.length)}`}
              onClick={() => openImage(img, idx)}
            >
              <div className={`relative ${getImageAspectClass(idx, filteredImages.length)} w-full h-full`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(idx);
                  }}
                  className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg"
                >
                  <Heart
                    size={16}
                    className={favorites.has(idx) ? 'fill-[#9e1b1b] text-[#9e1b1b]' : 'text-[#1a1a1a]'}
                  />
                </button>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-[#9e1b1b] text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.category}
                </div>
              </div>
              
              {/* Title */}
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-sm sm:text-base font-semibold mb-1 line-clamp-2">{img.title}</h3>
                {img.location && (
                  <p className="text-xs text-white/80 line-clamp-1">{img.location}</p>
                )}
              </div>

              {/* Hover Actions */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      shareImage(img);
                    }}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all duration-200"
                  >
                    <Share2 size={16} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadImage(img.src, img.title);
                    }}
                    className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white transition-all duration-200"
                  >
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredImages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="bg-white rounded-xl p-8 shadow-lg max-w-md mx-auto">
              <p className="text-[#1a1a1a]/70 text-lg mb-2">No images found</p>
              <p className="text-[#1a1a1a]/50 text-sm">Try selecting a different category</p>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-[#1a1a1a]/95 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="relative w-full h-full max-w-6xl mx-auto flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 text-white bg-gradient-to-b from-[#1a1a1a]/50 to-transparent">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg sm:text-xl font-semibold truncate">
                    {selectedImage.title}
                  </h3>
                  <span className="text-sm text-white/70 hidden sm:block">
                    {currentImageIndex + 1} of {filteredImages.length}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => downloadImage(selectedImage.src, selectedImage.title)}
                    className="p-2 rounded-full bg-white/10 hover:bg-[#9e1b1b] transition-colors"
                    title="Download"
                  >
                    <Download size={18} />
                  </button>
                  <button
                    onClick={() => shareImage(selectedImage)}
                    className="p-2 rounded-full bg-white/10 hover:bg-[#9e1b1b] transition-colors"
                    title="Share"
                  >
                    <Share2 size={18} />
                  </button>
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-[#c54d42] transition-colors"
                    title="Close"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Image Container */}
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 pb-4 sm:pb-6">
                <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
                  {/* Navigation Buttons */}
                  {currentImageIndex > 0 && (
                    <button
                      onClick={() => navigateImage(-1)}
                      className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-[#9e1b1b] hover:bg-[#c54d42] text-white transition-colors shadow-lg"
                    >
                      <ChevronLeft size={20} />
                    </button>
                  )}
                  
                  {currentImageIndex < filteredImages.length - 1 && (
                    <button
                      onClick={() => navigateImage(1)}
                      className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-[#9e1b1b] hover:bg-[#c54d42] text-white transition-colors shadow-lg"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}

                  {/* Main Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedImage.src}
                      alt={selectedImage.alt}
                      fill
                      sizes="100vw"
                      className="object-contain rounded-lg"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Dots */}
              <div className="flex justify-center gap-2 pb-4 sm:hidden">
                {filteredImages.slice(0, 10).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => openImage(filteredImages[idx], idx)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === currentImageIndex ? 'bg-[#9e1b1b]' : 'bg-white/30'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-2xl mx-auto shadow-lg border border-[#1a1a1a]/10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#9e1b1b] rounded-full flex items-center justify-center">
                <span className="text-2xl">📸</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1a1a1a]">
                Share your Malawi moments
              </h3>
            </div>
            <p className="text-sm sm:text-base text-[#1a1a1a]/70 mb-4">
              Tag your photos with <span className="text-[#9e1b1b] font-semibold">#VisitMalawi</span> and inspire others to explore the warm heart of Africa
            </p>
            <button className="bg-[#9e1b1b] hover:bg-[#c54d42] text-white px-6 py-3 rounded-full font-medium transition-colors duration-200 shadow-lg">
              Upload Your Photo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}