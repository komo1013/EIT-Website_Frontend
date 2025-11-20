"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Toaster } from "@/components/components/ui/sonner";
import clsx from "clsx";

interface Particle {
  id: number;
  x: number;
  y: number;
  age: number;
}

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const backgroundColors = {
    blue: { via: "rgb(23, 37, 84)", particle: "rgba(96, 165, 250, 0.2)", grid: "rgba(59, 130, 246, 0.03)" },
    orange: { via: "rgb(67, 20, 7)", particle: "rgba(251, 146, 60, 0.2)", grid: "rgba(249, 115, 22, 0.03)" },
  };

  const currentBg = backgroundColors.blue;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        if (!username || !password) {
          setError("Please fill in all fields");
          setIsLoading(false);
          return;
        }
        // TODO: call your login API here
        console.log("Login attempt:", { username, password });

        // After successful login (when you integrate real API):
        login(username);
        router.push("/profile");
      } else {
        if (!username || !email || !password) {
          setError("Please fill in all fields");
          setIsLoading(false);
          return;
        }
        // TODO: call your registration API here
        console.log("Registration attempt:", { username, email, password });
        setIsLogin(true);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div
      className="min-h-screen relative transition-colors duration-700"
      style={{
        background: isOn
          ? `linear-gradient(to bottom, rgb(248, 250, 252), ${currentBg.via.replace("rgb", "rgba").replace(")", ", 0.1)")}, rgb(241, 245, 249))`
          : `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
        backgroundSize: "cover",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          background: isOn
            ? "radial-gradient(circle at 30% 50%, rgba(200, 200, 220, 0.4), transparent 60%), radial-gradient(circle at 70% 50%, rgba(180, 180, 200, 0.3), transparent 60%)"
            : "radial-gradient(circle at 30% 50%, rgba(100, 110, 130, 0.15), transparent 50%), radial-gradient(circle at 70% 50%, rgba(80, 90, 110, 0.12), transparent 50%)",
          backgroundSize: "200% 200%",
          animation: "metallicShift 20s ease-in-out infinite",
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-200"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentBg.particle.replace("0.2", "0.18")}, transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 bg-[size:50px_50px]" style={{ backgroundImage: `linear-gradient(${currentBg.grid} 1px, transparent 1px), linear-gradient(90deg, ${currentBg.grid} 1px, transparent 1px)` }} />

      <div className="relative z-10 flex items-center justify-center min-h-screen">
        {/* Existing Login Form */}
        <Card className="w-full max-w-md mx-auto">
          {/* Card Header with Title and Description */}
          <CardHeader className="flex flex-col gap-1 px-6 pt-6">
            <h2 className="text-2xl font-bold font-montserrat">
              {isLogin ? "Login" : "Register"}
            </h2>
            <p className="text-sm text-default-500 font-montserrat">
              {isLogin ? "Sign in to your EIT account" : "Create a new EIT account"}
            </p>
          </CardHeader>

          {/* Card Body with Form */}
          <CardBody className="px-6 pb-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Username Input */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-center text-sm font-montserrat">
                  {isLogin ? "User ID" : "Username"}
                </p>
                <Input
                  placeholder={isLogin ? "Enter your user ID" : "Choose a username"}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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

              {/* Email Input (only for registration) */}
              {!isLogin && (
                <div className="flex flex-col items-center gap-2">
                  <p className="text-center text-sm font-montserrat">Email</p>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired
                    variant="bordered"
                    classNames={{
                      label: "font-montserrat",
                      input: "font-montserrat text-center focus:outline-none",
                      inputWrapper:
                        "border-none rounded-2xl bg-[rgba(50,50,50,0.9)] w-full focus-within:outline-none transition-all duration-300 focus-within:shadow-[0_0_15px_rgba(34,197,94,0.6)] focus-within:ring-2 focus-within:ring-green-500/50",
                    }}
                  />
                </div>
              )}

              {/* Password Input */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-center text-sm font-montserrat">Password</p>
                <div className="relative w-full">
                  <Input
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
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                    ) : (
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

              {/* Submit Button with Loading State */}
              <Button
                type="submit"
                color="primary"
                isLoading={isLoading}
                className="w-full font-montserrat font-semibold"
              >
                {isLoading ? (isLogin ? "Signing in..." : "Creating account...") : (isLogin ? "Sign In" : "Register")}
              </Button>

              {/* Toggle Between Login and Registration */}
              <div className="flex flex-col items-center gap-2 pt-4 border-t border-default-200">
                <p className="text-sm text-default-500 font-montserrat">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                </p>
                <Button
                  type="button"
                  variant="light"
                  color="primary"
                  onClick={handleToggle}
                  className="font-montserrat text-sm"
                >
                  {isLogin ? "Register here" : "Login here"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </div>

      <Toaster position="top-right" richColors />

      <style>{`
        @keyframes metallicShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
      `}</style>
    </div>
  );
}