# 🎨 Tailwind Class Translator

A Chrome browser extension that helps developers debug Tailwind CSS by translating utility classes into readable CSS properties on hover.

## Features

✨ **Hover-based Translation**: Simply activate the extension and hover over elements to see Tailwind classes translated to CSS  
📐 **Categorized Display**: CSS properties organized by category (Layout, Spacing, Typography, Colors, etc.)  
🎯 **Smart Detection**: Automatically identifies Tailwind utility classes  
📱 **Responsive Support**: Shows responsive prefixes (sm:, md:, lg:, xl:, 2xl:)  
🎭 **Pseudo-class Support**: Displays state prefixes (hover:, focus:, active:, etc.)  
🚀 **Zero Configuration**: Works out of the box with any Tailwind CSS project  

## How It Works

1. **Click the extension icon** to activate translation mode
2. **Hover over any element** with Tailwind classes
3. **See instant translations** in a beautiful tooltip
4. **Click again** to deactivate

## Example Translation

**Input:** `flex items-center justify-between p-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700`

**Output:**
```
Layout:
• display: flex
• align-items: center
• justify-content: space-between

Spacing:
• padding: 1rem

Colors:
• background-color: #3b82f6
• color: #ffffff

Typography:
• font-weight: 700

Borders:
• border-radius: 0.5rem

Pseudo-states:
• hover: background-color: #1d4ed8
```

## Installation

### Install from Chrome Web Store (Coming Soon)
_Extension will be available on the Chrome Web Store soon!_

### Install Manually
1. Clone or download this repository
2. Run `npm run build` to build the extension
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" (top right)
5. Click "Load unpacked" and select the `dist` folder

## Development

### Prerequisites
- Node.js (v14 or higher)
- Chrome browser

### Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/tailwind-class-translator.git
cd tailwind-class-translator

# Install dependencies
npm install

# Build the extension
npm run build

# For development (watches for changes)
npm run dev
```

### Project Structure
```
tailwind-class-translator/
├── manifest.json              # Extension manifest
├── src/
│   ├── popup.html            # Extension popup interface
│   ├── popup.js              # Popup logic
│   ├── content-script.js     # Main content script with hover logic
│   ├── background.js         # Service worker
│   ├── tailwind-mappings.js  # Comprehensive class mappings
│   └── tailwind-translator.js # Translation engine
├── package.json
└── README.md
```

## Supported Tailwind Classes

The extension supports a comprehensive set of Tailwind utility classes including:

- **Layout**: `flex`, `grid`, `block`, `hidden`, `relative`, `absolute`, etc.
- **Spacing**: `m-*`, `p-*`, `gap-*`, etc.
- **Typography**: `text-*`, `font-*`, `leading-*`, etc.
- **Colors**: `bg-*`, `text-*`, `border-*`, etc.
- **Sizing**: `w-*`, `h-*`, `min-*`, `max-*`, etc.
- **Borders**: `rounded-*`, `border-*`, etc.
- **Effects**: `shadow-*`, `opacity-*`, etc.
- **Responsive**: `sm:*`, `md:*`, `lg:*`, `xl:*`, `2xl:*`
- **Pseudo-classes**: `hover:*`, `focus:*`, `active:*`, etc.

## Contributing

Contributions are welcome! Here's how you can help:

1. **Report bugs** by creating issues
2. **Suggest features** or improvements
3. **Add more Tailwind class mappings** in `src/tailwind-mappings.js`
4. **Improve the UI/UX** of the tooltip or popup
5. **Submit pull requests** with fixes or features

### Development Guidelines
- Follow the existing code style
- Test thoroughly with different Tailwind projects
- Update documentation for new features
- Keep performance in mind (the extension runs on every page)

## Browser Compatibility

- Chrome 88+ (Manifest V3 required)
- Chromium-based browsers (Edge, Brave, etc.)

## Privacy

This extension:
- ✅ Only runs when activated by the user
- ✅ Does not collect any personal data
- ✅ Does not send data to external servers
- ✅ Only analyzes CSS classes locally

## License

MIT License - see [LICENSE](LICENSE) for details.

## Changelog

### v1.0.0
- Initial release with hover-based translation
- Support for 100+ Tailwind utility classes
- Responsive and pseudo-class prefix support
- Beautiful categorized tooltip display

---

**Made with ❤️ for the Tailwind CSS community** 