const express = require('express');
const path = require('path');
const { connectToMongoDb } = require('./config/connection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
//const listingRoutes = require('./routes/listingRoutes');


connectToMongoDb('mongodb://127.0.0.1:27017/rentngo')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err));

const app = express();
const PORT = 3000;

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/auth", authRoutes);
//app.use("/api/listing", listingRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});