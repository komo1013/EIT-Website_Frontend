"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import Construction from "@/components/construction";

const fertig = false;

export default function App() {
  return (
    <div>
      <Construction />
    </div>
  );
}
