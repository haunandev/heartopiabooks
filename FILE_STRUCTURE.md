# 🗂️ File Structure

```
heartopiabooks/
│
├── public/                          # Static assets
│   └── images/                      # Tempat gambar items (tomato.png, etc)
│
├── src/
│   ├── components/                  # React Components
│   │   ├── Button.tsx              # Komponen tombol reusable
│   │   ├── Card.tsx                # Komponen card container
│   │   ├── IngredientCard.tsx      # Card untuk ingredients
│   │   ├── FoodCard.tsx            # Card untuk foods
│   │   └── SeedCard.tsx            # Card untuk seeds
│   │
│   ├── data/
│   │   └── gameData.json           # ⭐ DATABASE UTAMA (edit disini!)
│   │
│   ├── lib/
│   │   └── utils.ts                # Helper functions (format price, etc)
│   │
│   ├── types/
│   │   └── index.ts                # TypeScript type definitions
│   │
│   ├── App.tsx                     # Main component / entry point
│   ├── index.css                   # Tailwind CSS imports
│   └── main.tsx                    # React root
│
├── src-tauri/                       # Tauri backend (Rust)
│   ├── src/
│   │   └── lib.rs                  # Main Rust code
│   ├── Cargo.toml                  # Rust dependencies
│   └── tauri.conf.json             # Tauri configuration
│
├── GUIDE.md                         # 📖 Panduan lengkap penggunaan
├── README.md                        # Dokumentasi project
├── package.json                     # NPM dependencies & scripts
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── vite.config.ts                  # Vite build configuration
```

## 📝 File Penting yang Sering Diedit

### 1. `src/data/gameData.json`

**Fungsi:** Database utama untuk semua data game
**Edit untuk:** Menambah/edit ingredients, foods, seeds

### 2. `src/App.tsx`

**Fungsi:** Main component, layout & logic aplikasi
**Edit untuk:** Ubah tampilan, tambah fitur baru

### 3. `src/components/*.tsx`

**Fungsi:** Komponen UI individual
**Edit untuk:** Ubah tampilan card, tambah info

### 4. `tailwind.config.js`

**Fungsi:** Konfigurasi warna & styling
**Edit untuk:** Ubah tema warna

### 5. `src-tauri/tauri.conf.json`

**Fungsi:** Konfigurasi aplikasi desktop
**Edit untuk:** Ubah nama app, icon, window size

## 🎨 Customization Quick Guide

### Ubah Nama Aplikasi

Edit: `src-tauri/tauri.conf.json`

```json
{
  "productName": "Heartopia Books", // Ubah disini
  "version": "1.0.0"
}
```

### Ubah Window Size

Edit: `src-tauri/tauri.conf.json`

```json
{
  "windows": [
    {
      "width": 1200, // Ubah width
      "height": 800 // Ubah height
    }
  ]
}
```

### Tambah Data Baru

Edit: `src/data/gameData.json`

```json
{
  "ingredients": [
    // Tambah item baru dengan ID increment
    { "id": 22, "name": "New Item", ... }
  ]
}
```

## 🔧 NPM Scripts

```bash
npm run dev              # Run development server
npm run build            # Build web version
npm run tauri dev        # Run Tauri desktop app (dev)
npm run tauri build      # Build desktop app executable
```

## 📦 Dependencies

### Frontend

- **react** - UI framework
- **typescript** - Type safety
- **tailwindcss** - Styling
- **lucide-react** - Icons
- **vite** - Build tool

### Backend

- **tauri** - Desktop framework
- **rust** - Backend language

---

**Tip:** Backup `gameData.json` sebelum edit!
