import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({ variant = "transparent" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to close mobile menu
  const closeMobileMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
  };

  // When to show transparent vs solid
  const isTransparent = variant === "transparent" && !scrolled;
  const baseTextColor = isTransparent ? "text-white" : "text-gray-800";
  const headerBg = isTransparent
    ? "bg-transparent border-b border-white/20 backdrop-blur-md"
    : "bg-white/95 border-b border-gray-200 backdrop-blur-lg shadow-lg";

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${headerBg}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 order-2 md:order-1">
          <Image
            src="/assets/logo.jpg"
            alt="Malawi Holidays Logo"
            width={scrolled ? 40 : 48}
            height={scrolled ? 40 : 48}
            className="rounded-full transition-all duration-300 shadow-md"
          />
          <span
            className={`font-serif font-bold transition-all duration-300 ${
              scrolled ? "text-gray-800 text-lg" : isTransparent ? "text-white text-xl" : "text-gray-800 text-xl"
            } hidden sm:inline`}
          >
            Malawi Holidays
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link 
            href="/" 
            className={`font-medium transition-all duration-300 hover:text-blue-600 ${baseTextColor}`}
          >
            Home
          </Link>
          <Link 
            href="/tours" 
            className={`font-medium transition-all duration-300 hover:text-blue-600 ${baseTextColor}`}
          >
            Tours
          </Link>

          {/* Dropdown for Services */}
          <div className="relative group">
            <button
              className={`flex items-center gap-1 font-medium transition-all duration-300 hover:text-blue-600 ${baseTextColor}`}
            >
              Services 
              <ChevronDown 
                size={16} 
                className="transition-transform duration-300 group-hover:rotate-180" 
              />
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute left-0 top-full mt-2 bg-white text-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-56 z-50 border border-gray-100">
              <div className="py-2">
                <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                  Our Services
                </div>
                <Link 
                  href="/holidays" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="font-medium">Holiday Packages</span>
                </Link>
                <Link 
                  href="/services" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="font-medium">All</span>
                </Link>
                <Link 
                  href="/services/hotels" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="font-medium">Hotels</span>
                </Link>
                <Link 
                  href="/services/car-hire" 
                  className="flex items-center px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  <span className="font-medium">Car Hire</span>
                </Link>
              </div>
            </div>
          </div>

          <Link 
            href="/gallery" 
            className={`font-medium transition-all duration-300 hover:text-blue-600 ${baseTextColor}`}
          >
            Gallery
          </Link>
          <Link 
            href="/about" 
            className={`font-medium transition-all duration-300 hover:text-blue-600 ${baseTextColor}`}
          >
            About
          </Link>
          <Link 
            href="/contact" 
            className={`font-medium transition-all duration-300 hover:text-blue-600 ${baseTextColor}`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${baseTextColor}`}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden fixed top-full left-0 w-full bg-white shadow-xl z-40 border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-3 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200" 
              onClick={closeMobileMenu}
            >
              Home
            </Link>
            <Link 
              href="/tours" 
              className="block px-3 py-3 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200" 
              onClick={closeMobileMenu}
            >
              Tours
            </Link>

            {/* Mobile Services Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center justify-between w-full px-3 py-3 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                Services
                <ChevronDown 
                  size={16} 
                  className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} 
                />
              </button>
              
              {servicesOpen && (
                <div className="ml-4 space-y-1 border-l-2 border-gray-200 pl-4">
                  <Link 
                    href="/holidays" 
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                    onClick={closeMobileMenu}
                  >
                    Holiday Packages
                  </Link>
                  <Link 
                    href="/services" 
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                    onClick={closeMobileMenu}
                  >
                    All add ons
                  </Link>
                  <Link 
                    href="/services/hotels" 
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                    onClick={closeMobileMenu}
                  >
                    Hotels
                  </Link>
                  <Link 
                    href="/services/car-hire" 
                    className="block px-3 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200" 
                    onClick={closeMobileMenu}
                  >
                    Car Hire
                  </Link>
                </div>
              )}
            </div>

            <Link 
              href="/gallery" 
              className="block px-3 py-3 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200" 
              onClick={closeMobileMenu}
            >
              Gallery
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-3 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200" 
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-3 text-gray-800 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200" 
              onClick={closeMobileMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}