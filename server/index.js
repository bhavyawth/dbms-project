const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

//routes:
const authRoutes = require('./routes/authRoutes');
const listingRoutes = require('./routes/listingRoutes');

//connection to db:
const { connectToMongoDb } = require('./config/connection');
connectToMongoDb(process.env.MONGODB_URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

//middlewares:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/auth", authRoutes);
app.use("/api/listing", listingRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});