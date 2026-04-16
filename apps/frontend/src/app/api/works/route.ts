import { NextResponse } from 'next/server';

const backendUrl = process.env.API_URL || 'http://localhost:3333';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const search = url.searchParams.get('search');
  const backendSearch = search ? `?search=${encodeURIComponent(search)}` : '';

  const response = await fetch(`${backendUrl}/works${backendSearch}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
