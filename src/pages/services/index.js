import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";

export default function ServicesLanding() {
  return (
    <>
      <Header variant="default" />
      <main className="pt-28 px-4 max-w-7xl mx-auto pb-16">
        <h1 className="text-4xl font-serif font-bold mb-4 text-center text-dark">Our Services</h1>
        <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
          At Malawi Holidays, we offer a range of convenient travel services to make your stay unforgettable — from luxury hotels to reliable car hire.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Car Hire */}
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/assets/services/car-hire.jpeg"
              alt="Car Hire"
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif font-semibold text-xl mb-2 text-dark">Car Hire</h3>
              <p className="text-gray-600 text-sm mb-4">
                Comfortable, safe, and affordable vehicles for your adventures across Malawi — with or without a driver.
              </p>
              <Link href="/services/car-hire" className="text-accent font-medium hover:underline">
                Learn More →
              </Link>
            </div>
          </div>

          {/* Hotels */}
          <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/assets/services/hotel.jpeg"
              alt="Hotels"
              width={600}
              height={400}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="font-serif font-semibold text-xl mb-2 text-dark">Hotels & Lodges</h3>
              <p className="text-gray-600 text-sm mb-4">
                Find beautiful accommodations — from luxurious lakeside resorts to cozy cultural lodges.
              </p>
              <Link href="/services/hotels" className="text-accent font-medium hover:underline">
                Learn More →
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
