import React, { useState, useEffect } from "react";

const EditListingModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Calls the parent component’s update function
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md text-black">
        <h2 className="text-xl font-bold mb-4">Edit Listing</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="title" placeholder="Title" value={formData.title || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <textarea name="description" placeholder="Description" value={formData.description || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="price" type="number" placeholder="Price" value={formData.price || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="bedrooms" type="number" placeholder="Bedrooms" value={formData.bedrooms || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="bathrooms" type="number" placeholder="Bathrooms" value={formData.bathrooms || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="balcony" type="number" placeholder="Balconies" value={formData.balcony || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="images" placeholder="Image URL" value={formData.images || ""} onChange={handleChange} className="w-full p-2 border rounded" />
          <input name="address.city" placeholder="City" value={formData.address?.city || ""} onChange={handleChange} disabled className="w-full p-2 border rounded text-gray-400" />
          <input name="address.state" placeholder="State" value={formData.address?.state || ""} onChange={handleChange} disabled className="w-full p-2 border rounded text-gray-400" />
          
          <div className="flex justify-between mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListingModal;
