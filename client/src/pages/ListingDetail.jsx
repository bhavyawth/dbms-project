import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  BedDouble,
  Bath,
  Landmark,
  Wallet,
  MapPin,
  LocateFixed,
  User2,
  Mail,
} from "lucide-react";

const ListingDetail = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [showOwner, setShowOwner] = useState(false);
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    async function fetchListing() {
      try {
        const res = await axios.get(`http://localhost:3000/api/listing/${id}`);
        setListing(res.data.listing);
        setMainImage(res.data.listing.images?.[0]); // set main image
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    }
    fetchListing();
  }, [id]);

  if (!listing) return <div className="text-white p-6">Loading...</div>;

  const {
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    balcony,
    address,
    images,
    isAvailable,
    owner,
  } = listing;

  // Helper function to get full image URL
  const getImageUrl = (img) => {
    if (!img) return "";
    return img.startsWith("http") || img.startsWith("https")
      ? img
      : `http://localhost:3000/${img}`;
  };

  return (
    <div className="min-h-screen bg-[#0e0f11] text-white p-6 sm:p-12 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12">
        {/* Left photo with scrollable thumbnails + click to swap */}
        <div
          className="md:w-[70%] rounded-2xl overflow-hidden shadow-lg flex-shrink-0"
          style={{ height: "600px" }}
        >
          {/* Main image */}
          <img
            src={getImageUrl(mainImage || images[0])}
            alt="Main Listing"
            className="w-full h-[75%] object-cover rounded-t-2xl"
          />

          {/* Scrollable thumbnails */}
          {images?.length > 1 && (
            <div className="flex gap-4 overflow-x-auto p-4 bg-[#1c1d1f] h-[25%]">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt={`thumb-${idx}`}
                  className={`h-24 w-32 object-cover rounded-xl cursor-pointer transition-transform duration-300 hover:scale-105 ${
                    img === mainImage ? "ring-4 ring-blue-500" : ""
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right details */}
        <div className="md:w-[30%] flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
            {isAvailable && (
              <span className="bg-green-600 text-sm text-white px-3 py-1 rounded-full select-none">
                Available
              </span>
            )}
          </div>

          <p className="text-gray-300 text-sm mb-8">{description}</p>

          {/* Info cards grid */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <InfoCard icon={<BedDouble className="w-6 h-6" />} label="Bedrooms" value={bedrooms} />
            <InfoCard icon={<Bath className="w-6 h-6" />} label="Bathrooms" value={bathrooms} />
            <InfoCard icon={<Landmark className="w-6 h-6" />} label="Balcony" value={balcony} />
            <InfoCard
              icon={<Wallet className="w-6 h-6" />}
              label="Rent"
              value={`₹ ${price.toLocaleString()}`}
            />
            <InfoCard icon={<MapPin className="w-6 h-6" />} label="City" value={address?.city} />
            <InfoCard icon={<LocateFixed className="w-6 h-6" />} label="State" value={address?.state} />
          </div>

          {/* Owner toggle */}
          <button
            onClick={() => setShowOwner(!showOwner)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition text-white font-semibold w-full mb-4"
          >
            {showOwner ? "Hide Owner Details" : "Show Owner Details"}
          </button>

          {/* Owner details with smooth fade and slide */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              showOwner ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {owner && (
              <div className="bg-[#1b1d1f] p-6 rounded-xl space-y-3 select-text">
                <div className="flex items-center gap-3">
                  <User2 className="w-5 h-5 text-white" />
                  <span className="text-white">{owner.username}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-white" />
                  <span className="text-white">{owner.email}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="bg-[#2a2d30] p-4 rounded-xl flex items-start gap-4 hover:scale-105 transition-transform cursor-default select-none w-full">
    <div className="text-white flex-shrink-0">{icon}</div>
    <div className="flex flex-col w-full min-w-0">
      <p className="text-white font-semibold text-lg break-words whitespace-normal">
        {value}
      </p>
      <p className="text-gray-400 text-sm">{label}</p>
    </div>
  </div>
);

export default ListingDetail;
