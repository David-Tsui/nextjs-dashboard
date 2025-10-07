# Cloudflare R2 Setup Instructions

## Environment Variables Required

Add the following variables to your `.env` file:

```bash
# Cloudflare R2
R2_ACCOUNT_ID=your_cloudflare_account_id
R2_ACCESS_KEY_ID=your_r2_access_key_id
R2_SECRET_ACCESS_KEY=your_r2_secret_access_key
R2_BUCKET_NAME=your_bucket_name
R2_PUBLIC_URL=https://your-bucket-public-url
```

## Steps to Configure Cloudflare R2

1. **Create R2 Bucket**
   - Go to Cloudflare Dashboard > R2 Object Storage
   - Create a new bucket
   - Note the bucket name

2. **Get API Tokens**
   - Go to R2 "Manage API tokens"
   - "Create User API token" with Object Read and Write permissions
   - Note the Access Key ID and Secret Access Key

3. **Configure Public Access** (optional):
   - Set up custom domain or use R2.dev subdomain for public URL
   - Update `R2_PUBLIC_URL` with your public domain

## Features Implemented

- ✅ User thumbnail upload with file validation
- ✅ S3-compatible R2 integration
- ✅ Profile page for managing user thumbnails
- ✅ Sidebar display of user profile picture
- ✅ Automatic database updates on upload
- ✅ Error handling and user feedback

## File Validation

- Maximum file size: 5MB
- Supported formats: JPEG, PNG, WebP, GIF
- Automatic filename generation with user ID and timestamp

## Usage

1. Navigate to `/dashboard/profile`
2. Click "Change Photo" to upload a new thumbnail
3. The image will be uploaded to R2 and saved to the user's profile
4. The thumbnail will appear in the sidebar navigation
