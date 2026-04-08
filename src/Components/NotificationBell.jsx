import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNotificationSettings } from "../Utils/NotificationUtils";
import "./NotificationBell.css";

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Get user's notification settings
    const settings = getNotificationSettings();
    
    // Initialize notification count based on actual notifications
    setNotificationCount(notifications.length);
    
    // Listen for custom notification events
    const handleNotification = (notification) => {
      setNotifications(prev => [...prev, notification]);
      setNotificationCount(prev => prev + 1);
    };
    
    window.addEventListener('newNotification', handleNotification);
    
    return () => {
      window.removeEventListener('newNotification', handleNotification);
    };
  }, []);

  // Only show notification badge if user has enabled notifications
  const settings = getNotificationSettings();
  const shouldShowBadge = settings.vaccineReminder || settings.communityNotifications || settings.appointmentAlerts;

  return (
    <div className="nav-notification-bell">
      <Link to="/notification-settings" className="notification-bell-link">
        <div className="bell-icon">
          🔔
          {shouldShowBadge && notificationCount > 0 && (
            <span className="notification-badge">{notificationCount > 99 ? '99+' : notificationCount}</span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default NotificationBell;
