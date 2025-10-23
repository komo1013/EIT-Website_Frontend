"use client";
import React from "react";
import { Card, CardBody, Button, Image } from "@heroui/react";
import Link from "next/link";

export default function Construction() {
  const quickLinks = [
    {
      name: "HKA EIT",
      href: "https://www.h-ka.de/eit",
      bgColor: "#288732",
      hoverColor: "#1f6a24",
    },
    {
      name: "AStA Homepage",
      href: "https://www.asta-hka.de/",
      bgColor: "#e5231f",
      hoverColor: "#b71c1c",
    },
    {
      name: "Rechenzentrum",
      href: "https://www.h-ka.de/rz",
      bgColor: "#d72305",
      hoverColor: "#b71c1c",
    },
    {
      name: "Discord EIT",
      href: "#",
      bgColor: "#5865f2",
      hoverColor: "#4752c4",
    },
  ];

  const updates = [
    "Grundlagen sind noch nicht komplett abgeschlossen",
    "Framing ist für nächste Woche geplant",
    "Wetterverzögerungen können den Zeitplan beeinflussen",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="w-full max-w-5xl space-y-6">
        {/* Main Card */}
        <Link
          href="/"
          className="inline-block font-montserrat text-sm sm:text-md font-medium dark:text-white text-black hover:opacity-70 transition-opacity underline underline-offset-4 mt-4"
        >
          ← Zurück zur Startseite
        </Link>
        <Card className="bg-white/50 backdrop-blur-md dark:bg-background/50 border-1 border-divider">
          <CardBody className="p-8 sm:p-12 md:p-16">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Main Heading */}
              <h1 className="font-melodrama text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold dark:text-white text-black">
                Willkommen auf der Baustelle von EIT
              </h1>

              {/* Construction Image */}
              <div className="w-full max-w-2xl my-8">
                <Image
                  src="https://www.eit-hka.de/website-construction-graphic-4.jpg"
                  alt="EIT Construction"
                  className="w-full h-auto rounded-lg"
                  isBlurred
                />
              </div>

              {/* Apology Message */}
              <p className="font-montserrat text-lg sm:text-xl md:text-2xl font-light dark:text-white/80 text-black/80 max-w-3xl">
                Es tut uns leid, aber zur Zeit steht die EIT Website und Cloud
                unter Bearbeitung :(
              </p>

              {/* Divider */}
              <div className="w-2/3 h-px bg-divider my-6" />

              {/* Quick Links Section */}
              <div className="w-full max-w-2xl">
                <h2 className="font-montserrat text-2xl sm:text-3xl font-bold dark:text-white text-black mb-6">
                  Weiterleitung zu:
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickLinks.map((link) => (
                    <Button
                      key={link.name}
                      as={Link}
                      href={link.href}
                      size="lg"
                      className="font-montserrat text-md sm:text-lg font-medium h-14 text-white border-2 border-black/20 transition-all duration-300 hover:scale-105"
                      style={{
                        backgroundColor: link.bgColor,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = link.hoverColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = link.bgColor;
                      }}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                    >
                      {link.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Updates Card */}
        <Card className="bg-white/50 backdrop-blur-md dark:bg-background/50 border-1 border-divider">
          <CardBody className="p-6 sm:p-8 md:p-10">
            <h3 className="font-montserrat text-xl sm:text-2xl font-bold dark:text-white text-black mb-6 text-center">
              Construction Updates
            </h3>
            <ul className="space-y-3 max-w-2xl mx-auto">
              {updates.map((update, index) => (
                <li
                  key={index}
                  className="font-montserrat text-md sm:text-lg font-light dark:text-white/70 text-black/70 flex items-start"
                >
                  <span className="mr-3 text-xl">•</span>
                  <span>{update}</span>
                </li>
              ))}
            </ul>
          </CardBody>
        </Card>

        {/* Contact & Footer */}
        <div className="text-center space-y-4">
          <p className="font-montserrat text-sm sm:text-md font-light dark:text-white/60 text-black/60">
            Bei Fragen oder Problemen wenden Sie sich bitte an{" "}
            <span className="font-medium dark:text-white text-black">
              Dennis Breunig
            </span>
            .
          </p>
          <p className="font-montserrat text-xs sm:text-sm dark:text-white/40 text-black/40">
            © 2025 IT Daddies
          </p>
        </div>
      </div>
    </div>
  );
}
