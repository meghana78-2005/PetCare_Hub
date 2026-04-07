import { useState, useEffect } from "react";
import "./SimbaAssistant.css";

const SimbaAssistant = ({ pageName, onDismiss }) => {
  const [visible, setVisible] = useState(true);
  const [messageIndex, setMessageIndex] = useState(0);

  const getPageSpecificTips = () => {
    switch(pageName) {
      case "home":
        return [
          "🦁 Welcome to PetCare Hub! I'm Simba, your pet care assistant!",
          "🐾 Click on Profile to manage your pets and track their health.",
          "🏥 Visit Hospital Routes to find nearby veterinary services.",
          "💬 Join our Community Chat to connect with other pet parents!"
        ];
      case "profile":
        return [
          "🦁 Hi! This is where you can manage your pet's information.",
          "🐾 Add your pets' details including breed, age, and photos.",
          "💉 Don't forget to track their vaccinations in the Vaccine Tracker!",
          "📸 Upload cute photos of your furry friends!"
        ];
      case "community":
        return [
          "🦁 Welcome to the Community Hub! Share your pet stories here.",
          "💬 Join the chat to connect with other pet parents instantly.",
          "📝 Create posts about your pets and get advice from others.",
          "❤️ Like and comment on posts to support fellow pet lovers!"
        ];
      case "vaccine-tracker":
        return [
          "🦁 Keep your pets healthy! Track all their vaccinations here.",
          "💉 Add new vaccines with dates and next due dates.",
          "⚠️ I'll help you remember when vaccines are due!",
          "📅 Set reminders for upcoming vaccinations."
        ];
      case "hospital-routes":
        return [
          "🦁 Find the best veterinary care for your pets!",
          "🏥 Browse hospitals and clinics in your area.",
          "🗺 Get directions to nearby pet hospitals.",
          "📞 Save emergency contacts for quick access!"
        ];
      default:
        return [
          "🦁 Hello! I'm Simba, your pet care assistant!",
          "🐾 I'm here to help you take the best care of your pets.",
          "💡 Navigate through the app to discover all features!",
          "🌟 Enjoy your pet parenting journey!"
        ];
    }
  };

  const tips = getPageSpecificTips();

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % tips.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [tips.length]);

  const handleDismiss = () => {
    setVisible(false);
    onDismiss();
  };

  if (!visible) return null;

  return (
    <div className="simba-assistant">
      <div className="simba-avatar">
        <div className="simba-face">🦁</div>
      </div>
      <div className="simba-bubble">
        <div className="simba-message">
          {tips[messageIndex]}
        </div>
        <button className="simba-dismiss" onClick={handleDismiss}>
          ✕
        </button>
      </div>
      <div className="simba-paw-prints">
        <span className="paw-print">🐾</span>
        <span className="paw-print">🐾</span>
        <span className="paw-print">🐾</span>
      </div>
    </div>
  );
};

export default SimbaAssistant;
