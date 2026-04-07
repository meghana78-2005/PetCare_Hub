// Notification utility functions

export const getNotificationSettings = () => {
  const savedSettings = localStorage.getItem('notificationSettings');
  if (savedSettings) {
    return JSON.parse(savedSettings);
  }
  // Default settings
  return {
    vaccineReminder: true,
    communityNotifications: true,
    appointmentAlerts: true
  };
};

export const checkVaccineReminders = (vaccines) => {
  const settings = getNotificationSettings();
  
  if (!settings.vaccineReminder) {
    return;
  }

  const today = new Date();
  const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

  vaccines.forEach(vaccine => {
    const dueDate = new Date(vaccine.nextDueDate);
    if (dueDate <= threeDaysFromNow && dueDate >= today) {
      alert(`💉 Vaccine Reminder: ${vaccine.name} is due soon for ${vaccine.petName}!`);
    }
  });
};

export const notifyCommunityPost = () => {
  const settings = getNotificationSettings();
  
  if (settings.communityNotifications) {
    alert('👥 New post added to community!');
  }
};

export const triggerAppointmentAlert = () => {
  const settings = getNotificationSettings();
  
  if (settings.appointmentAlerts) {
    setTimeout(() => {
      alert('📅 Upcoming vet appointment reminder!');
    }, 5000); // Trigger after 5 seconds
  }
};
