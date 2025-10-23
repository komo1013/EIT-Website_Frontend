export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const response = await fetch('https://raumzeit.hka-iwi.de/api/v1/persons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    
    return Response.json(data, { 
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('RaumZeit API error:', error);
    return Response;
  }
}
