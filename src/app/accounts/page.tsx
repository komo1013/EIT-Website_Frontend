"use client";

import NavBar from "@/components/navbar";
import AuthPage from "../../../login_Page/AuthPage";

export default function AccountsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <AuthPage />
      </div>
    </div>
  );
}
