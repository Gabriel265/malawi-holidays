// components/HighlightsGrid.jsx

import Link from "next/link";
import { Bed, Car, Clock, MapPin } from "lucide-react";

const highlights = [
  {
    icon: <Bed className="w-8 h-8 text-primary" />,
    title: "Affordable Stays",
    desc: "Comfortable and budget-friendly accommodation across Malawi.",
    link: "/accommodation",
  },
  {
    icon: <Car className="w-8 h-8 text-primary" />,
    title: "Car Hire Services",
    desc: "Explore Malawi with reliable 4x4s and saloons available for rent.",
    link: "/car-hire",
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    title: "Top Locations",
    desc: "Stay and drive through stunning spots like Lake Malawi, Zomba Plateau, and more.",
    link: "/destinations",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "24/7 Support",
    desc: "Get assistance anytime, anywhere during your trip.",
    link: null,
  },
];

export default function HighlightsGrid() {
  return (
    <section className="bg-gray-50 py-16 px-4" id="highlights">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          Accommodation & Car Hire Highlights
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-lg font-semibold mb-2 text-slate-700">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">{item.desc}</p>
              {item.link && (
                <Link href={item.link}>
                  <span className="text-primary text-sm font-medium hover:underline">
                    Learn more →
                  </span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
