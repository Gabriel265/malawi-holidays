import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function Hotels() {
  return (
    <>
      <Header variant="default" />
      <main className="pt-28 px-4 max-w-4xl mx-auto pb-16">
        <h1 className="text-4xl font-serif font-bold mb-4 text-dark text-center">Hotel & Lodge Booking</h1>
        <Image
          src="/assets/services/hotel.jpeg"
          alt="Hotel Booking"
          width={800}
          height={500}
          className="rounded-lg mb-6 w-full object-cover"
        />
        <p className="text-gray-700 mb-6 text-lg">
          We partner with top-rated hotels, boutique resorts, and cultural lodges across Malawi to ensure a memorable stay.
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Lakeside resorts with private beaches</li>
          <li>Safari lodges near national parks</li>
          <li>City hotels with modern amenities</li>
          <li>Budget-friendly backpacker stays</li>
        </ul>
        <p className="text-gray-700 mb-6">
          We handle your reservations, special requests, and group deals — so you can relax and enjoy.
        </p>
        <Link href="/contact" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-accent transition">
          Book Hotel Accommodation
        </Link>
      </main>
    </>
  );
}
