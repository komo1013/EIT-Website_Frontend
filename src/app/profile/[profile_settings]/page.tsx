"use client"
import NavBar from "@/components/navbar";
import { useSession, signIn, signOut } from "next-auth/react";
import { useThemeContext } from "@/contexts/ThemeContext"; 
import Image from "next/image";
