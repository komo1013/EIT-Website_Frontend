import { getUserManager } from './oidc-config';

// Custom Error-Klasse für "nicht eingeloggt"
// So kannst du im Component einfach prüfen: if (error instanceof AuthError)
export class AuthError extends Error {
  constructor(message: string = 'Nicht eingeloggt') {
    super(message);
    this.name = 'AuthError';
  }
}

export async function authenticatedFetch(
  url: string, 
  options: RequestInit = {}
): Promise<Response> {
  
  // 1. Token holen
  const user = await getUserManager().getUser();
  const token = user?.access_token;

  // 2. Wenn kein Token → AuthError werfen
  if (!token) {
    throw new AuthError('Nicht eingeloggt - bitte melde dich an');
  }

  // 3. Prüfen ob Token abgelaufen ist
  if (user?.expired) {
    throw new AuthError('Session abgelaufen - bitte erneut anmelden');
  }

  // 4. Headers mit Token erstellen
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);

  // 5. Fetch ausführen mit Token
  return fetch(url, {
    ...options,
    headers,
  });
}