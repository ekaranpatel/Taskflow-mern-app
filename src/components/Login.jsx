import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Authcontext";
import axios from 'axios'
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try { 
      const res = await axios.post("http://localhost:3000/api/login", { email, password });
      login(res.data.user, res.data.token); 
      navigate("/"); // <-- Add this! (Or navigate("/dashboard") depending on your route setup)
    } catch (err) { 
      console.log(err)
      setError(err.response?.data?.error || "Login failed");
    }
    
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 flex items-center justify-center p-4">
      {/* Glassmorphism Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 transform transition-all">
        
        <header className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-purple-200/70 mt-2">Please enter your details to login</p>
        </header>

        {error && (
          <div className="mb-6 p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="grid gap-5">
          
          <div className="grid gap-2">
            <label className="text-sm font-medium text-purple-100 ml-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
              placeholder="you@example.com"
            />
          </div>

      
          <div className="grid gap-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-purple-100">Password</label>
              <a href="#" className="text-xs text-purple-300 hover:text-white transition-colors">Forgot?</a>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all hover:bg-white/10"
              placeholder="••••••••"
            />
          </div>

          
          <button
            type="submit"
            className="mt-2 w-full bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-semibold py-3 rounded-xl shadow-lg transform active:scale-95 transition-all duration-200"
          >
            Log in
          </button>
        </form>

        <footer className="mt-8 text-center">
          <p className="text-purple-200/60 text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-white font-semibold hover:underline decoration-purple-400 underline-offset-4">
              Create one
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Login;