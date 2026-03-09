# Anleitung: Neue Seite zur Website hinzufügen

## Schritt-für-Schritt Anleitung

### 1. Neue Page-Datei erstellen

Erstelle eine neue Datei im `src/app/` Verzeichnis:

```
src/app/deine-seite/page.tsx
```

**Beispiel Struktur:**
```
src/app/
  └── deine-seite/
      └── page.tsx
```

### 2. Basic Page Template

Kopiere dieses Template in deine neue `page.tsx`:

```tsx
"use client";
import React from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useEffect, useState } from "react";

export default function DeineSeitePage() {
  const { currentBg } = useThemeContext();
  
  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-6">
          Deine Seite
        </h1>
        
        <p className="text-gray-300">
          Dein Content hier...
        </p>
      </div>
    </div>
  );
}
```

### 3. Seite zur Navigation hinzufügen

Öffne `src/components/navbar.tsx` und füge deine Seite zum `menuItems` Array hinzu:

```tsx
const menuItems = [
  { label: "Wer sind wir?", href: "/about" },
  { label: "Team", href: "/team" },
  { label: "Vorteile für Studenten", href: "/vorteile_studenten"},
  { label: "Profil", href: "/profile" },
  { label: "Deine Seite", href: "/deine-seite" }, // NEU
];
```

### 4. Routing

Die Seite ist automatisch unter der URL verfügbar:
```
http://localhost:3000/deine-seite
```

Next.js erstellt automatisch die Route basierend auf der Ordnerstruktur.

## Wichtige Features

### Globales Farbschema verwenden

```tsx
import { useThemeContext } from "@/contexts/ThemeContext";

const { colorTheme, currentBg, setColorTheme } = useThemeContext();
```

**Verfügbare Werte:**
- `colorTheme`: Aktuelles Theme ('blue', 'orange', 'green', 'red', 'purple', 'gold')
- `currentBg.via`: Hauptfarbe für Gradienten
- `currentBg.particle`: Partikelfarbe mit Transparenz
- `currentBg.grid`: Grid-Hintergrundfarbe

### Dark/Light Mode verwenden

```tsx
import { useTheme } from "next-themes";

const { theme, setTheme } = useTheme();
```

### Authentication Status prüfen

```tsx
import { useAuth } from "@/contexts/AuthContext";

const { isLoggedIn, username, login, logout } = useAuth();
```

### Responsive Design

Nutze Tailwind CSS Breakpoints:

```tsx
<div className="
  text-sm           // Mobile
  md:text-base      // Tablet
  lg:text-lg        // Desktop
  xl:text-xl        // Large Desktop
">
  Responsive Text
</div>
```

## Erweiterte Templates

### Mit Sidebar Layout

```tsx
"use client";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function SidebarPage() {
  const { currentBg } = useThemeContext();
  
  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-black/20 backdrop-blur-sm p-6">
          <h2 className="text-white text-xl mb-4">Sidebar</h2>
          {/* Sidebar Content */}
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-bold text-white mb-6">
            Main Content
          </h1>
        </main>
      </div>
    </div>
  );
}
```

### Mit Grid Layout

```tsx
"use client";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function GridPage() {
  const { currentBg } = useThemeContext();
  
  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Grid Items */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-white text-xl mb-2">Item 1</h3>
            <p className="text-gray-300">Content...</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-white text-xl mb-2">Item 2</h3>
            <p className="text-gray-300">Content...</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-white text-xl mb-2">Item 3</h3>
            <p className="text-gray-300">Content...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Protected Page (nur für eingeloggte User)

```tsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function ProtectedPage() {
  const { isLoggedIn } = useAuth();
  const { currentBg } = useThemeContext();
  const router = useRouter();
  
  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/accounts");
    }
  }, [isLoggedIn, router]);
  
  if (!isLoggedIn) {
    return null; // oder Loading Spinner
  }
  
  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-6">
          Protected Content
        </h1>
        <p className="text-gray-300">
          Nur für eingeloggte User sichtbar
        </p>
      </div>
    </div>
  );
}
```

## UI Components verwenden

Die Website nutzt **HeroUI** und **shadcn/ui** Components:

### HeroUI Components

```tsx
import { Button, Card, Input } from "@heroui/react";

