const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/,
      'Please enter a valid email address',
    ],
  },

  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    match: [
      /^\d{10}$/,
      'Please enter a valid phone number with 10 digits',
    ],
  },

  profileImageUrl: {
    type: String,
    default: '../public/images/avatar.jpeg',
  },

  role: {
    type: String,
    enum: ['tenant', 'owner'],
    default: 'tenant',
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);
module.exports = User;


