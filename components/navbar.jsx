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
import Logo from "../logos/fs-eit-logo.svg";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation"; // Import the hook to detect route changes
import { useSession, signOut } from "next-auth/react";

export const MoonIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M14.438 10.148c.19-.425-.321-.787-.748-.601A5.5 5.5 0 0 1 6.453 2.31c.186-.427-.176-.938-.6-.748a6.501 6.501 0 1 0 8.585 8.586Z" />
    </svg>
  );
};

export const SunIcon = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
    >
      <path d="M8 1a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 1ZM10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM12.95 4.11a.75.75 0 1 0-1.06-1.06l-1.062 1.06a.75.75 0 0 0 1.061 1.062l1.06-1.061ZM15 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 15 8ZM11.89 12.95a.75.75 0 0 0 1.06-1.06l-1.06-1.062a.75.75 0 0 0-1.062 1.061l1.061 1.06ZM8 12a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 8 12ZM5.172 11.89a.75.75 0 0 0-1.061-1.062L3.05 11.89a.75.75 0 1 0 1.06 1.06l1.06-1.06ZM4 8a.75.75 0 0 1-.75.75h-1.5a.75.75 0 0 1 0-1.5h1.5A.75.75 0 0 1 4 8ZM4.11 5.172A.75.75 0 0 0 5.173 4.11L4.11 3.05a.75.75 0 1 0-1.06 1.06l1.06 1.06Z" />
    </svg>
  );
};

function AccDropdownLoggedIn() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // run as soon as the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // if we are on the client, check the local storage for the theme
  // if we are on the server, we load with the default theme
  const currentIsSelected = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-end"
        closeOnSelect={false}
        className="bg-black bg-opacity-40 blur-full"
      >
        <DropdownTrigger>
          <Avatar as="button" className="transition" />
        </DropdownTrigger>
        <DropdownMenu aria-label="Dynamic Actions Logged In">
          <DropdownItem key={"settings"}>
            <Link href="/account" passHref>
              <p className="text-md">Account settings</p>
            </Link>
          </DropdownItem>
          <DropdownItem
            key="theme"
            className="cursor-default"
            startContent={<p className="text-md">Dark mode</p>}
          >
            <Switch
              size="md"
              isSelected={currentIsSelected}
              onValueChange={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <MoonIcon className={className} />
                ) : (
                  <SunIcon className={className} />
                )
              }
            ></Switch>
          </DropdownItem>
          <DropdownItem
            key={"logout"}
            className="text-danger"
            color="danger"
            onPress={() => signOut()}
          >
            <p className="text-md">Logout</p>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

function AccDropdownLoggedOut() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // run as soon as the component mounts
  React.useEffect(() => {
    setMounted(true);
  }, []);
  // if we are on the client, check the local storage for the theme
  // if we are on the server, we load with the default theme
  const currentIsSelected = mounted ? resolvedTheme === "dark" : false;

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        placement="bottom-end"
        closeOnSelect={false}
        className="bg-white dark:bg-black bg-opacity-40 backdrop-blur-full"
      >
        <DropdownTrigger>
          <Avatar as="button" className="transition" />
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem key={"register"}>
            <Link href="/register" passHref>
              <p className="text-md">Register</p>
            </Link>
          </DropdownItem>
          <DropdownItem key={"login"}>
            <Link href="/login" passHref>
              <p className="text-md">Login</p>
            </Link>
          </DropdownItem>
          <DropdownItem
            key="theme"
            className="cursor-default"
            startContent={<p className="text-md">Dark mode</p>}
          >
            <Switch
              size="md"
              isSelected={currentIsSelected}
              onValueChange={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              thumbIcon={({ isSelected, className }) =>
                isSelected ? (
                  <MoonIcon className={className} />
                ) : (
                  <SunIcon className={className} />
                )
              }
            ></Switch>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}

export default function App() {
  const { data: session, status: isAuthenticated } = useSession();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
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
      className="fixed top-0 z-50 backdrop-blur-full bg-white bg-opacity-50 backdrop-blur-md dark:bg-black dark:bg-opacity-50 dark:backdrop-blur-md "
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
        font-doto font-semibold text-black dark:text-white"
        >
          {mounted ? "Fachschaft EIT" : ""}
        </p>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {isAuthenticated === "authenticated" ? (
            <AccDropdownLoggedIn />
          ) : (
            <AccDropdownLoggedOut />
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu className="bg-opacity-60 blur-full w-full md:w-1/2 lg:w-1/3">
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
