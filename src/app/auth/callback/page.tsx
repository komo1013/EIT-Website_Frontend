'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUserManager } from '@/lib/auth/oidc-config';
import React from "react";
import NavBar from "@/components/navbar";
import { useThemeContext } from "@/contexts/ThemeContext";

export default function AuthCallbackPage() {
    const { currentBg } = useThemeContext();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    // TODO: 
    // 1. getUserManager().signinCallback() aufrufen
        getUserManager().signinCallback()
        .then(() => {
            router.push('/profile'); // Bei Erfolg zur Profile weiterleiten
        })
        .catch((err) => {
            setError(err.message); // Bei Fehler Fehlermeldung setzen
        });
  }, []);

  // TODO: Wenn error → Fehlermeldung anzeigen
  // TODO: Sonst → "Anmeldung läuft..." anzeigen

  return (
    <div 
      className="min-h-screen transition-colors duration-700"
      style={{
        background: `linear-gradient(135deg, rgb(15, 23, 42), rgb(2, 6, 23), ${currentBg.via})`,
      }}
    >
        <NavBar />
      {error ? (
        <p className="text-red-500">Fehler bei der Authentifizierung: {error}</p>
      ) 
      : (
        <p className="text-white">Anmeldung läuft...</p>
      )}

    </div>
  );
}