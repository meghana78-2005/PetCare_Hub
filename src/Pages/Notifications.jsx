import { useState, useEffect } from "react";
import NavBarComp from "../Components/NavBarComp";
import SimbaAssistant from "../Components/SimbaAssistant";
import BackButton from "../Components/BackButton/BackButton";
import { getNotifications, markNotificationAsRead } from "../Utils/NotificationUtils";
import "./Notifications.css";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Load notifications from NotificationUtils
    const loadNotifications = () => {
      const data = getNotifications();
      setNotifications(data);
    };

    loadNotifications();
    
    // Listen for new notifications
    const handleNewNotification = () => loadNotifications();
    window.addEventListener('newNotification', handleNewNotification);
    
    return () => window.removeEventListener('newNotification', handleNewNotification);
  }, []);

  const handleMarkAsRead = (id) => {
    markNotificationAsRead(id);
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleClearAll = () => {
    localStorage.setItem('notifications', JSON.stringify([]));
    setNotifications([]);
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now - then) / 1000);
    
    if (diffInSeconds < 60) return "just now";
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="notifications-page">
      <NavBarComp />
      <main className="notifications-shell">
        <div className="notifications-section">
          <div className="notifications-header">
            <BackButton label="Back" />
            <button className="clear-all-btn" onClick={handleClearAll}>
              Clear All
            </button>
          </div>
          <div className="page-header">
            <h1>🐾 Pet Alerts & Notifications 🐾</h1>
            <p>Your history of vaccines, updates, and more.</p>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <span className="no-notif-icon">📭</span>
                <p>No new alerts at the moment!</p>
              </div>
            ) : (
              notifications.map((notif) => (
                <div 
                  key={notif.id} 
                  className={`notification-card ${notif.read ? 'read' : 'unread'}`}
                  onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                >
                  <div className="notif-icon-circle">
                    {notif.type === 'vaccine' ? '💉' : 
                     notif.type === 'community' ? '💬' : 
                     notif.type === 'appointment' ? '📅' : '🐾'}
                  </div>
                  <div className="notif-content">
                    <h3>{notif.title}</h3>
                    <p>{notif.message}</p>
                    <span className="notif-time">{getTimeAgo(notif.timestamp)}</span>
                  </div>
                  {!notif.read && <div className="unread-dot"></div>}
                </div>
              ))
            )}
          </div>
        </div>
      </main>
      
      <SimbaAssistant 
        pageName="notifications" 
        onDismiss={() => {}} 
      />
    </div>
  );
};

export default Notifications;
