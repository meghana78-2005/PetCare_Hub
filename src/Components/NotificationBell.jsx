import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./NotificationBell.css";

const NotificationBell = () => {
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    // Initialize notification count
    setNotificationCount(3); // Static count for now
    
    // Listen for custom notification events
    const handleNotification = () => {
      setNotificationCount(prev => prev + 1);
    };

    window.addEventListener('newNotification', handleNotification);
    
    return () => {
      window.removeEventListener('newNotification', handleNotification);
    };
  }, []);

  return (
    <Link to="/notification-settings" className="notification-bell">
      <div className="bell-icon">
        🔔
        {notificationCount > 0 && (
          <span className="notification-badge">{notificationCount > 99 ? '99+' : notificationCount}</span>
        )}
      </div>
    </Link>
  );
};

export default NotificationBell;
