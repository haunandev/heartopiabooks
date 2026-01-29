# Heartopia Books

🌐 **Live Demo:** https://heartopiabooks.vercel.app/

Ringkasan singkat

- Heartopia Books adalah aplikasi manajemen data untuk aset game Heartopia (ingredients, foods, seeds, insects, fish, locations). Aplikasi ini dibuat dengan React + Vite dan dirancang untuk digunakan sebagai admin/utility tool (lokal) untuk memasukkan, mengedit, dan menelusuri data game.

**Kenapa ini dibuat**

- Memudahkan pengelolaan data game yang biasa disimpan sebagai JSON (mis. harga jual, lokasi, resep makanan).
- Menyediakan UI CRUD yang sederhana, pencarian, dan pengurutan (termasuk sort by profit untuk foods).

**Fitur Utama**

- CRUD untuk: ingredients, foods, seeds, insects, fish, locations
- Pencarian dan filter (searchable multi-select untuk lokasi)
- Sort termasuk: nama, harga, bintang, dan profit (untuk foods)
- **Rating System (S-D)**: Rating otomatis untuk foods (berdasarkan profit %), insects & fish (berdasarkan max sell price)
- **Multi-item Sell Calculator**: Kalkulator invoice-style dengan total cost, sell, profit, dan profit percentage
- **View Mode**: Toggle antara Card view dan Table view
- **Data Sync**: Export, Import, dan Reset data gameData.json
- **SEO Optimized**: Meta tags lengkap untuk Open Graph, Twitter Card, dan PWA
- Activity log untuk melacak perubahan data
- Penyimpanan lokal (localStorage) dengan migrasi otomatis untuk penambahan skema baru

**Stack Teknologi**

- Frontend: React, TypeScript, Vite
- Styling: Tailwind CSS
- Animasi: framer-motion
- Icons: lucide-react
- Component select: react-select
- Desktop wrapper: Tauri (catatan: Tauri hanya diperlukan untuk build desktop — frontend tetap berjalan sebagai situs statis)

**Persiapan & Jalankan (development)**

1. Install dependensi

```bash
npm install
```

2. Jalankan dev server (Vite)

```bash
npm run dev
```

3. Buka di browser (default): http://localhost:1420/

**Build untuk produksi**

**Web version (PWA - Progressive Web App):**

```bash
npm run build:web
```

Build akan menghasilkan folder `dist` dengan PWA support:

- Service Worker untuk offline capability
- Manifest untuk installable app
- Optimized caching strategy

**Desktop version (Tauri):**

```bash
npm run tauri:build
```

Build desktop executable untuk platform saat ini (Windows/Linux/macOS).

**Deploy ke Vercel/Netlify (Web + PWA)**

1. Push code ke GitHub
2. Connect repository di Vercel/Netlify
3. Build command: `npm run build:web`
4. Output directory: `dist`
5. Setelah deploy, user bisa install sebagai PWA dari browser (Chrome, Edge, Safari)

File `vercel.json` sudah disertakan untuk konfigurasi optimal.

**PWA Features:**

- ✅ Install ke desktop/home screen (Windows, Mac, Linux, Android, iOS)
- ✅ Offline capability dengan service worker
- ✅ Fast loading dengan precaching
- ✅ Standalone app experience tanpa browser UI

**Note:** Untuk icon PWA yang proper, ganti placeholder di `public/` dengan icon actual Anda. Lihat `PWA_ICONS_GUIDE.md` untuk panduan.

**Data & Migrasi**

- Data awal berada di src/data/gameData.json dan runtime menyimpan salinan di localStorage.
- Jika menambahkan properti baru (mis. locations.image), aplikasi melakukan migrasi dan mengisi fallback untuk mencegah error runtime.

**Cara menggunakan (singkat)**

- Buka tab yang sesuai (Ingredients, Foods, Seeds, Insects, Fish, Locations)
- Gunakan tombol Add untuk menambah item baru
- Klik Edit atau Delete pada kartu item untuk mengubah atau menghapus
- Toggle View Mode: Switch antara Card view (grid) dan Table view (list)
- **Data Sync**: Klik tombol "Data Sync" di header untuk:
  - **Export**: Download data saat ini sebagai file JSON (backup)
  - **Import**: Upload file JSON untuk mengganti data saat ini
  - **Reset**: Kembalikan ke data default dari gameData.json
