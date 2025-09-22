"use client";
import Footer from "@/components/footer";
import "../globals.css";
import { Providers } from "../providers";
import React from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  // run as soon as the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Providers
      themeProps={{
        attribute: "class",
        defaultTheme: "dark",
        enableSystem: false,
      }}
    >
      {children}
    </Providers>
  );
}