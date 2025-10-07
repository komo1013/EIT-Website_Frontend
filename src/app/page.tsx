"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { Image } from "@heroui/react";

export default function Homepage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <div className="w-full max-w-8xl flex items-center justify-center">
          <Image
            src="/images/20250625-DSC00953-Enhanced-NR.jpg"
            alt="EIT Logo"
            className="object-contain w-full h-auto max-h-[80vh]"
            isBlurred
          />
        </div>
        <h1 className="font-melodrama text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold text-center mt-6 sm:mt-8 md:mt-10 lg:mt-12 xl:mt-14 2xl:mt-16 px-4">
          Fachschaft EIT der HKA
        </h1>
      </div>
    </div>
  );
}
