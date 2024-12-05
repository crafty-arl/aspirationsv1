import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  try {
    const jsonDirectory = path.join(process.cwd(), 'src/data');
    const fileContents = await fs.readFile(
      jsonDirectory + '/affirmations.json',
      'utf8'
    );
    return NextResponse.json(JSON.parse(fileContents));
  } catch (err: unknown) {
    console.error('Failed to load affirmations:', err);
    return NextResponse.json(
      { error: 'Failed to load affirmations' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const jsonDirectory = path.join(process.cwd(), 'src/data');
    await fs.writeFile(
      jsonDirectory + '/affirmations.json',
      JSON.stringify(data, null, 2)
    );
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('Failed to save affirmations:', err);
    return NextResponse.json(
      { error: 'Failed to save affirmations' },
      { status: 500 }
    );
  }
} 