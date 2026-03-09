# Globales Farbschema-System

## Übersicht
Das Farbschema-System erlaubt es Usern, ein globales Farbthema für die gesamte Website auszuwählen. Die Auswahl wird im localStorage gespeichert und ist auf allen Seiten verfügbar.

## Verfügbare Farben
- **blue** - Blau (Standard)
- **orange** - Orange
- **green** - Grün
- **red** - Rot
- **purple** - Lila
- **gold** - Gold

## Verwendung in Components

### 1. ThemeContext importieren
```tsx
import { useThemeContext } from "@/contexts/ThemeContext";
```

### 2. Theme-Daten verwenden
```tsx
export default function MyPage() {
  const { colorTheme, setColorTheme, currentBg } = useThemeContext();
  
  return (
    <div 
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
      {/* Dein Content */}
    </div>
  );
}
```

### 3. Farbthema ändern (z.B. in Profil-Seite)
```tsx
import { ColorPicker } from '@/components/components/color-picker';

// Im Component:
<ColorPicker 
  selectedColor={colorTheme} 
  onColorChange={setColorTheme} 
/>
```

## Verfügbare Theme-Daten

### `colorTheme: ColorTheme`
Der aktuell ausgewählte Theme-Name ('blue', 'orange', etc.)

### `setColorTheme: (theme: ColorTheme) => void`
Funktion zum Ändern des Themes (speichert automatisch in localStorage)

### `currentBg: { via: string; particle: string; grid: string }`
Farbwerte für das aktuelle Theme:
- **via**: Hauptfarbe für Gradienten
- **particle**: Farbe für Partikel-Effekte (mit Transparenz)
- **grid**: Farbe für Grid-Hintergründe (sehr transparent)

## Beispiele

### Einfacher Gradient-Hintergrund
```tsx
style={{
  background: `linear-gradient(135deg, rgb(15, 23, 42), ${currentBg.via})`,
}}
```

### Mit Partikel-Effekt
```tsx
style={{
  backgroundColor: currentBg.particle,
}}
```

### Transition beim Theme-Wechsel
```tsx
className="transition-colors duration-700"
style={{
  background: `linear-gradient(135deg, rgb(15, 23, 42), ${currentBg.via})`,
}}
```

## Implementierte Seiten
- ✅ Homepage (`/`)
- ✅ About Page (`/about`)
- ✅ Profile Page (`/profile`)
- ⚠️ Team Page (`/team`) - noch in Construction
- ⚠️ Vorteile Studenten (`/vorteile_studenten`) - noch nicht implementiert

## Weitere Seiten hinzufügen

1. ThemeContext importieren
2. `currentBg` aus dem Context holen
3. Gradient-Background mit `currentBg.via` setzen
4. Optional: `transition-colors duration-700` für sanfte Übergänge

```tsx
"use client";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function NewPage() {
  const { currentBg } = useThemeContext();
  
  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), ${currentBg.via})`,
      }}
    >
      {/* Content */}
    </div>
  );
}
```
