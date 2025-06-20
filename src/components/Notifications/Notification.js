import React, { useState, useEffect } from 'react';
import './Notification.css';

const Notification = ({ notifications }) => {
  const [visibleNotifications, setVisibleNotifications] = useState([]);

  useEffect(() => {
    setVisibleNotifications(notifications);
  }, [notifications]);

  const removeNotification = (id) => {
    setVisibleNotifications(prev => 
      prev.filter(notification => notification.id !== id)
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '📢';
    }
  };

  return (
    <div className="notification-container">
      {visibleNotifications.map(notification => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <span className="notification-icon">
              {getNotificationIcon(notification.type)}
            </span>
            <span className="notification-message">
              {notification.message}
            </span>
          </div>
          <button
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default Notification;
