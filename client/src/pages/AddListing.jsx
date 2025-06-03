import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    address: { street: "", city: "", state: "", zip: "" },
    bedrooms: 1,
    bathrooms: 1,
    balcony: 0,
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageFiles = (e) => {
    const files = Array.from(e.target.files).slice(0, 5);
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/listing",
        formData,
        { withCredentials: true }
      );

      const listingId = res.data._id || res.data.listing?._id;
      if (!listingId) throw new Error("No listing ID returned");

      if (images.length > 0) {
        const uploadData = new FormData();
        images.forEach((file) => uploadData.append("images", file));

        await axios.post(
          `http://localhost:3000/api/listing/${listingId}/upload`,
          uploadData,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      }

      setLoading(false);
      alert("Listing created successfully!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErrorMsg(
        err.response?.data?.message || "Failed to create listing. Try again."
      );
    }
  };

  return (
    <div className="min-h-screen  py-12 px-6 sm:px-12 flex justify-center items-start font-sans">
      <div className="w-full max-w-[900px] bg-gradient-to-b from-[#23272a] to-[#181b1e] rounded-2xl shadow-2xl shadow-purple-900/80 p-12">
        <h1 className="text-5xl font-extrabold text-white mb-10 tracking-widest text-center drop-shadow-lg">
          Add New Listing
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-8"
          autoComplete="off"
          spellCheck="false"
        >
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={6}
            placeholder="Write a detailed description of the property..."
          />
          <InputField
            label="Price (₹)"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <h2 className="text-white font-semibold text-xl mt-10 mb-6 border-b border-purple-600 pb-3 tracking-wide">
            Address
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <InputField
              label="Street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              required
              placeholder="1234 Elm St"
            />
            <InputField
              label="City"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              required
              placeholder="Mumbai"
            />
            <InputField
              label="State"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              required
              placeholder="Maharashtra"
            />
            <InputField
              label="Zip Code"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
              required
              placeholder="400001"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <InputField
              label="Bedrooms"
              name="bedrooms"
              type="number"
              min="0"
              value={formData.bedrooms}
              onChange={handleChange}
              required
            />
            <InputField
              label="Bathrooms"
              name="bathrooms"
              type="number"
              min="0"
              value={formData.bathrooms}
              onChange={handleChange}
              required
            />
            <InputField
              label="Balcony"
              name="balcony"
              type="number"
              min="0"
              value={formData.balcony}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="mb-3 text-gray-300 font-semibold text-lg tracking-wide">
              Upload Images <span className="text-sm text-purple-400">(max 5)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageFiles}
              className="file:bg-purple-700 file:text-white  file:px-6 file:py-2 file:rounded-lg file:font-semibold
                         file:hover:bg-purple-800 cursor-pointer
                         bg-[#2c2f33] rounded-xl p-3 text-gray-100 focus:outline-none focus:ring-4 focus:ring-purple-600
                         transition-shadow duration-300 shadow-md shadow-purple-700/40"
            />
            {images.length > 0 && (
              <p className="mt-2 text-sm text-purple-400">
                {images.length} image{images.length > 1 ? "s" : ""} selected
              </p>
            )}
          </div>

          {errorMsg && (
            <p className="text-red-500 text-center font-semibold mt-4">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700
                       disabled:opacity-70 disabled:cursor-not-allowed
                       text-white py-4 rounded-xl font-bold tracking-wide
                       shadow-lg shadow-purple-800/80 transition-transform hover:scale-105 duration-300"
          >
            {loading ? "Creating..." : "Create Listing"}
          </button>
        </form>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  required = false,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-2 text-gray-300 font-semibold text-base tracking-wide"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className="bg-[#2c2f33] text-gray-100 rounded-xl p-3 placeholder:text-gray-500
                 focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-300
                 shadow-inner shadow-black/30"
    />
  </div>
);

const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  rows = 3,
  required = false,
}) => (
  <div className="flex flex-col">
    <label
      htmlFor={name}
      className="mb-2 text-gray-300 font-semibold text-base tracking-wide"
    >
      {label}
    </label>
    <textarea
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      required={required}
      className="bg-[#2c2f33] text-gray-100 rounded-xl p-4 placeholder:text-gray-500 resize-none
                 focus:outline-none focus:ring-4 focus:ring-purple-500 transition-shadow duration-300
                 shadow-inner shadow-black/30"
    />
  </div>
);

export default AddListing;
