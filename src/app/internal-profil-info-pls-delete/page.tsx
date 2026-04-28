"use client";

import NavBar from "@/components/navbar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardBody,
  Avatar,
  Divider,
  Spinner,
} from "@heroui/react";

export default function UserInfoPage() {
  // Require authentication to view this page. If unauthenticated, redirect to login page.
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/accounts");
    },
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Spinner size="lg" color="primary" label="Loading Account..." />
        </div>
      </div>
    );
  }

  // Safely extract our custom OIDC claims
  const user = session?.user as any;
  const userName = user?.given_name || user?.nickname || user?.name || "User";
  const userEmail = user?.email || "No email available";
  const userGroups = user?.groups?.join(", ") || "No groups assigned";
  const userImage = user?.image;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <NavBar />
      <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 pt-24 pb-8">
        <Card className="w-full max-w-xl shadow-lg">
          <CardHeader className="flex gap-6 p-8">
            <Avatar
              src={userImage}
              name={userName}
              isBordered
              color="primary"
              className="w-24 h-24 text-large"
            />
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-bold font-montserrat">{userName}</h2>
              <p className="text-medium text-default-500 font-montserrat">
                {userEmail}
              </p>
            </div>
          </CardHeader>

          <Divider />

          <CardBody className="p-8 flex flex-col gap-6 font-montserrat">
            <div className="flex flex-row gap-6 w-full">
              <div className="flex-1">
                <p className="text-medium font-semibold text-default-600">
                  Username
                </p>
                <p className="text-large text-default-800">
                  {user?.preferred_username || user?.nickname || "N/A"}
                </p>
              </div>
              <div className="flex-1">
                <p className="text-medium font-semibold text-default-600">
                  Given Name
                </p>
                <p className="text-large text-default-800">
                  {user?.given_name || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-6 w-full">
              <div className="flex-1">
                <p className="text-medium font-semibold text-default-600">
                  Groups
                </p>
                <p className="text-large text-default-800">{userGroups}</p>
              </div>

              <div className="flex-1">
                <p className="text-medium font-semibold text-default-600">
                  Affiliation
                </p>
                <p className="text-large text-default-800">
                  {user?.affiliation || "N/A"}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
