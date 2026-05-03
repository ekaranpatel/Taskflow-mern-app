 import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  
  // Added: A state variable to hold our error messages
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Added: Changed to async/await and added try/catch block
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any old errors when the user clicks submit again
    
     // 1. Define the URL at the top of your file
const API_URL = window.location.hostname === "localhost" 
  ? "http://localhost:3000" 
  : "https://taskflow-mern-app.onrender.com";

// ... inside your handleSubmit function ...
try {
  // 2. Use backticks `` and ${} to inject the variable
  const res = await axios.post(`${API_URL}/api/signup`, formData);
  
  console.log('successfully registered', res.data);
  navigate("/login");
} catch (err) {
  console.log(err);
  setError(err.response?.data?.error || "Signup failed. Please try again.");
}

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      {/* Main Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Create Account</h2>
          <p className="text-purple-200/70 mt-2">Join our community today</p>
        </header>

        {/* Added: This box only shows up if there is actually an error */}
        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-5">
          {/* Username Field */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-purple-100 ml-1">Username</label>
            <input
              type="text"
              name="username"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="johndoe"
              onChange={handleChange}
            />
          </div>

          {/* Email Field */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-purple-100 ml-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="name@company.com"
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <label className="text-sm font-medium text-purple-100 ml-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="••••••••"
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg transform transition-active:scale-95 duration-200"
          >
            Sign Up
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-purple-200/60 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Signup;
