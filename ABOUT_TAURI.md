# 🦀 Tentang Tauri

## Apa itu Tauri?

Tauri adalah framework untuk membuat aplikasi desktop yang **ringan**, **cepat**, dan **aman**.

### Perbandingan dengan Electron

| Feature       | Tauri                    | Electron           |
| ------------- | ------------------------ | ------------------ |
| **Backend**   | Rust                     | Node.js            |
| **WebView**   | System (WebView2/WebKit) | Chromium (bundled) |
| **File Size** | ~5-10 MB                 | ~150-200 MB        |
| **Memory**    | ~50-100 MB               | ~200-400 MB        |
| **Startup**   | Cepat (~1s)              | Lumayan (~3s)      |
| **Security**  | Sangat baik              | Baik               |

### Kenapa Tauri?

#### ✅ Kelebihan

1. **Super Ringan** - Tidak bundle browser engine
2. **Performa Tinggi** - Rust backend yang compiled
3. **Keamanan Baik** - Default secure
4. **Resource Efficient** - Hemat RAM & CPU
5. **Modern** - Latest tech stack
6. **Cross-platform** - Windows, Mac, Linux

#### ⚠️ Kekurangan

1. **Lebih baru** - Ecosystem lebih kecil dari Electron
2. **Perlu Rust** - Harus install Rust compiler
3. **WebView berbeda** - Tiap OS beda engine
4. **Learning curve** - Perlu belajar Rust (untuk advanced features)

## Cara Kerja Tauri

```
┌─────────────────────────────────────┐
│         Frontend (React)             │  ← Yang kamu lihat
│    HTML + CSS + JavaScript           │     (Web technology)
└────────────┬────────────────────────┘
             │
             │ IPC (Inter-Process Communication)
             │
┌────────────▼────────────────────────┐
│        Backend (Rust)                │  ← Logic & System
│  - File system access                │     (Native code)
│  - System APIs                       │
│  - Database operations               │
└──────────────────────────────────────┘
```

### Frontend (Yang Kamu Code)

- React, Vue, Svelte, atau vanilla JS
- HTML/CSS untuk tampilan
- JavaScript untuk logic UI
- Bisa pakai library apapun

### Backend (Rust)

- Handle file system
- Access system APIs
- Database operations
- Native functionality
- **Kamu tidak perlu edit** untuk aplikasi sederhana!

## File Penting Tauri

### `src-tauri/tauri.conf.json`

Konfigurasi aplikasi:

```json
{
  "productName": "Heartopia Books", // Nama app
  "version": "1.0.0", // Versi
  "identifier": "com.heartopia.app", // Bundle ID

  "build": {
    "frontendDist": "../dist" // Output frontend
  },

  "windows": [
    {
      "title": "Heartopia Books", // Window title
      "width": 1200, // Lebar window
      "height": 800 // Tinggi window
    }
  ]
}
```

### `src-tauri/src/lib.rs`

Main Rust code (biasanya tidak perlu edit untuk basic app):

```rust
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}
```

## Command Reference

### Development

```bash
# Run app (dev mode dengan hot-reload)
npm run tauri dev
```

### Build

```bash
# Build untuk Windows
npm run tauri build

# Output: src-tauri/target/release/bundle/
# - .exe (portable)
# - .msi (installer)
# - NSIS installer
```

### Info

```bash
# Check tauri setup & dependencies
npm run tauri info
```

## Build Output

Setelah `npm run tauri build`, file ada di:

```
src-tauri/target/release/
├── bundle/
│   ├── msi/                    # Windows Installer (.msi)
│   ├── nsis/                   # NSIS Installer (.exe setup)
│   └── appimage/               # Linux (jika di Linux)
└── heartopia-books.exe         # Portable executable
```

### File untuk Distribusi

- **Portable:** `heartopia-books.exe` (~5-10 MB)
- **Installer:** `nsis/Heartopia-Books_1.0.0_x64-setup.exe`
- **MSI:** `msi/Heartopia-Books_1.0.0_x64_en-US.msi`

## Kebutuhan User

### Untuk Menjalankan App

**Windows:**

- WebView2 (biasanya sudah ada di Windows 10/11)
- Jika tidak ada, auto-download saat install

**Linux:**

- WebKitGTK

**macOS:**

- Built-in WebKit (sudah ada)

### File Size Final

- App size: ~5-10 MB
- Installer size: ~10-15 MB
- Sangat kecil dibanding Electron (~150 MB)!

## IPC (Komunikasi Frontend-Backend)

Contoh jika kamu mau akses Rust dari React:

### 1. Define Command di Rust

```rust
// src-tauri/src/lib.rs
#[tauri::command]
fn read_file(path: String) -> String {
    // Read file logic
}
```

### 2. Call dari React

```typescript
// src/App.tsx
import { invoke } from "@tauri-apps/api/core";

const data = await invoke("read_file", { path: "data.json" });
```

**Note:** Untuk aplikasi sederhana dengan JSON, kamu tidak perlu IPC!

## Security

Tauri punya security yang ketat:

### Allowlist

Di `tauri.conf.json`, kamu bisa control apa yang diizinkan:

```json
{
  "permissions": [
    "core:default",
    "fs:read-all" // Allow read files
  ]
}
```

### CSP (Content Security Policy)

Default CSP yang ketat untuk prevent XSS attacks.

## Resources

### Official Docs

- Website: https://tauri.app
- Docs: https://v2.tauri.app/start/
- GitHub: https://github.com/tauri-apps/tauri

### Community

- Discord: https://discord.com/invite/tauri
- Reddit: r/TauriApps

### Learn More

- Rust Book: https://doc.rust-lang.org/book/
- Tauri Guides: https://tauri.app/v1/guides/

## Tips

### 1. Development

- Use `npm run dev` untuk testing (faster)
- Hot reload works di browser mode
- Tauri dev mode butuh Rust compile (slower first time)

### 2. Production

- Always test build before release
- Check app size
- Test di clean Windows install

### 3. Updates

- Tauri punya auto-updater built-in
- Setup di tauri.conf.json

## Next Level (Advanced)

Jika mau explore lebih:

1. Belajar Rust basics
2. Custom Tauri commands
3. System tray integration
4. Auto-updater
5. Native modules
6. Multi-window apps

---

**Untuk aplikasi Heartopia Books, kamu tidak perlu advanced features!**

JSON + React sudah cukup. Tauri hanya membungkus jadi desktop app. 🚀

---

_Tauri = Modern, Lightweight, Fast!_ ⚡
