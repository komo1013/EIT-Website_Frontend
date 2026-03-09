import type { Metadata } from "next";
import "./globals.css";
import { fontSans, fontUbuntu, fontDoto, fontMontserrat, fontSixtyFour, fontMelodrama } from "@/fonts/fonts";
import { Providers } from "./providers";
import Footer from "@/components/footer";

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
        className={`${fontSans.variable} ${fontUbuntu.variable} ${fontDoto.variable} ${fontMontserrat.variable} ${fontSixtyFour.variable} ${fontMelodrama.variable} antialiased min-h-screen bg-background font-sans`}
      >
        <Providers
          themeProps={{
            attribute: "class",
            defaultTheme: "dark",
            enableSystem: false,
          }}
        >
           <div className="flex flex-col min-h-screen">
            
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}