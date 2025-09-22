"use client";
import React from "react";
import NavBar from "@/components/navbar_radix";
import Footer from "@/components/footer";
import { Button } from "@heroui/react";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <div className="relative w-full h-screen overflow-hidden place-content-center">
        <div className="absolute inset-0 w-full h-full flex justify-center items-center">
          <img
            src="/images/20250625-DSC00953-Enhanced-NR.jpg"
            alt="EIT Logo"
            className="object-cover opacity-20 object-center"
          />
        </div>
        <h1 className="py-8 text-4xl font-bold text-center text-black dark:text-white font-montserrat">
          Willkommen zur offiziellen Website der Fachschaft EIT
        </h1>
      </div>
      <Footer />
    </div>
  );
}
