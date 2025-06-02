  import React, { useEffect, useState } from "react";
  import ListingCard from "../component/ListingCard";
  import "../App.css";
  import axios from "axios";

  const Listings = () => {
    const [listing, setListings] = useState([]);

    useEffect(() => {
      async function allListing() {
        try {
          const res = await axios.get("http://localhost:3000/api/listing");
          setListings(res.data.listings);
          console.log(res.data.listings); // Optional: Debug output
        } catch (error) {
          console.error("Failed to fetch listings:", error);
        }
      }

      allListing();
    }, []);

    return (
      <div className="min-h-screen bg-[#0e0f11] px-6 sm:px-12 py-12 font-sans">
        <h1 className="text-4xl font-bold text-white mb-10">Featured Properties</h1>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {listing.map((listing, index) => (
    <ListingCard key={listing._id} listing={listing} index={index} />
  ))}
        </div>
      </div>
    );
  };

  export default Listings;
