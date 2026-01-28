# ⚡ Quick Reference

## 🚀 Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🖥️ Tauri Commands

```bash
# Run Tauri app in dev mode
npm run tauri dev

# Build Tauri desktop app
npm run tauri build

# Check Tauri info & dependencies
npm run tauri info
```

## 📦 Package Management

```bash
# Install dependencies
npm install

# Install new package
npm install <package-name>

# Install dev dependency
npm install -D <package-name>

# Update packages
npm update
```

## 🔍 Useful Shortcuts

### Browser (Development)

- `F12` - Open DevTools
- `Ctrl + R` - Refresh page
- `Ctrl + Shift + I` - Inspect element

### VS Code

- `Ctrl + P` - Quick file search
- `Ctrl + Shift + F` - Search in files
- `Ctrl + B` - Toggle sidebar
- `Ctrl + `` ` `` - Toggle terminal

## 📁 Important Files

```bash
# Edit data
src/data/gameData.json

# Main component
src/App.tsx

# Styling
src/index.css
tailwind.config.js

# App config
src-tauri/tauri.conf.json

# Dependencies
package.json
```

## 🛠️ Common Tasks

### Add New Ingredient

1. Edit `src/data/gameData.json`
2. Add new object with unique ID
3. Save file (auto-reload)

### Change App Name

1. Edit `src-tauri/tauri.conf.json`
2. Change `productName`
3. Rebuild app

### Add Image

1. Copy image to `public/images/`
2. Update `image` field in JSON
3. Refresh browser

### Change Theme Color

1. Edit `tailwind.config.js`
2. Modify `colors.primary`
3. Save (auto-reload)

## 🐛 Debug

```bash
# Check for TypeScript errors
npx tsc --noEmit

# Check Tauri setup
npm run tauri info

# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📊 Project Stats

```bash
# Count lines of code
npx cloc src/

# Check bundle size
npm run build
npx vite-bundle-visualizer

# Check dependencies
npm list --depth=0
```

## 🔐 Git Commands (Optional)

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create .gitignore (already exists)
# node_modules and dist are ignored
```

## 🌐 URLs

- **Dev Server:** http://localhost:1420/
- **Tauri Docs:** https://tauri.app
- **React Docs:** https://react.dev
- **Tailwind Docs:** https://tailwindcss.com

## 📝 Quick Edit Locations

### UI/Layout

- Header: `src/App.tsx` (line ~40)
- Tabs: `src/App.tsx` (line ~60)
- Cards: `src/components/*Card.tsx`

### Data

- All data: `src/data/gameData.json`

### Styling

- Colors: `tailwind.config.js`
- Global styles: `src/index.css`
- Component styles: Inline in .tsx files

### Config

- App settings: `src-tauri/tauri.conf.json`
- TypeScript: `tsconfig.json`
- Vite: `vite.config.ts`

---

**Tip:** Bookmark file ini untuk akses cepat ke command yang sering dipakai!
