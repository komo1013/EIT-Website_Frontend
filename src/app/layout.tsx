import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontUbuntu, fontDoto, fontMontserrat, fontSixtyFour } from "@/fonts/fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "EIT Website",
  description: "Fachschaft EIT Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontUbuntu.variable} ${fontDoto.variable} ${fontMontserrat.variable} ${fontSixtyFour.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: false,
          }}
        >
          {children}
        </Providers>
      </body>
    </html>
  );
}