import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const r2Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export interface UploadResult {
  success: boolean;
  url?: string;
  key?: string;
  error?: string;
}

export async function uploadToR2(
  file: File,
  userId: string,
  folder: string = 'thumbnails'
): Promise<UploadResult> {
  try {
    const fileExtension = file.name.split('.').pop();
    const key = `${folder}/${userId}-${Date.now()}.${fileExtension}`;

    const buffer = await file.arrayBuffer();

    const uploadCommand = new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: new Uint8Array(buffer),
      ContentType: file.type,
      ContentLength: file.size,
    });

    await r2Client.send(uploadCommand);

    const url = process.env.R2_PUBLIC_URL 
      ? `${process.env.R2_PUBLIC_URL}/${key}`
      : `/api/images/${key}`;

    return {
      success: true,
      url,
      key,
    };
  } catch (error) {
    console.error('Error uploading to R2:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
    });

    await r2Client.send(deleteCommand);
    return true;
  } catch (error) {
    console.error('Error deleting from R2:', error);
    return false;
  }
}

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (file.size > maxSize) {
    return { valid: false, error: 'File size must be less than 5MB' };
  }

  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'File must be a valid image (JPEG, PNG, WebP, or GIF)' };
  }

  return { valid: true };
}
