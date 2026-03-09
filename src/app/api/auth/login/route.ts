import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = 'https://api.eit-hka.de';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userid, password } = body;

    if (!userid || !password) {
      return NextResponse.json(
        { error: 'Missing userid or password' },
        { status: 400 }
      );
    }

    // Forward the request to the EIT API
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'EIT-Website/1.0.0',
      },
      body: JSON.stringify({ userid, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('EIT API Error:', {
        status: response.status,
        statusText: response.statusText,
        data: data
      });
      return NextResponse.json(
        { error: data.message || 'Login failed' },
        { status: response.status }
      );
    }

    // Extract cookies from the API response
    const cookies = response.headers.get('set-cookie');
    
    // Create the response with the data
    const nextResponse = NextResponse.json(data, { status: 200 });

    // Forward cookies to the client if they exist
    if (cookies) {
      const cookieArray = cookies.split(',').map(c => c.trim());
      cookieArray.forEach(cookie => {
        const [cookiePart] = cookie.split(';');
        const [name, value] = cookiePart.split('=');
        if (name && value) {
          nextResponse.cookies.set(name.trim(), value.trim(), {
            httpOnly: name.includes('token_cookie'),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
          });
        }
      });
    }

    return nextResponse;
  } catch (error) {
    console.error('Login API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Internal server error', details: errorMessage },
      { status: 500 }
    );
  }
}
