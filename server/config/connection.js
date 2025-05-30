const mongoose = require('mongoose');

const connectToMongoDb = (url) => mongoose.connect(url);

module.exports = {
  connectToMongoDb,
}