import React from "react";
import { useNavigate } from "react-router-dom";

// Predefined fallback house images (full URLs, so no prefix needed)
const fallbackImages = [
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aG91c2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8aG91c2V8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGhvdXNlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGhvdXNlfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGhvdXNlfGVufDB8fDB8fHww"
];

const ListingCard = ({ listing, index }) => {
  const {
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    balcony,
    address,
    images,
  } = listing;

  // Use first image if exists, else fallback image
  // If image is local (relative path), prefix it with server URL
  const displayImage =
    images?.length > 0
      ? images[0].startsWith("http")
        ? images[0]
        : `http://localhost:3000/${images[0]}`
      : fallbackImages[index % fallbackImages.length];

  const navigate = useNavigate();

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] text-white font-sans">
      {/* Image Section */}
      <div className="relative">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-52 object-cover"
        />
        <span className="absolute top-3 left-3 bg-black/60 px-3 py-1 text-xs font-semibold rounded-full backdrop-blur-sm">
          {bedrooms} BHK
        </span>
        <span className="absolute top-3 right-3 bg-purple-600 px-3 py-1 text-xs font-semibold rounded-full shadow-md">
          {address?.city || "Unknown"}
        </span>
      </div>

      {/* Info Section */}
      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold tracking-wide">{title}</h2>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>

        <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
          <div>
            <span className="text-white font-semibold">{bedrooms}</span> Beds
          </div>
          <div>
            <span className="text-white font-semibold">{bathrooms}</span> Baths
          </div>
          <div>
            <span className="text-white font-semibold">{balcony}</span> Balcony
          </div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <div>
            <span className="text-green-400 font-semibold">
              ₹{price.toLocaleString()}
            </span>
            <div className="text-xs text-gray-400">Rent</div>
          </div>
          <div>
            <span className="text-yellow-300 font-semibold">
              {address?.state || "N/A"}
            </span>
            <div className="text-xs text-gray-400">State</div>
          </div>
        </div>

        <button
          onClick={() => navigate(`/listing/${listing._id}`)}
          className="mt-4 w-full text-sm bg-white/10 hover:bg-white/20 transition text-white px-4 py-2 rounded-xl backdrop-blur-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ListingCard;
