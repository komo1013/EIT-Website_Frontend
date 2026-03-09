'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from 'oidc-client-ts';
import { getUserManager } from '@/lib/auth/oidc-config';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userManager = getUserManager();
        const currentUser = await userManager.getUser();
        setUser(currentUser);
        
        if (currentUser) {
          console.log('User eingeloggt:', currentUser.profile.name || currentUser.profile.email);
        } else {
          console.log('Kein User angemeldet');
        }
      } catch (error) {
        console.error('Auth init fehlgeschlagen:', error);
      } finally {
        setIsLoading(false); // Immer am Ende, egal ob Erfolg oder Fehler
      }
    };
    initAuth();
  }, []);

  const login = async () => {
    try {
      const userManager = getUserManager();
      await userManager.signinRedirect(); // Leitet zu Authentik weiter für Login
    } catch (error) {
      console.error('Login fehlgeschlagen:', error);
    }
  };

  const logout = async () => {
    try {
      const userManager = getUserManager();
      await userManager.signoutRedirect(); // Leitet zu Authentik weiter für Logout
    } catch (error) {
      console.error('Logout fehlgeschlagen:', error);
    }
  };

  const getAccessToken = async (): Promise<string | null> => {
    // Holt den aktuellen Token - wird für API-Calls gebraucht
    const currentUser = await getUserManager().getUser();
    return currentUser?.access_token ?? null;
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      isAuthenticated: !!user && !user.expired, 
      login, 
      logout, 
      getAccessToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};