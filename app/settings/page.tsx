"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "./../auth-context";
import { ArrowLeft, User, Mail, Lock, Trash2 } from "lucide-react";
import type { SettingsCardProps, SettingsInputProps } from "../../lib/types";

/**
 * A reusable card wrapper for settings sections.
 */
function SettingsCard({ title, description, children }: SettingsCardProps) {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 md:p-8">
        <h2 className="text-xl font-semibold text-white">{title}</h2>
        <p className="text-gray-400 mt-1">{description}</p>
        <div className="mt-6 space-y-4">{children}</div>
      </div>
    </div>
  );
}

/**
 * A reusable input field for the settings page.
 */

function SettingsInput({
  label,
  id,
  type,
  defaultValue,
  icon,
  autoComplete,
}: SettingsInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {React.cloneElement(icon, { size: 18, className: "text-gray-400" })}
        </div>
        <input
          type={type}
          id={id}
          name={id}
          autoComplete={autoComplete}
          className="block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm pl-10 pr-3 py-2 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}

/**
 * The User Settings Page
 */
export default function SettingsPage() {
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

  // If logged in, show the settings page
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
          <h1 className="text-3xl font-bold text-white mt-4">Settings</h1>
        </header>

        {/* === Settings Cards === */}
        <div className="space-y-8">
          {/* Profile Settings */}
          <SettingsCard
            title="Profile"
            description="This information will be displayed publicly."
          >
            <SettingsInput
              label="Username"
              id="username"
              type="text"
              defaultValue="Mock User"
              icon={<User />}
              autoComplete="username"
            />
            <SettingsInput
              label="Handle"
              id="handle"
              type="text"
              defaultValue="@mock_user_handle"
              icon={<User />}
              autoComplete="off"
            />
            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-300"
              >
                Bio
              </label>
              <div className="mt-1">
                <textarea
                  id="bio"
                  name="bio"
                  rows={3}
                  className="block w-full bg-gray-700/50 border-gray-600 rounded-md shadow-sm p-2 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  defaultValue="This is a mock bio. In the future, users will be able to edit this from their settings page."
                />
              </div>
            </div>
            <button className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors">
              Save Profile
            </button>
          </SettingsCard>

          {/* Account Settings */}
          <SettingsCard
            title="Account"
            description="Manage your account settings and email."
          >
            <SettingsInput
              label="Email"
              id="email"
              type="email"
              defaultValue="user@example.com"
              icon={<Mail />}
              autoComplete="email"
            />
            <SettingsInput
              label="New Password"
              id="new-password"
              type="password"
              defaultValue="xxxxxxxxx"
              icon={<Lock />}
              autoComplete="new-password"
            />
            <button className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded-md font-semibold text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transition-colors">
              Update Account
            </button>
          </SettingsCard>

          {/* Danger Zone */}
          <SettingsCard
            title="Danger Zone"
            description="Irreversible and destructive actions."
          >
            <div className="flex justify-between items-center p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
              <div>
                <h3 className="font-semibold text-red-300">
                  Delete Your Account
                </h3>
                <p className="text-sm text-red-300/80">
                  Once deleted, your account and all data will be gone forever.
                </p>
              </div>
              <button className="px-3 py-2 bg-red-600 text-white rounded-md font-semibold text-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition-colors whitespace-nowrap">
                <Trash2 size={16} className="inline mr-1" />
                Delete Account
              </button>
            </div>
          </SettingsCard>
        </div>
      </main>
    </div>
  );
}
