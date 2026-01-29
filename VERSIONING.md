# Versioning Guide

Heartopia Books follows [Semantic Versioning](https://semver.org/) (SemVer) for version numbering.

## Version Format

```
MAJOR.MINOR.PATCH
```

Example: `1.2.3`

- **MAJOR** (1): Breaking changes - incompatible with previous versions
- **MINOR** (2): New features - backwards compatible
- **PATCH** (3): Bug fixes - backwards compatible

## Current Version

**v1.0.0** - January 29, 2026

## How to Update Version

### 1. For Development Team

When making changes, determine the version bump type:

#### PATCH (Bug Fixes)

```bash
# Example: 1.0.0 → 1.0.1
npm version patch
```

Examples of PATCH changes:

- Fixing UI bugs
- Correcting calculation errors
- Fixing broken links
- Performance improvements without API changes

#### MINOR (New Features)

```bash
# Example: 1.0.0 → 1.1.0
npm version minor
```

Examples of MINOR changes:

- Adding new components (Dashboard, new card types)
- Adding new features (export/import, charts)
- Adding new data fields that don't break existing data
- UI enhancements

#### MAJOR (Breaking Changes)

```bash
# Example: 1.0.0 → 2.0.0
npm version major
```

Examples of MAJOR changes:

- Changing data structure that requires migration
- Removing existing features
- Changing API endpoints
- Major refactoring that breaks compatibility

### 2. Update Files

After running `npm version`, you need to update:

1. **CHANGELOG.md**

   ```markdown
   ## [1.1.0] - 2026-02-15

   ### Added

   - New feature description

   ### Changed

   - Modified behavior description

   ### Fixed

   - Bug fix description

   ### Deprecated

   - Features marked for removal

   ### Removed

   - Deleted features

   ### Security

   - Security updates
   ```

2. **Dashboard.tsx** (if needed)
   Update the version display in the Dashboard component:

   ```tsx
   <span>Version 1.1.0 • Last Updated: February 15, 2026</span>
   ```

3. **README.md** (if needed)
   Update installation instructions or new feature descriptions

### 3. Git Workflow

```bash
# 1. Make your changes
git add .
git commit -m "feat: add new dashboard feature"

# 2. Update version (creates a git tag automatically)
npm version minor -m "Release v%s"

# 3. Push with tags
git push && git push --tags
```

## Version History

### v1.0.0 (January 29, 2026) - First Stable Release

- Dashboard with statistics and charts
- Activity log with deletion features
- Data export/import/reset
- Card and Table views
- Sidebar navigation with mobile support
- Image support in all views
- Data source link

### v0.1.0 (January 28, 2026) - Initial Release

- Basic CRUD operations
- Tab-based navigation
- Search and filter functionality
- LocalStorage persistence

## Pre-release Versions

For beta/alpha releases, use:

```bash
# Alpha: 1.0.0-alpha.1
npm version prerelease --preid=alpha

# Beta: 1.0.0-beta.1
npm version prerelease --preid=beta

# Release Candidate: 1.0.0-rc.1
npm version prerelease --preid=rc
```

## Best Practices

### DO:

✅ Update CHANGELOG.md with every version
✅ Test thoroughly before bumping MAJOR version
✅ Document breaking changes clearly
✅ Use meaningful commit messages
✅ Tag releases in Git
✅ Update version in Dashboard UI

### DON'T:

❌ Skip version numbers
❌ Release without updating CHANGELOG
❌ Break backward compatibility in MINOR/PATCH
❌ Forget to push tags to remote
❌ Change version manually without npm version

## Commit Message Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types:

- `feat`: New feature (MINOR)
- `fix`: Bug fix (PATCH)
- `docs`: Documentation only
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements (PATCH)
- `test`: Adding tests
- `chore`: Build process, dependencies
- `breaking`: Breaking changes (MAJOR)

Examples:

```bash
git commit -m "feat(dashboard): add data visualization charts"
git commit -m "fix(activity-log): resolve delete button alignment"
git commit -m "docs(readme): update installation steps"
git commit -m "breaking: change localStorage schema structure"
```

## Release Checklist

Before releasing a new version:

- [ ] All tests pass
- [ ] Code reviewed and approved
- [ ] CHANGELOG.md updated
- [ ] Version number bumped
- [ ] Dashboard version updated
- [ ] README.md updated (if needed)
- [ ] Breaking changes documented
- [ ] Git tag created
- [ ] Changes pushed to repository
- [ ] Build tested (npm run build)
- [ ] Deployment verified

## Quick Reference

```bash
# Check current version
npm version

# Bump version
npm version patch   # 1.0.0 → 1.0.1
npm version minor   # 1.0.0 → 1.1.0
npm version major   # 1.0.0 → 2.0.0

# View all tags
git tag -l

# Push version tag
git push origin v1.0.0
```

## Questions?

If you're unsure which version to bump:

- Ask: "Does this break existing functionality?" → MAJOR
- Ask: "Is this a new feature?" → MINOR
- Ask: "Is this a bug fix?" → PATCH
- When in doubt, choose MINOR over MAJOR
