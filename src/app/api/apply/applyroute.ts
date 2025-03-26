// app/api/apply/route.ts
import { NextResponse } from 'next/server';
import { submitApplication } from '@/lib/api';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await submitApplication(formData);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}