<Button color="primary">Click me</Button>
<Card>...</Card>
<Input placeholder="Enter text" />
```

### shadcn/ui Components

```tsx
import { Button } from "@/components/components/ui/button";
import { Card } from "@/components/components/ui/card";

<Button variant="outline">Click me</Button>
```

## Styling Guidelines

### Farben
- **Text**: `text-white`, `text-gray-300`, `text-gray-400`
- **Background**: `bg-white/10`, `bg-black/20` (mit Transparenz)
- **Backdrop Blur**: `backdrop-blur-sm`, `backdrop-blur-md`, `backdrop-blur-lg`

### Abstände
- **Padding**: `p-4`, `p-6`, `p-8`, `px-4`, `py-8`
- **Margin**: `mb-4`, `mb-6`, `mt-8`
- **Gap**: `gap-4`, `gap-6`, `gap-8`

### Schriftarten
- **Font Montserrat**: `font-montserrat`
- **Font Ubuntu**: `font-ubuntu`
- **Font Doto**: `font-doto`
- **Font Melodrama**: `font-melodrama`

### Border Radius
- `rounded-lg`: 0.5rem
- `rounded-xl`: 0.75rem
- `rounded-2xl`: 1rem
- `rounded-3xl`: 1.5rem

## Checklist für neue Seiten

- [ ] Seite in `src/app/[name]/page.tsx` erstellt
- [ ] `"use client";` am Anfang der Datei
- [ ] `NavBar` importiert und eingefügt
- [ ] `useThemeContext()` für globales Farbschema verwendet
- [ ] Gradient Background mit `currentBg.via` gesetzt
- [ ] `transition-colors duration-700` für sanfte Übergänge
- [ ] Seite zur Navbar hinzugefügt (`menuItems`)
- [ ] Responsive Design mit Tailwind Breakpoints
- [ ] Falls nötig: Authentication Check

## Troubleshooting

### "Cannot read properties of undefined"
→ Stelle sicher, dass alle Contexts im Provider eingebunden sind

### Seite wird nicht gefunden
→ Prüfe, ob die Ordnerstruktur korrekt ist: `src/app/[name]/page.tsx`

### Styles funktionieren nicht
→ Überprüfe, ob Tailwind CSS Klassen korrekt geschrieben sind

### Theme wird nicht geladen
→ Stelle sicher, dass `useThemeContext()` nur in Client Components verwendet wird

## Weitere Ressourcen

- [Next.js App Router Dokumentation](https://nextjs.org/docs/app)
- [Tailwind CSS Dokumentation](https://tailwindcss.com/docs)
- [HeroUI Components](https://heroui.com/)
- [shadcn/ui Components](https://ui.shadcn.com/)

## Beispiel: Vollständige neue Seite

```tsx
"use client";
import React, { useState } from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@heroui/react";

export default function BeispielSeite() {
  const { currentBg } = useThemeContext();
  const { isLoggedIn, username } = useAuth();
  const [count, setCount] = useState(0);
  
  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      <NavBar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-melodrama">
            Beispiel Seite
          </h1>
          <p className="text-gray-300 text-lg font-montserrat">
            {isLoggedIn ? `Willkommen, ${username}!` : "Willkommen!"}
          </p>
        </header>
        
        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl text-white mb-4 font-montserrat">
              Section 1
            </h2>
            <p className="text-gray-300 mb-4">
              Dies ist ein Beispiel für eine Card mit Glassmorphism-Effekt.
            </p>
            <Button 
              color="primary"
              onClick={() => setCount(count + 1)}
            >
              Count: {count}
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-2xl text-white mb-4 font-montserrat">
              Section 2
            </h2>
            <p className="text-gray-300">
              Weitere Inhalte können hier eingefügt werden.
            </p>
          </div>
        </div>
        
        {/* Footer Section */}
        <div className="bg-black/30 backdrop-blur-md rounded-2xl p-8">
          <h3 className="text-xl text-white mb-2">Weitere Informationen</h3>
          <p className="text-gray-400">
            Diese Seite nutzt das globale Farbschema-System.
          </p>
        </div>
      </div>
    </div>
  );
}
```

---

**Viel Erfolg beim Erstellen neuer Seiten! 🚀**
