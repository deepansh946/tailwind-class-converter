import type { TailwindMappings, MappingStats } from "./types"

const LAYOUT_MAPPINGS: TailwindMappings = {
  // Display
  block: { property: "display", value: "block" },
  "inline-block": { property: "display", value: "inline-block" },
  inline: { property: "display", value: "inline" },
  flex: { property: "display", value: "flex" },
  "inline-flex": { property: "display", value: "inline-flex" },
  grid: { property: "display", value: "grid" },
  "inline-grid": { property: "display", value: "inline-grid" },
  hidden: { property: "display", value: "none" },
  table: { property: "display", value: "table" },
  "table-cell": { property: "display", value: "table-cell" },
  "flow-root": { property: "display", value: "flow-root" },
  contents: { property: "display", value: "contents" },
  
  // Flexbox
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
  
  // Position
  static: { property: "position", value: "static" },
  fixed: { property: "position", value: "fixed" },
  absolute: { property: "position", value: "absolute" },
  relative: { property: "position", value: "relative" },
  sticky: { property: "position", value: "sticky" },
}

const SPACING_MAPPINGS: TailwindMappings = {
  // Margin
  "m-0": { property: "margin", value: "0" },
  "m-0.5": { property: "margin", value: "0.125rem" },
  "m-1": { property: "margin", value: "0.25rem" },
  "m-1.5": { property: "margin", value: "0.375rem" },
  "m-2": { property: "margin", value: "0.5rem" },
  "m-2.5": { property: "margin", value: "0.625rem" },
  "m-3": { property: "margin", value: "0.75rem" },
  "m-3.5": { property: "margin", value: "0.875rem" },
  "m-4": { property: "margin", value: "1rem" },
  "m-5": { property: "margin", value: "1.25rem" },
  "m-6": { property: "margin", value: "1.5rem" },
  "m-7": { property: "margin", value: "1.75rem" },
  "m-8": { property: "margin", value: "2rem" },
  "m-9": { property: "margin", value: "2.25rem" },
  "m-10": { property: "margin", value: "2.5rem" },
  "m-11": { property: "margin", value: "2.75rem" },
  "m-12": { property: "margin", value: "3rem" },
  "m-14": { property: "margin", value: "3.5rem" },
  "m-16": { property: "margin", value: "4rem" },
  "m-20": { property: "margin", value: "5rem" },
  "m-24": { property: "margin", value: "6rem" },
  "m-28": { property: "margin", value: "7rem" },
  "m-32": { property: "margin", value: "8rem" },
  "m-36": { property: "margin", value: "9rem" },
  "m-40": { property: "margin", value: "10rem" },
  "m-44": { property: "margin", value: "11rem" },
  "m-48": { property: "margin", value: "12rem" },
  "m-52": { property: "margin", value: "13rem" },
  "m-56": { property: "margin", value: "14rem" },
  "m-60": { property: "margin", value: "15rem" },
  "m-64": { property: "margin", value: "16rem" },
  "m-72": { property: "margin", value: "18rem" },
  "m-80": { property: "margin", value: "20rem" },
  "m-96": { property: "margin", value: "24rem" },
  "m-auto": { property: "margin", value: "auto" },
  
  // Margin directional (abbreviated for space)
  "mt-0": { property: "margin-top", value: "0" },
  "mt-1": { property: "margin-top", value: "0.25rem" },
  "mt-2": { property: "margin-top", value: "0.5rem" },
  "mt-4": { property: "margin-top", value: "1rem" },
  "mt-8": { property: "margin-top", value: "2rem" },
  "mx-auto": { property: "margin-left, margin-right", value: "auto" },
  "my-4": { property: "margin-top, margin-bottom", value: "1rem" },
  
  // Padding
  "p-0": { property: "padding", value: "0" },
  "p-0.5": { property: "padding", value: "0.125rem" },
  "p-1": { property: "padding", value: "0.25rem" },
  "p-1.5": { property: "padding", value: "0.375rem" },
  "p-2": { property: "padding", value: "0.5rem" },
  "p-2.5": { property: "padding", value: "0.625rem" },
  "p-3": { property: "padding", value: "0.75rem" },
  "p-3.5": { property: "padding", value: "0.875rem" },
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
}

