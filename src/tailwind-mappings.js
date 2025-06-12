// Comprehensive Tailwind CSS class mappings
const TAILWIND_MAPPINGS = {
  // Layout
  layout: {
    block: { property: "display", value: "block" },
    "inline-block": { property: "display", value: "inline-block" },
    inline: { property: "display", value: "inline" },
    flex: { property: "display", value: "flex" },
    "inline-flex": { property: "display", value: "inline-flex" },
    grid: { property: "display", value: "grid" },
    "inline-grid": { property: "display", value: "inline-grid" },
    hidden: { property: "display", value: "none" },

    // Flex direction
    "flex-row": { property: "flex-direction", value: "row" },
    "flex-row-reverse": { property: "flex-direction", value: "row-reverse" },
    "flex-col": { property: "flex-direction", value: "column" },
    "flex-col-reverse": { property: "flex-direction", value: "column-reverse" },

    // Flex wrap
    "flex-wrap": { property: "flex-wrap", value: "wrap" },
    "flex-wrap-reverse": { property: "flex-wrap", value: "wrap-reverse" },
    "flex-nowrap": { property: "flex-wrap", value: "nowrap" },

    // Align items
    "items-start": { property: "align-items", value: "flex-start" },
    "items-end": { property: "align-items", value: "flex-end" },
    "items-center": { property: "align-items", value: "center" },
    "items-baseline": { property: "align-items", value: "baseline" },
    "items-stretch": { property: "align-items", value: "stretch" },

    // Justify content
    "justify-start": { property: "justify-content", value: "flex-start" },
    "justify-end": { property: "justify-content", value: "flex-end" },
    "justify-center": { property: "justify-content", value: "center" },
    "justify-between": { property: "justify-content", value: "space-between" },
    "justify-around": { property: "justify-content", value: "space-around" },
    "justify-evenly": { property: "justify-content", value: "space-evenly" },

    // Position
    static: { property: "position", value: "static" },
    fixed: { property: "position", value: "fixed" },
    absolute: { property: "position", value: "absolute" },
    relative: { property: "position", value: "relative" },
    sticky: { property: "position", value: "sticky" },
  },

  // Spacing (simplified - common values)
  spacing: {
    // Margin
    "m-0": { property: "margin", value: "0" },
    "m-1": { property: "margin", value: "0.25rem" },
    "m-2": { property: "margin", value: "0.5rem" },
    "m-3": { property: "margin", value: "0.75rem" },
    "m-4": { property: "margin", value: "1rem" },
    "m-5": { property: "margin", value: "1.25rem" },
    "m-6": { property: "margin", value: "1.5rem" },
    "m-8": { property: "margin", value: "2rem" },
    "m-10": { property: "margin", value: "2.5rem" },
    "m-12": { property: "margin", value: "3rem" },
    "m-16": { property: "margin", value: "4rem" },
    "m-20": { property: "margin", value: "5rem" },
    "m-24": { property: "margin", value: "6rem" },
    "m-32": { property: "margin", value: "8rem" },
    "m-auto": { property: "margin", value: "auto" },

    // Margin directional
    "mt-0": { property: "margin-top", value: "0" },
    "mt-1": { property: "margin-top", value: "0.25rem" },
    "mt-2": { property: "margin-top", value: "0.5rem" },
    "mt-4": { property: "margin-top", value: "1rem" },
    "mt-8": { property: "margin-top", value: "2rem" },
    "mr-0": { property: "margin-right", value: "0" },
    "mr-1": { property: "margin-right", value: "0.25rem" },
    "mr-2": { property: "margin-right", value: "0.5rem" },
    "mr-4": { property: "margin-right", value: "1rem" },
    "mr-8": { property: "margin-right", value: "2rem" },
    "mb-0": { property: "margin-bottom", value: "0" },
    "mb-1": { property: "margin-bottom", value: "0.25rem" },
    "mb-2": { property: "margin-bottom", value: "0.5rem" },
    "mb-4": { property: "margin-bottom", value: "1rem" },
    "mb-8": { property: "margin-bottom", value: "2rem" },
    "ml-0": { property: "margin-left", value: "0" },
    "ml-1": { property: "margin-left", value: "0.25rem" },
    "ml-2": { property: "margin-left", value: "0.5rem" },
    "ml-4": { property: "margin-left", value: "1rem" },
    "ml-8": { property: "margin-left", value: "2rem" },
    "mx-0": { property: "margin-left, margin-right", value: "0" },
    "mx-1": { property: "margin-left, margin-right", value: "0.25rem" },
    "mx-2": { property: "margin-left, margin-right", value: "0.5rem" },
    "mx-4": { property: "margin-left, margin-right", value: "1rem" },
    "mx-auto": { property: "margin-left, margin-right", value: "auto" },
    "my-0": { property: "margin-top, margin-bottom", value: "0" },
    "my-1": { property: "margin-top, margin-bottom", value: "0.25rem" },
    "my-2": { property: "margin-top, margin-bottom", value: "0.5rem" },
    "my-4": { property: "margin-top, margin-bottom", value: "1rem" },

    // Padding
    "p-0": { property: "padding", value: "0" },
    "p-1": { property: "padding", value: "0.25rem" },
    "p-2": { property: "padding", value: "0.5rem" },
    "p-3": { property: "padding", value: "0.75rem" },
    "p-4": { property: "padding", value: "1rem" },
    "p-5": { property: "padding", value: "1.25rem" },
    "p-6": { property: "padding", value: "1.5rem" },
    "p-8": { property: "padding", value: "2rem" },
    "p-10": { property: "padding", value: "2.5rem" },
    "p-12": { property: "padding", value: "3rem" },
    "p-16": { property: "padding", value: "4rem" },
    "p-20": { property: "padding", value: "5rem" },
    "p-24": { property: "padding", value: "6rem" },
    "p-32": { property: "padding", value: "8rem" },

    // Gap
    "gap-0": { property: "gap", value: "0" },
    "gap-1": { property: "gap", value: "0.25rem" },
    "gap-2": { property: "gap", value: "0.5rem" },
    "gap-3": { property: "gap", value: "0.75rem" },
    "gap-4": { property: "gap", value: "1rem" },
    "gap-5": { property: "gap", value: "1.25rem" },
    "gap-6": { property: "gap", value: "1.5rem" },
    "gap-8": { property: "gap", value: "2rem" },
  },

  // Typography
  typography: {
    // Font size
    "text-xs": { property: "font-size", value: "0.75rem" },
    "text-sm": { property: "font-size", value: "0.875rem" },
    "text-base": { property: "font-size", value: "1rem" },
    "text-lg": { property: "font-size", value: "1.125rem" },
    "text-xl": { property: "font-size", value: "1.25rem" },
    "text-2xl": { property: "font-size", value: "1.5rem" },
    "text-3xl": { property: "font-size", value: "1.875rem" },
    "text-4xl": { property: "font-size", value: "2.25rem" },
    "text-5xl": { property: "font-size", value: "3rem" },
    "text-6xl": { property: "font-size", value: "3.75rem" },

    // Font weight
    "font-thin": { property: "font-weight", value: "100" },
    "font-extralight": { property: "font-weight", value: "200" },
    "font-light": { property: "font-weight", value: "300" },
    "font-normal": { property: "font-weight", value: "400" },
    "font-medium": { property: "font-weight", value: "500" },
    "font-semibold": { property: "font-weight", value: "600" },
    "font-bold": { property: "font-weight", value: "700" },
    "font-extrabold": { property: "font-weight", value: "800" },
    "font-black": { property: "font-weight", value: "900" },

    // Text align
    "text-left": { property: "text-align", value: "left" },
    "text-center": { property: "text-align", value: "center" },
    "text-right": { property: "text-align", value: "right" },
    "text-justify": { property: "text-align", value: "justify" },

    // Line height
    "leading-none": { property: "line-height", value: "1" },
    "leading-tight": { property: "line-height", value: "1.25" },
    "leading-snug": { property: "line-height", value: "1.375" },
    "leading-normal": { property: "line-height", value: "1.5" },
    "leading-relaxed": { property: "line-height", value: "1.625" },
    "leading-loose": { property: "line-height", value: "2" },
  },

  // Colors
  colors: {
    // Text colors (simplified)
    "text-black": { property: "color", value: "#000000" },
    "text-white": { property: "color", value: "#ffffff" },
    "text-gray-100": { property: "color", value: "#f3f4f6" },
    "text-gray-300": { property: "color", value: "#d1d5db" },
    "text-gray-500": { property: "color", value: "#6b7280" },
    "text-gray-700": { property: "color", value: "#374151" },
    "text-gray-900": { property: "color", value: "#111827" },
    "text-red-500": { property: "color", value: "#ef4444" },
    "text-blue-500": { property: "color", value: "#3b82f6" },
    "text-green-500": { property: "color", value: "#10b981" },
    "text-yellow-500": { property: "color", value: "#f59e0b" },
    "text-purple-500": { property: "color", value: "#8b5cf6" },

    // Background colors (simplified)
    "bg-transparent": { property: "background-color", value: "transparent" },
    "bg-black": { property: "background-color", value: "#000000" },
    "bg-white": { property: "background-color", value: "#ffffff" },
    "bg-gray-100": { property: "background-color", value: "#f3f4f6" },
    "bg-gray-200": { property: "background-color", value: "#e5e7eb" },
    "bg-gray-300": { property: "background-color", value: "#d1d5db" },
    "bg-gray-500": { property: "background-color", value: "#6b7280" },
    "bg-gray-700": { property: "background-color", value: "#374151" },
    "bg-gray-900": { property: "background-color", value: "#111827" },
    "bg-red-500": { property: "background-color", value: "#ef4444" },
    "bg-red-700": { property: "background-color", value: "#b91c1c" },
    "bg-blue-500": { property: "background-color", value: "#3b82f6" },
    "bg-blue-700": { property: "background-color", value: "#1d4ed8" },
    "bg-green-500": { property: "background-color", value: "#10b981" },
    "bg-yellow-500": { property: "background-color", value: "#f59e0b" },
    "bg-purple-500": { property: "background-color", value: "#8b5cf6" },
  },

  // Borders
  borders: {
    // Border radius
    "rounded-none": { property: "border-radius", value: "0" },
    "rounded-sm": { property: "border-radius", value: "0.125rem" },
    rounded: { property: "border-radius", value: "0.25rem" },
    "rounded-md": { property: "border-radius", value: "0.375rem" },
    "rounded-lg": { property: "border-radius", value: "0.5rem" },
    "rounded-xl": { property: "border-radius", value: "0.75rem" },
    "rounded-2xl": { property: "border-radius", value: "1rem" },
    "rounded-3xl": { property: "border-radius", value: "1.5rem" },
    "rounded-full": { property: "border-radius", value: "9999px" },

    // Border width
    "border-0": { property: "border-width", value: "0" },
    border: { property: "border-width", value: "1px" },
    "border-2": { property: "border-width", value: "2px" },
    "border-4": { property: "border-width", value: "4px" },
    "border-8": { property: "border-width", value: "8px" },
  },

  // Sizing
  sizing: {
    // Width
    "w-0": { property: "width", value: "0" },
    "w-1": { property: "width", value: "0.25rem" },
    "w-2": { property: "width", value: "0.5rem" },
    "w-4": { property: "width", value: "1rem" },
    "w-8": { property: "width", value: "2rem" },
    "w-16": { property: "width", value: "4rem" },
    "w-32": { property: "width", value: "8rem" },
    "w-64": { property: "width", value: "16rem" },
    "w-auto": { property: "width", value: "auto" },
    "w-full": { property: "width", value: "100%" },
    "w-screen": { property: "width", value: "100vw" },

    // Height
    "h-0": { property: "height", value: "0" },
    "h-1": { property: "height", value: "0.25rem" },
    "h-2": { property: "height", value: "0.5rem" },
    "h-4": { property: "height", value: "1rem" },
    "h-8": { property: "height", value: "2rem" },
    "h-16": { property: "height", value: "4rem" },
    "h-32": { property: "height", value: "8rem" },
    "h-64": { property: "height", value: "16rem" },
    "h-auto": { property: "height", value: "auto" },
    "h-full": { property: "height", value: "100%" },
    "h-screen": { property: "height", value: "100vh" },
  },

  // Effects
  effects: {
    // Shadow
    "shadow-sm": {
      property: "box-shadow",
      value: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    },
    shadow: {
      property: "box-shadow",
      value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    },
    "shadow-md": {
      property: "box-shadow",
      value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    },
    "shadow-lg": {
      property: "box-shadow",
      value:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    },
    "shadow-xl": {
      property: "box-shadow",
      value:
        "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    },
    "shadow-none": { property: "box-shadow", value: "none" },

    // Opacity
    "opacity-0": { property: "opacity", value: "0" },
    "opacity-25": { property: "opacity", value: "0.25" },
    "opacity-50": { property: "opacity", value: "0.5" },
    "opacity-75": { property: "opacity", value: "0.75" },
    "opacity-100": { property: "opacity", value: "1" },
  },
};

// Utility function to get all mappings flattened
function getAllMappings() {
  const allMappings = {};
  Object.values(TAILWIND_MAPPINGS).forEach((category) => {
    Object.assign(allMappings, category);
  });
  return allMappings;
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = { TAILWIND_MAPPINGS, getAllMappings };
}

// Always export to window in browser context
if (typeof window !== "undefined") {
  window.TAILWIND_MAPPINGS = TAILWIND_MAPPINGS;
  window.getAllMappings = getAllMappings;
  console.log(
    "Tailwind mappings exported to window:",
    Object.keys(TAILWIND_MAPPINGS).length,
    "categories"
  );
}
