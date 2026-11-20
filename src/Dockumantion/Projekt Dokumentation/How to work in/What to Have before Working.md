1) Node Js herunterladen
2) dann npm installieren
3) um die Dependencies in einem Graphen darzustellen sollte Man zwei extension Installieren
    -Graphviz Interactive Preview
    -Graphviz (dot) language support for Visual Studio Code
    um denn Graphen anzuschauen dann "strg" + "Shift" +"p"
    dann Graphviz Interactive Preview eintippen 
4) Installation for some Components
    Folder Componenets:  npx shadcn@latest add @react-bits/Folder-TS-CSS
    electrical Border:   npx shadcn@latest add @react-bits/ElectricBorder-JS-CSS
    Animated List :      npx shadcn@latest add @react-bits/AnimatedList-JS-CSS
    Fade Content :       npx shadcn@latest add @react-bits/FadeContent-JS-CSS




    "use client";

import React, { useState } from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Calendar } from "@/components/components/ui/calendar";

export default function CalendarPage() {
  const { currentBg } = useThemeContext();
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />

      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 pb-12 pt-24">
        <div className="w-full max-w-6xl rounded-2xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md sm:p-8 lg:p-10">
          <div className="mb-8 text-center">
            <h1 className="mb-3 text-4xl font-bold text-white md:text-6xl">
              EIT Web Kalendar
            </h1>
            <p className="mx-auto max-w-4xl text-base text-slate-300 md:text-lg">
              Verwalte deine Termine, Meetings und Veranstaltungen übersichtlich in einem großen Monatskalender.
            </p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-slate-950/30 p-3 sm:p-5">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="mx-auto w-full max-w-5xl rounded-xl text-white"
              classNames={{
                months: "flex w-full justify-center",
                month: "w-full",
                caption: "flex justify-center pt-1 relative items-center w-full mb-6",
                caption_label: "text-2xl font-semibold text-white",
                nav: "flex items-center gap-2",
                nav_button: "h-11 w-11 border border-white/15 bg-white/5 text-white hover:bg-white/10",
                table: "w-full border-separate border-spacing-2",
                head_row: "grid grid-cols-7",
                head_cell: "text-center text-sm font-medium text-slate-300 h-12",
                row: "grid grid-cols-7 gap-2",
                cell: "h-24 rounded-xl border border-white/10 bg-slate-900/40 p-0 text-center align-top",
                day: "h-full w-full rounded-xl text-base font-medium text-slate-200 hover:bg-white/10",
                day_selected: "bg-blue-500 text-white hover:bg-blue-500",
                day_today: "bg-white/10 text-white ring-1 ring-blue-400/60",
                day_outside: "text-slate-500 opacity-60",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
