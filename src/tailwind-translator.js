// Tailwind Class Translation Engine
class TailwindTranslator {
  constructor() {
    this.mappings = this.initializeMappings();
    this.responsivePrefixes = ["sm", "md", "lg", "xl", "2xl"];
    this.statePrefixes = [
      "hover",
      "focus",
      "active",
      "group-hover",
      "group-focus",
      "dark",
    ];
  }

  initializeMappings() {
    // Use the mappings from tailwind-mappings.js if available
    if (typeof window !== "undefined" && window.getAllMappings) {
      return window.getAllMappings();
    }

    // Fallback basic mappings if the full mappings aren't loaded
    return {
      flex: { property: "display", value: "flex" },
      block: { property: "display", value: "block" },
      hidden: { property: "display", value: "none" },
      "text-center": { property: "text-align", value: "center" },
      "font-bold": { property: "font-weight", value: "700" },
      "p-4": { property: "padding", value: "1rem" },
      "m-4": { property: "margin", value: "1rem" },
      "bg-blue-500": { property: "background-color", value: "#3b82f6" },
      "text-white": { property: "color", value: "#ffffff" },
      rounded: { property: "border-radius", value: "0.25rem" },
    };
  }

  // Check if a class name is a Tailwind utility class
  isTailwindClass(className) {
    // Remove responsive and state prefixes for checking
    const baseClass = this.getBaseClass(className);

    // Check if it's in our mappings
    if (this.mappings[baseClass]) {
      return true;
    }

    // Check for arbitrary value syntax (custom classes with square brackets)
    if (this.isArbitraryValue(baseClass)) {
      return true;
    }

    // Check common Tailwind patterns
    const tailwindPatterns = [
      /^(sm|md|lg|xl|2xl):/,
      /^(hover|focus|active|group-hover|group-focus|dark):/,
      /^(bg|text|border)-/,
      /^(m|p|mt|mb|ml|mr|pt|pb|pl|pr|px|py|mx|my)-/,
      /^(w|h|min-w|min-h|max-w|max-h)-/,
      /^(flex|grid|block|inline|hidden|relative|absolute|fixed|sticky)$/,
      /^(font|text|leading|tracking|space)-/,
      /^(rounded|shadow|opacity|z)-/,
      /^(top|bottom|left|right|inset)-/,
      /^(gap|divide)-/,
      // Arbitrary value patterns
      /^(m|p|mt|mb|ml|mr|pt|pb|pl|pr|px|py|mx|my)-\[.+\]$/,
      /^(w|h|min-w|min-h|max-w|max-h)-\[.+\]$/,
      /^(bg|text|border)-\[.+\]$/,
      /^(top|bottom|left|right|inset)-\[.+\]$/,
      /^(gap|gap-x|gap-y)-\[.+\]$/,
      /^(rounded|shadow|opacity|z)-\[.+\]$/,
      /^(rotate|scale|translate-x|translate-y)-\[.+\]$/,
    ];

    return tailwindPatterns.some((pattern) => pattern.test(className));
  }

  // Extract base class without prefixes
  getBaseClass(className) {
    // Remove responsive prefixes
    let baseClass = className;
    for (const prefix of this.responsivePrefixes) {
      if (baseClass.startsWith(prefix + ":")) {
        baseClass = baseClass.substring(prefix.length + 1);
        break;
      }
    }

    // Remove state prefixes
    for (const prefix of this.statePrefixes) {
      if (baseClass.startsWith(prefix + ":")) {
        baseClass = baseClass.substring(prefix.length + 1);
        break;
      }
    }

    return baseClass;
  }

  // Get prefixes from a class name
  getPrefixes(className) {
    const prefixes = {
      responsive: null,
      state: null,
    };

    // Check for responsive prefix
    for (const prefix of this.responsivePrefixes) {
      if (className.startsWith(prefix + ":")) {
        prefixes.responsive = prefix;
        className = className.substring(prefix.length + 1);
        break;
      }
    }

    // Check for state prefix
    for (const prefix of this.statePrefixes) {
      if (className.startsWith(prefix + ":")) {
        prefixes.state = prefix;
        break;
      }
    }

    return prefixes;
  }

  // Check if a class uses arbitrary value syntax
  isArbitraryValue(className) {
    return /\[.+\]$/.test(className);
  }

  // Parse arbitrary value class
  parseArbitraryValue(className) {
    const match = className.match(/^(.+)-\[(.+)\]$/);
    if (!match) return null;

    const [, property, value] = match;
    return { property, value };
  }

