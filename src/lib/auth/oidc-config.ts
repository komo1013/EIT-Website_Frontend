import { UserManager, WebStorageStateStore, UserManagerSettings } from 'oidc-client-ts';

// Validiere dass die erforderlichen Variablen existieren
if (!process.env.NEXT_PUBLIC_AUTHENTIK_URL) {
  throw new Error('Fehlende Environment Variable: NEXT_PUBLIC_AUTHENTIK_URL');
}
if (!process.env.NEXT_PUBLIC_CLIENT_ID) {
  throw new Error('Fehlende Environment Variable: NEXT_PUBLIC_CLIENT_ID');
}

let userManagerInstance: UserManager | null = null;

const oidcConfig = (): UserManagerSettings => ({
    automaticSilentRenew: true,
    silent_redirect_uri: `${window.location.origin}/auth/callback/silent-renew`,
    authority: process.env.NEXT_PUBLIC_AUTHENTIK_URL!,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID!,
    redirect_uri: `${window.location.origin}/auth/callback`,
    post_logout_redirect_uri: `${window.location.origin}`,
    response_type: 'code',
    scope: 'openid profile email',
    userStore: new WebStorageStateStore({ store: window.localStorage }),
});

export const getUserManager = () => {
    if (typeof window === 'undefined') {
        throw new Error('UserManager can only be used in the browser');
    }
    if (!userManagerInstance) {
        userManagerInstance = new UserManager(oidcConfig());
    }
    return userManagerInstance;
};