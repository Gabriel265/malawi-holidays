import React, { useState } from "react";
import carHireData from "@/data/carhire-data";
import accommodations from "@/data/accomodations-data";
import { ChevronDown, ChevronUp, Search } from "lucide-react";

const FullCustomizationPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCars = carHireData.filter((car) =>
    car.name.toLowerCase().includes(search.toLowerCase())
  );

  const filteredAccommodations = accommodations.filter((acc) =>
    acc.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mt-8 border rounded-xl shadow-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
      >
        <span>Customize Your Package</span>
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </button>

      {isOpen && (
        <div className="p-4 bg-white space-y-8">
          {/* Booking Section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Booking Preferences</h3>
            <form className="grid gap-4 md:grid-cols-2">
              <input type="text" placeholder="Full Name" className="input" />
              <input type="email" placeholder="Email Address" className="input" />
              <input type="date" className="input" />
              <input type="number" placeholder="Number of People" className="input" />
              <textarea placeholder="Special Requests" className="input col-span-2" rows={3} />
              <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 col-span-2">
                Submit Booking Request
              </button>
            </form>
          </section>

          {/* Amenities Section */}
          <section>
            <h3 className="text-xl font-bold mb-4">Explore Amenities</h3>
            <div className="flex items-center gap-2 mb-4">
              <Search className="text-gray-500" />
              <input
                type="text"
                placeholder="Search car hire or accommodation..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* Car Hire Display */}
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Car Hire Options</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {filteredCars.map((car) => (
                  <div key={car.id} className="border rounded-lg p-4 shadow-sm">
                    <img src={car.image} alt={car.name} className="w-full h-32 object-cover rounded" />
                    <h5 className="mt-2 font-bold">{car.name}</h5>
                    <p className="text-sm text-gray-600">{car.description}</p>
                    <ul className="text-sm mt-2 list-disc list-inside">
                      {car.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                    <p className="mt-2 font-semibold text-green-600">{car.pricePerDay} / day</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Accommodation Display */}
            <div className="space-y-4 mt-8">
              <h4 className="font-semibold text-lg">Accommodations</h4>
              <div className="grid md:grid-cols-3 gap-4">
                {filteredAccommodations.map((acc) => (
                  <div key={acc.id} className="border rounded-lg p-4 shadow-sm">
                    <img src={acc.image} alt={acc.name} className="w-full h-32 object-cover rounded" />
                    <h5 className="mt-2 font-bold">{acc.name}</h5>
                    <p className="text-sm text-gray-600">{acc.type}</p>
                    <ul className="text-sm mt-2 list-disc list-inside">
                      {acc.features.map((feat, i) => (
                        <li key={i}>{feat.title}</li>
                      ))}
                    </ul>
                    <p className="mt-2 text-gray-600 line-through">€{acc.originalPrice}</p>
                    <p className="font-semibold text-green-600">€{acc.discountPrice}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default FullCustomizationPanel;
