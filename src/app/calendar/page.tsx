"use client";

import React, { useEffect, useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import type { SemesterData, Lab } from "@/components/profile/semester-progress";

type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  source: "custom" | "lab";
};

const weekdayLabels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
const STORAGE_KEY = "profile-editor-state-v1";

const formatKey = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

const buildLabEntriesForMonth = (
  semesterData: SemesterData[],
  monthDate: Date
): Record<string, CalendarEvent[]> => {
  const entries: Record<string, CalendarEvent[]> = {};
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0, 23, 59, 59);

  semesterData.forEach((semester) => {
    semester.labs.forEach((lab: Lab) => {
      const recurrenceDay =
        lab.dayOfWeek !== undefined && lab.dayOfWeek >= 0 && lab.dayOfWeek <= 6
          ? lab.dayOfWeek
          : lab.startDate
            ? new Date(`${lab.startDate}T00:00:00`).getDay()
            : null;

      if (recurrenceDay === null) return;

      if (lab.endDate) {
        const endDate = new Date(`${lab.endDate}T23:59:59`);
        if (monthStart > endDate) return;
      }

      if (!lab.startDate) {
        for (let day = 1; day <= monthEnd.getDate(); day += 1) {
          const currentDate = new Date(year, month, day);
          if (currentDate.getDay() === recurrenceDay) {
            const key = formatKey(currentDate);
            entries[key] = [...(entries[key] ?? []), {
              id: `${lab.id}-${key}`,
              title: lab.name || "Labor",
              description: `${lab.location || "Raum TBD"} · Semester ${semester.semester}`,
              source: "lab",
            }];
          }
        }
        return;
      }

      const startDate = new Date(`${lab.startDate}T00:00:00`);
      if (Number.isNaN(startDate.getTime())) return;

      const iterateFrom = startDate > monthStart ? startDate : monthStart;

      for (let cursor = new Date(iterateFrom); cursor <= monthEnd; cursor.setDate(cursor.getDate() + 1)) {
        const currentDate = new Date(cursor);

        if (lab.endDate) {
          const endDate = new Date(`${lab.endDate}T23:59:59`);
          if (currentDate > endDate) break;
        }

        if (lab.frequency === "once") {
          if (formatKey(currentDate) === formatKey(startDate)) {
            const key = formatKey(currentDate);
            entries[key] = [...(entries[key] ?? []), {
              id: `${lab.id}-${key}`,
              title: lab.name || "Labor",
              description: `${lab.location || "Raum TBD"} · Semester ${semester.semester}`,
              source: "lab",
            }];
          }
          continue;
        }

        const daysDiff = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
        const matchesWeekly = currentDate.getDay() === recurrenceDay;
        const matchesBiweekly = currentDate.getDay() === recurrenceDay && daysDiff >= 0 && daysDiff % 14 === 0;

        if (
          (lab.frequency === "weekly" && matchesWeekly) ||
          (lab.frequency === "biweekly" && matchesBiweekly) ||
          (!lab.frequency && matchesWeekly)
        ) {
          const key = formatKey(currentDate);
          entries[key] = [...(entries[key] ?? []), {
            id: `${lab.id}-${key}`,
            title: lab.name || "Labor",
            description: `${lab.location || "Raum TBD"} · Semester ${semester.semester}`,
            source: "lab",
          }];
        }
      }
    });
  });

  return entries;
};

