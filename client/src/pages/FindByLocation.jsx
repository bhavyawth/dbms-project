import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const {
    _id,
    title,
    price,
    bedrooms,
    bathrooms,
    balcony,
    address,
    images,
    isAvailable,
  } = listing;

  const handleClick = () => {
    // Navigate to the listing detail page by ID
    navigate(`/listing/${_id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-[#1a1a1a] rounded-xl p-4 shadow-md flex gap-4 hover:shadow-xl transition cursor-pointer"
    >
      <img
        src={images?.[0] || "https://via.placeholder.com/120x90?text=No+Image"}
        alt={title}
        className="w-32 h-24 object-cover rounded-lg flex-shrink-0"
      />
      <div className="flex flex-col justify-between">
        <h3 className="text-white font-semibold text-lg">{title}</h3>
        <p className="text-gray-400 text-sm mb-1">
          {address?.street}, {address?.city}
        </p>
        <div className="text-gray-300 text-sm flex gap-4">
          <span>{bedrooms} bd</span>
          <span>{bathrooms} ba</span>
          <span>{balcony} balcony</span>
        </div>
        <p className="mt-1 font-semibold text-blue-400">
          ₹ {price.toLocaleString()}
        </p>
        {isAvailable ? (
          <span className="text-green-400 text-xs font-semibold mt-1">
            Available
          </span>
        ) : (
          <span className="text-red-400 text-xs font-semibold mt-1">
            Not Available
          </span>
        )}
      </div>
    </div>
  );
};

const locations = ["Basvanagudi", "Banashankari", "Koramangala", "Thyagaraja"];

export default function FindByLocation() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setSelectedLocation(e.target.value);
    setListings([]);
    setError("");
  };

  const handleSearch = async () => {
    if (!selectedLocation) return;
    setLoading(true);
    setError("");
    setListings([]);

    try {
      const res = await axios.get(
        `http://localhost:3000/api/listing/search?location=${encodeURIComponent(
          selectedLocation
        )}`
      );
      if (res.data.success) {
        setListings(res.data.listings);
        if (res.data.listings.length === 0) {
          setError("No listings found for this location.");
        }
      } else {
        setError("Failed to fetch listings.");
      }
    } catch (err) {
      setError("Error fetching listings. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-6 font-poppins text-white select-none">
      <h2 className="text-4xl font-semibold mb-8 tracking-wide">Find by Location</h2>

      <div className="flex gap-4 items-center mb-8">
        <select
          className="flex-grow bg-[#1a1a1a] border border-gray-700 rounded-lg px-5 py-3
                     text-white text-lg font-medium shadow-md
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedLocation}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select a location
          </option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <button
          onClick={handleSearch}
          disabled={!selectedLocation || loading}
          className={`bg-blue-600 px-6 py-3 rounded-lg font-semibold text-white
                      shadow-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed
                      focus:outline-none focus:ring-4 focus:ring-blue-400`}
        >
          {loading ? "Searching..." : "Find"}
        </button>
      </div>

      {/* Error message */}
      {error && (
        <div
          className="mb-8 p-4 rounded-lg bg-red-700 text-red-200 font-semibold"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Listings grid */}
      {listings.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
