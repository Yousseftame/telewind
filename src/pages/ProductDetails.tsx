import React from "react";
import { useParams, Link } from "react-router-dom";
import radarSystems from "@/assets/radar-systems.jpg";
import electronicWarfare from "@/assets/electronic-warfare.jpg";
import tacticalComms from "@/assets/tactical-comms.jpg";
import rfAmplifiers from "@/assets/rf-amplifiers.jpg";

const products = [
  {
    id: 1,
    name: "TR-5000 Tactical Radar System",
    category: "Radar & Microwave",
    image: radarSystems,
    description: "Advanced phased-array radar for surveillance and tracking",
    features: ["360° Coverage", "Multi-target Tracking", "Weather Resistant"],
    bands: ["X-Band", "S-Band"],
  },
  {
    id: 2,
    name: "EW-300 Electronic Warfare Suite",
    category: "Electronic Warfare",
    image: electronicWarfare,
    description: "Comprehensive EW solution for spectrum dominance",
    features: ["Signal Intelligence", "Jamming Capabilities", "Direction Finding"],
    bands: ["HF", "VHF", "UHF"],
  },
  {
    id: 3,
    name: "TC-4000 Secure Tactical Radio",
    category: "Tactical Communications",
    image: tacticalComms,
    description: "Military-grade encrypted communication system",
    features: ["AES-256 Encryption", "Frequency Hopping", "Long Range"],
    bands: ["HF", "VHF"],
  },
  {
    id: 4,
    name: "RFA-2000 RF Power Amplifier",
    category: "RF Power Amplifiers",
    image: rfAmplifiers,
    description: "High-power solid-state RF amplification",
    features: ["2kW Output", "Wide Bandwidth", "Remote Control"],
    bands: ["HF", "VHF", "UHF"],
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center ">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Product Not Found
        </h2>
        <Link
          to="/products"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 pt-20">
      {/* Header Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start pt-10">
        {/* Image */}
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-xl shadow-lg object-cover"
          />
        </div>

        {/* Text Info */}
        <div>
          <h1 className="text-4xl font-bold mb-3">{product.name}</h1>

          <span className="inline-block text-sm bg-blue-100 text-blue-700 px-4 py-1 rounded-full mb-6">
            {product.category}
          </span>

          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            {product.description}
          </p>

          {/* Features */}
          <h3 className="text-xl font-semibold mb-2">Key Features</h3>
          <ul className="list-disc list-inside mb-8 text-gray-700">
            {product.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          {/* Bands */}
          <h3 className="text-xl font-semibold mb-2">Supported Bands</h3>
          <div className="flex flex-wrap gap-2">
            {product.bands.map((band, index) => (
              <span
                key={index}
                className="bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full"
              >
                {band}
              </span>
            ))}
          </div>

          {/* Back Button */}
          <div className="mt-10">
            <Link
              to="/products"
              className="text-blue-600 hover:text-blue-800 underline text-lg"
            >
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
