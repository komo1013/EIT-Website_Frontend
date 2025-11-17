"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar";

export default function ProfilePage() {
  const { isLoggedIn, username, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/accounts");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">Welcome, {username}!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
            You are successfully logged in.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h2 className="font-semibold mb-2">Profile Information</h2>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Username: <span className="font-medium">{username}</span>
              </p>
            </div>

            <button
              onClick={() => {
                logout();
                router.push("/");
              }}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}