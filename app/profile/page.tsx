"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./../auth-context";
import {
  ArrowLeft,
  Mail,
  Gavel,
  Award,
  DollarSign,
  LucideProps,
} from "lucide-react";
import type { ProfileStatCardProps } from "../../lib/types";

/**
 * A simple reusable card for displaying profile stats.
 */

function ProfileStatCard({ title, value, icon }: ProfileStatCardProps) {
  return (
    <div className="bg-gray-700/50 rounded-xl p-5 flex items-center gap-4">
      <div className="p-3 bg-gray-800 rounded-full">
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div>
        <p className="text-sm text-gray-400 font-medium">{title}</p>
        <p className="text-2xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

/**
 * The User Profile Page
 */
export default function ProfilePage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // === This is the "Page Protection" logic ===
  useEffect(() => {
    // If the user is not logged in, redirect them to the login page
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, router]);
  // ==========================================

  // While redirecting or if not logged in, show a blank screen
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        {/* You could put a loading spinner here */}
      </div>
    );
  }

  // If logged in, show the profile page
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8 font-inter">
      <main className="max-w-4xl mx-auto">
        {/* === Back to Dashboard Link === */}
        <header className="mb-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </header>

        {/* === Main Profile Card === */}
        <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col items-center md:flex-row md:items-start gap-6">
              {/* Profile Picture */}
              <img
                src="https://placehold.co/128x128/6366f1/e0e7ff?text=U"
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-gray-700"
              />

              {/* Profile Info */}
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold text-white">Mock User</h1>
                <p className="text-lg text-gray-400 mt-1">@mock_user_handle</p>

                <div className="flex items-center justify-center md:justify-start gap-2 mt-4 text-indigo-300">
                  <Mail size={16} />
                  <span>user@example.com</span>
                </div>

                <p className="text-gray-300 mt-4 max-w-lg">
                  This is a mock bio. In the future, users will be able to edit
                  this from their settings page.
                </p>
              </div>
            </div>
          </div>

          {/* === Profile Stats === */}
          <div className="bg-gray-800/50 p-8 border-t border-gray-700">
            <h2 className="text-xl font-semibold text-white mb-6">
              Your Stats
            </h2>
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <ProfileStatCard
                title="Total Bets Joined"
                value={46}
                icon={<Gavel className="text-yellow-400" />}
              />
              <ProfileStatCard
                title="Bets Won"
                value={34}
                icon={<Award className="text-green-400" />}
              />
              <ProfileStatCard
                title="Total Staked"
                value="2.15 ETH"
                icon={<DollarSign className="text-indigo-400" />}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
