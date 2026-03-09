"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";
import Construction from "@/components/construction";
import AnimatedList from "@/components/AnimatedList";
import FadeContent from "@/components/FadeContent";
const fertig = true;
const items = ['item 1', 'spotify', 'Youtube'];
export default function App() {
  const { currentBg } = useThemeContext();

  if (!fertig) {
    return (
      <div>
        <Construction />
      </div>
    );
  }
  return (
    <div className="min-h-screen" 
    style={{ 
      background: `linear-gradient(to bottom, ${currentBg.darker}, ${currentBg.via}, ${currentBg.dark})`,
      //backgroundColor: currentBg 
      }}>
      <NavBar />
      <div className="flex flex-col items-center justify-center pt-[80px]">
        <h1 className="text-4xl font-bold mb-6 text-white">Vorteile für Studenten</h1>
        <FadeContent blur={true} duration={1000} delay={0.2}>
          <AnimatedList items={items} />
        </FadeContent>
      </div>
    </div>
  );
}
