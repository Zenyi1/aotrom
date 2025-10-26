"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-context";
import {
  Feather,
  UserPlus,
  AtSign,
  User,
  AlertTriangle, // Import an icon for the error
} from "lucide-react";

export default function SignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    setError(null); // Clear any previous errors

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    // In a real app, you'd also check for handle/email uniqueness here
    // if (handle_is_taken) {
    //   setError("This handle is already taken.");
    //   return;
    // }

    // In a real app, you'd send this to your backend
    console.log("Signing up with:", { displayName, handle, email, password });
    login(); // Set fake login state to true
    router.push("/"); // Redirect to dashboard
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-gray-100 p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-xl shadow-lg p-8">
        <div className="flex justify-center mb-6">
          <Feather className="text-indigo-500" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="displayName"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Display Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <User size={18} className="text-gray-400" />
              </span>
              <input
                type="text"
                id="displayName"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Your Public Name"
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="handle"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Handle
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <AtSign size={18} className="text-gray-400" />
              </span>
              <input
                type="text"
                id="handle"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="youruniquehandle"
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <p className="text-xs text-gray-400 mt-1 pl-1">
              This must be unique. No spaces or special characters.
            </p>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
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
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 transition-all duration-200"
          >
            <UserPlus size={18} />
            <span>Sign Up</span>
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-indigo-400 hover:text-indigo-300"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}
