
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0e0f11] flex flex-col">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto w-full px-6 sm:px-12 py-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
