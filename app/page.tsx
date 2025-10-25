"use client"; // This tells Next.js it's an interactive component

import {
  Gavel,
  PlusCircle,
  Users,
  DollarSign,
  BarChart2,
  LogOut,
  User, // Add User icon
  Settings, // Add Settings icon
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react"; // Import useRef
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link for navigation

// Import our new auth hook
import { useAuth } from "./auth-context";

// Import types and data from their new files
import type { Bet, DashboardCardProps, StatCardProps } from "../lib/types";
import { openBets } from "../lib/data";

/**
 * Main Home Page Component
 */
export default function Home() {
  const [betTitle, setBetTitle] = useState<string>("");
  const [betParticipants, setBetParticipants] = useState<string>("");
  const [betStake, setBetStake] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  // Get auth state and functions
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for click-outside

  // === This is the "Page Protection" logic ===
  useEffect(() => {
    // If the user is not logged in, redirect them to the login page
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);
  // ==========================================

  // === Click-outside-to-close dropdown logic ===
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    // Cleanup
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [dropdownRef]);
  // =============================================

  const handleCreateBet = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you'd send this to your backend or smart contract
    console.log("Creating bet:", {
      title: betTitle,
      participants: betParticipants,
      stake: betStake,
    });
    // Clear the form
    setBetTitle("");
    setBetParticipants("");
    setBetStake("");
  };

  // While redirecting or if not logged in, show a blank screen or loading spinner
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        {/* You could put a loading spinner here */}
      </div>
    );
  }

  // If logged in, show the dashboard
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-inter">
      <main className="max-w-7xl mx-auto">
        {/* === Header === */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">AOTROM</h1>

          {/* === Profile Dropdown === */}
          <div className="relative" ref={dropdownRef}>
            {/* Circular Profile Picture Button */}
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500"
            >
              <img
                src="https://placehold.co/40x40/6366f1/e0e7ff?text=U"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute right-0 top-12 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-10 border border-gray-700"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
              >
                <Link
                  href="/profile" // You can create this page later
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)} // Close on click
                >
                  <User size={16} />
                  <span>Your Profile</span>
                </Link>
                <Link
                  href="/settings" // You can create this page later
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-200 hover:bg-gray-700"
                  role="menuitem"
                  onClick={() => setIsDropdownOpen(false)} // Close on click
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsDropdownOpen(false);
                  }}
                  className="flex items-center gap-3 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
                  role="menuitem"
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </header>

        {/* === Stats Cards Grid === */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Value Locked"
            value="1.25 ETH"
            icon={<DollarSign className="text-green-400" />}
          />
          <StatCard
            title="Open Bets"
            value={openBets.length}
            icon={<Gavel className="text-yellow-400" />}
          />
          <StatCard
            title="Active Users"
            value={12}
            icon={<Users className="text-blue-400" />}
          />
          <StatCard
            title="Bets Settled"
            value={34}
            icon={<BarChart2 className="text-purple-400" />}
          />
        </section>

        {/* === Main Content Grid === */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* --- Open Bets Column --- */}
          <div className="lg:col-span-2">
            <DashboardCard
              title="Open Bets"
              icon={<Gavel className="text-yellow-400" />}
            >
              <div className="space-y-4">
                {openBets.map(
                  (
                    bet: Bet // Explicitly typing bet here
                  ) => (
                    <div
                      key={bet.id}
                      className="p-4 bg-gray-700/50 rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h4 className="font-semibold text-white">
                          {bet.title}
                        </h4>
                        <p className="text-sm text-gray-400">
                          Participants: {bet.participants}
                        </p>
                      </div>
                      <span className="font-medium text-lg text-green-400">
                        {bet.stake}
                      </span>
                    </div>
                  )
                )}
              </div>
            </DashboardCard>
          </div>

          {/* --- Create Bet Column --- */}
          <div className="lg:col-span-1">
            <DashboardCard
              title="Create New Bet"
              icon={<PlusCircle className="text-green-400" />}
            >
              <form onSubmit={handleCreateBet} className="space-y-4">
                <div>
                  <label
                    htmlFor="bet-title"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Bet Title
                  </label>
                  <input
                    type="text"
                    id="bet-title"
                    value={betTitle}
                    onChange={(e) => setBetTitle(e.target.value)}
                    placeholder="e.g., 'X will break up with Y'"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bet-participants"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    Participants
                  </label>
                  <input
                    type="text"
                    id="bet-participants"
                    value={betParticipants}
                    onChange={(e) => setBetParticipants(e.target.value)}
                    placeholder="e.g., 'Me, My Friend'"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="bet-stake"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    The Stake
                  </label>
                  <input
                    type="text"
                    id="bet-stake"
                    value={betStake}
                    onChange={(e) => setBetStake(e.target.value)}
                    placeholder="e.g., '0.1 ETH' or '$20'"
                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-500 transition-all duration-200"
                >
                  <PlusCircle size={18} />
                  <span>Create Bet</span>
                </button>
              </form>
            </DashboardCard>
          </div>
        </section>
      </main>
    </div>
  );
}

/**
 * A reusable card component for the dashboard.
 */
function DashboardCard({ title, icon, children }: DashboardCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden h-full">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {/* This will now work without error */}
          {React.cloneElement(icon, { size: 20 })}
          <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

/**
 * A reusable card for displaying a single statistic.
 */
function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-5 flex items-center gap-4">
      <div className="p-3 bg-gray-700/50 rounded-full">
        {/* This will also work without error */}
        {React.cloneElement(icon, { size: 24 })}
      </div>
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
