"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-context";
import { Feather, LogIn, AlertTriangle, User, Lock } from "lucide-react";

export default function LoginPage() {
  const [identifier, setIdentifier] = useState(""); // Changed from email
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null); // State for error messages
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // --- FAKE LOGIN LOGIC ---
    // In a real app, you'd send this to your backend API.
    // For this demo, we'll just check if the password is "password"
    // and the identifier isn't empty.
    if (password === "password" && identifier) {
      console.log("Logging in with:", { identifier, password });
      login(); // Set fake login state to true
      router.push("/"); // Redirect to dashboard
    } else {
      setError("Invalid credentials. (Hint: try password: 'password')");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Feather className="text-indigo-500" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Welcome Back
        </h2>
        <p className="text-center text-gray-400 mb-6">
          Log in to your account to continue.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="identifier"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email or Handle
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User size={18} className="text-gray-400" />
              </span>
              <input
                type="text" // Changed from 'email'
                id="identifier"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="you@example.com or @yourhandle" // Updated placeholder
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Lock size={18} className="text-gray-400" />
              </span>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>

          {/* === ERROR MESSAGE DISPLAY === */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 text-red-300 p-3 rounded-lg text-sm flex items-center gap-2">
              <AlertTriangle size={18} />
              <span>{error}</span>
            </div>
          )}
          {/* ============================== */}

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-500 transition-all duration-200"
          >
            <LogIn size={18} />
            <span>Log In</span>
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
