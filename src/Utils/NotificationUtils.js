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

export const calculateVaccineDueDate = (dateTaken, frequency) => {
  const dateTakenObj = new Date(dateTaken);
  let dueDate = new Date(dateTakenObj);
  
  // Calculate due date based on frequency
  switch (frequency.toLowerCase()) {
    case '6 months':
      dueDate.setMonth(dueDate.getMonth() + 6);
      break;
    case '6 months':
      dueDate.setMonth(dueDate.getMonth() + 6);
      break;
    case '3 years':
      dueDate.setFullYear(dueDate.getFullYear() + 3);
      break;
    case '1 year':
      dueDate.setFullYear(dueDate.getFullYear() + 1);
      break;
    default:
      dueDate.setFullYear(dueDate.getFullYear() + 1);
      break;
  }
  
  return dueDate.toISOString().split('T')[0];
};

export const checkVaccineReminders = (vaccines) => {
  const settings = getNotificationSettings();
  
  if (!settings.vaccineReminder) {
    return;
  }
  
  if (!vaccines || vaccines.length === 0) return;
  
  const today = new Date();
  const threeDaysFromNow = new Date(today.getTime() + (3 * 24 * 60 * 60 * 1000));

  vaccines.forEach(vaccine => {
    const dueDate = new Date(vaccine.nextDueDate);
    if (dueDate <= threeDaysFromNow && dueDate >= today) {
      // Trigger custom notification event with vaccine data
      window.dispatchEvent(new CustomEvent('newNotification', {
        detail: { 
          type: 'vaccine', 
          petName: vaccine.petName, 
          vaccineName: vaccine.name,
          dueDate: vaccine.nextDueDate,
          daysUntilDue: Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24))
        }
      }));
    }
  });
};

export const notifyCommunityPost = (postData) => {
  if (!postData) return;
  const settings = getNotificationSettings();
  
  if (settings.communityNotifications) {
    // Trigger custom notification event instead of alert
    window.dispatchEvent(new CustomEvent('newNotification', {
      detail: { type: 'community', message: 'New post added to community!' }
    }));
  }
};

export const triggerAppointmentAlert = (appointmentData) => {
  if (!appointmentData) return;
  const settings = getNotificationSettings();
  
  if (settings.appointmentAlerts) {
    // Trigger custom notification event instead of alert
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('newNotification', {
        detail: { type: 'appointment', message: `Upcoming vet appointment with ${appointmentData.clinicName}!`, data: appointmentData }
      }));
    }, 5000); // Trigger after 5 seconds
  }
};

export const addVaccineNotification = (vaccineData) => {
  // Trigger custom notification event for new vaccine
  window.dispatchEvent(new CustomEvent('newNotification', {
    detail: { 
      type: 'vaccine', 
      message: `New vaccine ${vaccineData.name} added for ${vaccineData.petName}!`, 
      data: vaccineData 
    }
  }));
};

export const addVetAppointmentNotification = (appointmentData) => {
  // Trigger custom notification event for new vet appointment
  window.dispatchEvent(new CustomEvent('newNotification', {
    detail: { type: 'appointment', message: `Vet appointment scheduled with ${appointmentData.clinicName}!`, data: appointmentData }
  }));
};
