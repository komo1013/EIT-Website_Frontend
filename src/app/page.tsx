"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { Image } from "@heroui/react";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Text - appears first on mobile (top), second on desktop (right) */}
          <h1 className="font-melodrama text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center lg:text-left px-4 order-1 lg:order-2">
            Fachschaft EIT der HKA
          </h1>
          
          {/* Image - appears second on mobile (bottom), first on desktop (left) */}
          <div className="w-full lg:w-auto flex items-center justify-center order-2 lg:order-1">
            <Image
              src="/images/20250625-DSC00953-Enhanced-NR.jpg"
              alt="EIT Logo"
              className="object-contain w-full h-auto max-h-[60vh] lg:max-h-[70vh] max-w-full lg:max-w-2xl rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
