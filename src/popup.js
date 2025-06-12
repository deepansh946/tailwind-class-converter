// Popup script for Tailwind Class Translator
document.addEventListener('DOMContentLoaded', async function() {
    const toggleButton = document.getElementById('toggleTranslation');
    const statusDiv = document.getElementById('status');
    
    // Get current state from storage
    let isActive = false;
    try {
        const result = await chrome.storage.local.get(['translationActive']);
        isActive = result.translationActive || false;
    } catch (error) {
        console.error('Error getting storage:', error);
    }
    
    // Update UI based on current state
    updateUI(isActive);
    
    toggleButton.addEventListener('click', async function() {
        isActive = !isActive;
        
        // Save state to storage
        try {
            await chrome.storage.local.set({ translationActive: isActive });
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
        
        // Send message to content script
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.tabs.sendMessage(tab.id, {
                action: 'toggleTranslation',
                isActive: isActive
            });
        } catch (error) {
            console.error('Error sending message to content script:', error);
        }
        
        updateUI(isActive);
    });
    
    function updateUI(active) {
        if (active) {
            toggleButton.textContent = '🟢 Deactivate Translation Mode';
            toggleButton.className = 'action-button active';
            statusDiv.innerHTML = 'Translation mode is <strong>active</strong>';
            statusDiv.className = 'status active';
        } else {
            toggleButton.textContent = '🔴 Activate Translation Mode';
            toggleButton.className = 'action-button inactive';
            statusDiv.innerHTML = 'Translation mode is <strong>inactive</strong>';
            statusDiv.className = 'status';
        }
    }
}); 