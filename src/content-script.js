// Tailwind Class Translator - Content Script

(function () {
  "use strict";

  // State management
  let isTranslationActive = false;
  let translator = null;
  let currentTooltip = null;
  let hoveredElement = null;
  let hoverTimeout = null;

  // Comprehensive Tailwind CSS class mappings (inline)
  const TAILWIND_MAPPINGS = {
    // Layout
    block: { property: "display", value: "block" },
    "inline-block": { property: "display", value: "inline-block" },
    inline: { property: "display", value: "inline" },
    flex: { property: "display", value: "flex" },
    "inline-flex": { property: "display", value: "inline-flex" },
    grid: { property: "display", value: "grid" },
    "inline-grid": { property: "display", value: "inline-grid" },
    hidden: { property: "display", value: "none" },
    "flex-row": { property: "flex-direction", value: "row" },
    "flex-row-reverse": { property: "flex-direction", value: "row-reverse" },
    "flex-col": { property: "flex-direction", value: "column" },
    "flex-col-reverse": { property: "flex-direction", value: "column-reverse" },
    "flex-wrap": { property: "flex-wrap", value: "wrap" },
    "flex-wrap-reverse": { property: "flex-wrap", value: "wrap-reverse" },
    "flex-nowrap": { property: "flex-wrap", value: "nowrap" },
    "items-start": { property: "align-items", value: "flex-start" },
    "items-end": { property: "align-items", value: "flex-end" },
    "items-center": { property: "align-items", value: "center" },
    "items-baseline": { property: "align-items", value: "baseline" },
    "items-stretch": { property: "align-items", value: "stretch" },
    "justify-start": { property: "justify-content", value: "flex-start" },
    "justify-end": { property: "justify-content", value: "flex-end" },
    "justify-center": { property: "justify-content", value: "center" },
    "justify-between": { property: "justify-content", value: "space-between" },
    "justify-around": { property: "justify-content", value: "space-around" },
    "justify-evenly": { property: "justify-content", value: "space-evenly" },
    static: { property: "position", value: "static" },
    fixed: { property: "position", value: "fixed" },
    absolute: { property: "position", value: "absolute" },
    relative: { property: "position", value: "relative" },
    sticky: { property: "position", value: "sticky" },

    // Spacing
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
    "pt-0": { property: "padding-top", value: "0" },
    "pt-1": { property: "padding-top", value: "0.25rem" },
    "pt-2": { property: "padding-top", value: "0.5rem" },
    "pt-4": { property: "padding-top", value: "1rem" },
    "pt-8": { property: "padding-top", value: "2rem" },
    "pr-0": { property: "padding-right", value: "0" },
    "pr-1": { property: "padding-right", value: "0.25rem" },
    "pr-2": { property: "padding-right", value: "0.5rem" },
    "pr-4": { property: "padding-right", value: "1rem" },
    "pr-8": { property: "padding-right", value: "2rem" },
    "pb-0": { property: "padding-bottom", value: "0" },
    "pb-1": { property: "padding-bottom", value: "0.25rem" },
    "pb-2": { property: "padding-bottom", value: "0.5rem" },
    "pb-4": { property: "padding-bottom", value: "1rem" },
    "pb-8": { property: "padding-bottom", value: "2rem" },
    "pl-0": { property: "padding-left", value: "0" },
    "pl-1": { property: "padding-left", value: "0.25rem" },
    "pl-2": { property: "padding-left", value: "0.5rem" },
    "pl-4": { property: "padding-left", value: "1rem" },
    "pl-8": { property: "padding-left", value: "2rem" },
    "px-0": { property: "padding-left, padding-right", value: "0" },
    "px-1": { property: "padding-left, padding-right", value: "0.25rem" },
    "px-2": { property: "padding-left, padding-right", value: "0.5rem" },
    "px-4": { property: "padding-left, padding-right", value: "1rem" },
    "px-8": { property: "padding-left, padding-right", value: "2rem" },
    "py-0": { property: "padding-top, padding-bottom", value: "0" },
    "py-1": { property: "padding-top, padding-bottom", value: "0.25rem" },
    "py-2": { property: "padding-top, padding-bottom", value: "0.5rem" },
    "py-4": { property: "padding-top, padding-bottom", value: "1rem" },
    "py-8": { property: "padding-top, padding-bottom", value: "2rem" },
    "gap-0": { property: "gap", value: "0" },
    "gap-1": { property: "gap", value: "0.25rem" },
    "gap-2": { property: "gap", value: "0.5rem" },
    "gap-3": { property: "gap", value: "0.75rem" },
    "gap-4": { property: "gap", value: "1rem" },
    "gap-5": { property: "gap", value: "1.25rem" },
    "gap-6": { property: "gap", value: "1.5rem" },
    "gap-8": { property: "gap", value: "2rem" },

    // Typography
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
    "font-thin": { property: "font-weight", value: "100" },
    "font-extralight": { property: "font-weight", value: "200" },
    "font-light": { property: "font-weight", value: "300" },
    "font-normal": { property: "font-weight", value: "400" },
    "font-medium": { property: "font-weight", value: "500" },
    "font-semibold": { property: "font-weight", value: "600" },
    "font-bold": { property: "font-weight", value: "700" },
    "font-extrabold": { property: "font-weight", value: "800" },
    "font-black": { property: "font-weight", value: "900" },
    "text-left": { property: "text-align", value: "left" },
    "text-center": { property: "text-align", value: "center" },
    "text-right": { property: "text-align", value: "right" },
    "text-justify": { property: "text-align", value: "justify" },
    "leading-none": { property: "line-height", value: "1" },
    "leading-tight": { property: "line-height", value: "1.25" },
    "leading-snug": { property: "line-height", value: "1.375" },
    "leading-normal": { property: "line-height", value: "1.5" },
    "leading-relaxed": { property: "line-height", value: "1.625" },
    "leading-loose": { property: "line-height", value: "2" },

    // Colors
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

    // Borders
    "rounded-none": { property: "border-radius", value: "0" },
    "rounded-sm": { property: "border-radius", value: "0.125rem" },
    rounded: { property: "border-radius", value: "0.25rem" },
    "rounded-md": { property: "border-radius", value: "0.375rem" },
    "rounded-lg": { property: "border-radius", value: "0.5rem" },
    "rounded-xl": { property: "border-radius", value: "0.75rem" },
    "rounded-2xl": { property: "border-radius", value: "1rem" },
    "rounded-3xl": { property: "border-radius", value: "1.5rem" },
    "rounded-full": { property: "border-radius", value: "9999px" },
    "border-0": { property: "border-width", value: "0" },
    border: { property: "border-width", value: "1px" },
    "border-2": { property: "border-width", value: "2px" },
    "border-4": { property: "border-width", value: "4px" },
    "border-8": { property: "border-width", value: "8px" },

    // Sizing
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

    // Effects
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
    "opacity-0": { property: "opacity", value: "0" },
    "opacity-25": { property: "opacity", value: "0.25" },
    "opacity-50": { property: "opacity", value: "0.5" },
    "opacity-75": { property: "opacity", value: "0.75" },
    "opacity-100": { property: "opacity", value: "1" },
  };

  // Tailwind Class Translation Engine (inline)
  class TailwindTranslator {
    constructor() {
      this.mappings = TAILWIND_MAPPINGS;
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

    // Check if a class name is a Tailwind utility class
    isTailwindClass(className) {
      const baseClass = this.getBaseClass(className);
      if (this.mappings[baseClass]) return true;
      if (this.isArbitraryValue(baseClass)) return true;

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
      let baseClass = className;
      for (const prefix of this.responsivePrefixes) {
        if (baseClass.startsWith(prefix + ":")) {
          baseClass = baseClass.substring(prefix.length + 1);
          break;
        }
      }
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
      const prefixes = { responsive: null, state: null };
      for (const prefix of this.responsivePrefixes) {
        if (className.startsWith(prefix + ":")) {
          prefixes.responsive = prefix;
          className = className.substring(prefix.length + 1);
          break;
        }
      }
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
      const arbitraryMappings = {
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
        w: "width",
        h: "height",
        "min-w": "min-width",
        "min-h": "min-height",
        "max-w": "max-width",
        "max-h": "max-height",
        bg: "background-color",
        border: "border-color",
        text: (value) =>
          /^\d+(\.\d+)?(px|rem|em|%|vw|vh)$/.test(value) || /^\d+$/.test(value)
            ? "font-size"
            : "color",
        font: "font-family",
        leading: "line-height",
        tracking: "letter-spacing",
        top: "top",
        right: "right",
        bottom: "bottom",
        left: "left",
        inset: ["top", "right", "bottom", "left"],
      };

      const cssProperty = arbitraryMappings[utilityPrefix];
      if (!cssProperty) return null;

      const processedValue = this.processArbitraryValue(value);

      if (typeof cssProperty === "function") {
        const resolvedProperty = cssProperty(processedValue);
        return { property: resolvedProperty, value: processedValue };
      }

      if (Array.isArray(cssProperty)) {
        return cssProperty.map((prop) => ({
          property: prop,
          value: processedValue,
        }));
      }

      return { property: cssProperty, value: processedValue };
    }

    // Process arbitrary value
    processArbitraryValue(value) {
      value = value.replace(/_/g, " ");
      if (value.startsWith("-")) return `-${value.substring(1)}`;
      if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return value;
      if (/^(rgb|rgba|hsl|hsla|var|calc|clamp|min|max)\(/.test(value))
        return value;
      if (/^\d+(\.\d+)?$/.test(value)) return value + "px";
      return value;
    }

    // Translate a single class
    translateClass(className) {
      const prefixes = this.getPrefixes(className);
      const baseClass = this.getBaseClass(className);

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

      return {
        class: className,
        property: mapping.property,
        value: mapping.value,
        category: this.getCategoryForProperty(mapping.property),
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
        "margin-top": "Spacing",
        "margin-right": "Spacing",
        "margin-bottom": "Spacing",
        "margin-left": "Spacing",
        "padding-top": "Spacing",
        "padding-right": "Spacing",
        "padding-bottom": "Spacing",
        "padding-left": "Spacing",
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
          if (Array.isArray(result)) {
            allTranslations.push(...result);
          } else {
            allTranslations.push(result);
          }
        });

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
  }

  // Initialize translator directly (no dynamic loading)
  function initializeTranslator() {
    console.log("Initializing Tailwind Translator...");

    try {
      translator = new TailwindTranslator();
      console.log("Tailwind Translator initialized successfully");

      // Check initial state from storage
      chrome.storage.local.get(["translationActive"], (result) => {
        if (result.translationActive) {
          console.log("Auto-activating translation mode");
          activateTranslation();
        }
      });
    } catch (error) {
      console.error("Error initializing translator:", error);
    }
  }

  // Activate translation mode
  function activateTranslation() {
    if (isTranslationActive) return;

    isTranslationActive = true;
    console.log("Translation mode activated");

    // Add hover listeners to all elements
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("mouseout", handleMouseOut, true);
    document.addEventListener("scroll", hideTooltip, true);
    window.addEventListener("resize", hideTooltip);
  }

  // Deactivate translation mode
  function deactivateTranslation() {
    if (!isTranslationActive) return;

    isTranslationActive = false;
    console.log("Translation mode deactivated");

    // Remove hover listeners
    document.removeEventListener("mouseover", handleMouseOver, true);
    document.removeEventListener("mouseout", handleMouseOut, true);
    document.removeEventListener("scroll", hideTooltip, true);
    window.removeEventListener("resize", hideTooltip);

    // Hide any active tooltip
    hideTooltip();
  }

  // Handle mouse over events
  function handleMouseOver(event) {
    if (!isTranslationActive || !translator) return;

    const element = event.target;

    // Skip if hovering over the tooltip itself
    if (element.closest(".tailwind-translator-tooltip")) {
      return;
    }

    // Clear existing timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
    }

    // Get element classes
    const classes = getElementClasses(element);
    const tailwindClasses = classes.filter((className) =>
      translator.isTailwindClass(className)
    );

    if (tailwindClasses.length === 0) {
      hideTooltip();
      return;
    }

    hoveredElement = element;

    // Show tooltip after a short delay
    hoverTimeout = setTimeout(() => {
      showTooltip(element, tailwindClasses, event);
    }, 300);
  }

  // Handle mouse out events
  function handleMouseOut(event) {
    if (!isTranslationActive) return;

    // Clear timeout
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      hoverTimeout = null;
    }

    // Check if we're moving to the tooltip
    const relatedTarget = event.relatedTarget;
    if (
      relatedTarget &&
      relatedTarget.closest(".tailwind-translator-tooltip")
    ) {
      return; // Don't hide if moving to tooltip
    }

    // Hide tooltip after a short delay
    setTimeout(() => {
      if (hoveredElement === event.target) {
        hideTooltip();
      }
    }, 100);
  }

  // Show tooltip with translations
  function showTooltip(element, tailwindClasses, mouseEvent) {
    if (!translator || hoveredElement !== element) return;

    hideTooltip(); // Hide any existing tooltip

    const translationResult = translator.translateClasses(tailwindClasses);

    if (translationResult.totalCount === 0) return;

    // Create tooltip element
    currentTooltip = createTooltipElement(element, translationResult);
    document.body.appendChild(currentTooltip);

    // Position tooltip
    positionTooltip(currentTooltip, mouseEvent || { clientX: 0, clientY: 0 });

    // Add hover listeners to keep tooltip visible
    currentTooltip.addEventListener("mouseenter", () => {
      if (hoverTimeout) {
        clearTimeout(hoverTimeout);
        hoverTimeout = null;
      }
    });

    currentTooltip.addEventListener("mouseleave", hideTooltip);
  }

  // Create tooltip DOM element
  function createTooltipElement(element, translationResult) {
    const tooltip = document.createElement("div");
    tooltip.className = "tailwind-translator-tooltip";

    const elementInfo = `<${element.tagName.toLowerCase()}${element.id ? ` id="${element.id}"` : ""}>`;

    let html = `
      <div class="tooltip-header">
        <div class="element-tag">${elementInfo}</div>
        <div class="class-count">${translationResult.totalCount} Tailwind classes</div>
      </div>
    `;

    // Group translations by category
    const categoryOrder = [
      "Layout",
      "Spacing",
      "Typography",
      "Colors",
      "Sizing",
      "Borders",
      "Effects",
      "Positioning",
      "Other",
    ];

    for (const category of categoryOrder) {
      if (!translationResult.grouped[category]) continue;

      const categoryTranslations = translationResult.grouped[category];
      html += `
        <div class="tooltip-category">
          <div class="category-header">${getCategoryIcon(category)} ${category}</div>
          <div class="category-properties">
      `;

      categoryTranslations.forEach((translation) => {
        const prefixInfo = getPrefixInfo(translation.prefixes);
        const customIndicator = translation.isCustom
          ? '<span class="custom-indicator">custom</span>'
          : "";
        html += `
          <div class="css-property">
            ${prefixInfo}
            <span class="property-name">${translation.property}:</span>
            <span class="property-value">${translation.value}</span>
            ${customIndicator}
          </div>
        `;
      });

      html += `
          </div>
        </div>
      `;
    }

    tooltip.innerHTML = html;

    // Add styles
    addTooltipStyles(tooltip);

    return tooltip;
  }

  // Get category icon
  function getCategoryIcon(category) {
    const icons = {
      Layout: "📐",
      Spacing: "📏",
      Typography: "✍️",
      Colors: "🎨",
      Sizing: "📐",
      Borders: "🔲",
      Effects: "✨",
      Positioning: "📍",
      Other: "⚙️",
    };
    return icons[category] || "•";
  }

  // Get prefix information
  function getPrefixInfo(prefixes) {
    let info = "";
    if (prefixes.responsive) {
      info += `<span class="responsive-prefix">${prefixes.responsive}</span>`;
    }
    if (prefixes.state) {
      info += `<span class="state-prefix">${prefixes.state}</span>`;
    }
    return info;
  }

  // Add styles to tooltip
  function addTooltipStyles(tooltip) {
    const styles = `
      position: fixed;
      background: #1f2937;
      color: #f3f4f6;
      border-radius: 8px;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
      z-index: 999999;
      max-width: 400px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
      font-size: 13px;
      line-height: 1.4;
      pointer-events: auto;
      border: 1px solid #374151;
    `;

    tooltip.style.cssText = styles;

    // Add internal styles
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
      .tailwind-translator-tooltip .tooltip-header {
        padding: 12px;
        border-bottom: 1px solid #374151;
        background: #111827;
        border-radius: 8px 8px 0 0;
      }
      
      .tailwind-translator-tooltip .element-tag {
        font-family: 'SF Mono', Monaco, monospace;
        font-size: 12px;
        color: #60a5fa;
        font-weight: 600;
      }
      
      .tailwind-translator-tooltip .class-count {
        font-size: 11px;
        color: #9ca3af;
        margin-top: 2px;
      }
      
      .tailwind-translator-tooltip .tooltip-category {
        border-bottom: 1px solid #374151;
      }
      
      .tailwind-translator-tooltip .tooltip-category:last-child {
        border-bottom: none;
      }
      
      .tailwind-translator-tooltip .category-header {
        padding: 8px 12px;
        background: #374151;
        font-size: 11px;
        font-weight: 600;
        color: #d1d5db;
      }
      
      .tailwind-translator-tooltip .category-properties {
        padding: 8px 12px;
      }
      
      .tailwind-translator-tooltip .css-property {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-bottom: 4px;
        font-size: 12px;
      }
      
      .tailwind-translator-tooltip .css-property:last-child {
        margin-bottom: 0;
      }
      
      .tailwind-translator-tooltip .property-name {
        color: #a78bfa;
        font-family: 'SF Mono', Monaco, monospace;
        font-weight: 500;
      }
      
      .tailwind-translator-tooltip .property-value {
        color: #34d399;
        font-family: 'SF Mono', Monaco, monospace;
      }
      
      .tailwind-translator-tooltip .responsive-prefix {
        background: #fbbf24;
        color: #78350f;
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .tailwind-translator-tooltip .state-prefix {
        background: #f87171;
        color: #7f1d1d;
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .tailwind-translator-tooltip .custom-indicator {
        background: #a855f7;
        color: #ffffff;
        padding: 1px 4px;
        border-radius: 3px;
        font-size: 9px;
        font-weight: 600;
        text-transform: uppercase;
        margin-left: auto;
      }
    `;

    tooltip.appendChild(styleSheet);
  }

  // Position tooltip
  function positionTooltip(tooltip, mouseEvent) {
    const rect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = mouseEvent.clientX + 15;
    let y = mouseEvent.clientY + 15;

    // Adjust if tooltip would go off screen
    if (x + rect.width > viewportWidth) {
      x = mouseEvent.clientX - rect.width - 15;
    }

    if (y + rect.height > viewportHeight) {
      y = mouseEvent.clientY - rect.height - 15;
    }

    // Ensure minimum margins
    x = Math.max(10, Math.min(x, viewportWidth - rect.width - 10));
    y = Math.max(10, Math.min(y, viewportHeight - rect.height - 10));

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
  }

  // Hide tooltip
  function hideTooltip() {
    if (currentTooltip) {
      currentTooltip.remove();
      currentTooltip = null;
    }
    hoveredElement = null;
  }

  // Get element classes
  function getElementClasses(element) {
    const classList = element.classList;
    return Array.from(classList);
  }

  // Listen for messages from popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "toggle") {
      if (isTranslationActive) {
        deactivateTranslation();
        sendResponse({ status: "deactivated" });
      } else {
        activateTranslation();
        sendResponse({ status: "activated" });
      }
    } else if (request.action === "getStatus") {
      sendResponse({ isActive: isTranslationActive });
    }
  });

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeTranslator);
  } else {
    initializeTranslator();
  }
})();
