"use client";

import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider as NextThemesProvider, type Attribute } from "next-themes";
import { useRouter } from "next/navigation";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider as ColorThemeProvider } from "@/contexts/ThemeContext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: {
    attribute?: Attribute | Attribute[];
    defaultTheme?: string;
    enableSystem?: boolean;
  };
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      {...themeProps}
    >
      <HeroUIProvider>
        <AuthProvider>
          <ColorThemeProvider>
            {children}
          </ColorThemeProvider>
        </AuthProvider>
      </HeroUIProvider>
    </NextThemesProvider>
  );
}