# 📝 Changelog

All notable changes to Heartopia Books will be documented here.

## [1.2.0] - 2026-01-29

### ✨ New Features

#### 🐦 Birds Data Category

- Added complete Birds data management (same structure as Fish)
- Birds card with purple/pink gradient theme
- Full CRUD operations for birds
- Birds included in sell calculator
- Rating system for birds (S-D based on max sell price)
- Sort and filter support for birds

#### 🔀 Data Merge Preview

- **Merge mode**: Combine existing data with new imports (preserves items not in file)
- **Replace mode**: Complete data replacement with warning
- Detailed diff view showing added/updated/unchanged items per category
- Checkbox selection for individual changes
- Preview changes before applying to localStorage
- Real-time change count and statistics

#### 📸 Cloudinary Image Upload

- Upload images directly to Cloudinary CDN
- Image crop functionality before upload with adjustable aspect ratio
- Drag & drop file support
- Alternative URL input option
- Real-time preview
- Integrated into all forms (Ingredients, Foods, Seeds, Insects, Fish, Birds, Locations)
- Environment variable configuration (.env)
- Setup guide (CLOUDINARY_SETUP.md)

#### 🖼️ Image Handling Improvements

- Fixed image preview not updating after edit
- Added key prop to force re-render on image change
- Removed duplicate image URL inputs (now unified in ImageUpload component)
- Better error handling for missing images

### 🔧 Technical Improvements

- Installed `cloudinary` package for CDN integration
- Installed `react-image-crop` for crop functionality
- Updated all form components to use ImageUpload
- Enhanced image cache management
- Improved type safety across components

### 📚 Documentation

- Added CLOUDINARY_SETUP.md with setup instructions
- Updated README.md with new features
- Updated Dashboard with v1.2.0 changelog
- Added .env.example template

---

## [1.1.0] - 2026-01-29

### ✨ New Features

#### ⭐ Rating System (S-D)

- Automatic quality rating for Foods based on profit percentage
  - S Rank: > 150% profit
  - A Rank: > 100% profit
  - B Rank: > 50% profit
  - C Rank: > 25% profit
  - D Rank: ≤ 25% profit
- Automatic rating for Insects and Fish based on max sell price
  - S Rank: ≥ 200 coins
  - A Rank: ≥ 150 coins
  - B Rank: ≥ 100 coins
  - C Rank: ≥ 50 coins
  - D Rank: < 50 coins
- Color-coded badges in cards

#### 🧮 Multi-item Sell Calculator

- Invoice-style calculator interface
- Add multiple items with different quantities and star ratings
- Calculate total cost, sell price, and profit
- Profit percentage calculation
- Shopping cart functionality
- Support for all categories (Ingredients, Foods, Insects, Fish)
- Remove individual items from cart
- Clear all functionality

#### 🔍 SEO Optimization

- Complete meta tags for Open Graph
- Twitter Card support
- Structured data for better search visibility
- PWA optimization
- Sitemap and robots.txt
- Performance improvements

#### 🔗 Data Source Link

- Quick access link in Dashboard
- Direct link to Google Drive folder with latest .json updates
- "Buy Me a Coffee" support button

### 🎨 UI/UX Improvements

- Enhanced Dashboard with charts and statistics
- Better mobile responsiveness
- Improved card layouts
- Activity log with individual deletion
- Version display in Dashboard

---

## [1.0.0] - 2026-01-29

### ✨ Major Release

This is the first stable release with comprehensive features and improvements.

#### New Features

- 📊 **Dashboard/Home Page**
  - Overview statistics for all data categories
  - Interactive charts using Recharts library
  - Data distribution pie chart
  - Ingredient source bar chart
  - Food star rating distribution
  - Latest updates section with version info
  - Quick tips for users

- 🗂️ **Enhanced Activity Log**
  - Delete individual log entries
  - Confirmation dialog before clearing all logs
  - Improved UI with expandable details
  - Activity count badge

- 🖼️ **Table View Improvements**
  - Image column added to all table views
  - Fallback icons for missing images
  - Better visual consistency

- 🔗 **Data Source Integration**
  - Footer link to download latest .json updates
  - Direct link to Google Drive folder

- 📱 **Sidebar Navigation**
  - Responsive mobile menu with hamburger icon
  - Fixed z-index for proper overlay behavior
  - Active tab highlighting
  - Item count badges

- 📦 **Versioning System**
  - Semantic versioning implementation
  - Version display in Dashboard
  - VERSIONING.md guide for contributors

#### Technical Improvements

- Added recharts library for data visualization
- Improved component organization
- Better TypeScript type definitions
- Enhanced mobile responsiveness

---

## [0.1.0] - 2026-01-28

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
