// Notification Utilities for PetCare Hub

export const getNotificationSettings = () => {
  // Get notification settings from localStorage or return defaults
  const settings = localStorage.getItem('notificationSettings');
  return settings ? JSON.parse(settings) : {
    vaccineReminders: true,
    appointmentReminders: true,
    healthAlerts: true,
    communityUpdates: false,
    promotionalOffers: false
  };
};

export const updateNotificationSettings = (newSettings) => {
  localStorage.setItem('notificationSettings', JSON.stringify(newSettings));
};

export const getNotifications = () => {
  // Get notifications from localStorage or return empty array
  const notifications = localStorage.getItem('notifications');
  return notifications ? JSON.parse(notifications) : [];
};

export const addNotification = (notification) => {
  const notifications = getNotifications();
  notifications.unshift({
    ...notification,
    id: Date.now(),
    timestamp: new Date().toISOString(),
    read: false
  });
  localStorage.setItem('notifications', JSON.stringify(notifications));
};

export const markNotificationAsRead = (notificationId) => {
  const notifications = getNotifications();
  const updatedNotifications = notifications.map(notification =>
    notification.id === notificationId ? { ...notification, read: true } : notification
  );
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
};


export const getUnreadNotificationCount = () => {
  const notifications = getNotifications();
  return notifications.filter(notification => !notification.read).length;
};

// History tracking functions
export const getPetHistory = () => {
  const petHistory = localStorage.getItem('petHistory');
  return petHistory ? JSON.parse(petHistory) : [];
};

export const addPetToHistory = (pet, action) => {
  const history = getPetHistory();
  history.unshift({
    ...pet,
    action: action, // 'added', 'updated', 'deleted'
    timestamp: new Date().toISOString(),
    id: Date.now()
  });
  // Keep only last 50 entries
  const limitedHistory = history.slice(0, 50);
  localStorage.setItem('petHistory', JSON.stringify(limitedHistory));
};

export const getVaccineHistory = () => {
  const vaccineHistory = localStorage.getItem('vaccineHistory');
  return vaccineHistory ? JSON.parse(vaccineHistory) : [];
};

export const addVaccineToHistory = (vaccine, action) => {
  const history = getVaccineHistory();
  history.unshift({
    ...vaccine,
    action: action, // 'added', 'updated', 'deleted'
    timestamp: new Date().toISOString(),
    id: Date.now()
  });
  // Keep only last 50 entries
  const limitedHistory = history.slice(0, 50);
  localStorage.setItem('vaccineHistory', JSON.stringify(limitedHistory));
};

export const getChatHistory = () => {
  const chatHistory = localStorage.getItem('chatHistory');
  return chatHistory ? JSON.parse(chatHistory) : [];
};

export const addChatToHistory = (message) => {
  const history = getChatHistory();
  history.unshift({
    ...message,
    timestamp: new Date().toISOString(),
    id: Date.now()
  });
  // Keep only last 100 entries
  const limitedHistory = history.slice(0, 100);
  localStorage.setItem('chatHistory', JSON.stringify(limitedHistory));
};

export const clearHistory = (type) => {
  switch(type) {
    case 'pets':
      localStorage.removeItem('petHistory');
      break;
    case 'vaccines':
      localStorage.removeItem('vaccineHistory');
      break;
    case 'chat':
      localStorage.removeItem('chatHistory');
      break;
    case 'all':
      localStorage.removeItem('petHistory');
      localStorage.removeItem('vaccineHistory');
      localStorage.removeItem('chatHistory');
      break;
    default:
      break;
  }
};

// New missing functions
export const notifyCommunityPost = () => {
  addNotification({
    title: "New Post! 💬",
    message: "A new post was shared in the community.",
    type: "community",
    path: "/community"
  });
};

export const addVaccineNotification = (vaccine) => {
  addNotification({
    title: "Vaccine Added! 💉",
    message: `${vaccine.name} for ${vaccine.petName} has been recorded.`,
    type: "vaccine",
    path: "/vaccine-tracker"
  });
};

export const calculateVaccineDueDate = (dateTaken, frequencyMonths) => {
  const date = new Date(dateTaken);
  date.setMonth(date.getMonth() + parseInt(frequencyMonths));
  return date.toISOString().split('T')[0];
};


export const checkVaccineReminders = (vaccines) => {
  const today = new Date();
  vaccines.forEach(vaccine => {
    const dueDate = new Date(vaccine.nextDueDate);
    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 7 || diffDays === 1) {
      addNotification({
        title: "Vaccine Reminder! 🏥",
        message: `${vaccine.name} for ${vaccine.petName} is due in ${diffDays} days.`,
        type: "reminder",
        path: "/vaccine-tracker"
      });
    }
  });
};

export const triggerAppointmentAlert = () => {
  addNotification({
    title: "Appointment Soon! 📅",
    message: "You have a veterinary appointment scheduled for next week.",
    type: "appointment",
    path: "/vet-finder"
  });
};
