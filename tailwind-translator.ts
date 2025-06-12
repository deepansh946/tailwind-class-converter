import { tailwindMappings } from "./tailwind-mappings";

export interface Translation {
  property: string;
  value: string;
  category: string;
}

export interface TranslationResult {
  totalCount: number;
  grouped: Record<string, Translation[]>;
}

export class TailwindTranslator {
  private mappings = tailwindMappings;

  public isTailwindClass(className: string): boolean {
    if (!className || typeof className !== "string") return false;

    const cleanClass = className.trim();
    if (!cleanClass) return false;

    return this.mappings.hasOwnProperty(cleanClass);
  }

  public translateClasses(classes: string[]): TranslationResult {
    const translations: Translation[] = [];

    for (const className of classes) {
      const cleanClass = className.trim();
      if (!cleanClass || !this.mappings[cleanClass]) continue;

      const mapping = this.mappings[cleanClass];
      if (Array.isArray(mapping)) {
        translations.push(...mapping);
      } else if (typeof mapping === "object") {
        translations.push(mapping);
      }
    }

    return this.groupTranslations(translations);
  }

  private groupTranslations(translations: Translation[]): TranslationResult {
    const grouped: Record<string, Translation[]> = {};

    for (const translation of translations) {
      const category = translation.category || "other";
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(translation);
    }

    return {
      totalCount: translations.length,
      grouped,
    };
  }

  public getSupportedClasses(): string[] {
    return Object.keys(this.mappings);
  }

  public getClassCount(): number {
    return Object.keys(this.mappings).length;
  }
}
