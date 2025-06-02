import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Layout from "./component/Layout";
import AllListing from "./pages/AllListings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import FindByLocation from "./pages/FindByLocation";
import ProtectedRoute from "./component/ProtectedRoute";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "./store/useAuthStore";
import ListingDetail from "./pages/ListingDetail";
import AddListing from "./pages/AddListing";
import MyListings from "./pages/MyListings";

function App() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const {login,setUser,user}=useAuthStore()
  console.log(isLoggedIn)
  useEffect(()=>{
    async function check() {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/check",{withCredentials:true})
        login(res.data.success)
      } catch (error) {
        login(false)
      }
    }
    check()
  },[isLoggedIn])

  useEffect(()=>{
    async function user() {
      try {
        const res = await axios.get("http://localhost:3000/api/auth/check",{withCredentials:true})
        setUser(res.data.user)
      } catch (error) {
        setUser(null)
      }
    }
      user()
  },[isLoggedIn])

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AllListing />} />
          <Route path="find-by-location" element={<FindByLocation />} />
          <Route path="add-location" element={<FindByLocation />} />
          <Route path="/add-listing" element={<AddListing />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
        </Route>

          <Route
          path="/"
          element={ 
              <Layout />
          }
        >
          
          <Route path="/my-listing" element={<MyListings />} />
        </Route>

        <Route path="login" element={isLoggedIn?<Navigate to="/"/>:<Login/> } />
        <Route path="signup" element={isLoggedIn?<Navigate to="/"/>:<Signup/> } />
      </Routes>
    </Router>
  );
}

export default App;
