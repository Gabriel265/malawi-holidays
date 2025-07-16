// pages/holidays/[slug].js
import { useRouter } from "next/router";
import Head from "next/head";
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import packageData from "@/data/package-data";

export default function HolidayPackageDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const pkg = packageData.find((p) => p.slug === slug);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getThemeEmoji = (theme) => {
    const emojis = {
      safari: "",
      honeymoon: "",
      family: "",
      adventure: "",
      cultural: "",
      relaxation: ""
    };
    return emojis[theme] || "";
  };

  const getThemeGradient = (theme) => {
    const gradients = {
      safari: "from-orange-500 to-red-600",
      honeymoon: "from-pink-500 to-rose-600",
      family: "from-green-500 to-emerald-600",
      adventure: "from-blue-500 to-indigo-600",
      cultural: "from-purple-500 to-violet-600",
      relaxation: "from-teal-500 to-cyan-600"
    };
    return gradients[theme] || "from-blue-500 to-purple-600";
  };

  if (!pkg) {
    return (
      <>
        <Header variant="default" />
        <main className="pt-32 min-h-screen flex flex-col items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <span className="text-2xl">🔍</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Package Not Found</h2>
            <p className="text-gray-600 mb-6">The package you're looking for doesn't exist or has been moved.</p>
            <Link href="/holidays">
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors">
                ← Back to Packages
              </button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  // Mock additional images for gallery (replace with actual data)
  const galleryImages = [
    pkg.coverImage,
    pkg.coverImage, // You would replace these with actual gallery images
    pkg.coverImage,
    pkg.coverImage
  ];

  return (
    <>
      <Head>
        <title>{pkg.title} | Malawi Holidays</title>
        <meta name="description" content={pkg.description?.substring(0, 160) || `Discover ${pkg.title} - ${pkg.duration} of unforgettable experiences in Malawi.`} />
        <meta property="og:title" content={`${pkg.title} | Malawi Holidays`} />
        <meta property="og:description" content={pkg.description?.substring(0, 160) || `Discover ${pkg.title} - ${pkg.duration} of unforgettable experiences in Malawi.`} />
        <meta property="og:image" content={pkg.coverImage} />
      </Head>
      
      <Header variant="default" />
      
      <main className="pt-28 pb-20">
        {/* Back Button */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <Link href="/holidays">
            <button className="group inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Back to Packages</span>
            </button>
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            {/* Image Gallery */}
            <div className="relative rounded-2xl overflow-hidden mb-8 shadow-2xl">
              <div className="relative h-64 sm:h-80 lg:h-96">
                <Image
                  src={galleryImages[activeImageIndex]}
                  alt={pkg.title}
                  fill
                  className={`object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                  onLoad={() => setImageLoaded(true)}
                  priority
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Theme Badge */}
                <div className="absolute top-6 left-6">
                  <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium bg-gradient-to-r ${getThemeGradient(pkg.theme)} shadow-lg backdrop-blur-sm`}>
                    <span className="text-lg">{getThemeEmoji(pkg.theme)}</span>
                    <span className="capitalize">{pkg.theme}</span>
                  </span>
                </div>
                
                {/* Duration Badge */}
                <div className="absolute top-6 right-6">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium bg-black/50 backdrop-blur-sm">
                    <span>⏱️</span>
                    {pkg.duration}
                  </span>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-2 leading-tight">
                    {pkg.title}
                  </h1>
                  <p className="text-lg text-white/90 font-medium">
                    Starting from <span className="text-2xl font-bold">{pkg.price}</span>
                  </p>
                </div>
              </div>

              {/* Gallery Navigation */}
              {galleryImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                  <div className="flex gap-2">
                    {galleryImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-200 ${
                          index === activeImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Package Overview */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-1000 delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span></span>
                  Package Highlights
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {pkg.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <span></span>
                  About This Experience
                </h2>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {pkg.description || "This carefully crafted package offers an unforgettable journey through the heart of Malawi, combining adventure, culture, and relaxation in perfect harmony. Our expert local guides will ensure you experience the very best of what this beautiful country has to offer."}
                  </p>
                </div>
              </div>

              {/* Features Grid */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-1000 delay-400 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <span></span>
                  What's Included
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <span className="text-green-600">✅</span>
                    <span className="text-gray-700">Expert Local Guide</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <span className="text-blue-600">✅</span>
                    <span className="text-gray-700">Transportation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <span className="text-purple-600">✅</span>
                    <span className="text-gray-700">Accommodation</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <span className="text-orange-600">✅</span>
                    <span className="text-gray-700">Meals Included</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                    <span className="text-pink-600">✅</span>
                    <span className="text-gray-700">Activities</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                    <span className="text-teal-600">✅</span>
                    <span className="text-gray-700">24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Booking Card */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="text-center mb-6">
                  <div className="text-sm text-gray-500 mb-1">Starting from</div>
                  <div className="text-3xl font-bold text-primary mb-2">{pkg.price}</div>
                  <div className="text-sm text-gray-600">per person</div>
                </div>
                
                <div className="space-y-4">
                  <a
                    href="/contact"
                    className={`w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${getThemeGradient(pkg.theme)} text-white px-6 py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all duration-200 hover:scale-105`}
                  >
                    <span></span>
                    Book This Package
                  </a>
                  
                  <a
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:border-primary hover:text-primary transition-colors duration-200"
                  >
                    <span>💬</span>
                    Get Custom Quote
                  </a>
                </div>
              </div>

              {/* Quick Info */}
              <div className={`bg-white rounded-2xl p-6 shadow-lg transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-600">⏱️</span>
                    <div>
                      <span className="font-medium text-gray-900">Duration</span>
                      <div className="text-sm text-gray-600">{pkg.duration}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600">🎯</span>
                    <div>
                      <span className="font-medium text-gray-900">Theme</span>
                      <div className="text-sm text-gray-600 capitalize">{pkg.theme}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-purple-600">📍</span>
                    <div>
                      <span className="font-medium text-gray-900">Location</span>
                      <div className="text-sm text-gray-600">Malawi</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-orange-600">👥</span>
                    <div>
                      <span className="font-medium text-gray-900">Group Size</span>
                      <div className="text-sm text-gray-600">2-12 people</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className={`bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 transform transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span>📞</span>
                    <span className="text-gray-600">Call us for instant support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>💌</span>
                    <span className="text-gray-600">Email for detailed inquiries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🕐</span>
                    <span className="text-gray-600">Available 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Packages */}
          <div className={`mt-16 transform transition-all duration-1000 delay-800 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              You Might Also Like
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packageData
                .filter(p => p.id !== pkg.id)
                .slice(0, 3)
                .map((relatedPkg) => (
                  <Link key={relatedPkg.id} href={`/holidays/${relatedPkg.slug}`}>
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                      <div className="relative h-48">
                        <Image
                          src={relatedPkg.coverImage}
                          alt={relatedPkg.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1">
                          {relatedPkg.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">{relatedPkg.duration}</p>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-primary">{relatedPkg.price}</span>
                          <span className="text-sm text-gray-500">View Details →</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}