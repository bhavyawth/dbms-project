const { Schema, model } = require('mongoose');

const listingSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Listing title is required'],
    trim: true,
    maxlength: 100,
  },

  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: 1000,
  },

  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price must be a positive number'],
  },

  address: {
    street: { type: String, required: true },
    city:    { type: String, required: true },
    state:   { type: String, required: true },
    zip:     { type: String, required: true },
  },

  bedrooms: {
    type: Number,
    default: 1,
    min: 0,
  },

  bathrooms: {
    type: Number,
    default: 1,
    min: 0,
  },

  balcony: {
    type: Number,
    default: 0,
    min: 0,
  },

  images: {
    type: [String], 
    default: [],
  },

  isAvailable: {
    type: Boolean,
    default: true,
  },

  listedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
}, {
  timestamps: true,
});

const Listing = model('Listing', listingSchema);

export default Listing;
