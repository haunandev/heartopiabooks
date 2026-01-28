# PWA Icons Guide

## Icon Requirements

For PWA to work properly, you need these icons in the `public/` folder:

- `pwa-192x192.png` - 192x192px PNG icon
- `pwa-512x512.png` - 512x512px PNG icon  
- `apple-touch-icon.png` - 180x180px PNG icon for iOS
- `favicon.ico` - 32x32px ICO favicon

## Creating Icons

### Option 1: Use an icon generator tool
- https://realfavicongenerator.net/
- https://www.pwabuilder.com/imageGenerator

### Option 2: Use a design tool
1. Create a 512x512px square image with your logo/brand
2. Export as PNG
3. Resize to create other sizes:
   - 512x512 → `pwa-512x512.png`
   - 192x192 → `pwa-192x192.png`
   - 180x180 → `apple-touch-icon.png`
4. Convert smallest to ICO format for `favicon.ico`

### Option 3: Use ImageMagick (command line)
```bash
cd public/

# Create base icon (replace with your actual logo)
convert -size 512x512 xc:"#dc2626" -gravity center \
  -fill white -pointsize 300 -annotate +0+0 "H" \
  pwa-512x512.png

# Resize for other sizes
convert pwa-512x512.png -resize 192x192 pwa-192x192.png
convert pwa-512x512.png -resize 180x180 apple-touch-icon.png
convert pwa-512x512.png -resize 32x32 favicon.ico
```

## Testing PWA

After deploying:
1. Open your site in Chrome/Edge
2. Look for "Install" button in address bar
3. Click to install as PWA
4. Test offline functionality

## Design Tips

- Use a simple, recognizable icon
- Avoid text (hard to read at small sizes)
- Use brand colors
- Ensure good contrast
- Test on both light and dark backgrounds