  // Translate arbitrary value to CSS property and value
  translateArbitraryValue(className) {
    const parsed = this.parseArbitraryValue(className);
    if (!parsed) return null;

    const { property: utilityPrefix, value } = parsed;

    // Map utility prefixes to CSS properties
    const arbitraryMappings = {
      // Spacing
      m: "margin",
      mt: "margin-top",
      mr: "margin-right",
      mb: "margin-bottom",
      ml: "margin-left",
      mx: ["margin-left", "margin-right"],
      my: ["margin-top", "margin-bottom"],
      p: "padding",
      pt: "padding-top",
      pr: "padding-right",
      pb: "padding-bottom",
      pl: "padding-left",
      px: ["padding-left", "padding-right"],
      py: ["padding-top", "padding-bottom"],

      // Sizing
      w: "width",
      h: "height",
      "min-w": "min-width",
      "min-h": "min-height",
      "max-w": "max-width",
      "max-h": "max-height",

      // Colors
      bg: "background-color",
      border: "border-color",

      // Typography and Colors (special handling for text)
      text: (value) => {
        // Check if value looks like a size (px, rem, em, etc.) or a color
        if (
          /^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(value) ||
          /^\d+$/.test(value)
        ) {
          return "font-size";
        }
        // Otherwise assume it's a color
        return "color";
      },

      // Additional typography
      font: "font-family",
      leading: "line-height",
      tracking: "letter-spacing",

      // Positioning
      top: "top",
      right: "right",
      bottom: "bottom",
      left: "left",
      inset: ["top", "right", "bottom", "left"],

      // Borders
      rounded: "border-radius",
      "border-w": "border-width",
      "border-t": "border-top-width",
      "border-r": "border-right-width",
      "border-b": "border-bottom-width",
      "border-l": "border-left-width",

      // Effects
      shadow: "box-shadow",
      opacity: "opacity",

      // Layout
      gap: "gap",
      "gap-x": "column-gap",
      "gap-y": "row-gap",

      // Transform
      rotate: "transform",
      scale: "transform",
      "translate-x": "transform",
      "translate-y": "transform",

      // Z-index
      z: "z-index",
    };

    let cssProperty = arbitraryMappings[utilityPrefix];

    // Handle special cases
    if (typeof cssProperty === "function") {
      cssProperty = cssProperty(value);
    }

    if (!cssProperty) {
      return {
        property: utilityPrefix,
        value: value,
        isCustom: true,
      };
    }

    // Handle multiple properties (like mx, my, inset)
    if (Array.isArray(cssProperty)) {
      return cssProperty.map((prop) => ({
        property: prop,
        value: this.processArbitraryValue(value),
        isCustom: true,
      }));
    }

    return {
      property: cssProperty,
      value: this.processArbitraryValue(value),
      isCustom: true,
    };
  }

  // Process arbitrary value to clean CSS value
  processArbitraryValue(value) {
    // Handle different value formats

    // Underscores to spaces (for multi-word values)
    value = value.replace(/_/g, " ");

    // Handle CSS functions and special formats
    if (
      value.includes("calc(") ||
      value.includes("var(") ||
      value.includes("rgb(") ||
      value.includes("rgba(") ||
      value.includes("hsl(") ||
      value.includes("hsla(")
    ) {
      return value;
    }

    // Handle hex colors
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) {
      return value;
    }

    // Handle named colors
    const namedColors = [
      "red",
      "blue",
      "green",
      "yellow",
      "purple",
      "pink",
      "gray",
      "black",
      "white",
      "transparent",
      "current",
    ];
    if (namedColors.includes(value.toLowerCase())) {
      return value;
    }

    // Handle numeric values - add px if it's just a number
    if (/^\d+(\.\d+)?$/.test(value)) {
      return value + "px";
    }

    // Handle negative values
    if (value.startsWith("-")) {
      const processedPositive = this.processArbitraryValue(value.substring(1));
      return "-" + processedPositive;
    }

