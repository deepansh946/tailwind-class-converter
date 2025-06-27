import type { 
  TailwindMappings, 
  TranslationResult, 
  TranslationOutput, 
  ClassPrefixes,
  CategoryType 
} from "./types"
import { TAILWIND_MAPPINGS } from "./tailwind-mappings"

export class TailwindTranslator {
  private mappings: TailwindMappings
  private responsivePrefixes: string[]
  private statePrefixes: string[]
  private tailwindPatterns: RegExp[]

  constructor(customMappings?: TailwindMappings) {
    this.mappings = customMappings || TAILWIND_MAPPINGS
    this.responsivePrefixes = ["sm", "md", "lg", "xl", "2xl"]
    this.statePrefixes = [
      "hover",
      "focus", 
      "active",
      "group-hover",
      "group-focus",
      "dark",
      "first",
      "last",
      "odd",
      "even",
      "visited",
      "disabled",
      "enabled"
    ]
    this.tailwindPatterns = this.initializeTailwindPatterns()
  }

  private initializeTailwindPatterns(): RegExp[] {
    return [
      /^(sm|md|lg|xl|2xl):/,
      /^(hover|focus|active|group-hover|group-focus|dark|first|last|odd|even|visited|disabled|enabled):/,
      /^(sm|md|lg|xl|2xl|max-sm|max-md|max-lg|max-xl|max-2xl|portrait|landscape|print|dark|motion-safe|motion-reduce|contrast-more|contrast-less)$/,
      /^(bg|text|border)-/,
      /^(m|p|mt|mb|ml|mr|pt|pb|pl|pr|px|py|mx|my)-/,
      /^(w|h|min-w|min-h|max-w|max-h)-/,
      /^(flex|grid|block|inline|hidden|relative|absolute|fixed|sticky)$/,
      /^(font|text|leading|tracking|space)-/,
      /^(rounded|shadow|opacity|z)-/,
      /^(top|bottom|left|right|inset)-/,
      /^(gap|divide)-/,
      /^(overflow|cursor|transform|transition|duration)-/,
      /^(m|p|mt|mb|ml|mr|pt|pb|pl|pr|px|py|mx|my)-\[.+\]$/,
      /^(w|h|min-w|min-h|max-w|max-h)-\[.+\]$/,
      /^(bg|text|border)-\[.+\]$/,
      /^(top|bottom|left|right|inset)-\[.+\]$/,
      /^(gap|gap-x|gap-y)-\[.+\]$/,
      /^(rounded|shadow|opacity|z)-\[.+\]$/,
      /^(rotate|scale|translate-x|translate-y)-\[.+\]$/,
    ]
  }

  isTailwindClass(className: string): boolean {
    const baseClass = this.getBaseClass(className)
    
    // Check if it's a standalone media query class
    if (this.mappings[className] && this.mappings[className].property === "@media") return true
    
    // Check direct mappings first (fastest)
    if (this.mappings[baseClass]) return true
    
    // Check arbitrary value syntax
    if (this.isArbitraryValue(baseClass)) return true
    
    // Check against pattern rules
    return this.tailwindPatterns.some((pattern) => pattern.test(className))
  }

  getBaseClass(className: string): string {
    let baseClass = className
    
    // Remove responsive prefixes (sm:, md:, etc.)
    for (const prefix of this.responsivePrefixes) {
      if (baseClass.startsWith(prefix + ":")) {
        baseClass = baseClass.substring(prefix.length + 1)
        break
      }
    }
    
    // Remove state prefixes (hover:, focus:, etc.)
    for (const prefix of this.statePrefixes) {
      if (baseClass.startsWith(prefix + ":")) {
        baseClass = baseClass.substring(prefix.length + 1)
        break
      }
    }
    
    return baseClass
  }

  getPrefixes(className: string): ClassPrefixes {
    const prefixes: ClassPrefixes = { responsive: null, state: null }
    let remainingClass = className
    
    // Extract responsive prefix
    for (const prefix of this.responsivePrefixes) {
      if (remainingClass.startsWith(prefix + ":")) {
        prefixes.responsive = prefix
        remainingClass = remainingClass.substring(prefix.length + 1)
        break
      }
    }
    
    // Extract state prefix
    for (const prefix of this.statePrefixes) {
      if (remainingClass.startsWith(prefix + ":")) {
        prefixes.state = prefix
        break
      }
    }
    
    return prefixes
  }

  private isArbitraryValue(className: string): boolean {
    return /\[.+\]$/.test(className)
  }

  private parseArbitraryValue(className: string): { property: string; value: string } | null {
    const match = className.match(/^(.+)-\[(.+)\]$/)
    if (!match) return null
    const [, property, value] = match
    return { property, value }
  }

