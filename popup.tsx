import { useState, useEffect } from "react";

function IndexPopup() {
  const [isActive, setIsActive] = useState(false);

  // Get initial status when popup opens
  useEffect(() => {
    const getStatus = async () => {
      try {
        const [tab] = await chrome.tabs.query({
          active: true,
          currentWindow: true,
        });

        if (tab.id) {
          const response = await chrome.tabs.sendMessage(tab.id, {
            name: "getStatus",
          });
          if (response && response.isActive !== undefined) {
            setIsActive(response.isActive);
          }
        }
      } catch (error) {
        // Silently handle errors when content script is not available
      }
    };
    getStatus();
  }, []);

  const toggleTranslator = async () => {
    try {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab.id) {
        const response = await chrome.tabs.sendMessage(tab.id, {
          name: "toggleTranslator",
        });

        if (response && response.success) {
          setIsActive(response.isActive);
        }
      }
    } catch (error) {
      // Silently handle errors when content script is not available
    }
  };

  return (
    <div style={{ width: "300px", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "18px", color: "#374151", margin: "0 0 8px 0" }}>
          🎨 Tailwind Class Translator
        </h1>
        <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
          Hover over elements to see CSS translations
        </p>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          padding: "12px",
          background: "#f9fafb",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            marginRight: "8px",
            background: isActive ? "#10b981" : "#ef4444",
          }}
        />
        <span style={{ color: "#374151" }}>
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      <button
        onClick={toggleTranslator}
        style={{
          width: "100%",
          padding: "12px",
          border: "none",
          borderRadius: "6px",
          fontSize: "14px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
          background: isActive ? "#ef4444" : "#3b82f6",
          color: "white",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isActive ? "#dc2626" : "#2563eb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isActive ? "#ef4444" : "#3b82f6";
        }}
      >
        {isActive ? "Deactivate" : "Activate"}
      </button>
    </div>
  );
}

export default IndexPopup;
