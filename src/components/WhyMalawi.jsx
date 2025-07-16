import { TreePalm, Drum, Mountain, Utensils } from "lucide-react";

export default function WhyMalawi() {
  const features = [
    {
      icon: <Mountain size={36} />,
      title: "Breathtaking Landscapes",
      desc: "From Lake Malawi’s golden shores to majestic mountains and green highlands, Malawi offers unspoilt natural beauty.",
    },
    {
      icon: <Drum size={36} />,
      title: "Vibrant Culture & Music",
      desc: "Experience traditional dances, music festivals, and studio tours with Malawian artists and gospel choirs.",
    },
    {
      icon: <Utensils size={36} />,
      title: "Delicious Local Cuisine",
      desc: "Join cooking tours, street food tastings, and kitchen visits featuring authentic Malawian dishes and drinks.",
    },
    {
      icon: <TreePalm size={36} />,
      title: "Warm Hospitality",
      desc: "Malawi is known as ‘The Warm Heart of Africa’ for a reason — welcoming smiles and unforgettable experiences await.",
    },
  ];

  return (
    <section className="bg-dark text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-10">
          Why Visit Malawi?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/5 backdrop-blur rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="text-accent mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
