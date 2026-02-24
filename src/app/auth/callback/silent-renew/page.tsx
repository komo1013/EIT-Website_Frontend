'use client';

import { useEffect } from 'react';
import { getUserManager } from '@/lib/auth/oidc-config';

export default function SilentRenewPage() {
  useEffect(() => {
    // Diese Funktion verarbeitet den silent renew callback
    getUserManager().signinSilentCallback()
      .catch((err) => {
        console.error('Silent renew fehlgeschlagen:', err);
      });
  }, []);

  // Diese Seite wird nie sichtbar - sie läuft im iFrame
  return null;
}