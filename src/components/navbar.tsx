import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/react";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Switch } from "@heroui/react";
import { useTheme } from "next-themes";
import Logo from "@/logos/fs-eit-logo.svg";
import ChecklistIcon from "@/../public/checkliste.svg";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import the hook to detect route changes
import { useAuth } from "@/contexts/AuthContext";

function AccDropdownLoggedOut() {
  const [mounted, setMounted] = React.useState(false);
  const { theme, setTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();

  // run as soon as the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // if we are on the client, check the local storage for the theme
  // if we are on the server, we load with the default theme
  const currentIsSelected = mounted ? theme === "dark" : false;

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-end"
        closeOnSelect={false}
        className="bg-white dark:bg-black bg-opacity-40 backdrop-blur-full"
      >
        <DropdownTrigger>
          {isLoggedIn ? (
            <button className="transition w-8 h-8 flex items-center justify-center">
              <ChecklistIcon className="w-8 h-8" />
            </button>
          ) : (
            <Avatar as="button" className="transition w-8 h-8" size="sm" />
          )}
        </DropdownTrigger>
        <DropdownMenu>
          {isLoggedIn ? (
            <>
              <DropdownItem key="profile">
                <Link href="/profile" className="w-full">
                  <p className="text-md font-montserrat">Profil</p>
                </Link>
              </DropdownItem>
              <DropdownItem key="nextcloud">
                <Link href="https://cloud.eit-hka.de" target="_blank" rel="noopener noreferrer" className="w-full">
                  <p className="text-md font-montserrat">Nextcloud</p>
                </Link>
              </DropdownItem>
              <DropdownItem key="logout" onClick={logout}>
                <p className="text-md font-montserrat">Logout</p>
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem key="login">
                <Link href="/accounts" className="w-full">
                  <p className="text-md font-montserrat">Login</p>
                </Link>
              </DropdownItem>
              <DropdownItem key="nextcloud">
                <Link href="https://cloud.eit-hka.de" target="_blank" rel="noopener noreferrer" className="w-full">
                  <p className="text-md font-montserrat">Nextcloud</p>
                </Link>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

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

  const menuItems = [
    { label: "Wer sind wir?", href: "/about" },
    { label: "Team", href: "/team" },
    { label: "Vorteile für Studenten", href: "/vorteile_studenten"},
    { label: "Profil", href: "/profile" }
  ];

  return (
    <Navbar
      maxWidth="full"
      onMenuOpenChange={setIsMenuOpen}
      isBordered={false}
      className="fixed top-0 z-50 backdrop-blur-md bg-background-80 border-b border-divider bg-opacity-50"
      isMenuDefaultOpen={false}
    >
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="hidden sm:flex">
          <Link href="/">
            <Logo className={"h-[50px]"} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <Link href="/">
          <Logo className={"h-[50px]"} />
        </Link>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-8" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.href}>
            <Link href={item.href} className="font-montserrat text-lg">
              {item.label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <AccDropdownLoggedOut />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="bg-background-95 backdrop-blur-md w-full md:w-1/2 lg:w-1/3">
        {menuItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link className="w-full text-foreground py-5" href={item.href}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
