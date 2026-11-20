
import { useState } from "react";
import {
  FiSettings,
  FiBell,
  FiMoon,
  FiSun,
  FiLock,
  FiMonitor
} from "react-icons/fi";
import "./Settings.css";

function getSavedSettings() {
  try {
    const savedSettings = localStorage.getItem("portalSettings");

    return savedSettings
      ? JSON.parse(savedSettings)
      : {};
  } catch (error) {
    console.error("Unable to load settings:", error);
    return {};
  }
}

function Settings() {
  const [initialSettings] = useState(getSavedSettings);

  const [notifications, setNotifications] = useState(
    initialSettings.notifications ?? true
  );
  const [darkMode, setDarkMode] = useState(
    initialSettings.darkMode ?? false
  );
  const [compactView, setCompactView] = useState(
    initialSettings.compactView ?? false
  );

  const handleSave = () => {
    const settings = {
      notifications,
      darkMode,
      compactView
    };

    try {
      localStorage.setItem("portalSettings", JSON.stringify(settings));
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Unable to save settings:", error);
      alert("Unable to save settings.");
    }
  };

  return (
    <div className="settings-page">
      <div className="settings-heading">
        <h2>Settings</h2>
        <p>Manage your application preferences</p>
      </div>

      <div className="settings-card">
        <div className="settings-section-title">
          <FiBell />
          <h3>Notifications</h3>
        </div>

        <div className="settings-option">
          <div>
            <strong>Email Notifications</strong>
            <p>Receive notification updates</p>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
          />
        </div>

        <div className="settings-divider"></div>

        <div className="settings-section-title">
          {darkMode ? <FiMoon /> : <FiSun />}
          <h3>Appearance</h3>
        </div>

        <div className="settings-option">
          <div>
            <strong>Dark Mode Preference</strong>
            <p>Save your preferred appearance setting</p>
          </div>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </div>

        <div className="settings-divider"></div>

        <div className="settings-section-title">
          <FiMonitor />
          <h3>Display</h3>
        </div>

        <div className="settings-option">
          <div>
            <strong>Compact View</strong>
            <p>Prefer a more compact display layout</p>
          </div>
          <input
            type="checkbox"
            checked={compactView}
            onChange={(e) => setCompactView(e.target.checked)}
          />
        </div>

        <div className="settings-divider"></div>

        <div className="settings-section-title">
          <FiLock />
          <h3>Account</h3>
        </div>

        <div className="settings-option">
          <div>
            <strong>Account Security</strong>
            <p>Authentication features will be configured later</p>
          </div>
        </div>

        <div className="settings-actions">
          <button onClick={handleSave}>
            <FiSettings /> Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
