"use client";

import React, { useState, useEffect } from "react";
import { Form, Checkbox, Button, Input } from "@heroui/react";
import Logo from "@/logos/fs-eit-logo.svg";
// Update the import path to match the actual file name and extension, e.g.:
import NavBar from "@/components/navbar"; // or "@/components/navbar_radix.tsx" if that's the correct file

function verifyUser(username: string, password: string) {
  // This uses the raumzeit API to verify user credentials
  return fetch("/api/raumzeit-persons", {
    method: "POST",
    body: JSON.stringify({
      login: username, // RaumZeit API expects 'login', not 'username'
      password: password,
    }),
  });
}

export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [data, setData] = React.useState(null);

  return (
    <div>
      <NavBar />
      <div className="flex flex-col items-center justify-center min-h-screen pt-[60px] px-4">
        <div className="w-full max-w-md flex flex-col gap-6 p-10 rounded-xl shadow-2xl backdrop-blur-2xl bg-white/50 dark:bg-black/50">
          <Logo className="h-[70px] lg:h-[100px] mx-auto" />
          <Form
            className="w-full flex flex-col gap-6"
            onSubmit={(e) => {
              e.preventDefault();
              let data = Object.fromEntries(new FormData(e.currentTarget));
              setIsLoading(true);
              setError(""); // Clear previous errors
              verifyUser(data.username as string, data.password as string)
                .then((response) => {
                  if (response.ok) {
                    return response.json();
                  } else {
                    throw response;
                  }
                })
                .then((jsonData) => {
                  setData(jsonData);
                })
                .catch((error) => {
                  if (error.status === 403) {
                    setError("Wrong credentials");
                  } else if (error.status === 429) {
                    setError("Locked out");
                  } else {
                    setError("Login failed");
                  }
                })
                .finally(() => {
                  setIsLoading(false); // Always set loading to false when done
                });
            }}
          >
            <Input
              name="username"
              label="Username"
              placeholder="Enter your RZ-Kürzel"
              validate={(value) => {
                if (!value) {
                  return "Username is required.";
                }
                let p1 = value.slice(0, 4);
                let p2 = value.slice(4);
                if (!/^[a-zA-Z]+$/.test(p1) || !/^[0-9]+$/.test(p2)) {
                  return "Invalid Username!";
                }
                if (parseInt(p2) - 1000 < 0) {
                  return "Looks suspiciosly like a prof...";
                }
              }}
              endContent={
                <div className="pointer-events-none flex items-center w-1/2 justify-end">
                  <span className="text-default-400 text-md md:text-md text-neutral-600 dark:text-neutral-400 font-montserrat">
                    @h-ka.de
                  </span>
                </div>
              }
              required
              classNames={{
                inputWrapper: [
                  "bg-black/20 dark:bg-black/20",
                  "transition-all",
                  "rounded-lg",
                  "backdrop-blur-xl",
                  "data-[hover=true]:bg-black/30 dark:data-[hover=true]:bg-black/30",
                  "data-[hover=true]:shadow-sm",
                  "data-[hover=true]:shadow-primary/50",
                  "group-data-[focus=true]:bg-black/10 dark:group-data-[focus=true]:bg-black/10",
                  "group-data-[focus=true]:shadow-md",
                  "group-data-[focus=true]:shadow-primary/50",
                ],
                label: "text-black dark:text-white font-montserrat",
                input: "text-black dark:text-white font-montserrat",
              }}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Enter your password"
              required
              classNames={{
                inputWrapper: [
                  "bg-black/20 dark:bg-black/20",
                  "transition-all",
                  "rounded-lg",
                  "backdrop-blur-xl",
                  "data-[hover=true]:bg-black/30 dark:data-[hover=true]:bg-black/30",
                  "data-[hover=true]:shadow-sm",
                  "data-[hover=true]:shadow-primary/50",
                  "group-data-[focus=true]:bg-black/10 dark:group-data-[focus=true]:bg-black/10",
                  "group-data-[focus=true]:shadow-md",
                  "group-data-[focus=true]:shadow-primary/50",
                ],
                label: "text-black dark:text-white font-montserrat",
                input: "text-black dark:text-white font-montserrat",
              }}
            />
            <Button
              type="submit"
              color="primary"
              variant="shadow"
              className="w-full"
              isLoading={isLoading}
              isDisabled={isLoading}
            >
              <span className="font-montserrat">Login</span>
            </Button>
            {error === "Wrong credentials" && (
              <p className="text-red-500 dark:text-red-400 text-sm font-montserrat">
                Falscher Benutzername oder Passwort
              </p>
            )}
            {error === "Locked out" && (
              <p className="text-red-500 dark:text-red-400 text-sm font-montserrat">
                Zu viele Fehlversuche. Bitte später erneut versuchen.
              </p>
            )}
            {error === "Login failed" && (
              <p className="text-red-500 dark:text-red-400 text-sm font-montserrat">
                Login fehlgeschlagen. Bitte versuchen Sie es erneut.
              </p>
            )}
            {data != null && (
              <p className="text-green-600 dark:text-green-400 text-sm font-montserrat">
                Erfolgreich eingeloggt!
              </p>
            )}
          </Form>
        </div>
      </div>
    </div>
  );
}
