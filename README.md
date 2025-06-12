# 🎨 Tailwind Class Translator

A browser extension that translates Tailwind CSS utility classes into readable CSS properties. Built with [Plasmo](https://github.com/PlasmoHQ/plasmo) framework.

## Features

- **Hover Detection**: Hover over any element with Tailwind classes to see translations
- **Visual Highlighting**: Elements with Tailwind classes are highlighted with a blue glow
- **Comprehensive Coverage**: Supports hundreds of Tailwind utility classes
- **Categorized Output**: CSS properties are organized by category (layout, typography, colors, etc.)
- **Performance Optimized**: Caches translations for better performance
- **Modern UI**: Clean, responsive popup interface

## Development

### Prerequisites

- Node.js 16.x or later
- npm or pnpm

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd tailwind-class-translator
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

4. Load the extension in your browser:
   - Open Chrome/Edge and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `build/chrome-mv3-dev` folder

### Build

To build for production:

```bash
npm run build
```

To package the extension:

```bash
npm run package
```

## Project Structure

```
├── popup.tsx              # Extension popup UI (React)
├── content.ts             # Content script for page interaction
├── tailwind-translator.ts # Core translation logic
├── tailwind-mappings.ts   # Tailwind class mappings
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── .prettierrc           # Code formatting rules
```

## How It Works

1. **Activation**: Click the extension icon and press "Activate" to enable translation mode
2. **Detection**: Hover over any element on the page
3. **Translation**: If the element has Tailwind classes, they are translated to CSS properties
4. **Display**: A tooltip shows the original classes and their CSS equivalents
5. **Highlighting**: Elements with Tailwind classes are highlighted with a blue outline

## Supported Tailwind Classes

The extension supports a wide range of Tailwind utility classes including:

- **Layout**: `flex`, `grid`, `block`, `inline`, etc.
- **Spacing**: `p-4`, `m-2`, `px-6`, `py-8`, etc.
- **Typography**: `text-lg`, `font-bold`, `text-center`, etc.
- **Colors**: `text-blue-500`, `bg-gray-100`, etc.
- **Borders**: `border`, `rounded-lg`, `border-red-500`, etc.
- **Sizing**: `w-full`, `h-screen`, `max-w-md`, etc.
- **Positioning**: `absolute`, `relative`, `z-10`, etc.
- **And many more...**

## Technologies Used

- **[Plasmo](https://github.com/PlasmoHQ/plasmo)**: Modern browser extension framework
- **React**: For popup UI components
- **TypeScript**: For type safety and better development experience
- **Tailwind CSS**: For styling the extension interface

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
