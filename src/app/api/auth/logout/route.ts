import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.eit-hka.de';

export async function POST(request: NextRequest) {
  try {
    // Get CSRF token from cookies
    const csrfToken = request.cookies.get('csrf_refresh_token')?.value;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'EIT-Website/1.0.0',
    };

    // Add CSRF token if available
    if (csrfToken) {
      headers['X-CSRF-TOKEN'] = csrfToken;
    }

    // Get all cookies to forward them
    const cookieHeader = request.headers.get('cookie');

    // Forward the request to the EIT API
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: cookieHeader ? { ...headers, Cookie: cookieHeader } : headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Logout failed' }));
      console.error('EIT API Logout Error:', {
        status: response.status,
        statusText: response.statusText,
        data: errorData
      });
      return NextResponse.json(
        { error: errorData.message || 'Logout failed' },
        { status: response.status }
      );
    }

    // Create response
    const nextResponse = NextResponse.json({ message: 'Logged out successfully' }, { status: 200 });

    // Clear all authentication cookies
    nextResponse.cookies.delete('access_token_cookie');
    nextResponse.cookies.delete('refresh_token_cookie');
    nextResponse.cookies.delete('csrf_access_token');
    nextResponse.cookies.delete('csrf_refresh_token');

    return nextResponse;
  } catch (error) {
    console.error('Logout API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
