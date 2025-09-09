"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function Info() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  // Log status on every render of the Info component
  console.log(`[Info Component Render] Current status: ${status}`);

  useEffect(() => {
    // This log will show every time the useEffect callback itself is executed
    console.log(`[useEffect Triggered] Effect is running with status: ${status}`);

    async function fetchUserData() {
      console.log(`  [fetchUserData Called] Current status inside async function: ${status}`);
      if (status === "authenticated") {
        console.log("    [fetchUserData] Status is 'authenticated', attempting to fetch data...");
        try {
          const res = await fetch("/api/directus/me");
          if (!res.ok) {
            console.error(`    [fetchUserData] Fetch request failed with status: ${res.status}`);
            throw new Error(`Request failed: ${res.statusText || res.status}`);
          }
          const data = await res.json();
          console.log("    [fetchUserData] Successfully fetched data:", data);
          setUserData(data);
        } catch (err) {
          console.error("    [fetchUserData] Error during fetch operation:", err);
        }
      } else {
        console.log(`  [fetchUserData] Status is '${status}', not fetching user data.`);
      }
    }

    fetchUserData();
  }, [status]); // Dependency array ensures this runs when 'status' changes

  if (status === "loading") {
    // console.log("[Info Component Render] Rendering 'Loading...'");
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    // console.log("[Info Component Render] Rendering 'Unauthenticated' message");
    return (
      <div className="w-full h-svh flex flex-col gap-20 items-center justify-center">
        <p className="text-2xl font-bold">
          Bitte melde dich an, um diese Seite zu sehen.
        </p>
      </div>
    );
  }

  // console.log("[Info Component Render] Rendering user data section, userData:", userData);
  return (
    <div className="flex flex-col items-center pt-[60px] h-full">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 sm:p-8">
        <section className="mb-8 pb-6 border-b border-gray-200 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Profile Picture
          </h2>
          {userData && userData.avatar ? (
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-300 shadow-md">
              <img
                src={`${process.env.NEXT_PUBLIC_DIRECTUS_URL}/assets/${userData.avatar}`}
                alt="User Avatar"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/150x150/e0e0e0/000000?text=No+Avatar";
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <span className="text-white text-sm font-medium">
                  Change Photo
                </span>
              </div>
            </div>
          ) : (
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-gray-300 shadow-md flex items-center justify-center bg-gray-100">
              <span className="text-gray-500">No Avatar</span>
            </div>
          )}
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-200 ease-in-out">
            Change Avatar
          </button>
        </section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {userData ? userData.first_name : <span className="text-gray-400">Loading...</span>}
        </h2>
      </div>
    </div>
  );
}