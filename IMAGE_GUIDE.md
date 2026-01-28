# 🎨 Image Guide

## Format Gambar

Aplikasi support format:

- PNG (.png)
- JPG/JPEG (.jpg, .jpeg)
- SVG (.svg)
- WebP (.webp)

## Ukuran Recommended

- **Ingredients:** 64x64px hingga 128x128px
- **Foods:** 128x128px hingga 256x256px
- **Seeds:** 64x64px hingga 128x128px

## Cara Menambah Gambar

### 1. Siapkan Gambar

- Crop gambar menjadi square (1:1 ratio)
- Resize ke ukuran recommended
- Simpan dengan nama lowercase + dash

Contoh nama file:

- ✅ `black-truffle.png`
- ✅ `corn-soup.png`
- ❌ `Black Truffle.png`
- ❌ `corn soup.png`

### 2. Copy ke Folder

```
public/images/
├── tomato.png
├── potato.png
├── black-truffle.png
└── ...
```

### 3. Update JSON

Edit `src/data/gameData.json`:

```json
{
  "name": "Black Truffle",
  "image": "black-truffle.png" // Nama file harus sama persis
}
```

## Fallback Image

Jika gambar tidak ditemukan, aplikasi akan otomatis menampilkan:

- 🌿 Icon untuk Ingredients
- 📖 Icon untuk Foods
- 📦 Icon untuk Seeds

## Tips

### Optimize Image Size

Gunakan tool online untuk compress image:

- https://tinypng.com/
- https://squoosh.app/

### Batch Rename

Gunakan PowerRename (Windows 11) atau Bulk Rename Utility untuk rename banyak file sekaligus.

### Where to Get Icons/Images

- Game screenshot
- Icon packs: https://www.flaticon.com/
- Emoji to image: https://emojipedia.org/

## Testing

Setelah menambah gambar:

1. Refresh browser (Ctrl+R)
2. Check apakah gambar muncul
3. Jika tidak muncul:
   - Check nama file (case-sensitive)
   - Check format file support
   - Check path di gameData.json

---

**Note:** Saat ini aplikasi menggunakan fallback icons. Ganti dengan gambar asli sesuai kebutuhan!
