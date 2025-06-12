import { TailwindTranslator } from "./tailwind-translator";

class TailwindClassTranslator {
  private isActive = false;
  private translator: TailwindTranslator;
  private tooltip: HTMLDivElement | null = null;
  private highlightedElement: Element | null = null;
  private cache = new Map<string, any>();

  constructor() {
    this.translator = new TailwindTranslator();
    this.init();
  }

  private init() {
    this.createTooltip();
    this.setupEventListeners();
    this.injectStyles();
  }

  private createTooltip() {
    this.tooltip = document.createElement("div");
    this.tooltip.id = "tailwind-translator-tooltip";
    this.tooltip.style.cssText = `
      position: fixed;
      z-index: 10000;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      padding: 12px;
      max-width: 400px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 14px;
      line-height: 1.4;
      display: none;
      pointer-events: none;
    `;
    document.body.appendChild(this.tooltip);
  }

  private setupEventListeners() {
    document.addEventListener("mouseover", this.handleMouseOver.bind(this));
    document.addEventListener("mouseout", this.handleMouseOut.bind(this));
    document.addEventListener("mousemove", this.handleMouseMove.bind(this));
  }

  private injectStyles() {
    const style = document.createElement("style");
    style.textContent = `
      .tailwind-highlight {
        outline: 2px solid #3b82f6 !important;
        outline-offset: 2px !important;
        box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1) !important;
        transition: outline 0.2s ease, box-shadow 0.2s ease !important;
      }
    `;
    document.head.appendChild(style);
  }

  public toggleTranslator() {
    this.isActive = !this.isActive;

    if (!this.isActive) {
      this.hideTooltip();
      this.removeHighlight();
    }
  }

  public getStatus() {
    return this.isActive;
  }

  private handleMouseOver(event: MouseEvent) {
    if (!this.isActive) return;

    const element = event.target as Element;
    if (this.hasTailwindClasses(element)) {
      this.highlightElement(element);
      this.showTooltip(element, event);
    }
  }

  private handleMouseOut(event: MouseEvent) {
    if (!this.isActive) return;
    this.removeHighlight();
    this.hideTooltip();
  }

  private handleMouseMove(event: MouseEvent) {
    if (
      !this.isActive ||
      !this.tooltip?.style.display ||
      this.tooltip.style.display === "none"
    )
      return;

    const x = event.clientX + 10;
    const y = event.clientY + 10;

    const tooltipRect = this.tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let finalX = x;
    let finalY = y;

    if (x + tooltipRect.width > viewportWidth) {
      finalX = x - tooltipRect.width - 20;
    }

    if (y + tooltipRect.height > viewportHeight) {
      finalY = y - tooltipRect.height - 20;
    }

    this.tooltip.style.left = finalX + "px";
    this.tooltip.style.top = finalY + "px";
  }

  private hasTailwindClasses(element: Element): boolean {
    if (!element || !element.className) return false;

    const classes = element.className.split(" ").filter((cls) => cls.trim());
    return classes.some((cls) => this.translator.isTailwindClass(cls));
  }

  private highlightElement(element: Element) {
    this.removeHighlight();
    this.highlightedElement = element;
    element.classList.add("tailwind-highlight");
  }

  private removeHighlight() {
    if (this.highlightedElement) {
      this.highlightedElement.classList.remove("tailwind-highlight");
      this.highlightedElement = null;
    }
  }

  private showTooltip(element: Element, event: MouseEvent) {
    const classes = element.className.split(" ").filter((cls) => cls.trim());
    const tailwindClasses = classes.filter((cls) =>
      this.translator.isTailwindClass(cls)
    );

    if (tailwindClasses.length === 0) return;

    const cacheKey = tailwindClasses.sort().join(" ");
    let translations;

    if (this.cache.has(cacheKey)) {
      translations = this.cache.get(cacheKey);
    } else {
      translations = this.translator.translateClasses(tailwindClasses);
      this.cache.set(cacheKey, translations);
    }

    this.updateTooltipContent(translations, tailwindClasses);
    this.positionTooltip(event);
    if (this.tooltip) {
      this.tooltip.style.display = "block";
    }
  }

  private updateTooltipContent(translations: any, originalClasses: string[]) {
    if (!this.tooltip) return;

    const header = document.createElement("div");
    header.style.cssText = `
      font-weight: 600;
      color: #374151;
      margin-bottom: 8px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e5e7eb;
    `;
    header.textContent = `Tailwind Classes: ${originalClasses.join(" ")}`;

    const content = document.createElement("div");

    if (translations.totalCount === 0) {
      content.innerHTML =
        '<div style="color: #6b7280; font-style: italic;">No valid Tailwind classes found</div>';
    } else {
      Object.entries(translations.grouped).forEach(
        ([category, classTranslations]: [string, any]) => {
          const categoryDiv = document.createElement("div");
          categoryDiv.style.cssText = `
            margin-bottom: 12px;
          `;

          const categoryTitle = document.createElement("div");
          categoryTitle.style.cssText = `
            font-weight: 600;
            color: #059669;
            margin-bottom: 4px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
          `;
          categoryTitle.textContent = category;

          const translationsList = document.createElement("div");
          translationsList.style.cssText = `
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 12px;
            color: #374151;
          `;

          classTranslations.forEach((translation: any) => {
            const translationDiv = document.createElement("div");
            translationDiv.style.cssText = `
              margin-bottom: 2px;
              padding: 2px 4px;
              background: #f9fafb;
              border-radius: 3px;
            `;
            translationDiv.textContent = `${translation.property}: ${translation.value}`;
            translationsList.appendChild(translationDiv);
          });

          categoryDiv.appendChild(categoryTitle);
          categoryDiv.appendChild(translationsList);
          content.appendChild(categoryDiv);
        }
      );
    }

    this.tooltip.innerHTML = "";
    this.tooltip.appendChild(header);
    this.tooltip.appendChild(content);
  }

  private positionTooltip(event: MouseEvent) {
    if (!this.tooltip) return;

    const x = event.clientX + 10;
    const y = event.clientY + 10;

    this.tooltip.style.left = x + "px";
    this.tooltip.style.top = y + "px";
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.tooltip.style.display = "none";
    }
  }
}

// Initialize the translator
const translator = new TailwindClassTranslator();

// Handle messages using standard Chrome messaging API
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.name === "toggleTranslator") {
    translator.toggleTranslator();
    const isActive = translator.getStatus();
    sendResponse({ success: true, isActive });
  } else if (request.name === "getStatus") {
    const isActive = translator.getStatus();
    sendResponse({ isActive });
  }

  return true; // Keep the message channel open for async response
});
