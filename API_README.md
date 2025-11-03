# EIT API Authentication

This project includes authentication integration with the EIT API.

## API Endpoints

### Login
The login functionality is implemented through:
- **Frontend Component**: `src/components/LoginForm.tsx`
- **API Route**: `src/app/api/auth/login/route.ts` (proxy)
- **Utility Functions**: `src/lib/api.ts`

### How it works

1. User enters credentials in the login form (`/accounts` page)
2. The form calls the local API route `/api/auth/login`
3. The API route forwards the request to `https://api.eit-hka.de/auth/login`
4. Upon successful authentication, the API returns:
   - `access_token_cookie` (HttpOnly)
   - `csrf_access_token`
   - `refresh_token_cookie` (HttpOnly)
   - `csrf_refresh_token`
5. These cookies are automatically handled by the browser

## Usage

### Login Page
Navigate to `/accounts` to see the login form.

### API Functions

```typescript
import { login, logout, verifyAuth, refreshToken } from '@/lib/api';

// Login
try {
  const response = await login({ 
    userid: 'your_userid', 
    password: 'your_password' 
  });
  console.log(response.message); // "Login successful"
} catch (error) {
  console.error(error);
}

// Logout
await logout();

// Verify authentication
const isAuthenticated = await verifyAuth();

// Refresh token
await refreshToken();
```

## Cookie-based Authentication

The API uses HTTP-only cookies for secure authentication:
- **access_token_cookie**: JWT access token (30 minutes expiry)
- **refresh_token_cookie**: JWT refresh token (30 days expiry)
- **csrf_access_token**: CSRF protection token
- **csrf_refresh_token**: CSRF protection for refresh

All cookies are:
- HttpOnly (when containing tokens)
- SameSite=Lax
- Secure in production
- Automatically included in requests via `credentials: 'include'`

## API Response Example

### Successful Login
```json
{
  "message": "Login successful"
}
```

### Error Response
```json
{
  "error": "Invalid credentials"
}
```

## Security Notes

1. Passwords are never stored in the frontend
2. Tokens are stored in HttpOnly cookies (not accessible via JavaScript)
3. CSRF tokens are included for additional security
4. The API proxy prevents CORS issues
5. All communication with the API should use HTTPS in production
