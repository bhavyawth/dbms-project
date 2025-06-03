import React from "react";
import { useNavigate } from "react-router-dom";

// Predefined fallback house images
const fallbackImages = [
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=600&auto=format&fit=crop&q=60"
];

const ListingCard = ({ listing, index, onDelete, onEdit }) => {
  const {
    title,
    description,
    price,
    bedrooms,
    bathrooms,
    balcony,
    address,
    images,
    _id
  } = listing;

  const displayImage =
    images?.length > 0
      ? images[0].startsWith("http")
        ? images[0]
        : `http://localhost:3000/${images[0]}`
      : fallbackImages[index % fallbackImages.length];

  const navigate = useNavigate();

  return (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 shadow-lg hover:shadow-xl rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.02] text-white font-sans">
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

      <div className="p-5 space-y-3">
        <h2 className="text-xl font-semibold tracking-wide">{title}</h2>
        <p className="text-sm text-gray-300 line-clamp-2">{description}</p>

        <div className="grid grid-cols-3 gap-2 text-sm text-gray-400">
          <div><span className="text-white font-semibold">{bedrooms}</span> Beds</div>
          <div><span className="text-white font-semibold">{bathrooms}</span> Baths</div>
          <div><span className="text-white font-semibold">{balcony}</span> Balcony</div>
        </div>

        <div className="flex justify-between text-sm pt-2">
          <div>
            <span className="text-green-400 font-semibold">₹{price.toLocaleString()}</span>
            <div className="text-xs text-gray-400">Rent</div>
          </div>
          <div>
            <span className="text-yellow-300 font-semibold">{address?.state || "N/A"}</span>
            <div className="text-xs text-gray-400">State</div>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => navigate(`/listing/${_id}`)}
            className="w-full text-sm bg-white/10 hover:bg-white/20 transition text-white px-4 py-2 rounded-xl"
          >
            View
          </button>
          <button
            onClick={() => onEdit(listing)}
            className="w-full text-sm bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-xl"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(_id)}
            className="w-full text-sm bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
