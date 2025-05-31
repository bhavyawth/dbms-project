const Listing = require('../models/listing');

const createListing = async (req, res) => {
  const { 
    title, 
    description, 
    price, 
    address, 
    bedrooms, 
    bathrooms, 
    balcony, 
    images } = req.body;

    try {
      const listing = await Listing.create({
        title,
        description,
        owner: req.user._id,
        price,
        address,
        bedrooms,
        bathrooms,
        balcony,
        images,
      });

      res.status(201).json({ success: true, listing });

    }
    catch (err) {
    console.error("Create Listing Error:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
} 

const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate('owner', 'username email');
    res.status(200).json({ success: true, listings });
  } catch (err) {
    console.error("Get all listings error: ", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const getListingById = async (req, res) => {
  const { id } = req.params;

  try {
    const listing = await Listing.findById(id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.status(200).json({ success: true, listing });
  } catch (err) {
    console.error("Get listing by ID error: ", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const updateListingById = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, address, bedrooms, bathrooms, balcony, images } = req.body;

  try {
    const listing = await Listing.findByIdAndUpdate(id, {
      title,
      description,
      price,
      address,
      bedrooms,
      bathrooms,
      balcony,
      images
    }, { new: true });

    if (!listing) return res.status(404).json({ success: false, message: "Listing not found" });

    res.status(200).json({ success: true, listing });
  } catch (err) {
    console.error("Update listing error: ", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

const deleteListingById = async (req, res) => {
  const { id } = req.params;
  try{
    const listing = await Listing.findByIdAndDelete(id);
    if (!listing) return res.status(404).json({ success: false, message: "listing not found!" });
    res.status(200).json({ success: true, message: "Listing deleted successfully" });
  } catch(err) {
    console.error("Delete listing error: ", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error"});
  }
}

const getMyListings = async (req, res) => {
  const userId = req.user._id;
  try {
    const myListings = await Listing.find({ owner: userId }).populate('owner', 'username email');
    if (!myListings || myListings.length === 0) {
      return res.status(404).json({ success: false, message: "No listings found for this user" });
    }
    res.status(200).json({ success: true, listings: myListings });
  } catch (err) {
    console.error("Get my listings error: ", err.message);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

const handleUploadImages = async (req, res) => {
  const listingId = req.params.id;
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: "No images uploaded" });
  }

  if (!listingId) {
    return res.status(400).json({ success: false, message: "Listing ID is required" });
  }

  const imagePaths = req.files.map(file => `/images/${listingId}/${file.filename}`);
  try {
    const listing = await Listing.findByIdAndUpdate(
      listingId, 
      { $push: { images: { $each: imagePaths } }},
      { new: true }
    );
    res.status(200).json({ success: true, listing });
  } catch (err) {
    console.error("Uplaod images error: ", err.message);
    res.status(500).json({ success: false, message: "Internal server Error" });
  }
}

module.exports = {
  createListing,
  getAllListings,
  getListingById,
  updateListingById,
  deleteListingById,
  getMyListings,  
  handleUploadImages,
}