const TYPOGRAPHY_MAPPINGS: TailwindMappings = {
  // Font Size
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
  "text-7xl": { property: "font-size", value: "4.5rem" },
  "text-8xl": { property: "font-size", value: "6rem" },
  "text-9xl": { property: "font-size", value: "8rem" },
  
  // Font Weight
  "font-thin": { property: "font-weight", value: "100" },
  "font-extralight": { property: "font-weight", value: "200" },
  "font-light": { property: "font-weight", value: "300" },
  "font-normal": { property: "font-weight", value: "400" },
  "font-medium": { property: "font-weight", value: "500" },
  "font-semibold": { property: "font-weight", value: "600" },
  "font-bold": { property: "font-weight", value: "700" },
  "font-extrabold": { property: "font-weight", value: "800" },
  "font-black": { property: "font-weight", value: "900" },
  
  // Text Alignment
  "text-left": { property: "text-align", value: "left" },
  "text-center": { property: "text-align", value: "center" },
  "text-right": { property: "text-align", value: "right" },
  "text-justify": { property: "text-align", value: "justify" },
  
  // Line Height
  "leading-none": { property: "line-height", value: "1" },
  "leading-tight": { property: "line-height", value: "1.25" },
  "leading-snug": { property: "line-height", value: "1.375" },
  "leading-normal": { property: "line-height", value: "1.5" },
  "leading-relaxed": { property: "line-height", value: "1.625" },
  "leading-loose": { property: "line-height", value: "2" },
}

const COLOR_MAPPINGS: TailwindMappings = {
  // Text Colors
  "text-black": { property: "color", value: "#000000" },
  "text-white": { property: "color", value: "#ffffff" },
  "text-gray-50": { property: "color", value: "#f9fafb" },
  "text-gray-100": { property: "color", value: "#f3f4f6" },
  "text-gray-200": { property: "color", value: "#e5e7eb" },
  "text-gray-300": { property: "color", value: "#d1d5db" },
  "text-gray-400": { property: "color", value: "#9ca3af" },
  "text-gray-500": { property: "color", value: "#6b7280" },
  "text-gray-600": { property: "color", value: "#4b5563" },
  "text-gray-700": { property: "color", value: "#374151" },
  "text-gray-800": { property: "color", value: "#1f2937" },
  "text-gray-900": { property: "color", value: "#111827" },
  "text-gray-950": { property: "color", value: "#030712" },
  
  // Slate Colors
  "text-slate-50": { property: "color", value: "#f8fafc" },
  "text-slate-100": { property: "color", value: "#f1f5f9" },
  "text-slate-200": { property: "color", value: "#e2e8f0" },
  "text-slate-300": { property: "color", value: "#cbd5e1" },
  "text-slate-400": { property: "color", value: "#94a3b8" },
  "text-slate-500": { property: "color", value: "#64748b" },
  "text-slate-600": { property: "color", value: "#475569" },
  "text-slate-700": { property: "color", value: "#334155" },
  "text-slate-800": { property: "color", value: "#1e293b" },
  "text-slate-900": { property: "color", value: "#0f172a" },
  "text-slate-950": { property: "color", value: "#020617" },
  
  // Primary Colors
  "text-red-500": { property: "color", value: "#ef4444" },
  "text-blue-500": { property: "color", value: "#3b82f6" },
  "text-green-500": { property: "color", value: "#10b981" },
  "text-yellow-500": { property: "color", value: "#f59e0b" },
  "text-purple-500": { property: "color", value: "#8b5cf6" },
  "text-pink-500": { property: "color", value: "#ec4899" },
  "text-indigo-500": { property: "color", value: "#6366f1" },
  
  // Background Colors
  "bg-transparent": { property: "background-color", value: "transparent" },
  "bg-black": { property: "background-color", value: "#000000" },
  "bg-white": { property: "background-color", value: "#ffffff" },
  "bg-gray-50": { property: "background-color", value: "#f9fafb" },
  "bg-gray-100": { property: "background-color", value: "#f3f4f6" },
  "bg-gray-200": { property: "background-color", value: "#e5e7eb" },
  "bg-gray-300": { property: "background-color", value: "#d1d5db" },
  "bg-gray-500": { property: "background-color", value: "#6b7280" },
  "bg-gray-700": { property: "background-color", value: "#374151" },
  "bg-gray-900": { property: "background-color", value: "#111827" },
  
  // Slate Backgrounds
  "bg-slate-50": { property: "background-color", value: "#f8fafc" },
  "bg-slate-100": { property: "background-color", value: "#f1f5f9" },
  "bg-slate-200": { property: "background-color", value: "#e2e8f0" },
  "bg-slate-300": { property: "background-color", value: "#cbd5e1" },
  "bg-slate-400": { property: "background-color", value: "#94a3b8" },
  "bg-slate-500": { property: "background-color", value: "#64748b" },
  "bg-slate-600": { property: "background-color", value: "#475569" },
  "bg-slate-700": { property: "background-color", value: "#334155" },
  "bg-slate-800": { property: "background-color", value: "#1e293b" },
  "bg-slate-900": { property: "background-color", value: "#0f172a" },
  "bg-slate-950": { property: "background-color", value: "#020617" },
  
  // Primary Backgrounds
  "bg-red-500": { property: "background-color", value: "#ef4444" },
  "bg-red-700": { property: "background-color", value: "#b91c1c" },
  "bg-blue-500": { property: "background-color", value: "#3b82f6" },
  "bg-blue-700": { property: "background-color", value: "#1d4ed8" },
  "bg-green-500": { property: "background-color", value: "#10b981" },
  "bg-yellow-500": { property: "background-color", value: "#f59e0b" },
  "bg-purple-500": { property: "background-color", value: "#8b5cf6" },
}

