import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded' });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Define the path where the file will be saved
    const path = `./public/uploads/${file.name}`;
    await writeFile(path, buffer);

    console.log(`File saved at ${path}`);

    return NextResponse.json({ success: true, path });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
