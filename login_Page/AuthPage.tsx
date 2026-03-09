"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { Toaster } from "@/components/components/ui/sonner";
import { TermsPrivacy } from "@/components/components/terms-privacy";
import { Info, Eye, EyeOff, Check } from "lucide-react";
import clsx from "clsx";
import { login as apiLogin } from "@/lib/api";
import ElectricBorder from "@/components/ElectricBorder";

interface Particle {
  id: number;
  x: number;
  y: number;
  age: number;
}

const backgroundColors = {
  blue: {
    via: "rgb(23, 37, 84)",
    particle: "rgba(96, 165, 250, 0.2)",
    grid: "rgba(59, 130, 246, 0.03)",
    light: "#e0e7ff",
    dark: "#1e293b"
  },
  orange: {
    via: "rgb(67, 20, 7)",
    particle: "rgba(251, 146, 60, 0.2)",
    grid: "rgba(249, 115, 22, 0.03)",
    light: "#ffe7d6",
    dark: "#7c2d12"
  },
  green: {
    via: "rgb(7, 67, 20)",
    particle: "rgba(34, 197, 94, 0.2)",
    grid: "rgba(22, 249, 115, 0.03)",
    light: "#d1fae5",
    dark: "#064e3b"
  },
  purple: {
    via: "rgb(67, 7, 84)",
    particle: "rgba(165, 96, 250, 0.2)",
    grid: "rgba(130, 59, 246, 0.03)",
    light: "#ede9fe",
    dark: "#581c87"
  },
  pink: {
    via: "rgb(131, 24, 67)",
    particle: "rgba(244, 114, 182, 0.2)",
    grid: "rgba(236, 72, 153, 0.03)",
    light: "#fce7f3",
    dark: "#831843"
  },
  teal: {
    via: "rgb(13, 148, 136)",
    particle: "rgba(45, 212, 191, 0.2)",
    grid: "rgba(20, 184, 166, 0.03)",
    light: "#ccfbf1",
    dark: "#134e4a"
  },
  yellow: {
    via: "rgb(202, 138, 4)",
    particle: "rgba(253, 224, 71, 0.2)",
    grid: "rgba(250, 204, 21, 0.03)",
    light: "#fef9c3",
    dark: "#713f12"
  },
};