const BORDER_MAPPINGS: TailwindMappings = {
  // Border Radius
  "rounded-none": { property: "border-radius", value: "0" },
  "rounded-sm": { property: "border-radius", value: "0.125rem" },
  rounded: { property: "border-radius", value: "0.25rem" },
  "rounded-md": { property: "border-radius", value: "0.375rem" },
  "rounded-lg": { property: "border-radius", value: "0.5rem" },
  "rounded-xl": { property: "border-radius", value: "0.75rem" },
  "rounded-2xl": { property: "border-radius", value: "1rem" },
  "rounded-3xl": { property: "border-radius", value: "1.5rem" },
  "rounded-full": { property: "border-radius", value: "9999px" },
  
  // Border Width
  "border-0": { property: "border-width", value: "0" },
  border: { property: "border-width", value: "1px" },
  "border-2": { property: "border-width", value: "2px" },
  "border-4": { property: "border-width", value: "4px" },
  "border-8": { property: "border-width", value: "8px" },
}

const SIZING_MAPPINGS: TailwindMappings = {
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
}

const EFFECTS_MAPPINGS: TailwindMappings = {
  // Box Shadow
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
    value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  },
  "shadow-xl": {
    property: "box-shadow",
    value: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },
  "shadow-2xl": {
    property: "box-shadow",
    value: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  },
  "shadow-none": { property: "box-shadow", value: "none" },
  
  // Opacity
  "opacity-0": { property: "opacity", value: "0" },
  "opacity-5": { property: "opacity", value: "0.05" },
  "opacity-10": { property: "opacity", value: "0.1" },
  "opacity-20": { property: "opacity", value: "0.2" },
  "opacity-25": { property: "opacity", value: "0.25" },
  "opacity-30": { property: "opacity", value: "0.3" },
  "opacity-40": { property: "opacity", value: "0.4" },
  "opacity-50": { property: "opacity", value: "0.5" },
  "opacity-60": { property: "opacity", value: "0.6" },
  "opacity-70": { property: "opacity", value: "0.7" },
  "opacity-75": { property: "opacity", value: "0.75" },
  "opacity-80": { property: "opacity", value: "0.8" },
  "opacity-90": { property: "opacity", value: "0.9" },
  "opacity-95": { property: "opacity", value: "0.95" },
  "opacity-100": { property: "opacity", value: "1" },
  
  // Blur
  "blur-none": { property: "filter", value: "blur(0)" },
  "blur-sm": { property: "filter", value: "blur(4px)" },
  blur: { property: "filter", value: "blur(8px)" },
  "blur-md": { property: "filter", value: "blur(12px)" },
  "blur-lg": { property: "filter", value: "blur(16px)" },
  "blur-xl": { property: "filter", value: "blur(24px)" },
  "blur-2xl": { property: "filter", value: "blur(40px)" },
  "blur-3xl": { property: "filter", value: "blur(64px)" },
}

