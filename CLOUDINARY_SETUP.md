# Cloudinary Setup Guide

This guide will help you set up Cloudinary for image uploads in the Heartopia Books application.

## Step 1: Get Your Cloudinary Credentials

1. Go to [Cloudinary Console](https://console.cloudinary.com/app/c-ec642d25f645d6a1eb863162f3d374/image/getting-started)
2. Copy your **Cloud Name** from the dashboard
3. Navigate to Settings > Upload > Upload Presets
4. Create a new unsigned upload preset or use an existing one
5. Copy the **Upload Preset** name

## Step 2: Configure Environment Variables

1. Open the `.env` file in the root directory
2. Update the following values:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset_here
```

## Step 3: Create an Upload Preset (if needed)

If you don't have an upload preset:

1. Go to Settings > Upload > Upload Presets
2. Click "Add upload preset"
3. Set **Signing Mode** to "Unsigned"
4. Set **Folder** to `heartopia` (optional but recommended)
5. Configure other settings as needed:
   - Max file size
   - Allowed formats (jpg, png, webp recommended)
   - Transformation options
6. Save and copy the preset name

## Features

### Image Upload Component

The `ImageUpload` component provides:

- **Drag & Drop Upload**: Easy file selection
- **Image Cropping**: Crop images before upload with adjustable aspect ratio
- **URL Input**: Option to paste image URLs directly
- **Preview**: See images before saving
- **Cloudinary Integration**: Automatic upload to Cloudinary CDN
- **Error Handling**: Graceful fallbacks for missing images

### Usage in Forms

The component is now integrated into all forms with image inputs:

- Ingredients
- Foods
- Seeds
- Insects
- Fish
- Birds
- Locations

Each form supports both Cloudinary upload and manual URL input.

## Testing

1. Restart the dev server after configuring .env:

   ```bash
   npm run dev
   ```

2. Try uploading an image in any form
3. The image should be cropped (if needed) and uploaded to Cloudinary
4. The returned URL will be automatically saved

## Troubleshooting

### Upload Failed

- Check your Cloud Name and Upload Preset are correct
- Ensure the upload preset is set to "Unsigned"
- Check your Cloudinary account limits

### Images Not Displaying

- Verify the image URL is correct
- Check browser console for CORS errors
- Ensure Cloudinary URLs are accessible

### Crop Not Working

- Make sure the image file is valid
- Try with a smaller file size
- Check browser console for errors

## Security Notes

- The `.env` file is gitignored for security
- Never commit actual credentials to version control
- Use unsigned upload presets for client-side uploads
- Consider setting up upload restrictions in Cloudinary dashboard