  private translateArbitraryValue(className: string): TranslationResult | TranslationResult[] | null {
    const parsed = this.parseArbitraryValue(className)
    if (!parsed) return null

    const { property: utilityPrefix, value } = parsed
    const arbitraryMappings: Record<string, string | string[] | ((value: string) => string)> = {
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
      text: (value: string) =>
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
    }

    const cssProperty = arbitraryMappings[utilityPrefix]
    if (!cssProperty) return null

    const processedValue = this.processArbitraryValue(value)
    const prefixes = this.getPrefixes(className)

    if (typeof cssProperty === "function") {
      const resolvedProperty = cssProperty(processedValue)
      return {
        class: className,
        property: resolvedProperty,
        value: processedValue,
        category: this.getCategoryForProperty(resolvedProperty),
        prefixes,
        isCustom: true,
      }
    }

    if (Array.isArray(cssProperty)) {
      return cssProperty.map((prop) => ({
        class: className,
        property: prop,
        value: processedValue,
        category: this.getCategoryForProperty(prop),
        prefixes,
        isCustom: true,
      }))
    }

    return {
      class: className,
      property: cssProperty,
      value: processedValue,
      category: this.getCategoryForProperty(cssProperty),
      prefixes,
      isCustom: true,
    }
  }

  private processArbitraryValue(value: string): string {
    value = value.replace(/_/g, " ")
    if (value.startsWith("-")) return `-${value.substring(1)}`
    if (/^#[0-9a-fA-F]{3,8}$/.test(value)) return value
    if (/^(rgb|rgba|hsl|hsla|var|calc|clamp|min|max)\(/.test(value))
      return value
    if (/^\d+(\.\d+)?$/.test(value)) return value + "px"
    return value
  }

  translateClass(className: string): TranslationResult | TranslationResult[] {
    // Check if it's a standalone media query class first
    if (this.mappings[className] && this.mappings[className].property === "@media") {
      return {
        class: className,
        property: this.mappings[className].property,
        value: this.mappings[className].value,
        category: this.getCategoryForProperty(this.mappings[className].property),
        prefixes: { responsive: null, state: null },
        isCustom: false,
      }
    }

    const prefixes = this.getPrefixes(className)
    const baseClass = this.getBaseClass(className)

    if (this.isArbitraryValue(baseClass)) {
      const arbitraryResult = this.translateArbitraryValue(baseClass)
      if (!arbitraryResult) {
        return {
          class: className,
          property: "unknown",
          value: "Invalid arbitrary value syntax",
          category: "Other",
          prefixes,
          isCustom: true,
        }
      }

      if (Array.isArray(arbitraryResult)) {
        return arbitraryResult.map((result) => ({
          ...result,
          class: className,
          prefixes,
        }))
      }

      return {
        ...arbitraryResult,
        class: className,
        prefixes,
      }
    }

    const mapping = this.mappings[baseClass]
    if (!mapping) {
      // Return null for unknown classes instead of unknown translation
      return {
        class: className,
        property: "unknown",
        value: "No translation found",
        category: "Other",
        prefixes,
      }
    }

    return {
      class: className,
      property: mapping.property,
      value: mapping.value,
      category: this.getCategoryForProperty(mapping.property),
      prefixes,
      isCustom: false,
    }
  }

  private getCategoryForProperty(property: string): CategoryType {
    const categoryMap: Record<string, CategoryType> = {
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
      filter: "Effects",
      top: "Positioning",
      bottom: "Positioning",
      left: "Positioning",
      right: "Positioning",
      "z-index": "Positioning",
      "@media": "Media",
    }
    return categoryMap[property] || "Other"
  }

  translateClasses(classNames: string[]): TranslationOutput {
    const allTranslations: TranslationResult[] = []
    classNames
      .filter((className) => this.isTailwindClass(className))
      .forEach((className) => {
        const result = this.translateClass(className)
        if (Array.isArray(result)) {
          // Filter out unknown translations from array results
          const validResults = result.filter(r => r.property !== "unknown")
          allTranslations.push(...validResults)
        } else {
          // Only add if not unknown
          if (result.property !== "unknown") {
            allTranslations.push(result)
          }
        }
      })

    const groupedTranslations: Record<string, TranslationResult[]> = {}
    allTranslations.forEach((translation) => {
      const category = translation.category
      if (!groupedTranslations[category]) {
        groupedTranslations[category] = []
      }
      groupedTranslations[category].push(translation)
    })

    return {
      translations: allTranslations,
      grouped: groupedTranslations,
      totalCount: allTranslations.length,
      unknownClasses: classNames.filter((className) => {
        const baseClass = this.getBaseClass(className)
        return (
          this.isTailwindClass(className) &&
          !this.mappings[baseClass] &&
          !this.isArbitraryValue(baseClass)
        )
      }),
    }
  }
}