type ThemeKey = keyof typeof backgroundColors;

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showGeneratedPassword, setShowGeneratedPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const [isOn, setIsOn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>("blue");
  const [streamParticles, setStreamParticles] = useState<Particle[]>([]);

  const currentBg = backgroundColors[currentTheme];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add new particle at cursor position
      const newParticle: Particle = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        age: 0,
      };
      
      setStreamParticles(prev => [...prev, newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animate and clean up particles
  useEffect(() => {
    const interval = setInterval(() => {
      setStreamParticles(prev => {
        return prev
          .map(p => ({ ...p, age: p.age + 1 }))
          .filter(p => p.age < 30);
      });
    }, 50);

    return () => clearInterval(interval);
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
        
        // Call the real EIT API via our proxy
        try {
          const response = await apiLogin({ 
            userid: username, 
            password: password 
          });
          
          // If login succeeds, set the auth state and redirect
          login(username);
          router.push("/profile");
        } catch (apiError) {
          // Handle API errors (wrong credentials, server error, etc.)
          setError(apiError instanceof Error ? apiError.message : "Login failed. Please check your credentials.");
          setIsLoading(false);
          return;
        }
      } else {
        if (!username || !generatedPassword) {
          setError("Please fill in all required fields");
          setIsLoading(false);
          return;
        }
        if (!isPasswordStrong(generatedPassword)) {
          setError("Password must be at least 8 characters with uppercase, lowercase, and a special character");
          setIsLoading(false);
          return;
        }
        // TODO: call your registration API here
        console.log("Registration attempt:", { username, email, generatedPassword });
        setIsLogin(true);
        setUsername("");
        setEmail("");
        setGeneratedPassword("");
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

  const handleRegisterClick = () => {
    setShowTerms(true);
  };

  const handleTermsAgree = () => {
    setShowTerms(false);
    setIsLogin(false);
  };

  const handleTermsBack = () => {
    setShowTerms(false);
    setIsLogin(true);
  };

  const isPasswordStrong = (pwd: string): boolean => {
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};:'"\\|,.<>\/?]/.test(pwd);
    const isLengthValid = pwd.length >= 8;
    return hasUppercase && hasLowercase && hasSpecialChar && isLengthValid;
  };

  const isRegisterButtonDisabled = !isLogin && (!username || !generatedPassword || !isPasswordStrong(generatedPassword));
  const isLoginButtonDisabled = isLogin && (!username || !password);

  if (showTerms) {
    return <TermsPrivacy onAgree={handleTermsAgree} onBack={handleTermsBack} />;
  }

  return (
    <div
      className="min-h-screen relative transition-colors duration-700"
      style={{
        backgroundImage: isOn
          ? `linear-gradient(to bottom, rgb(248, 250, 252), ${currentBg.via.replace("rgb", "rgba").replace(")", ", 0.1)")}, rgb(241, 245, 249))`
          : `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
        backgroundSize: "cover",
        backgroundColor: currentBg.via,
        height: "100vh",
      }}
    >
      <div
        className="fixed inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: isOn
            ? "radial-gradient(circle at 30% 50%, rgba(200, 200, 220, 0.4), transparent 60%), radial-gradient(circle at 70% 50%, rgba(180, 180, 200, 0.3), transparent 60%)"
            : "radial-gradient(circle at 30% 50%, rgba(100, 110, 130, 0.15), transparent 50%), radial-gradient(circle at 70% 50%, rgba(80, 90, 110, 0.12), transparent 50%)",
          backgroundSize: "200% 200%",
          animation: "metallicShift 20s ease-in-out infinite",
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-200"
        style={{
          backgroundImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentBg.particle.replace("0.2", "0.18")}, transparent 40%)`,
        }}
      />

      {/* Electric Stream Following Cursor */}
      {streamParticles.map((particle) => {
        const opacity = Math.max(0, 1 - particle.age / 30);
        const size = 2 + particle.age / 15;
        const blur = particle.age / 10;
        
        return (
          <div
            key={particle.id}
            className="fixed pointer-events-none z-40"
            style={{
              left: particle.x - size / 2,
              top: particle.y - size / 2,
              width: size,
              height: size,
              opacity,
            }}
          >
            <div
              className="w-full h-full rounded-full"
              style={{
                background: currentBg.particle.replace("0.2", "1"),
                boxShadow: `0 0 ${8 + blur * 2}px ${currentBg.particle.replace("0.2", "0.8")}, 0 0 ${16 + blur * 4}px ${currentBg.particle.replace("0.2", "0.4")}`,
                filter: `blur(${blur * 0.5}px)`,
              }}
            />
            
            {/* Electric arc effect */}
            {particle.age < 10 && particle.age % 3 === 0 && (
              <div 
                className="absolute top-0 left-1/2 w-0.5 rounded-full"
                style={{
                  height: `${Math.random() * 8 + 4}px`,
                  background: `linear-gradient(to bottom, ${currentBg.particle.replace("0.2", "0.9")}, transparent)`,
                  transform: `translateX(-50%) rotate(${Math.random() * 360}deg)`,
                  transformOrigin: "top",
                  boxShadow: `0 0 4px ${currentBg.particle.replace("0.2", "0.8")}`,
                }}
              />
            )}
          </div>
        );
      })}

      <div
        className="fixed inset-0 pointer-events-none z-30 transition-opacity duration-200"
        style={{
          backgroundImage: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${currentBg.particle.replace("0.2", "0.18")}, transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 bg-[size:50px_50px]" style={{ backgroundImage: `linear-gradient(${currentBg.grid} 1px, transparent 1px), linear-gradient(90deg, ${currentBg.grid} 1px, transparent 1px)` }} />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
        {/* Existing Login Form */}
        <ElectricBorder
          color={currentBg.particle.replace("0.2", "1")}
          speed={1}
          chaos={0.8}
          thickness={2}
          className=""
          style={{ borderRadius: 24 }}
        >
          <Card className="w-full max-w-md mx-auto bg-slate-950/40 backdrop-blur-xl border-0 rounded-3xl shadow-2xl shadow-blue-500/10">
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
                  {isLogin ? "User ID" : <span>RZ Username <span className="text-red-500">*</span></span>}
                </p>
                <Input
                  placeholder={isLogin ? "Enter your user ID" : "Enter RZ Username"}
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
                  <div className="flex items-center gap-1 justify-center">
                    <p className="text-center text-sm font-montserrat">Email</p>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-help" />
                      <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-gray-800 text-white text-xs rounded p-2 z-50">
                        You can choose to register with your University or Private Mail or none at all and add it later in the options
                      </div>
                    </div>
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email (optional)"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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

              {/* Password / RS Password Input */}
              <div className="flex flex-col items-center gap-2">
                <p className="text-center text-sm font-montserrat">
                  {isLogin ? "Password" : <span>RS Password <span className="text-red-500">*</span></span>}
                </p>
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Enter your password" : "Enter RS Password"}
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
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Generate Password Field (only for registration) */}
              {!isLogin && (
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-1 justify-center">
                    <p className="text-center text-sm font-montserrat">Generate Password <span className="text-red-500">*</span></p>
                    <div className="group relative">
                      <Info className="w-4 h-4 text-gray-400 hover:text-gray-200 cursor-help" />
                      <div className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-gray-800 text-white text-xs rounded p-2 z-50">
                        <div className="font-semibold mb-1">Password must contain:</div>
                        <ul className="space-y-0.5">
                          <li className={`flex items-center gap-1 ${generatedPassword.match(/[A-Z]/) ? 'text-green-400' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3" /> Uppercase letter
                          </li>
                          <li className={`flex items-center gap-1 ${generatedPassword.match(/[a-z]/) ? 'text-green-400' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3" /> Lowercase letter
                          </li>
                          <li className={`flex items-center gap-1 ${generatedPassword.match(/[!@#$%^&*(),.?":{}|<>]/) ? 'text-green-400' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3" /> Special character
                          </li>
                          <li className={`flex items-center gap-1 ${generatedPassword.length >= 8 ? 'text-green-400' : 'text-gray-400'}`}>
                            <Check className="w-3 h-3" /> 8+ characters
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="relative w-full">
                    <Input
                      type={showGeneratedPassword ? "text" : "password"}
                      placeholder="Enter your generated password"
                      value={generatedPassword}
                      onChange={(e) => setGeneratedPassword(e.target.value)}
                      isRequired
                      variant="bordered"
                      classNames={{
                        label: "font-montserrat",
                        input: "font-montserrat text-center focus:outline-none",
                        inputWrapper:
                          "border-none rounded-2xl bg-[rgba(50,50,50,0.9)] w-full focus-within:outline-none pr-12 transition-all duration-300 focus-within:shadow-[0_0_15px_rgba(168,85,247,0.6)] focus-within:ring-2 focus-within:ring-purple-500/50",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowGeneratedPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 transition-colors"
                      aria-label={showGeneratedPassword ? "Hide password" : "Show password"}
                    >
                      {showGeneratedPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

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
                isDisabled={isLogin ? isLoginButtonDisabled : isRegisterButtonDisabled}
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
                  onClick={isLogin ? handleRegisterClick : handleToggle}
                  className="font-montserrat text-sm"
                >
                  {isLogin ? "Register here" : "Login here"}
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
        </ElectricBorder>
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