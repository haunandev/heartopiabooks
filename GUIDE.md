# 📖 Panduan Penggunaan Heartopia Books

## 🎯 Cara Menggunakan Aplikasi

### 1. Menjalankan Aplikasi

**Mode Development (untuk testing):**

```bash
npm run dev
```

Aplikasi akan terbuka di browser pada `http://localhost:1420/`

**Build Aplikasi Desktop:**

```bash
npm run tauri build
```

Akan menghasilkan file `.exe` yang bisa di-install di Windows.

---

## 📝 Cara Update Data Game

### Edit Data JSON

Buka file: `src/data/gameData.json`

### Format Data

#### 1. Ingredients

```json
{
  "id": 1, // ID unik (increment dari yang terakhir)
  "name": "Tomato", // Nama ingredient
  "sell_price": 30, // Harga jual (null jika tidak bisa dijual)
  "buy_price": null, // Harga beli (null jika tidak bisa dibeli)
  "source": "seed", // Sumber: "seed", "wild", atau "buy"
  "image": "tomato.png" // Nama file gambar
}
```

#### 2. Foods

```json
{
  "id": 1, // ID unik
  "name": "Apple Pie", // Nama makanan
  "ingredients": [
    // Bahan-bahan yang dibutuhkan
    { "name": "Apple", "quantity": 1 },
    { "name": "Wheat", "quantity": 1 }
  ],
  "sell_price": {
    // Harga jual berdasarkan bintang
    "1s": 730, // 1 star
    "2s": 1095, // 2 star (optional)
    "3s": 1460 // 3 star (optional)
  },
  "image": "apple-pie.png"
}
```

#### 3. Seeds

```json
{
  "id": 1, // ID unik
  "name": "Grape Seed", // Nama seed
  "quantity": 60, // Jumlah yang dibeli
  "total_price": 9600, // Total harga
  "price_per_seed": 160, // Harga per seed (total/quantity)
  "image": "grape-seed.png"
}
```

---

## 🖼️ Cara Menambah Gambar

### Step 1: Siapkan Gambar

- Format: PNG atau JPG
- Ukuran recommended: 128x128px atau 256x256px
- Nama file: lowercase dengan dash (contoh: `black-truffle.png`)

### Step 2: Copy ke Folder

Letakkan gambar di: `public/images/`

Contoh struktur:

```
public/
└── images/
    ├── tomato.png
    ├── potato.png
    ├── black-truffle-pie.png
    └── ...
```

### Step 3: Update JSON

Edit `src/data/gameData.json` dan update property `image`:

```json
{
  "name": "Tomato",
  "image": "tomato.png" // Sesuaikan dengan nama file
}
```

### Step 4: Update Component (Optional)

Jika ingin gambar dari folder `public/images/`, edit component untuk load image:

Edit file: `src/components/IngredientCard.tsx`, `FoodCard.tsx`, `SeedCard.tsx`

Ganti bagian placeholder image dengan:

```tsx
<img
  src={`/images/${ingredient.image}`}
  alt={ingredient.name}
  className="w-16 h-16 rounded-lg object-cover"
  onError={(e) => {
    // Fallback ke emoji jika gambar tidak ada
    e.currentTarget.style.display = "none";
  }}
/>
```

---

## 🎨 Customization

### Ubah Warna Tema

Edit file: `tailwind.config.js`

```js
theme: {
  extend: {
    colors: {
      primary: {
        500: '#ef4444', // Ubah warna utama
        600: '#dc2626',
      },
    },
  },
}
```

### Ubah Logo Header

Edit file: `src/App.tsx`

Cari bagian header dan ganti icon Heart dengan icon lain dari Lucide React.

---

## 🔧 Troubleshooting

### Error: "Rust not found"

Install Rust dari: https://rustup.rs/

### Error: "webkit2gtk not found" (Linux)

Install prerequisites untuk Linux:

```bash
sudo apt install libwebkit2gtk-4.1-dev \
  build-essential \
  curl \
  wget \
  file \
  libxdo-dev \
  libssl-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev
```

### Aplikasi tidak bisa build

1. Pastikan Node.js dan Rust sudah terinstall
2. Hapus folder `node_modules` dan `package-lock.json`
3. Jalankan `npm install` lagi
4. Coba build lagi

### Data tidak muncul

1. Cek format JSON di `src/data/gameData.json` apakah valid
2. Pastikan setiap item punya `id` yang unik
3. Buka browser console (F12) untuk lihat error

---

## 💡 Tips & Tricks

### 1. Backup Data

Sebelum edit data, selalu backup file `gameData.json`:

```bash
cp src/data/gameData.json src/data/gameData.backup.json
```

### 2. Validate JSON

Gunakan online tool untuk validasi JSON:

- https://jsonlint.com/
- Paste JSON kamu dan check apakah ada error

### 3. Hot Reload

Saat development mode (`npm run dev`), aplikasi akan auto-reload setiap kali kamu save file!

### 4. Search Shortcut

Gunakan Ctrl+F atau Cmd+F di browser untuk cari data lebih cepat (saat development).

---

## 📞 Need Help?

Jika ada masalah atau butuh fitur tambahan, silakan:

1. Check error di browser console (F12)
2. Read dokumentasi Tauri: https://tauri.app
3. Read dokumentasi React: https://react.dev

---

**Happy Coding! 🚀**
