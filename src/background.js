// Background service worker for Tailwind Class Translator
chrome.runtime.onInstalled.addListener((details) => {
    console.log('Tailwind Class Translator installed', details);
});

// Handle messages from content scripts or DevTools
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getSelectedElement') {
        // This will be used to communicate between DevTools and content script
        sendResponse({ success: true });
    }
    
    return true; // Keep the message channel open for async responses
}); 