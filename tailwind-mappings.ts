import type { Translation } from "./tailwind-translator";

export const tailwindMappings: Record<string, Translation | Translation[]> = {
  // Layout
  block: { property: "display", value: "block", category: "layout" },
  "inline-block": {
    property: "display",
    value: "inline-block",
    category: "layout",
  },
  inline: { property: "display", value: "inline", category: "layout" },
  flex: { property: "display", value: "flex", category: "layout" },
  "inline-flex": {
    property: "display",
    value: "inline-flex",
    category: "layout",
  },
  table: { property: "display", value: "table", category: "layout" },
  "table-caption": {
    property: "display",
    value: "table-caption",
    category: "layout",
  },
  "table-cell": {
    property: "display",
    value: "table-cell",
    category: "layout",
  },
  "table-column": {
    property: "display",
    value: "table-column",
    category: "layout",
  },
  "table-column-group": {
    property: "display",
    value: "table-column-group",
    category: "layout",
  },
  "table-footer-group": {
    property: "display",
    value: "table-footer-group",
    category: "layout",
  },
  "table-header-group": {
    property: "display",
    value: "table-header-group",
    category: "layout",
  },
  "table-row": { property: "display", value: "table-row", category: "layout" },
  "table-row-group": {
    property: "display",
    value: "table-row-group",
    category: "layout",
  },
  "flow-root": { property: "display", value: "flow-root", category: "layout" },
  grid: { property: "display", value: "grid", category: "layout" },
  "inline-grid": {
    property: "display",
    value: "inline-grid",
    category: "layout",
  },
  contents: { property: "display", value: "contents", category: "layout" },
  "list-item": { property: "display", value: "list-item", category: "layout" },
  hidden: { property: "display", value: "none", category: "layout" },

  // Flexbox
  "flex-row": { property: "flex-direction", value: "row", category: "flexbox" },
  "flex-row-reverse": {
    property: "flex-direction",
    value: "row-reverse",
    category: "flexbox",
  },
  "flex-col": {
    property: "flex-direction",
    value: "column",
    category: "flexbox",
  },
  "flex-col-reverse": {
    property: "flex-direction",
    value: "column-reverse",
    category: "flexbox",
  },
  "flex-wrap": { property: "flex-wrap", value: "wrap", category: "flexbox" },
  "flex-wrap-reverse": {
    property: "flex-wrap",
    value: "wrap-reverse",
    category: "flexbox",
  },
  "flex-nowrap": {
    property: "flex-wrap",
    value: "nowrap",
    category: "flexbox",
  },
  "items-start": {
    property: "align-items",
    value: "flex-start",
    category: "flexbox",
  },
  "items-end": {
    property: "align-items",
    value: "flex-end",
    category: "flexbox",
  },
  "items-center": {
    property: "align-items",
    value: "center",
    category: "flexbox",
  },
  "items-baseline": {
    property: "align-items",
    value: "baseline",
    category: "flexbox",
  },
  "items-stretch": {
    property: "align-items",
    value: "stretch",
    category: "flexbox",
  },
  "justify-start": {
    property: "justify-content",
    value: "flex-start",
    category: "flexbox",
  },
  "justify-end": {
    property: "justify-content",
    value: "flex-end",
    category: "flexbox",
  },
  "justify-center": {
    property: "justify-content",
    value: "center",
    category: "flexbox",
  },
  "justify-between": {
    property: "justify-content",
    value: "space-between",
    category: "flexbox",
  },
  "justify-around": {
    property: "justify-content",
    value: "space-around",
    category: "flexbox",
  },
  "justify-evenly": {
    property: "justify-content",
    value: "space-evenly",
    category: "flexbox",
  },

  // Spacing
  "p-0": { property: "padding", value: "0px", category: "spacing" },
  "p-1": { property: "padding", value: "0.25rem", category: "spacing" },
  "p-2": { property: "padding", value: "0.5rem", category: "spacing" },
  "p-3": { property: "padding", value: "0.75rem", category: "spacing" },
  "p-4": { property: "padding", value: "1rem", category: "spacing" },
  "p-5": { property: "padding", value: "1.25rem", category: "spacing" },
  "p-6": { property: "padding", value: "1.5rem", category: "spacing" },
  "p-8": { property: "padding", value: "2rem", category: "spacing" },
  "p-10": { property: "padding", value: "2.5rem", category: "spacing" },
  "p-12": { property: "padding", value: "3rem", category: "spacing" },
  "p-16": { property: "padding", value: "4rem", category: "spacing" },
  "p-20": { property: "padding", value: "5rem", category: "spacing" },
  "p-24": { property: "padding", value: "6rem", category: "spacing" },
  "p-32": { property: "padding", value: "8rem", category: "spacing" },
  "p-40": { property: "padding", value: "10rem", category: "spacing" },
  "p-48": { property: "padding", value: "12rem", category: "spacing" },
  "p-56": { property: "padding", value: "14rem", category: "spacing" },
  "p-64": { property: "padding", value: "16rem", category: "spacing" },
  "p-px": { property: "padding", value: "1px", category: "spacing" },
  "p-0.5": { property: "padding", value: "0.125rem", category: "spacing" },
  "p-1.5": { property: "padding", value: "0.375rem", category: "spacing" },
  "p-2.5": { property: "padding", value: "0.625rem", category: "spacing" },
  "p-3.5": { property: "padding", value: "0.875rem", category: "spacing" },

  // Typography
  "text-xs": {
    property: "font-size",
    value: "0.75rem",
    category: "typography",
  },
  "text-sm": {
    property: "font-size",
    value: "0.875rem",
    category: "typography",
  },
  "text-base": { property: "font-size", value: "1rem", category: "typography" },
  "text-lg": {
    property: "font-size",
    value: "1.125rem",
    category: "typography",
  },
  "text-xl": {
    property: "font-size",
    value: "1.25rem",
    category: "typography",
  },
  "text-2xl": {
    property: "font-size",
    value: "1.5rem",
    category: "typography",
  },
  "text-3xl": {
    property: "font-size",
    value: "1.875rem",
    category: "typography",
  },
  "text-4xl": {
    property: "font-size",
    value: "2.25rem",
    category: "typography",
  },
  "text-5xl": { property: "font-size", value: "3rem", category: "typography" },
  "text-6xl": {
    property: "font-size",
    value: "3.75rem",
    category: "typography",
  },
  "text-7xl": {
    property: "font-size",
    value: "4.5rem",
    category: "typography",
  },
  "text-8xl": { property: "font-size", value: "6rem", category: "typography" },
  "text-9xl": { property: "font-size", value: "8rem", category: "typography" },

  // Colors
  "text-black": { property: "color", value: "#000000", category: "colors" },
  "text-white": { property: "color", value: "#ffffff", category: "colors" },
  "text-gray-50": { property: "color", value: "#f9fafb", category: "colors" },
  "text-gray-100": { property: "color", value: "#f3f4f6", category: "colors" },
  "text-gray-200": { property: "color", value: "#e5e7eb", category: "colors" },
  "text-gray-300": { property: "color", value: "#d1d5db", category: "colors" },
  "text-gray-400": { property: "color", value: "#9ca3af", category: "colors" },
  "text-gray-500": { property: "color", value: "#6b7280", category: "colors" },
  "text-gray-600": { property: "color", value: "#4b5563", category: "colors" },
  "text-gray-700": { property: "color", value: "#374151", category: "colors" },
  "text-gray-800": { property: "color", value: "#1f2937", category: "colors" },
  "text-gray-900": { property: "color", value: "#111827", category: "colors" },

  // Background colors
  "bg-black": {
    property: "background-color",
    value: "#000000",
    category: "backgrounds",
  },
  "bg-white": {
    property: "background-color",
    value: "#ffffff",
    category: "backgrounds",
  },
  "bg-gray-50": {
    property: "background-color",
    value: "#f9fafb",
    category: "backgrounds",
  },
  "bg-gray-100": {
    property: "background-color",
    value: "#f3f4f6",
    category: "backgrounds",
  },
  "bg-gray-200": {
    property: "background-color",
    value: "#e5e7eb",
    category: "backgrounds",
  },
  "bg-gray-300": {
    property: "background-color",
    value: "#d1d5db",
    category: "backgrounds",
  },
  "bg-gray-400": {
    property: "background-color",
    value: "#9ca3af",
    category: "backgrounds",
  },
  "bg-gray-500": {
    property: "background-color",
    value: "#6b7280",
    category: "backgrounds",
  },
  "bg-gray-600": {
    property: "background-color",
    value: "#4b5563",
    category: "backgrounds",
  },
  "bg-gray-700": {
    property: "background-color",
    value: "#374151",
    category: "backgrounds",
  },
  "bg-gray-800": {
    property: "background-color",
    value: "#1f2937",
    category: "backgrounds",
  },
  "bg-gray-900": {
    property: "background-color",
    value: "#111827",
    category: "backgrounds",
  },

  // Borders
  border: { property: "border-width", value: "1px", category: "borders" },
  "border-0": { property: "border-width", value: "0px", category: "borders" },
  "border-2": { property: "border-width", value: "2px", category: "borders" },
  "border-4": { property: "border-width", value: "4px", category: "borders" },
  "border-8": { property: "border-width", value: "8px", category: "borders" },
  "border-t": {
    property: "border-top-width",
    value: "1px",
    category: "borders",
  },
  "border-r": {
    property: "border-right-width",
    value: "1px",
    category: "borders",
  },
  "border-b": {
    property: "border-bottom-width",
    value: "1px",
    category: "borders",
  },
  "border-l": {
    property: "border-left-width",
    value: "1px",
    category: "borders",
  },

  // Border colors
  "border-black": {
    property: "border-color",
    value: "#000000",
    category: "borders",
  },
  "border-white": {
    property: "border-color",
    value: "#ffffff",
    category: "borders",
  },
  "border-gray-50": {
    property: "border-color",
    value: "#f9fafb",
    category: "borders",
  },
  "border-gray-100": {
    property: "border-color",
    value: "#f3f4f6",
    category: "borders",
  },
  "border-gray-200": {
    property: "border-color",
    value: "#e5e7eb",
    category: "borders",
  },
  "border-gray-300": {
    property: "border-color",
    value: "#d1d5db",
    category: "borders",
  },
  "border-gray-400": {
    property: "border-color",
    value: "#9ca3af",
    category: "borders",
  },
  "border-gray-500": {
    property: "border-color",
    value: "#6b7280",
    category: "borders",
  },
  "border-gray-600": {
    property: "border-color",
    value: "#4b5563",
    category: "borders",
  },
  "border-gray-700": {
    property: "border-color",
    value: "#374151",
    category: "borders",
  },
  "border-gray-800": {
    property: "border-color",
    value: "#1f2937",
    category: "borders",
  },
  "border-gray-900": {
    property: "border-color",
    value: "#111827",
    category: "borders",
  },

  // Border radius
  "rounded-none": {
    property: "border-radius",
    value: "0px",
    category: "borders",
  },
  "rounded-sm": {
    property: "border-radius",
    value: "0.125rem",
    category: "borders",
  },
  rounded: { property: "border-radius", value: "0.25rem", category: "borders" },
  "rounded-md": {
    property: "border-radius",
    value: "0.375rem",
    category: "borders",
  },
  "rounded-lg": {
    property: "border-radius",
    value: "0.5rem",
    category: "borders",
  },
  "rounded-xl": {
    property: "border-radius",
    value: "0.75rem",
    category: "borders",
  },
  "rounded-2xl": {
    property: "border-radius",
    value: "1rem",
    category: "borders",
  },
  "rounded-3xl": {
    property: "border-radius",
    value: "1.5rem",
    category: "borders",
  },
  "rounded-full": {
    property: "border-radius",
    value: "9999px",
    category: "borders",
  },

  // Width and Height
  "w-0": { property: "width", value: "0px", category: "sizing" },
  "w-px": { property: "width", value: "1px", category: "sizing" },
  "w-0.5": { property: "width", value: "0.125rem", category: "sizing" },
  "w-1": { property: "width", value: "0.25rem", category: "sizing" },
  "w-2": { property: "width", value: "0.5rem", category: "sizing" },
  "w-3": { property: "width", value: "0.75rem", category: "sizing" },
  "w-4": { property: "width", value: "1rem", category: "sizing" },
  "w-5": { property: "width", value: "1.25rem", category: "sizing" },
  "w-6": { property: "width", value: "1.5rem", category: "sizing" },
  "w-8": { property: "width", value: "2rem", category: "sizing" },
  "w-10": { property: "width", value: "2.5rem", category: "sizing" },
  "w-12": { property: "width", value: "3rem", category: "sizing" },
  "w-16": { property: "width", value: "4rem", category: "sizing" },
  "w-20": { property: "width", value: "5rem", category: "sizing" },
  "w-24": { property: "width", value: "6rem", category: "sizing" },
  "w-32": { property: "width", value: "8rem", category: "sizing" },
  "w-40": { property: "width", value: "10rem", category: "sizing" },
  "w-48": { property: "width", value: "12rem", category: "sizing" },
  "w-56": { property: "width", value: "14rem", category: "sizing" },
  "w-64": { property: "width", value: "16rem", category: "sizing" },
  "w-auto": { property: "width", value: "auto", category: "sizing" },
  "w-full": { property: "width", value: "100%", category: "sizing" },
  "w-screen": { property: "width", value: "100vw", category: "sizing" },
  "w-min": { property: "width", value: "min-content", category: "sizing" },
  "w-max": { property: "width", value: "max-content", category: "sizing" },
  "w-fit": { property: "width", value: "fit-content", category: "sizing" },

  // Height
  "h-0": { property: "height", value: "0px", category: "sizing" },
  "h-px": { property: "height", value: "1px", category: "sizing" },
  "h-0.5": { property: "height", value: "0.125rem", category: "sizing" },
  "h-1": { property: "height", value: "0.25rem", category: "sizing" },
  "h-2": { property: "height", value: "0.5rem", category: "sizing" },
  "h-3": { property: "height", value: "0.75rem", category: "sizing" },
  "h-4": { property: "height", value: "1rem", category: "sizing" },
  "h-5": { property: "height", value: "1.25rem", category: "sizing" },
  "h-6": { property: "height", value: "1.5rem", category: "sizing" },
  "h-8": { property: "height", value: "2rem", category: "sizing" },
  "h-10": { property: "height", value: "2.5rem", category: "sizing" },
  "h-12": { property: "height", value: "3rem", category: "sizing" },
  "h-16": { property: "height", value: "4rem", category: "sizing" },
  "h-20": { property: "height", value: "5rem", category: "sizing" },
  "h-24": { property: "height", value: "6rem", category: "sizing" },
  "h-32": { property: "height", value: "8rem", category: "sizing" },
  "h-40": { property: "height", value: "10rem", category: "sizing" },
  "h-48": { property: "height", value: "12rem", category: "sizing" },
  "h-56": { property: "height", value: "14rem", category: "sizing" },
  "h-64": { property: "height", value: "16rem", category: "sizing" },
  "h-auto": { property: "height", value: "auto", category: "sizing" },
  "h-full": { property: "height", value: "100%", category: "sizing" },
  "h-screen": { property: "height", value: "100vh", category: "sizing" },
  "h-min": { property: "height", value: "min-content", category: "sizing" },
  "h-max": { property: "height", value: "max-content", category: "sizing" },
  "h-fit": { property: "height", value: "fit-content", category: "sizing" },

  // Position
  static: { property: "position", value: "static", category: "positioning" },
  fixed: { property: "position", value: "fixed", category: "positioning" },
  absolute: {
    property: "position",
    value: "absolute",
    category: "positioning",
  },
  relative: {
    property: "position",
    value: "relative",
    category: "positioning",
  },
  sticky: { property: "position", value: "sticky", category: "positioning" },

  // Z-index
  "z-0": { property: "z-index", value: "0", category: "positioning" },
  "z-10": { property: "z-index", value: "10", category: "positioning" },
  "z-20": { property: "z-index", value: "20", category: "positioning" },
  "z-30": { property: "z-index", value: "30", category: "positioning" },
  "z-40": { property: "z-index", value: "40", category: "positioning" },
  "z-50": { property: "z-index", value: "50", category: "positioning" },
  "z-auto": { property: "z-index", value: "auto", category: "positioning" },

  // Overflow
  "overflow-auto": { property: "overflow", value: "auto", category: "layout" },
  "overflow-hidden": {
    property: "overflow",
    value: "hidden",
    category: "layout",
  },
  "overflow-visible": {
    property: "overflow",
    value: "visible",
    category: "layout",
  },
  "overflow-scroll": {
    property: "overflow",
    value: "scroll",
    category: "layout",
  },
  "overflow-x-auto": {
    property: "overflow-x",
    value: "auto",
    category: "layout",
  },
  "overflow-y-auto": {
    property: "overflow-y",
    value: "auto",
    category: "layout",
  },
  "overflow-x-hidden": {
    property: "overflow-x",
    value: "hidden",
    category: "layout",
  },
  "overflow-y-hidden": {
    property: "overflow-y",
    value: "hidden",
    category: "layout",
  },

  // Text alignment
  "text-left": {
    property: "text-align",
    value: "left",
    category: "typography",
  },
  "text-center": {
    property: "text-align",
    value: "center",
    category: "typography",
  },
  "text-right": {
    property: "text-align",
    value: "right",
    category: "typography",
  },
  "text-justify": {
    property: "text-align",
    value: "justify",
    category: "typography",
  },

  // Font weight
  "font-thin": {
    property: "font-weight",
    value: "100",
    category: "typography",
  },
  "font-extralight": {
    property: "font-weight",
    value: "200",
    category: "typography",
  },
  "font-light": {
    property: "font-weight",
    value: "300",
    category: "typography",
  },
  "font-normal": {
    property: "font-weight",
    value: "400",
    category: "typography",
  },
  "font-medium": {
    property: "font-weight",
    value: "500",
    category: "typography",
  },
  "font-semibold": {
    property: "font-weight",
    value: "600",
    category: "typography",
  },
  "font-bold": {
    property: "font-weight",
    value: "700",
    category: "typography",
  },
  "font-extrabold": {
    property: "font-weight",
    value: "800",
    category: "typography",
  },
  "font-black": {
    property: "font-weight",
    value: "900",
    category: "typography",
  },

  // Text decoration
  underline: {
    property: "text-decoration",
    value: "underline",
    category: "typography",
  },
  "line-through": {
    property: "text-decoration",
    value: "line-through",
    category: "typography",
  },
  "no-underline": {
    property: "text-decoration",
    value: "none",
    category: "typography",
  },

  // Cursor
  "cursor-auto": {
    property: "cursor",
    value: "auto",
    category: "interactivity",
  },
  "cursor-default": {
    property: "cursor",
    value: "default",
    category: "interactivity",
  },
  "cursor-pointer": {
    property: "cursor",
    value: "pointer",
    category: "interactivity",
  },
  "cursor-wait": {
    property: "cursor",
    value: "wait",
    category: "interactivity",
  },
  "cursor-text": {
    property: "cursor",
    value: "text",
    category: "interactivity",
  },
  "cursor-move": {
    property: "cursor",
    value: "move",
    category: "interactivity",
  },
  "cursor-help": {
    property: "cursor",
    value: "help",
    category: "interactivity",
  },
  "cursor-not-allowed": {
    property: "cursor",
    value: "not-allowed",
    category: "interactivity",
  },

  // User select
  "select-none": {
    property: "user-select",
    value: "none",
    category: "interactivity",
  },
  "select-text": {
    property: "user-select",
    value: "text",
    category: "interactivity",
  },
  "select-all": {
    property: "user-select",
    value: "all",
    category: "interactivity",
  },
  "select-auto": {
    property: "user-select",
    value: "auto",
    category: "interactivity",
  },
};
