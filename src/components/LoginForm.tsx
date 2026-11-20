"use client";

import React, { useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Add callbackUrl to redirect after a successful login
    signIn("authentik", { callbackUrl: "/" });
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
        <Button
          color="primary"
          isLoading={isLoading}
          onPress={handleLogin}
          className="w-full font-montserrat font-semibold"
        >
          {isLoading ? "Redirecting..." : "Login to Authentik"}
        </Button>
      </CardBody>
    </Card>
  );
}