import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";
import MyListingsCard from "../component/MyListingCard";

// 🆕 Edit Modal Component (untouched epicness)
const EditListingModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-900 to-zinc-800 text-white p-8 rounded-2xl shadow-2xl max-w-lg w-full border border-zinc-700 animate-fadeIn">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400 tracking-wide">Edit Your Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { name: "title", type: "text", placeholder: "Title" },
            { name: "description", type: "textarea", placeholder: "Description" },
            { name: "price", type: "number", placeholder: "Price" },
            { name: "bedrooms", type: "number", placeholder: "Bedrooms" },
            { name: "bathrooms", type: "number", placeholder: "Bathrooms" },
            { name: "balcony", type: "number", placeholder: "Balcony" },
            { name: "images", type: "text", placeholder: "Image URL" }
          ].map((field) =>
            field.type === "textarea" ? (
              <textarea
                key={field.name}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-yellow-400 transition duration-200 resize-none"
                rows="3"
              />
            ) : (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name] || ""}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:ring-2 focus:ring-yellow-400 transition duration-200"
              />
            )
          )}

          <div className="flex justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-red-500 hover:bg-red-600 transition duration-200 rounded-lg font-semibold text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-yellow-400 hover:bg-yellow-500 transition duration-200 rounded-lg font-bold text-black"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ✅ Main Component
export default function MyListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editData, setEditData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { user } = useAuthStore();

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/listing/my", {
          withCredentials: true
        });
        setListings(res.data.listings);
      } catch (error) {
        setError("Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [navigate]);

  // Handle listing update
  const handleUpdate = async (updatedData) => {
    try {
      await axios.put(
        `http://localhost:3000/api/listing/${updatedData._id}`,
        updatedData,
        { withCredentials: true }
      );
      setIsModalOpen(false);
      setEditData(null);
      const res = await axios.get("http://localhost:3000/api/listing/my", {
        withCredentials: true
      });
      setListings(res.data.listings);
    } catch (err) {
      console.error("Error updating:", err);
    }
  };

  // ✅ Handle listing delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/listing/${id}`, {
        withCredentials: true
      });
      setListings((prev) => prev.filter((listing) => listing._id !== id));
    } catch (err) {
      console.error("Error deleting listing:", err);
      alert("Failed to delete listing");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-16 px-6 font-poppins text-white select-none">
      <h2 className="text-4xl font-semibold mb-8 tracking-wide">My Listings</h2>

      {loading ? (
        <p className="text-lg text-gray-300">Loading your listings...</p>
      ) : error ? (
        <p className="text-red-400 text-lg font-semibold">{error}</p>
      ) : listings.length === 0 ? (
        <p className="text-gray-400 text-lg">You haven’t posted any listings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listings.map((listing) => (
            <MyListingsCard
              key={listing._id}
              listing={listing}
              onEdit={() => {
                setEditData(listing);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(listing._id)} // ✅ passed
            />
          ))}
        </div>
      )}

      <EditListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={editData}
      />
    </div>
  );
}
