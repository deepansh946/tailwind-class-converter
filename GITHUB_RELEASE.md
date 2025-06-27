# GitHub Release Guide

## Creating a GitHub Release

1. **Tag the Release**
```bash
git tag -a v2.0.0 -m "v2.0.0 - Plasmo Framework Rewrite"
git push origin v2.0.0
```

2. **Create Release on GitHub**
- Go to your GitHub repository
- Click "Releases" → "Create a new release"
- Select the v2.0.0 tag
- Upload the `build/chrome-mv3-prod.zip` file

3. **Release Notes Template**
```markdown
# 🚀 Tailwind Class Translator v2.0.0

## Major Rewrite with Plasmo Framework

This is a complete rewrite of the extension using modern technologies for better performance and maintainability.

### ✨ New Features
- 📱 **Media Query Support** - Full support for responsive breakpoints and media preferences
- 🎯 **Click-to-Highlight** - Click class tags to highlight all elements using that class
- 🎨 **Enhanced UI** - Beautiful React-based popup with professional styling
- ⚡ **Better Performance** - Optimized tooltip rendering and event handling
- 🔧 **TypeScript** - Full type safety throughout the codebase

### 🛠️ Technical Improvements
- Built with Plasmo framework
- Modern React components
- TypeScript support
- Better error handling
- Cross-tab state synchronization

### 📦 Installation
1. Download the `chrome-extension.zip` file below
2. Extract the contents
3. Open Chrome → Extensions → Enable Developer Mode
4. Click "Load unpacked" and select the extracted folder

### 🐛 Bug Fixes
- Fixed tooltip positioning issues
- Improved class detection accuracy
- Better handling of unknown classes
- Enhanced stability and performance

### 📝 Full Changelog
See [CHANGELOG.md](CHANGELOG.md) for complete details.
```

## Direct Installation Instructions

For users who want to install directly from GitHub:

1. Download the latest release zip file
2. Extract to a folder
3. Open Chrome → `chrome://extensions/`
4. Enable "Developer mode"
5. Click "Load unpacked"
6. Select the extracted folder
```