const MEDIA_MAPPINGS: TailwindMappings = {
  // Screen size breakpoints
  "sm": { property: "@media", value: "(min-width: 640px)" },
  "md": { property: "@media", value: "(min-width: 768px)" },
  "lg": { property: "@media", value: "(min-width: 1024px)" },
  "xl": { property: "@media", value: "(min-width: 1280px)" },
  "2xl": { property: "@media", value: "(min-width: 1536px)" },
  
  // Max-width breakpoints
  "max-sm": { property: "@media", value: "(max-width: 639px)" },
  "max-md": { property: "@media", value: "(max-width: 767px)" },
  "max-lg": { property: "@media", value: "(max-width: 1023px)" },
  "max-xl": { property: "@media", value: "(max-width: 1279px)" },
  "max-2xl": { property: "@media", value: "(max-width: 1535px)" },
  
  // Portrait and landscape
  "portrait": { property: "@media", value: "(orientation: portrait)" },
  "landscape": { property: "@media", value: "(orientation: landscape)" },
  
  // Print media
  "print": { property: "@media", value: "print" },
  
  // Dark mode
  "dark": { property: "@media", value: "(prefers-color-scheme: dark)" },
  
  // Motion preferences
  "motion-safe": { property: "@media", value: "(prefers-reduced-motion: no-preference)" },
  "motion-reduce": { property: "@media", value: "(prefers-reduced-motion: reduce)" },
  
  // High contrast
  "contrast-more": { property: "@media", value: "(prefers-contrast: more)" },
  "contrast-less": { property: "@media", value: "(prefers-contrast: less)" },
}

