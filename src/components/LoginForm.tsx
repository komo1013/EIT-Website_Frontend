"use client";

import React, { useState } from "react";
import { Input, Button, Card, CardBody, CardHeader } from "@heroui/react";
import { login } from "@/lib/api";

export default function LoginForm() {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await login({ userid, password });
      setSuccess(response.message);
      setPassword(""); // Clear password on success
      
      // Optionally redirect or update UI state
      setTimeout(() => {
        // You can redirect to a dashboard or update auth state
        console.log("Login successful!");
      }, 1500);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-col gap-1 px-6 pt-6">
        <h2 className="text-2xl font-bold font-montserrat">Login</h2>
        <p className="text-sm text-default-500 font-montserrat">
          Sign in to your EIT account
        </p>
      </CardHeader>
      <CardBody className="px-6 pb-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="User ID"
            placeholder="Enter your user ID"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
            isRequired
            variant="bordered"
            classNames={{
              label: "font-montserrat",
              input: "font-montserrat",
            }}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isRequired
            variant="bordered"
            classNames={{
              label: "font-montserrat",
              input: "font-montserrat",
            }}
          />
          
          {error && (
            <div className="px-4 py-3 rounded-lg bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800">
              <p className="text-sm text-danger-600 dark:text-danger-400 font-montserrat">
                {error}
              </p>
            </div>
          )}
          
          {success && (
            <div className="px-4 py-3 rounded-lg bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800">
              <p className="text-sm text-success-600 dark:text-success-400 font-montserrat">
                {success}
              </p>
            </div>
          )}

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