- Untuk Locations: setiap lokasi punya ID (tidak bisa diubah setelah dibuat), nama, dan optional image URL
- Untuk Foods: tersedia fitur sort by profit yang menghitung berdasarkan harga bahan

**Kontribusi**

- Pull requests diterima. Jaga scope perubahan agar tetap fokus (UI/UX, bugfix, atau penambahan data).

**Lisensi**

- Tambahkan lisensi proyek sesuai kebutuhan. Saat ini tidak ada lisensi yang disertakan.

---

Suggested GitHub repo description:
"Admin toolkit for managing Heartopia game data (ingredients, foods, seeds, insects, fish, locations) — React + Vite app with CRUD, search, filters, profit sorting, and local persistence."

# 🎮 Heartopia Books

Aplikasi desktop modern untuk mengelola data game Heartopia. Dibangun dengan **Tauri + React + TypeScript** untuk performa ringan dan UI yang cantik.

![Heartopia Books](https://img.shields.io/badge/Tauri-FFC131?style=for-the-badge&logo=tauri&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

- 📊 **View & Search** - Lihat semua data ingredients, foods, dan seeds dengan search
- 🎨 **Modern UI** - Interface yang cantik dengan Tailwind CSS
- ⚡ **Super Ringan** - Ukuran aplikasi ~5-10 MB (thanks to Tauri!)
- 🔍 **Search Functionality** - Cari data dengan cepat
- ⭐ **Rating System** - Rating otomatis S-D untuk foods, insects, dan fish
- 🧮 **Sell Calculator** - Multi-item calculator dengan analisis profit
- 📱 **Responsive** - UI yang responsive untuk berbagai ukuran layar
- 💾 **JSON Database** - Data tersimpan di file JSON yang mudah di-edit
- 🌐 **SEO Ready** - Optimized untuk web deployment dengan meta tags lengkap

## 🚀 Quick Start

### Prerequisites

Pastikan sudah install:

- [Node.js](https://nodejs.org/) (v18+)
- [Rust](https://www.rust-lang.org/tools/install)
- [Tauri Prerequisites](https://tauri.app/start/prerequisites/) untuk OS kamu

### Installation

```bash
# Install dependencies
npm install

# Run development mode
npm run dev

# Build untuk production
npm run tauri build
```

## 📁 Struktur Project

```
heartopiabooks/
├── src/
│   ├── components/       # UI Components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── IngredientCard.tsx
│   │   ├── FoodCard.tsx
│   │   └── SeedCard.tsx
│   ├── data/
│   │   └── gameData.json # Database JSON
│   ├── lib/
│   │   └── utils.ts      # Helper functions
│   ├── types/
│   │   └── index.ts      # TypeScript types
│   ├── App.tsx           # Main component
│   └── index.css         # Tailwind styles
├── src-tauri/            # Tauri backend (Rust)
└── package.json
```

## 📝 Update Data

Untuk menambah/edit data game, edit file:

```
src/data/gameData.json
```

Format data:

```json
{
  "ingredients": [
    {
      "id": 1,
      "name": "Tomato",
      "sell_price": 30,
      "buy_price": null,
      "source": "seed",
      "image": "tomato.png"
    }
  ],
  "foods": [...],
  "seeds": [...]
}
```

## 🖼️ Mengganti Gambar

1. Letakkan gambar di folder `public/images/`
2. Update property `image` di `gameData.json`
3. Format gambar: PNG atau JPG

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Language:** TypeScript
- **Desktop Framework:** Tauri
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Build Tool:** Vite

## 📦 Build untuk Windows

```bash
# Build executable
npm run tauri build

# Hasil build ada di:
# src-tauri/target/release/bundle/
```

## 🎯 Roadmap / Future Features

- [x] CRUD Operations (Add, Edit, Delete items)
- [x] Export/Import JSON
- [x] Calculate profit margins
- [x] Card & Table view modes
- [ ] Recipe calculator
- [ ] Dark mode
- [ ] Cloud backup & restore data

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## 💖 Support

Jika aplikasi ini membantu, consider untuk support developer:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy_Me_A_Coffee-FFDD00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/grims)

---

Made with ❤️ for Heartopia Game
