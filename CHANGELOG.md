# 📝 Changelog

All notable changes to Heartopia Books will be documented here.

## [1.0.0] - 2026-01-28

### ✨ Initial Release

#### Features

- 📊 View all game data (Ingredients, Foods, Seeds)
- 🔍 Search functionality across all data types
- 🎨 Modern, responsive UI with Tailwind CSS
- 📱 Tab-based navigation
- 🖼️ Image support with fallback icons
- 💰 Price formatting for Indonesian locale
- 🏷️ Source badges for ingredients (seed/wild/buy)
- ⭐ Star rating display for foods
- 📦 Detailed seed information with calculations

#### Tech Stack

- Tauri 2.x for desktop framework
- React 18 for UI
- TypeScript for type safety
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tool

#### Components

- `Button` - Reusable button component with variants
- `Card` - Card container with consistent styling
- `IngredientCard` - Display ingredient information
- `FoodCard` - Display food recipes and prices
- `SeedCard` - Display seed pricing details

#### Data Structure

- JSON-based database in `src/data/gameData.json`
- Support for 21 ingredients
- Support for 11 food recipes
- Support for 10 seed types

### 📝 Documentation

- README.md - Project overview
- GUIDE.md - User guide for usage and customization
- FILE_STRUCTURE.md - Code structure documentation
- IMAGE_GUIDE.md - Image handling guide
- CHANGELOG.md - Version history (this file)

---

## 🔮 Planned Features (Future Updates)

### Version 1.1.0 (Planned)

- [ ] Add CRUD operations (Create, Read, Update, Delete)
- [ ] Modal dialogs for editing items
- [ ] Form validation
- [ ] Confirmation dialogs for delete

### Version 1.2.0 (Planned)

- [ ] Export data to JSON
- [ ] Import data from JSON
- [ ] Backup & restore functionality
- [ ] Multiple save files support

### Version 1.3.0 (Planned)

- [ ] Profit calculator
- [ ] Recipe cost calculator
- [ ] Best profit analysis
- [ ] Statistics dashboard

### Version 2.0.0 (Planned)

- [ ] Dark mode
- [ ] Multiple themes
- [ ] Settings page
- [ ] Database migration to SQLite
- [ ] Multi-language support (EN/ID)

### Future Considerations

- [ ] Cloud sync
- [ ] Community recipes sharing
- [ ] Price history tracking
- [ ] Shopping list generator
- [ ] Achievement tracker
- [ ] Integration with game API (if available)

---

## 📋 Version Format

Format: [MAJOR.MINOR.PATCH]

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes

---

**Note:** Changelog akan di-update setiap ada perubahan signifikan pada aplikasi.
