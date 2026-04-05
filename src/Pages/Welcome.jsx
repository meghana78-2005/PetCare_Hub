import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaw } from "react-icons/fa";
import "../Styles/Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();
  const MotionDiv = motion.div;
  const MotionButton = motion.button;

  const guideMessages = [
    "If you already have an account, click Login",
    "If you're new, create an account to continue",
    "Let's take care of your pets together!",
  ];

  return (
    <div className="welcome-container">
      {/* Background overlay */}
      <div className="welcome-bg-overlay"></div>

      <MotionDiv
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="welcome-content"
      >
        {/* Logo/Icon at top */}
        <motion.div
          className="welcome-header"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <FaPaw size={40} color="#4CAF50" />
          <h1 className="welcome-title">Welcome to Pet Care Hub 🐾</h1>
          <p className="welcome-subtitle">
            Your companion for pet health, care, and community
          </p>
        </motion.div>

        {/* Card with Simba Guide */}
        <MotionDiv
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="guide-card"
        >
          <div className="simba-container">
            {/* Simba Image/Icon */}
            <motion.div
              className="simba-image"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="simba-placeholder">🐶</div>
            </motion.div>

            {/* Message Bubble from Simba */}
            <div className="message-section">
              <motion.div
                className="message-bubble"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="message-greeting">Hi! I'm Simba 🐶</p>
                <p className="message-main">I'll help you get started!</p>
              </motion.div>

              {/* Guide Messages */}
              <div className="guide-messages">
                {guideMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    className="guide-message-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <span className="message-dot">•</span>
                    <p className="message-text">{message}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="button-group">
            <MotionButton
              className="welcome-btn login-btn"
              onMouseHover={{ scale: 1.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signin")}
            >
              🔓 Login
            </MotionButton>

            <MotionButton
              className="welcome-btn signup-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/signup")}
            >
              ✨ Create Account
            </MotionButton>
          </div>
        </MotionDiv>

        {/* Decorative Paw Prints */}
        <motion.div
          className="paw-decoration paw-1"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaPaw size={24} color="rgba(76, 175, 80, 0.2)" />
        </motion.div>
        <motion.div
          className="paw-decoration paw-2"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <FaPaw size={20} color="rgba(100, 149, 237, 0.2)" />
        </motion.div>
        <motion.div
          className="paw-decoration paw-3"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          <FaPaw size={28} color="rgba(135, 206, 250, 0.2)" />
        </motion.div>
      </MotionDiv>
    </div>
  );
};

export default Welcome;
