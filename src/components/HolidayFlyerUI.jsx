import { Clock, X } from "lucide-react";

export default function HolidayFlyerUI({ data, onClose }) {
  if (!data) return null;

  const {
    name,
    gallery,
    features,
    originalPrice,
    discountPrice,
    type,
  } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white shadow-2xl max-w-6xl w-full max-h-[90vh] rounded-lg overflow-hidden flex flex-col">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 bg-white text-slate-600 hover:text-red-600 p-2 rounded-full shadow-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto">
          {/* Header with Split */}
          <div className="flex flex-col lg:flex-row h-auto lg:h-80">
            <div className="w-full lg:w-1/2 bg-slate-600 text-white flex flex-col justify-center px-8 py-6 relative">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight mt-4">{name}</h1>
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[80px] border-r-[32px] border-t-slate-600 border-r-transparent"></div>
            </div>

            <div className="w-full lg:w-1/2 h-64 lg:h-full">
              <img
                src={gallery?.[0]}
                alt="gallery preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Gallery Strip */}
          {gallery?.length > 1 && (
            <div className="flex h-32 overflow-hidden">
              {gallery.slice(1).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`gallery ${i + 1}`}
                  className="w-1/3 object-cover"
                />
              ))}
            </div>
          )}

          {/* Content Area */}
          <div className="flex flex-col lg:flex-row">
            {/* Features */}
            <div className="w-full lg:w-2/3 p-6 space-y-6">
              <div className="space-y-4">
                {features?.map((feat, idx) => {
                  const Icon = require("lucide-react")[feat.icon] || Clock;
                  return (
                    <div key={idx} className="flex items-start">
                      <div className="w-8 h-8 bg-slate-600 rounded flex items-center justify-center mr-3 mt-1">
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-700 mb-1">{feat.title}</h3>
                        <p className="text-xs text-gray-600">{feat.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price & CTA */}
            <div className="w-full lg:w-1/3 bg-slate-600 text-white p-6 flex flex-col justify-center items-center text-center">
              <h2 className="text-lg font-semibold mb-2">{type}</h2>
              <div className="mb-2">
                <span className="text-sm line-through opacity-75">${originalPrice}</span>
              </div>
              <div className="text-4xl font-bold mb-2">${discountPrice}</div>
              <div className="text-xs opacity-75 mb-4">TERMS & CONDITIONS APPLY</div>
              <button className="mt-4 px-6 py-2 bg-white text-slate-800 font-semibold rounded shadow hover:bg-gray-100 transition">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
