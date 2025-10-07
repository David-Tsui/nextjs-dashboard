'use client';

import { useState } from 'react';
import { PhotoIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';

interface ThumbnailUploadProps {
  currentThumbnail?: string;
  onUploadSuccess?: (url: string) => void;
}

export default function ThumbnailUpload({
  currentThumbnail,
  onUploadSuccess,
}: ThumbnailUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentThumbnail || null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      setError('File must be a valid image (JPEG, PNG, WebP, or GIF)');
      return;
    }

    setError(null);
    setPreviewUrl(URL.createObjectURL(file));

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    
    try {
      const formData = new FormData();
      formData.append('thumbnail', file);

      const response = await fetch('/api/upload-thumbnail', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      setPreviewUrl(result.url);
      onUploadSuccess?.(result.url);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      setPreviewUrl(currentThumbnail || null);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200 bg-gray-50">
          {previewUrl ? (
            <Image
              src={previewUrl}
              alt="Profile thumbnail"
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <PhotoIcon className="w-8 h-8 text-gray-400" />
            </div>
          )}
          
          {isUploading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          )}
        </div>

        <label className="mt-4 cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
            disabled={isUploading}
          />
          <PhotoIcon className="w-4 h-4 mr-2" />
          {isUploading ? 'Uploading...' : 'Change Photo'}
        </label>
      </div>

      {error && (
        <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      <p className="text-xs text-gray-500 text-center">
        Upload a photo (max 5MB). Supported formats: JPEG, PNG, WebP, GIF.
      </p>
    </div>
  );
}