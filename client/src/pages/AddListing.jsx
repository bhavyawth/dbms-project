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
    images: [],
  });

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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImagesChange = (e) => {
    const urls = e.target.value
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    setFormData((prev) => ({ ...prev, images: urls }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      await axios.post("http://localhost:3000/api/listing", formData,{withCredentials:true});
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
    <div className="min-h-screen bg-[#0e0f11] py-12 px-12 font-sans flex justify-center">
      <div className="w-full max-w-[900px] bg-[#1f2937] rounded-xl shadow-lg shadow-purple-800/50 p-10">
        <h1 className="text-4xl font-bold text-white mb-8 tracking-wide text-center">
          Add New Listing
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          autoComplete="off"
          spellCheck="false"
        >
          <InputField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ex: Cozy 2BHK Apartment"
            required
          />

          <TextAreaField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your property..."
            required
            rows={5}
          />

          <InputField
            label="Price (₹)"
            name="price"
            type="number"
            min="0"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            required
          />

          <h2 className="text-white font-semibold text-lg mt-8 mb-4 border-b border-purple-600 pb-2">
            Address
          </h2>

          <div className="grid grid-cols-2 gap-6">
            <InputField
              label="Street"
              name="address.street"
              value={formData.address.street}
              onChange={handleChange}
              placeholder="Street address"
              required
            />
            <InputField
              label="City"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="City"
              required
            />
            <InputField
              label="State"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="State"
              required
            />
            <InputField
              label="Zip Code"
              name="address.zip"
              value={formData.address.zip}
              onChange={handleChange}
              placeholder="Zip code"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
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

          <InputField
            label="Image URLs (comma separated)"
            name="images"
            onChange={handleImagesChange}
            placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
          />

          {errorMsg && (
            <p className="text-red-500 text-center font-semibold">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-shadow shadow-md shadow-purple-900/60"
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
    <label htmlFor={name} className="mb-1 text-gray-300 font-medium">
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
      className="bg-[#374151] text-white rounded-md p-3 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
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
    <label htmlFor={name} className="mb-1 text-gray-300 font-medium">
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
      className="bg-[#374151] text-white rounded-md p-3 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
    />
  </div>
);

export default AddListing;
