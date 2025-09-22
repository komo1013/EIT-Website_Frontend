import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import Logo from "@/logos/fs-eit-logo.svg";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import the hook to detect route changes


export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // run as soon as the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setIsMenuOpen(false); // Close the navigation panel
  }, [pathname]);

  const menuItems = ["Wer sind wir?", "Events", "O-Phase"];

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      isBordered={false}
      className="fixed top-0 z-50 backdrop-blur-md bg-background/80 border-b border-divider"
      isMenuDefaultOpen={false}
    >
      <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      <NavbarBrand className="items-center gap-2.5 justify-end sm:justify-start">
        <Link href="/">
          <Logo className={"h-[50px]"} />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 justify-evenly">
        <p
          className="select-none 
        text-2xl text-center md:text-3xl lg:text-3xl xl:text-4xl
        font-doto font-semibold text-foreground"
        >
          {mounted ? "Fachschaft EIT" : ""}
        </p>
      </NavbarContent>
      <NavbarContent justify="end">
        {mounted && (
          <Switch
            isSelected={theme === "dark"}
            onValueChange={(isSelected) => setTheme(isSelected ? "dark" : "light")}
            size="sm"
            color="primary"
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <span className={className}>🌙</span>
              ) : (
                <span className={className}>☀️</span>
              )
            }
          />
        )}
      </NavbarContent>
      <NavbarMenu className="bg-background/95 backdrop-blur-md w-full md:w-1/2 lg:w-1/3">
        {/* This is a menu that is only visible on mobile devices. */}
        <NavbarMenuItem key="info">
          <Link className="w-full text-foreground py-5" href="/info">
            Wer sind wir?
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="events">
          <Link className="w-full text-foreground py-5" href="#">
            Events
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem key="o-phase">
          <Link className="w-full text-foreground py-5" href="#">
            O-Phase
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}