# Heartopia Books

Ringkasan singkat

- Heartopia Books adalah aplikasi manajemen data untuk aset game Heartopia (ingredients, foods, seeds, insects, fish, locations). Aplikasi ini dibuat dengan React + Vite dan dirancang untuk digunakan sebagai admin/utility tool (lokal) untuk memasukkan, mengedit, dan menelusuri data game.

**Kenapa ini dibuat**

- Memudahkan pengelolaan data game yang biasa disimpan sebagai JSON (mis. harga jual, lokasi, resep makanan).
- Menyediakan UI CRUD yang sederhana, pencarian, dan pengurutan (termasuk sort by profit untuk foods).

**Fitur Utama**

- CRUD untuk: ingredients, foods, seeds, insects, fish, locations
- Pencarian dan filter (searchable multi-select untuk lokasi)
- Sort termasuk: nama, harga, bintang, dan profit (untuk foods)
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

```bash
npm run build
```

Build akan menghasilkan folder `dist` siap dideploy ke static host (Vercel, Netlify, GitHub Pages, dsb.).

**Catatan Deploy ke Vercel**

- Frontend (React + Vite) dapat dideploy ke Vercel. Jika repo ini juga mengandung kode Tauri, itu tidak dieksekusi di Vercel — Tauri hanya untuk paket desktop.
- Contoh vercel.json (opsional) untuk memastikan SPA rewrite:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Data & Migrasi**

- Data awal berada di src/data/gameData.json dan runtime menyimpan salinan di localStorage.
- Jika menambahkan properti baru (mis. locations.image), aplikasi melakukan migrasi dan mengisi fallback untuk mencegah error runtime.

**Cara menggunakan (singkat)**

- Buka tab yang sesuai (Ingredients, Foods, Seeds, Insects, Fish, Locations)
- Gunakan tombol Add untuk menambah item baru
- Klik Edit atau Delete pada kartu item untuk mengubah atau menghapus
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
- 📱 **Responsive** - UI yang responsive untuk berbagai ukuran layar
- 💾 **JSON Database** - Data tersimpan di file JSON yang mudah di-edit

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

- [ ] CRUD Operations (Add, Edit, Delete items)
- [ ] Export/Import JSON
- [ ] Calculate profit margins
- [ ] Recipe calculator
- [ ] Dark mode
- [ ] Backup & restore data

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

---

Made with ❤️ for Heartopia Game