    // Return as-is for other cases (already has units, etc.)
    return value;
  }

  // Translate a single class to CSS
  translateClass(className) {
    const baseClass = this.getBaseClass(className);
    const prefixes = this.getPrefixes(className);

    // Check for arbitrary value first
    if (this.isArbitraryValue(baseClass)) {
      const arbitraryResult = this.translateArbitraryValue(baseClass);

      if (!arbitraryResult) {
        return {
          class: className,
          property: "unknown",
          value: "Invalid arbitrary value syntax",
          category: "Unknown",
          prefixes: prefixes,
          isCustom: true,
        };
      }

      // Handle multiple properties (like mx, my, inset)
      if (Array.isArray(arbitraryResult)) {
        return arbitraryResult.map((result) => ({
          class: className,
          property: result.property,
          value: result.value,
          category: this.getCategoryForProperty(result.property),
          prefixes: prefixes,
          isCustom: true,
        }));
      }

      return {
        class: className,
        property: arbitraryResult.property,
        value: arbitraryResult.value,
        category: this.getCategoryForProperty(arbitraryResult.property),
        prefixes: prefixes,
        isCustom: true,
      };
    }

    // Get the mapping for standard classes
    const mapping = this.mappings[baseClass];

    if (!mapping) {
      return {
        class: className,
        property: "unknown",
        value: "No translation found",
        category: "Unknown",
        prefixes: prefixes,
      };
    }

    // Determine category based on property
    const category = this.getCategoryForProperty(mapping.property);

    return {
      class: className,
      property: mapping.property,
      value: mapping.value,
      category: category,
      prefixes: prefixes,
      isCustom: false,
    };
  }

  // Get category for a CSS property
  getCategoryForProperty(property) {
    const categoryMap = {
      display: "Layout",
      "flex-direction": "Layout",
      "flex-wrap": "Layout",
      "align-items": "Layout",
      "justify-content": "Layout",
      position: "Layout",
      "grid-template-columns": "Layout",
      "grid-template-rows": "Layout",

      margin: "Spacing",
      padding: "Spacing",
      gap: "Spacing",
      "space-x": "Spacing",
      "space-y": "Spacing",

      "font-size": "Typography",
      "font-weight": "Typography",
      "line-height": "Typography",
      "text-align": "Typography",
      "font-family": "Typography",
      "letter-spacing": "Typography",

      color: "Colors",
      "background-color": "Colors",
      "border-color": "Colors",

      width: "Sizing",
      height: "Sizing",
      "min-width": "Sizing",
      "min-height": "Sizing",
      "max-width": "Sizing",
      "max-height": "Sizing",

      "border-radius": "Borders",
      "border-width": "Borders",
      "border-style": "Borders",

      "box-shadow": "Effects",
      opacity: "Effects",
      transform: "Effects",
      transition: "Effects",

      top: "Positioning",
      bottom: "Positioning",
      left: "Positioning",
      right: "Positioning",
      "z-index": "Positioning",
    };

    return categoryMap[property] || "Other";
  }

  // Translate an array of classes and group by category
  translateClasses(classNames) {
    const allTranslations = [];

    classNames
      .filter((className) => this.isTailwindClass(className))
      .forEach((className) => {
        const result = this.translateClass(className);

        // Handle the case where translateClass returns an array (for mx, my, inset, etc.)
        if (Array.isArray(result)) {
          allTranslations.push(...result);
        } else {
          allTranslations.push(result);
        }
      });

    // Group by category
    const groupedTranslations = {};
    allTranslations.forEach((translation) => {
      const category = translation.category;
      if (!groupedTranslations[category]) {
        groupedTranslations[category] = [];
      }
      groupedTranslations[category].push(translation);
    });

    return {
      translations: allTranslations,
      grouped: groupedTranslations,
      totalCount: allTranslations.length,
      unknownClasses: classNames.filter((className) => {
        const baseClass = this.getBaseClass(className);
        return (
          this.isTailwindClass(className) &&
          !this.mappings[baseClass] &&
          !this.isArbitraryValue(baseClass)
        );
      }),
    };
  }

  // Format translation for display
  formatTranslation(translation) {
    let display = `${translation.property}: ${translation.value}`;

    // Add prefix information
    if (translation.prefixes.responsive) {
      display = `@media (min-width: ${this.getBreakpointValue(translation.prefixes.responsive)}) { ${display} }`;
    }

    if (translation.prefixes.state) {
      display = `:${translation.prefixes.state} { ${display} }`;
    }

    return display;
  }

  // Get breakpoint value for responsive prefix
  getBreakpointValue(prefix) {
    const breakpoints = {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    };
    return breakpoints[prefix] || "0px";
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = TailwindTranslator;
}

// Always export to window in browser context
if (typeof window !== "undefined") {
  window.TailwindTranslator = TailwindTranslator;
  console.log(
    "TailwindTranslator class exported to window:",
    typeof window.TailwindTranslator
  );
}
