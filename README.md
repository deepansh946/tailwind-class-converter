# Tailwind Class Translator

A modern Chrome extension built with Plasmo that translates Tailwind CSS utility classes into readable CSS properties for easier debugging and development.

## Features

- 🎯 **Real-time Translation**: Hover over elements to see Tailwind classes translated to CSS
- 📊 **Categorized Display**: CSS properties organized by Layout, Spacing, Typography, Colors, etc.
- 🔍 **Element Highlighting**: Visual indicators for inspected elements
- ⚡ **Arbitrary Value Support**: Handles custom arbitrary values like `w-[200px]`
- 📱 **Responsive Prefixes**: Detects and displays responsive breakpoints (`sm:`, `md:`, etc.)
- 🎨 **State Modifiers**: Support for hover, focus, active, and other pseudo-classes
- 🚀 **Modern Architecture**: Built with Plasmo framework, TypeScript, and modern best practices
- 💾 **Smart Caching**: Efficient caching system for optimal performance
- 🔗 **Class Highlighting**: Click on class tags to highlight all elements using that class

## Installation

### From Source

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/tailwind-class-translator.git
   cd tailwind-class-translator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/chrome-mv3-prod` folder

### Development

For development with hot reload:

```bash
npm run dev
```

Then load the `build/chrome-mv3-dev` folder in Chrome extensions.

## Usage

1. **Activate Translation Mode**: Click the extension icon and toggle translation mode on
2. **Inspect Elements**: Hover over any element with Tailwind classes
3. **View Translations**: See detailed tooltips with CSS property translations
4. **Highlight Classes**: Click on individual class tags to highlight all elements using that class
5. **Navigate Categories**: View organized CSS properties by category (Layout, Spacing, etc.)

## Architecture

### Built with Plasmo

This extension leverages the [Plasmo framework](https://docs.plasmo.com/) for modern Chrome extension development:

- **Type Safety**: Full TypeScript support with proper typing
- **Modern Build System**: Automatic bundling and optimization
- **Hot Reload**: Development experience with instant updates
- **Storage API**: Built-in storage abstraction with `@plasmohq/storage`
- **Messaging**: Simplified communication between extension components

### Project Structure

```
├── background.ts              # Service worker for extension lifecycle
├── popup.tsx                  # Extension popup interface
├── popup.css                  # Popup styling
├── contents/                  # Content scripts
│   └── tailwind-translator.tsx
├── lib/                       # Core library modules
│   ├── types.ts              # TypeScript type definitions
│   ├── tailwind-mappings.ts  # Comprehensive Tailwind class mappings
│   └── tailwind-translator.ts # Translation engine
├── assets/                    # Static assets
│   └── icon.png
└── package.json              # Plasmo configuration and dependencies
```

### Key Components

#### TailwindTranslator Class
- **Class Detection**: Pattern-based recognition of Tailwind classes
- **Prefix Handling**: Extracts responsive and state prefixes
- **Arbitrary Values**: Parses and translates custom values
- **Category Mapping**: Organizes CSS properties by functional categories

#### Content Script
- **Event Handling**: Mouse hover detection and tooltip management
- **Element Highlighting**: Visual feedback for inspected elements
- **Tooltip Rendering**: Dynamic tooltip creation with styled content
- **Storage Integration**: Persistent state management

#### Popup Interface
- **React Components**: Modern React-based popup interface
- **State Management**: Real-time status updates and controls
- **Styled Components**: Professional UI with gradients and animations

## Browser Support

- ✅ Chrome (Manifest V3)
- ✅ Edge (Chromium-based)
- ⏳ Firefox (planned)
- ⏳ Safari (planned)

## Development

### Prerequisites

- Node.js 18+
- npm or yarn
- Chrome browser

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production version
- `npm run package` - Create packaged extension file
- `npm run clean` - Clean build artifacts

### Adding New Tailwind Classes

To add support for new Tailwind classes:

1. Update `lib/tailwind-mappings.ts` with new class definitions
2. Ensure proper categorization in the `getCategoryForProperty` method
3. Test the new classes in the extension

### Architecture Decisions

- **Plasmo Framework**: Chosen for modern development experience and type safety
- **TypeScript**: Ensures code quality and better developer experience
- **Modular Design**: Separate concerns with dedicated modules for translation, UI, and state
- **Performance Focus**: Efficient event handling and optimized tooltip rendering
- **Extensible**: Easy to add new Tailwind versions and custom class mappings

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes and add tests
4. Commit your changes: `git commit -am 'Add new feature'`
5. Push to the branch: `git push origin feature/new-feature`
6. Submit a pull request

## License

MIT License - see [LICENSE](LICENSE) file for details.

Made with ❤️ for the Tailwind CSS community