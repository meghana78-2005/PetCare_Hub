import { useState, useEffect } from "react";
import NavBarComp from "../Components/NavBarComp";
import SimbaAssistant from "../Components/SimbaAssistant";
import "./NotificationSettings.css";

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    vaccineReminder: true,
    communityNotifications: true,
    appointmentAlerts: true
  });

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('notificationSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  const handleToggle = (key) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key]
    };
    setSettings(newSettings);
    localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
  };

  return (
    <div className="notification-settings">
      <NavBarComp />
      <main className="notification-settings-shell">
        <div className="notification-settings-section">
          <div className="page-header">
            <h1>🔔 Notification Settings</h1>
            <p>Manage your notification preferences</p>
          </div>

          <div className="settings-container">
            <div className="setting-card">
              <div className="setting-info">
                <h3>💉 Vaccine Reminders</h3>
                <p>Get notified when your pet's vaccines are due</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.vaccineReminder}
                  onChange={() => handleToggle('vaccineReminder')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-card">
              <div className="setting-info">
                <h3>👥 Community Notifications</h3>
                <p>Get notified about new posts and updates</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.communityNotifications}
                  onChange={() => handleToggle('communityNotifications')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-card">
              <div className="setting-info">
                <h3>📅 Appointment Alerts</h3>
                <p>Get reminders for upcoming vet appointments</p>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={settings.appointmentAlerts}
                  onChange={() => handleToggle('appointmentAlerts')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>

          <div className="settings-info">
            <h3>ℹ️ About Notifications</h3>
            <ul>
              <li>Vaccine reminders check due dates within 3 days</li>
              <li>Community notifications alert for new posts</li>
              <li>Appointment alerts remind you of upcoming visits</li>
              <li>Settings are saved automatically</li>
            </ul>
          </div>
        </div>
      </main>
      
      <SimbaAssistant 
        pageName="notification-settings" 
        onDismiss={() => {}} 
      />
    </div>
  );
};

export default NotificationSettings;
