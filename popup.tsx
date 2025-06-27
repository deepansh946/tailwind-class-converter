import { useState, useEffect } from "react"
import { Storage } from "@plasmohq/storage"

import "./popup.css"

function IndexPopup() {
  const [isActive, setIsActive] = useState(false)
  const [loading, setLoading] = useState(true)
  const storage = new Storage()

  useEffect(() => {
    loadInitialState()
  }, [])

  const loadInitialState = async () => {
    try {
      // Get current tab state instead of global state
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab.id) {
        // Ask the content script for its current state
        chrome.tabs.sendMessage(tab.id, { action: "getStatus" }, (response) => {
          if (response) {
            setIsActive(response.isActive || false)
          } else {
            setIsActive(false) // Default to inactive if no response
          }
          setLoading(false)
        })
      } else {
        setIsActive(false)
        setLoading(false)
      }
    } catch (error) {
      console.error("Error loading initial state:", error)
      setIsActive(false)
      setLoading(false)
    }
  }

  const toggleTranslation = async () => {
    const newState = !isActive

    try {
      // Send message to current tab only - no global storage
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
      if (tab.id) {
        chrome.tabs.sendMessage(tab.id, {
          action: "toggleTranslation",
          isActive: newState
        })
        setIsActive(newState)
      }
    } catch (error) {
      console.error("Error toggling translation:", error)
    }
  }

  if (loading) {
    return (
      <div className="popup-container">
        <div className="loading">Loading...</div>
      </div>
    )
  }

  return (
    <div className="popup-container">
      <div className="popup-header">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <h1 className="logo-title">Tailwind Translator</h1>
        </div>
        <div className="version">v2.0.0</div>
      </div>

      <div className="popup-content">
        <div className={`status ${isActive ? 'active' : ''}`}>
          <div className="status-indicator">
            <span className={`status-dot ${isActive ? 'active' : ''}`}></span>
            <span className="status-text">
              Translation mode is <strong>{isActive ? 'active' : 'inactive'}</strong>
            </span>
          </div>
        </div>

        <button 
          className={`toggle-button ${isActive ? 'active' : 'inactive'}`}
          onClick={toggleTranslation}
        >
          <span className="button-icon">
            {isActive ? '🟢' : '🔴'}
          </span>
          <span className="button-text">
            {isActive ? 'Deactivate' : 'Activate'} Translation Mode
          </span>
        </button>

        <div className="instructions">
          <h3>How to use:</h3>
          <ol>
            <li>Click the button above to activate translation mode</li>
            <li>Hover over any element with Tailwind classes</li>
            <li>View the CSS translations in the tooltip</li>
            <li>Click on Tailwind class tags to highlight all uses</li>
          </ol>
        </div>

        <div className="features">
          <h3>Features:</h3>
          <ul>
            <li>🎯 Real-time Tailwind class translation</li>
            <li>📊 Categorized CSS property display</li>
            <li>🔍 Element highlighting and inspection</li>
            <li>⚡ Arbitrary value syntax support</li>
            <li>📱 Responsive prefix detection</li>
            <li>🎨 State modifier support</li>
          </ul>
        </div>
      </div>

      <div className="popup-footer">
        <div className="links">
          <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer">
            Tailwind CSS
          </a>
          <span className="separator">•</span>
          <a href="https://github.com/yourusername/tailwind-class-translator" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </div>
      </div>
    </div>
  )
}

export default IndexPopup