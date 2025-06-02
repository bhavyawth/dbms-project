import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth"; // Make sure this function exists
import useAuthStore from "../store/useAuthStore";

const Login = () => {
  const navigate = useNavigate();
  const {login} =useAuthStore()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("hi")
      navigate("/"); // or wherever you want to go after login
      login(true)
    },
    onError: (err) => {
      alert(err.response?.data?.message || "Login failed ❌");
    },
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };
  console.log(formData)
  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      username: formData.username,
      password: formData.password,
    });
  };

  return (
    <div className="min-h-screen flex bg-[#111827] text-white ">
      <div className="hidden md:flex w-1/2 rounded-l-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80')",
            backgroundBlendMode: "multiply",
          }}
        ></div>
      </div>

      <div className="flex flex-col justify-center w-full md:w-1/2 px-10 py-12">
        <h2 className="text-4xl font-poppins font-semibold mb-6 tracking-wide">
          Welcome Back
        </h2>
        <p className="text-gray-400 mb-8 max-w-md">
          Please login to your account to continue browsing the best listings.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-gray-300 font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
            
              className="w-full px-4 py-3 rounded-md bg-[#1f2937] border border-gray-700 focus:border-purple-500 focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-gray-300 font-medium"
            >
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

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-purple-500"
              />
              Remember me
            </label>
            <a
              href="/forgot-password"
              className="hover:text-purple-400 transition"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-purple-600 rounded-md font-semibold hover:bg-purple-700 transition shadow-md shadow-purple-600/50 disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-500 hover:underline font-medium"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
