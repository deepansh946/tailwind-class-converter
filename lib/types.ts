export interface TailwindMapping {
  property: string
  value: string
}

export interface TailwindMappings {
  [className: string]: TailwindMapping
}

export interface TranslationResult {
  class: string
  property: string
  value: string
  category: string
  prefixes: ClassPrefixes
  isCustom?: boolean
}

export interface ClassPrefixes {
  responsive: string | null
  state: string | null
}

export interface GroupedTranslations {
  [category: string]: TranslationResult[]
}

export interface TranslationOutput {
  translations: TranslationResult[]
  grouped: GroupedTranslations
  totalCount: number
  unknownClasses: string[]
}

export interface MappingStats {
  total: number
  categories: Record<string, number>
  breakdown: Array<{
    category: string
    count: number
    percentage: number
  }>
  version: string
  lastUpdated: string
  source?: string
}

export interface CacheConfig {
  key: string
  versionKey: string
  expiryKey: string
  expiryHours: number
  currentVersion: string
}

export type CategoryType = 
  | "Layout"
  | "Spacing" 
  | "Typography"
  | "Colors"
  | "Sizing"
  | "Borders"
  | "Effects"
  | "Positioning"
  | "Media"
  | "Other"