const ADDITIONAL_MAPPINGS: TailwindMappings = {
  // Cursor
  "cursor-auto": { property: "cursor", value: "auto" },
  "cursor-default": { property: "cursor", value: "default" },
  "cursor-pointer": { property: "cursor", value: "pointer" },
  "cursor-wait": { property: "cursor", value: "wait" },
  "cursor-text": { property: "cursor", value: "text" },
  "cursor-move": { property: "cursor", value: "move" },
  "cursor-help": { property: "cursor", value: "help" },
  "cursor-not-allowed": { property: "cursor", value: "not-allowed" },
  "cursor-none": { property: "cursor", value: "none" },
  "cursor-grab": { property: "cursor", value: "grab" },
  "cursor-grabbing": { property: "cursor", value: "grabbing" },
  
  // Z-index
  "z-0": { property: "z-index", value: "0" },
  "z-10": { property: "z-index", value: "10" },
  "z-20": { property: "z-index", value: "20" },
  "z-30": { property: "z-index", value: "30" },
  "z-40": { property: "z-index", value: "40" },
  "z-50": { property: "z-index", value: "50" },
  "z-auto": { property: "z-index", value: "auto" },
  
  // Overflow
  "overflow-auto": { property: "overflow", value: "auto" },
  "overflow-hidden": { property: "overflow", value: "hidden" },
  "overflow-clip": { property: "overflow", value: "clip" },
  "overflow-visible": { property: "overflow", value: "visible" },
  "overflow-scroll": { property: "overflow", value: "scroll" },
  "overflow-x-auto": { property: "overflow-x", value: "auto" },
  "overflow-y-auto": { property: "overflow-y", value: "auto" },
  "overflow-x-hidden": { property: "overflow-x", value: "hidden" },
  "overflow-y-hidden": { property: "overflow-y", value: "hidden" },
  "overflow-x-scroll": { property: "overflow-x", value: "scroll" },
  "overflow-y-scroll": { property: "overflow-y", value: "scroll" },
  
  // Grid
  "grid-cols-1": { property: "grid-template-columns", value: "repeat(1, minmax(0, 1fr))" },
  "grid-cols-2": { property: "grid-template-columns", value: "repeat(2, minmax(0, 1fr))" },
  "grid-cols-3": { property: "grid-template-columns", value: "repeat(3, minmax(0, 1fr))" },
  "grid-cols-4": { property: "grid-template-columns", value: "repeat(4, minmax(0, 1fr))" },
  "grid-cols-5": { property: "grid-template-columns", value: "repeat(5, minmax(0, 1fr))" },
  "grid-cols-6": { property: "grid-template-columns", value: "repeat(6, minmax(0, 1fr))" },
  "grid-cols-7": { property: "grid-template-columns", value: "repeat(7, minmax(0, 1fr))" },
  "grid-cols-8": { property: "grid-template-columns", value: "repeat(8, minmax(0, 1fr))" },
  "grid-cols-9": { property: "grid-template-columns", value: "repeat(9, minmax(0, 1fr))" },
  "grid-cols-10": { property: "grid-template-columns", value: "repeat(10, minmax(0, 1fr))" },
  "grid-cols-11": { property: "grid-template-columns", value: "repeat(11, minmax(0, 1fr))" },
  "grid-cols-12": { property: "grid-template-columns", value: "repeat(12, minmax(0, 1fr))" },
  
  // Aspect Ratio
  "aspect-auto": { property: "aspect-ratio", value: "auto" },
  "aspect-square": { property: "aspect-ratio", value: "1 / 1" },
  "aspect-video": { property: "aspect-ratio", value: "16 / 9" },
  
  // Transform
  transform: { property: "transform", value: "translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))" },
  "transform-none": { property: "transform", value: "none" },
  
  // Transition
  transition: { property: "transition-property", value: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter" },
  "transition-none": { property: "transition-property", value: "none" },
  "transition-all": { property: "transition-property", value: "all" },
  "transition-colors": { property: "transition-property", value: "color, background-color, border-color, text-decoration-color, fill, stroke" },
  "transition-opacity": { property: "transition-property", value: "opacity" },
  "transition-shadow": { property: "transition-property", value: "box-shadow" },
  "transition-transform": { property: "transition-property", value: "transform" },
  
  // Duration
  "duration-75": { property: "transition-duration", value: "75ms" },
  "duration-100": { property: "transition-duration", value: "100ms" },
  "duration-150": { property: "transition-duration", value: "150ms" },
  "duration-200": { property: "transition-duration", value: "200ms" },
  "duration-300": { property: "transition-duration", value: "300ms" },
  "duration-500": { property: "transition-duration", value: "500ms" },
  "duration-700": { property: "transition-duration", value: "700ms" },
  "duration-1000": { property: "transition-duration", value: "1000ms" },
}

export const TAILWIND_MAPPINGS: TailwindMappings = {
  ...LAYOUT_MAPPINGS,
  ...SPACING_MAPPINGS,
  ...TYPOGRAPHY_MAPPINGS,
  ...COLOR_MAPPINGS,
  ...BORDER_MAPPINGS,
  ...SIZING_MAPPINGS,
  ...EFFECTS_MAPPINGS,
  ...MEDIA_MAPPINGS,
  ...ADDITIONAL_MAPPINGS,
}

export const MAPPING_METADATA = {
  categories: {
    layout: Object.keys(LAYOUT_MAPPINGS).length,
    spacing: Object.keys(SPACING_MAPPINGS).length,
    typography: Object.keys(TYPOGRAPHY_MAPPINGS).length,
    colors: Object.keys(COLOR_MAPPINGS).length,
    borders: Object.keys(BORDER_MAPPINGS).length,
    sizing: Object.keys(SIZING_MAPPINGS).length,
    effects: Object.keys(EFFECTS_MAPPINGS).length,
    media: Object.keys(MEDIA_MAPPINGS).length,
    additional: Object.keys(ADDITIONAL_MAPPINGS).length,
  },
  total: Object.keys(TAILWIND_MAPPINGS).length,
  version: "2.0.0",
  lastUpdated: new Date().toISOString(),
}

export function getMappingStats(): MappingStats {
  return {
    ...MAPPING_METADATA,
    breakdown: Object.entries(MAPPING_METADATA.categories).map(([category, count]) => ({
      category: category.charAt(0).toUpperCase() + category.slice(1),
      count,
      percentage: Math.round((count / MAPPING_METADATA.total) * 100)
    }))
  }
}