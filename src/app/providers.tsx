"use client";

import { HeroUIProvider } from "@heroui/react";
import {
  ThemeProvider as NextThemesProvider,
  type Attribute,
} from "next-themes";
import { useRouter } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider as ColorThemeProvider } from "@/contexts/ThemeContext";
// import { AuthProvider } from "@/contexts/AuthContext";

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
    <SessionProvider>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          {...themeProps}
        >
          <HeroUIProvider>
            <ColorThemeProvider>{children}</ColorThemeProvider>
          </HeroUIProvider>
        </NextThemesProvider>
    </SessionProvider>
  );
}
