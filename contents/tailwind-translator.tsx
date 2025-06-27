import type { PlasmoCSConfig } from "plasmo"

import { TailwindTranslator } from "../lib/tailwind-translator"
import type { TranslationOutput } from "../lib/types"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"],
  all_frames: false,
  run_at: "document_end"
}

class TailwindTranslatorContentScript {
  private translator: TailwindTranslator | null = null
  private isTranslationActive = false
  private currentTooltip: HTMLElement | null = null
  private hoveredElement: HTMLElement | null = null
  private hoverTimeout: NodeJS.Timeout | null = null
  private highlightedElement: HTMLElement | null = null

  constructor() {
    this.initializeTranslator()
    this.setupMessageListener()
    this.checkInitialState()
  }

  private async initializeTranslator(): Promise<void> {
    try {
      console.log("🚀 Initializing Tailwind Translator...")
      
      const initStart = performance.now()
      this.translator = new TailwindTranslator()
      const initTime = performance.now() - initStart
      
      console.log(`✅ Tailwind Translator initialized successfully in ${initTime.toFixed(2)}ms`)
      
      this.injectHighlightStyles()
    } catch (error) {
      console.error("❌ Error initializing translator:", error)
    }
  }

  private setupMessageListener(): void {
    chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
      if (request.action === "toggleTranslation") {
        if (request.isActive) {
          this.activateTranslation()
          sendResponse({ status: "activated" })
        } else {
          this.deactivateTranslation()
          sendResponse({ status: "deactivated" })
        }
      } else if (request.action === "getStatus") {
        sendResponse({ isActive: this.isTranslationActive })
      }
    })
  }

  private async checkInitialState(): Promise<void> {
    // New tabs start as inactive by default
    // Users must explicitly activate translation mode per tab
    console.log("📱 New tab - translation mode inactive by default")
  }

  private activateTranslation(): void {
    if (this.isTranslationActive) return

    this.isTranslationActive = true
    console.log("✅ Translation mode activated")

    document.addEventListener("mouseover", this.handleMouseOver, true)
    document.addEventListener("mouseout", this.handleMouseOut, true)
    document.addEventListener("scroll", this.hideTooltip, true)
    window.addEventListener("resize", this.hideTooltip)
  }

  private deactivateTranslation(): void {
    if (!this.isTranslationActive) return

    this.isTranslationActive = false
    console.log("❌ Translation mode deactivated")

    document.removeEventListener("mouseover", this.handleMouseOver, true)
    document.removeEventListener("mouseout", this.handleMouseOut, true)
    document.removeEventListener("scroll", this.hideTooltip, true)
    window.removeEventListener("resize", this.hideTooltip)

    this.hideTooltip()
    this.removeElementHighlight()
  }

  private handleMouseOver = (event: MouseEvent): void => {
    if (!this.isTranslationActive || !this.translator) return

    const element = event.target as HTMLElement

    // Skip if hovering over the tooltip itself
    if (element.closest(".tailwind-translator-tooltip")) {
      return
    }

    // Skip if this is the same element we're already hovering
    if (this.hoveredElement === element) {
      return
    }

    // Clear existing timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = null
    }

    // Get element classes and filter for Tailwind classes
    const classes = this.getElementClasses(element)
    const tailwindClasses = this.filterTailwindClasses(classes)

    if (tailwindClasses.length === 0) {
      this.cleanupHoverState()
      return
    }

    // Update hovered element and highlight immediately
    this.hoveredElement = element
    this.highlightElement(element)

    // Show tooltip after delay
    this.hoverTimeout = setTimeout(() => {
      if (this.hoveredElement === element) {
        this.showTooltip(element, tailwindClasses, event)
      }
    }, 250)
  }

  private handleMouseOut = (event: MouseEvent): void => {
    if (!this.isTranslationActive) return

    // Clear timeout
    if (this.hoverTimeout) {
      clearTimeout(this.hoverTimeout)
      this.hoverTimeout = null
    }

    // Check if we're moving to the tooltip
    const relatedTarget = event.relatedTarget as HTMLElement
    if (relatedTarget?.closest(".tailwind-translator-tooltip")) {
      return
    }

    // Clean up with short delay
    setTimeout(() => {
      if (this.hoveredElement === event.target) {
        this.cleanupHoverState()
      }
    }, 75)
  }

  private getElementClasses(element: HTMLElement): string[] {
    return Array.from(element.classList)
  }

  private filterTailwindClasses(classes: string[]): string[] {
    if (!this.translator) return []
    return classes.filter((className) => this.translator!.isTailwindClass(className))
  }


  private cleanupHoverState(): void {
    this.hideTooltip()
    this.removeElementHighlight()
    this.hoveredElement = null
  }

  private showTooltip(element: HTMLElement, tailwindClasses: string[], mouseEvent: MouseEvent): void {
    if (!this.translator || this.hoveredElement !== element) return

    this.hideTooltip()

    const translationResult = this.translator.translateClasses(tailwindClasses)
    
    // Don't show tooltip if no valid translations found
    if (translationResult.totalCount === 0) return

    this.currentTooltip = this.createTooltipElement(element, translationResult)
    document.body.appendChild(this.currentTooltip)

    this.positionTooltip(this.currentTooltip, mouseEvent)

    // Add hover listeners to keep tooltip visible
    this.currentTooltip.addEventListener("mouseenter", () => {
      if (this.hoverTimeout) {
        clearTimeout(this.hoverTimeout)
        this.hoverTimeout = null
      }
    })

    this.currentTooltip.addEventListener("mouseleave", () => {
      this.hideTooltip()
      this.removeElementHighlight()
    })
  }

  private createTooltipElement(element: HTMLElement, translationResult: TranslationOutput): HTMLElement {
    const tooltip = document.createElement("div")
    tooltip.className = "tailwind-translator-tooltip"

    const elementInfo = `<${element.tagName.toLowerCase()}${element.id ? ` id="${element.id}"` : ""}>`
    const allClasses = Array.from(element.classList)

    let html = `
      <div class="tooltip-header">
        <div class="element-tag">${elementInfo}</div>
        <div class="class-count">${translationResult.totalCount} Tailwind classes</div>
      </div>
      <div class="all-classes-section">
        <div class="section-header">
          <span class="section-icon">🏷️</span>
          <span class="section-title">All Classes Applied (${allClasses.length})</span>
        </div>
        <div class="all-classes-container">
    `

    if (allClasses.length > 0) {
      allClasses.forEach(className => {
        const isTailwind = translationResult.translations.some(t => t.class === className)
        const classType = isTailwind ? 'tailwind-class' : 'non-tailwind-class'
        const onClickAction = isTailwind ? `onclick="window.highlightTailwindClass('${className}')"` : ''
        const title = isTailwind ? 'Tailwind CSS class - Click to highlight in page' : 'Custom/framework class'
        html += `<span class="class-tag ${classType}" ${onClickAction} title="${title}" style="${isTailwind ? 'cursor: pointer;' : ''}">${className}</span>`
      })
    } else {
      html += '<span class="no-classes">No classes applied</span>'
    }
    
    html += `
        </div>
      </div>
    `

    // Group translations by category
    const categoryOrder = [
      "Layout", "Spacing", "Typography", "Colors", 
      "Sizing", "Borders", "Effects", "Positioning", "Media", "Other"
    ]

    for (const category of categoryOrder) {
      if (!translationResult.grouped[category]) continue

      const categoryTranslations = translationResult.grouped[category]
      html += `
        <div class="tooltip-category">
          <div class="category-header">${this.getCategoryIcon(category)} ${category}</div>
          <div class="category-properties">
      `

      categoryTranslations.forEach((translation) => {
        const prefixInfo = this.getPrefixInfo(translation.prefixes)
        const customIndicator = translation.isCustom
          ? '<span class="custom-indicator">custom</span>'
          : ""
        html += `
          <div class="css-property">
            ${prefixInfo}
            <span class="property-name">${translation.property}:</span>
            <span class="property-value">${translation.value}</span>
            ${customIndicator}
          </div>
        `
      })

      html += `
          </div>
        </div>
      `
    }

    tooltip.innerHTML = html
    this.addTooltipStyles(tooltip)

    return tooltip
  }

  private getCategoryIcon(category: string): string {
    const icons: Record<string, string> = {
      Layout: "📐",
      Spacing: "📏",
      Typography: "✍️",
      Colors: "🎨",
      Sizing: "📐",
      Borders: "🔲",
      Effects: "✨",
      Positioning: "📍",
      Media: "📱",
      Other: "⚙️",
    }
    return icons[category] || "•"
  }

  private getPrefixInfo(prefixes: { responsive: string | null; state: string | null }): string {
    let info = ""
    if (prefixes.responsive) {
      info += `<span class="responsive-prefix">${prefixes.responsive}</span>`
    }
    if (prefixes.state) {
      info += `<span class="state-prefix">${prefixes.state}</span>`
    }
    return info
  }

  private addTooltipStyles(tooltip: HTMLElement): void {
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
    `

    tooltip.style.cssText = styles

    // Add internal styles if not already present
    if (!document.getElementById('tailwind-translator-tooltip-styles')) {
      const styleSheet = document.createElement("style")
      styleSheet.id = 'tailwind-translator-tooltip-styles'
      styleSheet.textContent = this.getTooltipInternalStyles()
      document.head.appendChild(styleSheet)
    }
  }

  private getTooltipInternalStyles(): string {
    return `
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
      
      .tailwind-translator-tooltip .all-classes-section {
        border-bottom: 1px solid #374151;
        background: #1f2937;
      }
      
      .tailwind-translator-tooltip .section-header {
        padding: 8px 12px;
        background: #374151;
        font-size: 11px;
        font-weight: 600;
        color: #d1d5db;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .tailwind-translator-tooltip .section-icon {
        font-size: 12px;
      }
      
      .tailwind-translator-tooltip .all-classes-container {
        padding: 10px 12px;
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
        max-height: 120px;
        overflow-y: auto;
        scrollbar-width: thin;
        scrollbar-color: #4b5563 #1f2937;
      }
      
      .tailwind-translator-tooltip .class-tag {
        display: inline-block;
        padding: 2px 6px;
        border-radius: 4px;
        font-size: 10px;
        font-weight: 500;
        font-family: 'SF Mono', Monaco, monospace;
        cursor: default;
        transition: all 0.2s ease;
        user-select: none;
      }
      
      .tailwind-translator-tooltip .class-tag.tailwind-class {
        background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%);
        color: #dbeafe;
        border: 1px solid #3b82f6;
        position: relative;
        cursor: pointer;
      }
      
      .tailwind-translator-tooltip .class-tag.tailwind-class::before {
        content: '⚡';
        position: absolute;
        top: -2px;
        right: -2px;
        font-size: 8px;
        background: #10b981;
        border-radius: 50%;
        width: 12px;
        height: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.8;
      }
      
      .tailwind-translator-tooltip .class-tag.tailwind-class:hover {
        background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
      }
      
      .tailwind-translator-tooltip .class-tag.non-tailwind-class {
        background: linear-gradient(135deg, #374151 0%, #4b5563 100%);
        color: #d1d5db;
        border: 1px solid #4b5563;
        opacity: 0.8;
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
    `
  }

  private positionTooltip(tooltip: HTMLElement, mouseEvent: MouseEvent): void {
    const rect = tooltip.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let x = mouseEvent.clientX + 15
    let y = mouseEvent.clientY + 15

    // Adjust if tooltip would go off screen
    if (x + rect.width > viewportWidth) {
      x = mouseEvent.clientX - rect.width - 15
    }

    if (y + rect.height > viewportHeight) {
      y = mouseEvent.clientY - rect.height - 15
    }

    // Ensure minimum margins
    x = Math.max(10, Math.min(x, viewportWidth - rect.width - 10))
    y = Math.max(10, Math.min(y, viewportHeight - rect.height - 10))

    tooltip.style.left = x + "px"
    tooltip.style.top = y + "px"
  }

  private hideTooltip = (): void => {
    if (this.currentTooltip) {
      this.currentTooltip.remove()
      this.currentTooltip = null
    }
  }

  private highlightElement(element: HTMLElement): void {
    this.removeElementHighlight()
    
    if (!element || element === document.body || element === document.documentElement) {
      return
    }
    
    element.classList.add('tailwind-translator-highlight')
    this.highlightedElement = element
  }

  private removeElementHighlight(): void {
    if (this.highlightedElement) {
      this.highlightedElement.classList.remove('tailwind-translator-highlight')
      this.highlightedElement = null
    }
  }

  private injectHighlightStyles(): void {
    if (document.getElementById('tailwind-translator-highlight-styles')) {
      return
    }
    
    const styleElement = document.createElement('style')
    styleElement.id = 'tailwind-translator-highlight-styles'
    styleElement.textContent = `
      .tailwind-translator-highlight {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 1px !important;
        background-color: rgba(59, 130, 246, 0.05) !important;
        transition: all 0.15s ease-in-out !important;
        position: relative !important;
      }
      
      .tailwind-translator-highlight::before {
        content: '';
        position: absolute !important;
        top: -1px !important;
        left: -1px !important;
        right: -1px !important;
        bottom: -1px !important;
        background: rgba(59, 130, 246, 0.1) !important;
        pointer-events: none !important;
        border-radius: inherit !important;
        z-index: 999998 !important;
      }
    `
    
    document.head.appendChild(styleElement)
  }
}

// Global function for highlighting specific classes
declare global {
  interface Window {
    highlightTailwindClass: (className: string) => void
  }
}

window.highlightTailwindClass = function(className: string) {
  // Remove any existing class highlights
  const existingHighlights = document.querySelectorAll('.tailwind-class-highlighted')
  existingHighlights.forEach(element => {
    element.classList.remove('tailwind-class-highlighted')
  })
  
  // Find all elements with this specific class
  const elementsWithClass = document.querySelectorAll(`.${CSS.escape(className)}`)
  
  if (elementsWithClass.length === 0) {
    console.log(`No elements found with class: ${className}`)
    return
  }
  
  // Add highlight to all matching elements
  elementsWithClass.forEach(element => {
    element.classList.add('tailwind-class-highlighted')
  })
  
  console.log(`Highlighted ${elementsWithClass.length} element(s) with class: ${className}`)
  
  // Auto-clear after 5 seconds
  setTimeout(() => {
    elementsWithClass.forEach(element => {
      element.classList.remove('tailwind-class-highlighted')
    })
  }, 5000)
}

// Initialize the content script
new TailwindTranslatorContentScript()