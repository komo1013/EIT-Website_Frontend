import { UserManager, WebStorageStateStore, UserManagerSettings } from 'oidc-client-ts';

// Hilfsfunktion: Holt Environment Variable oder wirft Fehler wenn sie fehlt
const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Fehlende Environment Variable: ${key}`);
  }
  return value;
};

let userManagerInstance: UserManager | null = null;

const oidcConfig = (): UserManagerSettings => ({
    automaticSilentRenew: true,           // Automatisch erneuern
    silent_redirect_uri: `${window.location.origin}/auth/callback/silent-renew`,
    authority: getRequiredEnv('NEXT_PUBLIC_AUTHENTIK_URL'),
    client_id: getRequiredEnv('NEXT_PUBLIC_CLIENT_ID'),
    redirect_uri: `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: `${window.location.origin}`,
    response_type: 'code',
    scope: 'openid profile email',
    userStore: new WebStorageStateStore({ store: window.localStorage }),
});

// TODO: Erstelle eine UserManager Instanz und exportiere sie
// Hinweis: new UserManager(oidcConfig)
export const getUserManager =() => {
   
    if (typeof window === 'undefined'){
        throw new Error('UserManager can only be used in the browser');
    }
     if (!userManagerInstance) {
        userManagerInstance = new UserManager(oidcConfig());
    }
    return userManagerInstance;
};