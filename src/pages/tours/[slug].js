/* eslint-disable react/no-unescaped-entities */

import { useRouter } from "next/router";
import { useState } from "react";
import { tourData } from "@/data/tour-data";
import Image from "next/image";
import Head from "next/head";

export default function TourDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showBookingModal, setShowBookingModal] = useState(false);
  
  const tour = tourData.find((t) => t.slug === slug);
  
  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  // Mock additional images for gallery (you can replace with actual tour images)
  const tourImages = [
    tour.image,
    tour.image, // Replace with actual additional images
    tour.image,
    tour.image
  ];

  const relatedTours = tourData
    .filter(t => t.id !== tour.id && (t.category === tour.category || t.theme === tour.theme))
    .slice(0, 3);

  const handleBookNow = () => {
    setShowBookingModal(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: tour.title,
        text: tour.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <Head>
        <title>{tour.title} | Malawi Holidays</title>
        <meta name="description" content={tour.description} />
        <meta property="og:title" content={`${tour.title} | Malawi Holidays`} />
        <meta property="og:description" content={tour.description} />
        <meta property="og:image" content={tour.image} />
      </Head>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 bg-gradient-to-br from-blue-900 via-blue-800 to-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white">
            <div className="mb-6">
              <button
                onClick={() => router.back()}
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 mb-4"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Tours
              </button>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight">
              {tour.title}
            </h1>
            
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              {tour.description}
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {tour.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {tour.theme}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                {tour.category}
              </span>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleBookNow}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book This Adventure
              </button>
              <button
                onClick={handleShare}
                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all duration-200"
              >
                Share Tour
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            {/* Left Column - Images & Gallery */}
            <div className="lg:col-span-2 mb-12 lg:mb-0">
              {/* Main Image */}
              <div className="relative h-64 sm:h-80 md:h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden mb-6 shadow-xl">
                <Image
                  src={tourImages[selectedImageIndex]}
                  alt={tour.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Image Gallery Thumbnails */}
              <div className="grid grid-cols-4 gap-3 mb-8">
                {tourImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-20 sm:h-24 rounded-xl overflow-hidden transition-all duration-200 ${
                      selectedImageIndex === index
                        ? 'ring-4 ring-blue-500 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${tour.title} ${index + 1}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  </button>
                ))}
              </div>

              {/* Tour Description */}
              <div className="prose max-w-none">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  About This Experience
                </h2>
                <div className="text-gray-700 leading-relaxed text-base md:text-lg">
                  <p className="mb-6">
                    {tour.longDescription || tour.description}
                  </p>
                  
                  {/* Mock additional content sections */}
                  <div className="grid sm:grid-cols-2 gap-6 mt-8">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h3 className="font-bold text-blue-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        What's Included
                      </h3>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Professional tour guide</li>
                        <li>• Transportation</li>
                        <li>• Entrance fees</li>
                        <li>• Refreshments</li>
                      </ul>
                    </div>
                    
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h3 className="font-bold text-green-900 mb-3 flex items-center">
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Best Time to Visit
                      </h3>
                      <p className="text-sm text-green-800">
                        May to October offers the best weather conditions for this adventure, with clear skies and comfortable temperatures.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Booking Card */}
                <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 shadow-lg mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Book Your Adventure</h3>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-semibold">{tour.duration}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-semibold">{tour.category}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Theme:</span>
                      <span className="font-semibold">{tour.theme}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleBookNow}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl mb-4"
                  >
                    Book Now
                  </button>
                  
                  <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200">
                    Get Quote
                  </button>
                </div>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    Our local experts are here to help you plan the perfect Malawi adventure.
                  </p>
                  <div className="space-y-3">
                    <a
                      href="tel:+265123456789"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Call Us
                    </a>
                    <a
                      href="mailto:info@malawihholidays.com"
                      className="flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tours */}
      {relatedTours.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 text-gray-900">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedTours.map((relatedTour) => (
                <div
                  key={relatedTour.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full">
                    <Image
                      src={relatedTour.image}
                      alt={relatedTour.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2 text-gray-900">
                      {relatedTour.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {relatedTour.description.slice(0, 100)}...
                    </p>
                    <a
                      href={`/tours/${relatedTour.slug}`}
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Book Your Adventure</h3>
            <p className="text-gray-600 mb-6">
              Ready to explore {tour.title}? Fill out the form below and we'll get back to you soon!
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                type="tel"
                placeholder="Your Phone"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <textarea
                placeholder="Any special requests or questions?"
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  Send Request
                </button>
                <button
                  type="button"
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}