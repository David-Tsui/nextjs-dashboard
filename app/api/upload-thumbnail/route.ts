import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { uploadToR2, validateImageFile } from '@/app/lib/r2-storage';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('thumbnail') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const validation = validateImageFile(file);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const userId = session.user.email!;
    const uploadResult = await uploadToR2(file, userId);

    if (!uploadResult.success || !uploadResult.url) {
      return NextResponse.json({ error: uploadResult.error || 'Upload failed' }, { status: 500 });
    }

    await sql`
      UPDATE users 
      SET thumbnail = ${uploadResult.url}
      WHERE email = ${userId}
    `;

    return NextResponse.json({
      success: true,
      url: uploadResult.url,
      message: 'Thumbnail uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}