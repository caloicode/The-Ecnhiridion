// app/api/enchiridion/route.ts
import { NextResponse } from 'next/server';
import { fetchEnchiridionData } from '@/lib/googleSheet';

export async function GET() {
  try {
    const data = await fetchEnchiridionData();
    return NextResponse.json({ data });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to fetch sheet data' }, { status: 500 });
  }
}
