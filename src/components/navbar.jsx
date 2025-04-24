import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/react";
import Logo from '../assets/fs-eit-logo.svg?react';
import LogoOnlyWords from '../assets/fs-eit-horizontal-words.svg?react';
import React from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    "Wer sind wir?",
    "Events",
    "O-Phase",
    "Files",
  ];

  return (
    <Navbar maxWidth="full" 
    onMenuOpenChange={setIsMenuOpen}
    isBlurred={false}
    className="fixed top-0 z-50 backdrop-blur-none bg-black bg-opacity-0">
      <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
      />
      <NavbarBrand className="items-center gap-2.5 justify-end sm:justify-start">
        <Logo className={"h-[50px]"}/>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 sm:justify-center md:justify-start">
        <NavbarItem>
          <Link className="text-foreground hover:text-primary" href="#">
            Wer sind wir?
          </Link>
        </NavbarItem> 
        <NavbarItem>
          <Link className="text-foreground hover:text-primary" href="#">
            Events
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-foreground hover:text-primary" href="#">
            O-Phase
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-foreground hover:text-primary" href="#">
            Files
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {/* <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem> */}
        <NavbarItem>
          {/* <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button> */}
          <Avatar name="HKA" />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full text-foreground hover:text-primary"
              href="#"
            >
            {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
