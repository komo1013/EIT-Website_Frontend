"use client"; // Enable client-side rendering for this component

/**
 * @fileoverview Login Form Component for the EIT website
 * This component provides user authentication functionality using the EIT API
 * 
 * Features:
 * - User ID and password input fields
 * - Error and success message display
 * - Loading state handling
 * - Form validation
 * - Secure authentication via API
 */

import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { login } from "@/lib/api";

/**
 * LoginForm Component
 * Renders a form for user authentication with the EIT system
 * 
 * @component
 * @returns {JSX.Element} A styled login form with input fields and error handling
 */
export default function LoginForm() {
  // State management for form fields and UI states
  const [userid, setUserid] = useState(""); // User ID input state
  const [password, setPassword] = useState(""); // Password input state (never stored in localStorage)
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state for submit button
  const [error, setError] = useState(""); // Error message state
  const [success, setSuccess] = useState(""); // Success message state

  /**
   * Handle form submission
   * Attempts to authenticate the user with provided credentials
   * 
   * @param {React.FormEvent} e - Form submission event
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    
    // Reset state before new attempt
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      // Attempt login with provided credentials
      const response = await login({ userid, password });
      
      // Handle successful login
      setSuccess(response.message);
      setPassword(""); // Clear password from state for security
      
      // Allow time for success message before redirect
      setTimeout(() => {
        // TODO: Add redirect or auth state update here
        // Example: router.push('/dashboard')
        console.log("Login successful!");
      }, 1500);
    } catch (err) {
      // Handle login errors
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      // Reset loading state regardless of outcome
      setIsLoading(false);
    }
  };

  /**
   * Render the login form
   * Uses HeroUI components for a consistent design
   */
  return (
    <Card className="w-full max-w-md mx-auto">
      {/* Card Header with Title and Description */}
      <CardHeader className="flex flex-col gap-1 px-6 pt-6">
        <h2 className="text-2xl font-bold font-montserrat">Login</h2>
        <p className="text-sm text-default-500 font-montserrat">
          Sign in to your EIT account
        </p>
      </CardHeader>

      {/* Card Body with Form */}
      <CardBody className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm font-montserrat">User ID</p>
            <Input
              //label="User ID"
              placeholder="Enter your user ID"
              value={userid}
              onChange={(e) => setUserid(e.target.value)}
              isRequired
              variant="bordered"
              classNames={{
              label: "font-montserrat",
              input: "font-montserrat text-center focus:outline-none",
              inputWrapper:
                "border-none rounded-2xl bg-[rgba(50,50,50,0.9)] w-full focus-within:outline-none transition-all duration-300 focus-within:shadow-[0_0_15px_rgba(99,102,241,0.6)] focus-within:ring-2 focus-within:ring-blue-500/50",
              }}
            />
            </div>

            <div className="flex flex-col items-center gap-2">
            <p className="text-center text-sm font-montserrat">Password</p>
            <div className="relative w-full">
              <Input
                //label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="        Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isRequired
                variant="bordered"
                classNames={{
                label: "font-montserrat",
                input: "font-montserrat text-center focus:outline-none",
                inputWrapper:
                  "border-none rounded-2xl bg-[rgba(50,50,50,0.9)] w-full focus-within:outline-none pr-12 transition-all duration-300 focus-within:shadow-[0_0_15px_rgba(239,68,68,0.6)] focus-within:ring-2 focus-within:ring-red-500/50",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Auge offen (Passwort ist sichtbar - zum Verstecken)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  // Auge durchgestrichen (Passwort ist versteckt - zum Anzeigen)
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
            </div>
            
            {/* Error Message Display */}
            {error && (
            <div className="px-4 py-3 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800">
              <p className="text-sm text-danger-600 dark:text-danger-400 font-montserrat">
              {error}
              </p>
            </div>
            )}
            
            {/* Success Message Display */}
            {success && (
            <div className="px-4 py-3 rounded-lg bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800">
              <p className="text-sm text-success-600 dark:text-success-400 font-montserrat">
              {success}
              </p>
            </div>
            )}

            {/* Submit Button with Loading State */}
            <Button
            type="submit"
            color="primary"
            isLoading={isLoading}
            className="w-full font-montserrat font-semibold"
            >
            {isLoading ? "Signing in..." : "Sign In"}
            </Button>
        </form>
      </CardBody>
    </Card>
  );
}
