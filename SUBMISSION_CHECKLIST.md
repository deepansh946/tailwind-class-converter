# Chrome Web Store Submission Checklist

## ✅ Completed Items
- [x] Extension built with icons (build/chrome-mv3-prod/ contains all required icon sizes)
- [x] Detailed description meets 25+ character requirement (STORE_DESCRIPTION.md)
- [x] Privacy justifications documented (PRIVACY_JUSTIFICATIONS.md)

## 📋 Required Actions on Chrome Web Store Dashboard

### Privacy Practices Tab
Copy the following justifications from PRIVACY_JUSTIFICATIONS.md:

**Single Purpose Description:**
"This extension translates Tailwind CSS utility classes into readable CSS properties to help developers debug and understand Tailwind code faster."

**activeTab Permission:**
"Required to access the current tab's DOM to detect and translate Tailwind CSS classes for real-time debugging assistance."

**Host Permission (<all_urls>):**
"Required to work on all websites where developers need to debug Tailwind CSS, including local development sites and production websites."

**Storage Permission:**
"Used to save user preferences like tooltip position and display options. No personal data collected."

**Remote Code Usage:**
"This extension does NOT use remote code. All functionality is contained within the extension package."

**Data Usage Compliance:**
Check the certification box confirming compliance with Developer Program Policies.

### Item Details Tab
- **Category:** Select "Developer Tools"
- **Language:** Select your primary language (e.g., "English")
- **Detailed Description:** Copy from STORE_DESCRIPTION.md (sections 9-67)

### Media Tab
**Required Screenshots/Videos:**
1. Extension popup interface showing activation toggle
2. Tooltip displaying categorized CSS translations when hovering
3. Element highlighting showing active translation
4. Media query breakpoint translations example
5. Before/after comparison of complex Tailwind classes

**Icon Upload:**
Use: `build/chrome-mv3-prod/icon128.plasmo.3c1ed2d2.png`

### Account Tab
- Add your contact email address
- Complete email verification process

## 📱 Recommended Categories
Primary: **Developer Tools**
Secondary: **Productivity**

## 🌐 Recommended Languages
- English (primary)
- Add others if you plan to localize

## 📸 Screenshot Requirements
- Minimum 1280x800 pixels
- Show actual extension functionality
- Include before/after examples
- Highlight key features from description