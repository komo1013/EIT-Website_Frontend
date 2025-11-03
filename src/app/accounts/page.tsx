"use client";

import NavBar from "@/components/navbar";
import LoginForm from "@/components/LoginForm";

export default function AccountsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <LoginForm />
      </div>
    </div>
  );
}
