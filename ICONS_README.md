# PWA Icons Setup

## Current Status
An SVG icon template (`icon.svg`) has been created with a mosque design on a purple gradient background.

## Required Icons for PWA

To complete the PWA setup, you need to generate PNG icons in the following sizes:

- **icon-192.png** - 192x192 pixels (required for Android)
- **icon-512.png** - 512x512 pixels (required for Android splash screen)

## How to Generate Icons

### Option 1: Online Tools (Easiest)
1. Use [RealFaviconGenerator.net](https://realfavicongenerator.net/)
   - Upload `icon.svg`
   - It will generate all required sizes automatically
   - Download and place in the root directory

2. Use [PWA Builder](https://www.pwabuilder.com/imageGenerator)
   - Upload `icon.svg`
   - Generate all PWA icons
   - Download and extract to root

### Option 2: Using ImageMagick (Command Line)
```bash
# Install ImageMagick
brew install imagemagick  # macOS
# sudo apt-get install imagemagick  # Linux

# Generate icons
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
```

### Option 3: Using Inkscape (GUI)
1. Open `icon.svg` in Inkscape
2. File > Export PNG Image
3. Set width/height to 192 and export as `icon-192.png`
4. Repeat with 512 for `icon-512.png`

### Option 4: Using Photoshop/Figma/Sketch
1. Import `icon.svg`
2. Resize to 192x192 and export as PNG
3. Resize to 512x512 and export as PNG

## Icon Design Guidelines

For best results:
- Use a simple, recognizable design
- Ensure good contrast with various backgrounds
- Keep important elements away from edges (safe zone: 80% of canvas)
- Test on both light and dark backgrounds
- Consider "maskable" icons for Android adaptive icons

## Maskable Icons
The current manifest is set up for maskable icons. This means:
- Keep important content in the center 80% of the icon
- The outer 20% may be cropped on some devices
- Use tools like [Maskable.app](https://maskable.app/) to test

## After Generating Icons
1. Place `icon-192.png` and `icon-512.png` in the root directory
2. Test the PWA installation
3. Verify icons appear correctly on home screen and splash screen
4. Update manifest.json if you want to add more icon sizes

## Optional: Additional Icon Sizes
For better quality across devices, you can also generate:
- 72x72, 96x96, 128x128, 144x144, 152x152, 384x384
- Apple Touch Icons: 180x180
- Favicon: 16x16, 32x32

Add these to manifest.json in the icons array.