export default function CalendarPage() {
  const { currentBg } = useThemeContext();
  const { status } = useSession();
  const isLoggedIn = status === "authenticated";

  const [currentMonth, setCurrentMonth] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventsByDate, setEventsByDate] = useState<Record<string, CalendarEvent[]>>({});
  const [profileSemesterData, setProfileSemesterData] = useState<SemesterData[]>([]);

  useEffect(() => {
    const loadProfileSemesterData = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setProfileSemesterData([]);
          return;
        }

        const parsed = JSON.parse(raw) as { semesterData?: SemesterData[] };
        setProfileSemesterData(Array.isArray(parsed.semesterData) ? parsed.semesterData : []);
      } catch (error) {
        console.warn("Could not load labs from localStorage", error);
      }
    };

    loadProfileSemesterData();
    window.addEventListener("storage", loadProfileSemesterData);
    return () => window.removeEventListener("storage", loadProfileSemesterData);
  }, []);

  const labEntriesForMonth = useMemo(
    () => buildLabEntriesForMonth(profileSemesterData, currentMonth),
    [profileSemesterData, currentMonth]
  );

  const mergedEventsByDate = useMemo(() => {
    const merged: Record<string, CalendarEvent[]> = { ...labEntriesForMonth };

    Object.entries(eventsByDate).forEach(([key, value]) => {
      merged[key] = [...(merged[key] ?? []), ...value];
    });

    return merged;
  }, [labEntriesForMonth, eventsByDate]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("de-DE", {
        month: "long",
        year: "numeric",
      }).format(currentMonth),
    [currentMonth]
  );

  const monthGrid = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const totalDays = new Date(year, month + 1, 0).getDate();
    const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
    const totalCells = Math.ceil((firstWeekday + totalDays) / 7) * 7;

    return Array.from({ length: totalCells }, (_, index) => {
      const dayNumber = index - firstWeekday + 1;
      const date = new Date(year, month, dayNumber);
      return {
        date,
        isCurrentMonth: date.getMonth() === month,
      };
    });
  }, [currentMonth]);

  const selectedKey = formatKey(selectedDate);
  const selectedEvents = mergedEventsByDate[selectedKey] ?? [];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleAddEvent = () => {
    if (!isLoggedIn) return;
    if (!eventTitle.trim()) return;

    const key = formatKey(selectedDate);
    const newEvent: CalendarEvent = {
      id: `${key}-${Date.now()}`,
      title: eventTitle.trim(),
      description: eventDescription.trim(),
      source: "custom",
    };

    setEventsByDate((previous) => ({
      ...previous,
      [key]: [...(previous[key] ?? []), newEvent],
    }));

    setEventTitle("");
    setEventDescription("");
  };

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />

      <div className="mx-auto max-w-7xl px-4 pb-14 pt-24">
        <div className="mb-8 text-center text-white">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-cyan-200/80">EIT</p>
          <h1 className="text-4xl font-black md:text-6xl">Kalender</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
          <div className="rounded-3xl border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-3 text-white">
              <button
                type="button"
                onClick={handlePrevMonth}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/50 text-xl transition hover:bg-white/10"
              >
                ←
              </button>

              <h2 className="text-2xl font-bold capitalize md:text-3xl">{monthLabel}</h2>

              <button
                type="button"
                onClick={handleNextMonth}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-slate-900/50 text-xl transition hover:bg-white/10"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium text-slate-300">
              {weekdayLabels.map((label) => (
                <div key={label} className="rounded-xl bg-slate-900/40 py-2">
                  {label}
                </div>
              ))}

              {monthGrid.map(({ date, isCurrentMonth }) => {
                const key = formatKey(date);
                const dayEvents = mergedEventsByDate[key] ?? [];
                const isSelected = key === selectedKey;
                const isToday = key === formatKey(new Date());

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={[
                      "min-h-[96px] rounded-2xl border p-2 text-left transition",
                      isCurrentMonth ? "border-white/10 bg-slate-900/35 text-white" : "border-slate-800/50 bg-slate-950/30 text-slate-500",
                      isSelected ? "border-cyan-400/60 bg-cyan-500/20 shadow-lg shadow-cyan-500/10" : "hover:bg-white/5",
                      isToday ? "ring-1 ring-cyan-400/50" : "",
                    ].join(" ")}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-base font-semibold">{date.getDate()}</span>
                      {dayEvents.length > 0 && (
                        <span className="h-2.5 w-2.5 rounded-full bg-cyan-400" />
                      )}
                    </div>

                    <div className="space-y-1">
                      {dayEvents.slice(0, 2).map((event) => (
                        <div
                          key={event.id}
                          className={[
                            "truncate rounded-md px-1 py-0.5 text-[10px]",
                            event.source === "lab" ? "bg-emerald-500/20 text-emerald-200" : "bg-white/5 text-slate-200",
                          ].join(" ")}
                        >
                          {event.title}
                        </div>
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-white/15 bg-slate-950/45 p-5 text-white shadow-2xl backdrop-blur-md">
            <div className="mb-5 border-b border-white/10 pb-4">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/80">Ausgewählt</p>
              <h3 className="mt-2 text-2xl font-bold">
                {new Intl.DateTimeFormat("de-DE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(selectedDate)}
              </h3>
            </div>

            {isLoggedIn ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Termin</label>
                  <input
                    value={eventTitle}
                    onChange={(event) => setEventTitle(event.target.value)}
                    placeholder="z. B. Teammeeting"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-300">Beschreibung</label>
                  <textarea
                    value={eventDescription}
                    onChange={(event) => setEventDescription(event.target.value)}
                    rows={3}
                    placeholder="Zusätzliche Infos..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-slate-400 focus:border-cyan-400"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleAddEvent}
                  className="w-full rounded-xl bg-cyan-500 px-4 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Termin speichern
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-slate-300">Melde dich an, um Termine für diesen Tag einzutragen.</p>
                <button
                  type="button"
                  onClick={() => signIn("authentik")}
                  className="w-full rounded-xl bg-white px-4 py-2.5 font-semibold text-slate-900 transition hover:bg-slate-200"
                >
                  Einloggen
                </button>
              </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-4">
              <h4 className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">Einträge</h4>

              {selectedEvents.length > 0 ? (
                <div className="space-y-2">
                  {selectedEvents.map((event) => (
                    <div key={event.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <p className={event.source === "lab" ? "font-semibold text-emerald-300" : "font-semibold text-cyan-200"}>
                        {event.title}
                      </p>
                      {event.description && <p className="mt-1 text-sm text-slate-300">{event.description}</p>}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400">Noch keine Einträge an diesem Tag.</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
