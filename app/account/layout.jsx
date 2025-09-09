"use client";
import "../../styles/globals.css";
import { Providers } from "../providers";
import NavBar from "../../components/navbar";
import React from "react";

export default function RootLayout({ children }) {
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
      <NavBar />
      {children}
    </Providers>
  );
}
