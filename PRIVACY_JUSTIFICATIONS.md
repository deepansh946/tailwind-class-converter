# Privacy Practices & Justifications

## Single Purpose Description
This extension translates Tailwind CSS utility classes into readable CSS properties to help developers debug and understand Tailwind code faster.

## Permission Justifications

### activeTab Permission
**Usage:** Required to access the current tab's DOM to detect and translate Tailwind CSS classes.
**Justification:** The extension needs to read HTML elements and their CSS classes on the active tab to provide real-time translation of Tailwind utilities. This permission is essential for the core functionality of hovering over elements and displaying their CSS translations.

### storage Permission  
**Usage:** Used to save user preferences and settings such as tooltip position, display options, and activation state.
**Justification:** Stores user preferences locally to maintain consistent experience across browser sessions. No personal data is collected - only extension settings like tooltip positioning and display preferences.

### host_permissions (<all_urls>)
**Usage:** Required to inject content scripts and access DOM elements on all websites where users want to translate Tailwind classes.
**Justification:** Users need to debug and understand Tailwind CSS on any website they visit - including local development sites, production websites, and documentation. The extension must work across all URLs to be useful for developers working on various projects.

## Remote Code Usage
**Statement:** This extension does NOT use remote code. All functionality is contained within the extension package.
**Justification:** The extension operates entirely locally, reading CSS class names from the DOM and translating them using a built-in Tailwind CSS mapping. No external APIs, CDNs, or remote resources are accessed.

## Data Collection & Usage
- **No personal data collected**
- **No analytics or tracking**
- **No data transmitted to external servers**
- **Settings stored locally in browser storage only**
- **No user accounts or authentication required**

## Compliance Statement
This extension complies with Chrome Web Store Developer Program Policies:
- Operates with minimal permissions necessary for functionality
- Transparent about data usage (none collected)
- No misleading functionality or hidden features
- Respects user privacy and security