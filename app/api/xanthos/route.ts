import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET() {
  const filePath = path.join(process.cwd(), 'app', 'isik-ulkesine-dair', 'xanthos.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const jsonData = JSON.parse(fileData);
  return NextResponse.json(jsonData);
}