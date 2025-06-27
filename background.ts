// Background service worker for Tailwind Class Translator
chrome.runtime.onInstalled.addListener(async (details) => {
  console.log('🚀 Tailwind Class Translator installed', details)
  console.log('📱 Per-tab state management enabled - each tab starts inactive')
})

// Handle messages from content scripts or popup
chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  console.log('📨 Background received message:', request)
  
  if (request.action === 'getSelectedElement') {
    // This can be used for future DevTools integration
    sendResponse({ success: true })
  }
  
  // Keep the message channel open for async responses
  return true
})

// Handle tab updates - new tabs should start as inactive
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    try {
      // Only handle http/https pages
      if (tab.url.startsWith('http://') || tab.url.startsWith('https://')) {
        // Small delay to ensure content script is loaded
        setTimeout(() => {
          chrome.tabs.sendMessage(tabId, {
            action: 'toggleTranslation',
            isActive: false // Always start new tabs as inactive
          }).catch(() => {
            // Ignore errors if content script isn't ready yet
          })
        }, 500)
      }
    } catch (error) {
      // Ignore errors for tabs that don't support content scripts
    }
  }
})

// Storage changes no longer sync across all tabs - each tab manages its own state
// This listener is kept for future extensibility but doesn't sync across tabs

export {}