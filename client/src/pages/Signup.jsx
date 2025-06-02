import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth"; 

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phone:"",
    role:""
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      alert(data.message || "Signup successful!");
      navigate("/login");
      login(true)
    },
  });

  const handleChange = (e) => {
    console.log(e.target.value)
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log()
    mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      phone:formData.phone
    });
  };
  console.log(formData)

  return (
    <div className="min-h-screen flex bg-[#111827] text-white">
      <div className="hidden md:flex w-1/2 rounded-l-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundBlendMode: "multiply",
          }}
        ></div>
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 py-12">
        <h2 className="text-4xl font-poppins font-semibold mb-6 tracking-wide">
          Create Account
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Join us today and start browsing the best listings with ease.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-2 text-gray-300 font-medium">
              User Name
            </label>
            <input
              type="text"
              id="username"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#1f2937] border border-gray-700 focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-2 text-gray-300 font-medium">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-md bg-[#1f2937] border border-gray-700 focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-gray-300 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-md bg-[#1f2937] border border-gray-700 focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-2 text-gray-300 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-md bg-[#1f2937] border border-gray-700 focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-gray-300 font-medium">
              Role
            </label>
            <select
              id="role"
              className="w-full px-4 py-3 rounded-md bg-[#1f2937] border border-gray-700 focus:border-purple-500 focus:outline-none transition"
              onChange={handleChange}
            >
            <option value="" >
              Select your role
            </option>
            <option value="owner">Owner</option>
            <option value="tenant">Tenant</option>
          </select>
          </div>


          


          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 rounded-md font-semibold hover:bg-purple-700 transition shadow-md shadow-purple-600/50 disabled:opacity-50"
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
 
        <p className="mt-6 text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-purple-500 hover:underline font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
