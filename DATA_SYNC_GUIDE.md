# Data Sync Feature Guide

## Overview

Fitur Data Sync memungkinkan Anda untuk melakukan backup, restore, dan sinkronisasi data gameData.json dengan mudah melalui UI aplikasi.

## Features

### 1. Export Data (Backup)

**Fungsi:** Download data saat ini sebagai file JSON

**Cara Menggunakan:**

1. Klik tombol "Data Sync" di header (icon Database)
2. Pilih "Export Data"
3. Klik tombol "Download JSON"
4. File akan terdownload dengan nama format: `heartopia-data-YYYY-MM-DD.json`

**Use Cases:**

- Backup data sebelum melakukan perubahan besar
- Share data dengan tim lain
- Membuat snapshot data untuk versi tertentu

### 2. Import Data (Restore/Update)

**Fungsi:** Upload file JSON untuk mengganti data saat ini

**Cara Menggunakan:**

1. Klik tombol "Data Sync" di header
2. Pilih "Import Data"
3. Klik tombol "Choose File"
4. Pilih file JSON yang ingin diimport
5. Data akan langsung ter-replace dan tersimpan

**Validasi:**

- File harus dalam format JSON valid
- Harus memiliki properti required: `ingredients`, `foods`, `seeds`
- Properti optional: `insects`, `fish`, `locations`

**Use Cases:**

- Restore dari backup sebelumnya
- Import data dari sumber lain
- Sinkronisasi dengan data tim

**⚠️ Warning:** Import akan mengganti SEMUA data yang ada. Pastikan backup data lama terlebih dahulu.

### 3. Reset to Default

**Fungsi:** Kembalikan data ke default dari file `src/data/gameData.json`

**Cara Menggunakan:**

1. Klik tombol "Data Sync" di header
2. Pilih "Reset to Default"
3. Klik tombol "Reset Data"
4. Konfirmasi reset
5. Data akan kembali ke state awal

**Use Cases:**

- Membatalkan semua perubahan
- Mulai dari awal
- Testing dengan data clean

**⚠️ Warning:** Reset akan MENGHAPUS semua perubahan yang Anda buat. Tindakan ini tidak bisa di-undo.

## JSON Format

Format file yang di-export/import harus mengikuti struktur berikut:

```json
{
  "ingredients": [
    {
      "id": 1,
      "name": "Carrot",
      "source": "seed",
      "buy_price": 25,
      "sell_price": 35,
      "sell_price_stars": {
        "1s": 40,
        "2s": 45,
        "3s": 50
      },
      "image_url": ""
    }
  ],
  "foods": [
    {
      "id": 1,
      "name": "Carrot Soup",
      "ingredients": [{ "name": "Carrot", "quantity": 2 }],
      "sell_price": {
        "1s": 100,
        "2s": 150,
        "3s": 200,
        "4s": 250,
        "5s": 300
      },
      "image_url": ""
    }
  ],
  "seeds": [
    {
      "id": 1,
      "name": "Carrot Seed",
      "price": 25,
      "image_url": ""
    }
  ],
  "insects": [
    {
      "id": 1,
      "name": "Butterfly",
      "locations": ["loc1", "loc2"],
      "sell_price": {
        "1s": 50,
        "2s": 75,
        "3s": 100
      },
      "image_url": ""
    }
  ],
  "fish": [
    {
      "id": 1,
      "name": "Salmon",
      "locations": ["loc3"],
      "sell_price": {
        "1s": 100,
        "2s": 150,
        "3s": 200
      },
      "image_url": ""
    }
  ],
  "locations": [
    {
      "id": "loc1",
      "name": "Forest",
      "image_url": ""
    },
    {
      "id": "loc2",
      "name": "Mountain",
      "image_url": ""
    },
    {
      "id": "loc3",
      "name": "River",
      "image_url": ""
    }
  ]
}
```

## Activity Log

Setiap operasi Data Sync akan tercatat di Activity Log:

- **Export:** Log mencatat jumlah items per kategori
- **Import:** Log mencatat jumlah items yang di-import
- **Reset:** Log mencatat data yang di-reset ke default

## Error Handling

### Import Errors

Jika import gagal, akan muncul pesan error dengan detail:

- **"Invalid data format: missing required fields"** - File JSON tidak memiliki properti `ingredients`, `foods`, atau `seeds`
- **"Failed to read file"** - File tidak bisa dibaca (corrupt atau format salah)
- **Parse Error** - File bukan JSON valid

### Solutions:

1. Pastikan file adalah JSON valid (cek dengan JSON validator online)
2. Pastikan semua properti required ada
3. Gunakan file export dari aplikasi sebagai template

## Best Practices

### Before Import

1. ✅ Export data saat ini sebagai backup
2. ✅ Validasi file JSON yang akan di-import
3. ✅ Test import di environment development dulu

### Regular Backups

1. Export data secara berkala (harian/mingguan)
2. Simpan dengan naming convention yang jelas: `heartopia-data-2026-01-28.json`
3. Gunakan version control (Git) untuk track changes

### Team Collaboration

1. Tentukan satu source of truth untuk data
2. Gunakan export/import untuk sinkronisasi antar tim
3. Dokumentasikan perubahan di Activity Log

## Keyboard Shortcuts

Saat ini belum ada keyboard shortcuts untuk Data Sync. Fitur ini bisa ditambahkan di future update.

## Technical Details

### Storage

- Data disimpan di `localStorage` dengan key `heartopiaData`
- Activity logs disimpan di `localStorage` dengan key `heartopiaLogs`
- Browser localStorage limit: ~5-10MB (cukup untuk ribuan entries)

### Migration

- Aplikasi otomatis melakukan migration jika struktur data berubah
- Missing properties akan di-fill dengan default values
- Backward compatible dengan data lama

### File Size

- Typical export file: 50-500KB tergantung jumlah data
- Maximum recommended: <1MB untuk performa optimal

## Troubleshooting

### Problem: Import tidak bekerja

**Solution:**

- Cek console browser (F12) untuk error messages
- Pastikan file JSON valid
- Try dengan file sample: `sample-import.json`

### Problem: Export file kosong

**Solution:**

- Pastikan ada data di aplikasi
- Cek localStorage browser (Application tab di DevTools)
- Clear cache dan reload

### Problem: Reset tidak mengembalikan data

**Solution:**

- Cek file `src/data/gameData.json` masih ada
- Rebuild aplikasi: `npm run build`
- Clear localStorage: `localStorage.clear()`

## Future Enhancements

Planned features untuk Data Sync:

- [ ] Auto-backup timer (export otomatis setiap X waktu)
- [ ] Cloud sync (Google Drive, Dropbox integration)
- [ ] Merge data (combine imported data dengan existing)
- [ ] Selective import (pilih kategori mana yang di-import)
- [ ] Data diff viewer (lihat perubahan sebelum import)
- [ ] Export to CSV/Excel format
- [ ] Import from external APIs

## Support

Jika menemukan bug atau punya feature request untuk Data Sync:

1. Buka GitHub Issues di repository
2. Sertakan:
   - Steps to reproduce
   - Expected behavior
   - Actual behavior
   - Browser & OS version
   - File JSON (jika relevan)

---

**Last Updated:** January 28, 2026
**Version:** 1.0.0
