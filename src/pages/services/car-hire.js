import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";

export default function CarHire() {
  return (
    <>
      <Header variant="default" />
      <main className="pt-28 px-4 max-w-4xl mx-auto pb-16">
        <h1 className="text-4xl font-serif font-bold mb-4 text-dark text-center">Car Hire in Malawi</h1>
        <Image
          src="/assets/services/car-hire.jpeg"
          alt="Car Hire"
          width={800}
          height={500}
          className="rounded-lg mb-6 w-full object-cover"
        />
        <p className="text-gray-700 mb-6 text-lg">
          We provide reliable, comfortable vehicles for city exploration or rural adventure. Choose between:
        </p>
        <ul className="list-disc list-inside text-gray-600 mb-6">
          <li>Economy & compact cars</li>
          <li>4x4s for national park travel</li>
          <li>Minibuses for groups</li>
          <li>Driver-inclusive options</li>
        </ul>
        <p className="text-gray-700 mb-6">
          All rentals include insurance and 24/7 roadside support. Pick-up from airport or hotel available.
        </p>
        <Link href="/contact" className="inline-block bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-accent transition">
          Enquire About Car Hire
        </Link>
      </main>
    </>
  );
}
