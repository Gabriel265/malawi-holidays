import React, { useState } from "react";
import { useRouter } from "next/router";
import packageData from "@/data/package-data";
import carHireData from "@/data/carhire-data";
import accommodations from "@/data/accomodations-data";
import FullCustomizationPanel from "@/components/FullCustomizationPanel";

const HolidayPackagePage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  const packageItem = packageData.find((item) => item.slug === slug);

  if (!packageItem) {
    return <div className="text-center py-20 text-red-600">Package not found.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Hero Section */}
      <div className="relative h-96 rounded-xl overflow-hidden mb-6">
        <img
          src={packageItem.coverImage}
          alt={packageItem.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold">{packageItem.title}</h1>
        </div>
      </div>

      {/* Highlights and Description */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-2">Highlights</h2>
        <ul className="list-disc list-inside mb-4">
          {packageItem.highlights.map((highlight, i) => (
            <li key={i}>{highlight}</li>
          ))}
        </ul>
        <p className="text-gray-700 leading-relaxed">{packageItem.description}</p>
      </div>

      {/* Gallery */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {packageItem.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Gallery ${i}`}
              className="w-full h-40 object-cover rounded"
            />
          ))}
        </div>
      </div>

      {/* Booking Call to Action */}
      <div className="mb-10 bg-blue-100 p-6 rounded-xl text-center">
        <h2 className="text-2xl font-bold mb-2">Ready to book your holiday?</h2>
        <p className="mb-4">Let us help you plan the perfect getaway.</p>

        {/* Toggle Calendar Button */}
        <button
          onClick={() => setCalendarOpen(!calendarOpen)}
          className="mb-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          aria-expanded={calendarOpen}
          aria-controls="booking-calendar"
        >
          {calendarOpen ? "Hide Calendar" : "Select Booking Date"}
        </button>

        {/* Collapsible Calendar */}
        {calendarOpen && (
          <div id="booking-calendar" className="mb-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="p-2 rounded border border-gray-300"
              min={new Date().toISOString().split("T")[0]} // Disable past dates
            />
            {selectedDate && (
              <p className="mt-2 text-green-700">Selected date: {selectedDate}</p>
            )}
          </div>
        )}

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Book Now
        </button>
      </div>

      {/* Full Customization Panel */}
      <FullCustomizationPanel />
    </div>
  );
};

export default HolidayPackagePage;
