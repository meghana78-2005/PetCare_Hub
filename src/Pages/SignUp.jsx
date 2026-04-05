import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaw, FaEnvelope, FaLock } from "react-icons/fa";
import { auth } from "../firebase/FireBaseConfig";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
  });

  const navigate = useNavigate();
  const MotionDiv = motion.div;
  const MotionButton = motion.button;

  // Password strength checker
  const checkPasswordStrength = (password) => {
    const strength = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    setError("");
  };

  const handleSignup = async (event) => {
    event.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("Please fill out all fields before creating an account.");
      return;
    }

    // Check password strength
    const strength = checkPasswordStrength(password);
    if (!strength.length || !strength.uppercase || !strength.lowercase || !strength.number || !strength.symbol) {
      setError("Please ensure your password meets all requirements.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      alert("Account created! Please log in.");
      navigate("/signin");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #EAF6FF, #DFF6FF)",
      }}
    >

      {Array.from({ length: 16 }).map((_, index) => (
        <MotionDiv
          key={index}
          className="position-absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut",
          }}
        >
          {index % 3 === 0 ? (
            <FaPaw size={18} color="#4CAF50" />
          ) : index % 3 === 1 ? (
            <span style={{ fontSize: 18 }}>🐱</span>
          ) : (
            <span style={{ fontSize: 18 }}>🐶</span>
          )}
        </MotionDiv>
      ))}

      <MotionDiv
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="card border-0"
        style={{
          maxWidth: "500px",
          width: "100%",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <div className="card-body p-4">
          {/* Simba Guide Section */}
          <div className="text-center mb-4">
            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light border" style={{ width: 60, height: 60 }}>
              <span style={{ fontSize: 30 }}>🐶</span>
            </div>
            <div className="mt-2 p-2 bg-light rounded-3" style={{ fontSize: "0.9rem", color: "#333" }}>
              <strong>Hi! I'm Simba 🐶</strong><br />
              Let's create your account and start caring for your pet!
            </div>
          </div>

          <div className="text-center mb-4">
            <h1 className="fw-bold" style={{ color: "#333" }}>Join PetCare</h1>
            <p className="mb-0" style={{ color: "#666" }}>
              Create your account and start caring for your pets with ease.
            </p>
          </div>

          <form onSubmit={handleSignup}>
            <div className="mb-3">
              <label htmlFor="signup-name" className="form-label fw-semibold" style={{ color: "#333" }}>
                Full name
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border" style={{ color: "#4CAF50" }}>
                  <FaPaw />
                </span>
                <input
                  id="signup-name"
                  type="text"
                  autoFocus
                  className="form-control border"
                  style={{ borderRadius: "0 10px 10px 0", color: "#333" }}
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="signup-email" className="form-label fw-semibold" style={{ color: "#333" }}>
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border" style={{ color: "#4CAF50" }}>
                  <FaEnvelope />
                </span>
                <input
                  id="signup-email"
                  type="email"
                  className="form-control border"
                  style={{ borderRadius: "0 10px 10px 0", color: "#333" }}
                  placeholder="you@petcare.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="signup-password" className="form-label fw-semibold" style={{ color: "#333" }}>
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border" style={{ color: "#4CAF50" }}>
                  <FaLock />
                </span>
                <input
                  id="signup-password"
                  type="password"
                  className="form-control border"
                  style={{ borderRadius: "0 10px 10px 0", color: "#333" }}
                  placeholder="Create a password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>

              {/* Password Strength Indicators */}
              {password && (
                <div style={{ marginTop: "8px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.85rem",
                      padding: "2px 0",
                      color: passwordStrength.length ? "#4CAF50" : "#666"
                    }}>
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {passwordStrength.length ? '✓' : '○'}
                      </span>
                      At least 8 characters
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.85rem",
                      padding: "2px 0",
                      color: passwordStrength.uppercase ? "#4CAF50" : "#666"
                    }}>
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {passwordStrength.uppercase ? '✓' : '○'}
                      </span>
                      One uppercase letter (A-Z)
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.85rem",
                      padding: "2px 0",
                      color: passwordStrength.lowercase ? "#4CAF50" : "#666"
                    }}>
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {passwordStrength.lowercase ? '✓' : '○'}
                      </span>
                      One lowercase letter (a-z)
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.85rem",
                      padding: "2px 0",
                      color: passwordStrength.number ? "#4CAF50" : "#666"
                    }}>
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {passwordStrength.number ? '✓' : '○'}
                      </span>
                      One number (0-9)
                    </div>
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.85rem",
                      padding: "2px 0",
                      color: passwordStrength.symbol ? "#4CAF50" : "#666"
                    }}>
                      <span style={{ marginRight: "8px", fontWeight: "bold" }}>
                        {passwordStrength.symbol ? '✓' : '○'}
                      </span>
                      One special character (!@#$%^&*)
                    </div>
                  </div>
                </div>
              )}
            </div>

            {error && <div className="alert alert-danger mb-3">{error}</div>}

            <MotionButton
              type="submit"
              className="btn w-100 py-2 fw-bold"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              disabled={isLoading}
              style={{
                backgroundColor: "#4CAF50",
                border: "none",
                color: "white",
                borderRadius: "10px",
              }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </MotionButton>
          </form>

          <div className="text-center mt-4">
            <span style={{ color: "#666" }}>Already have an account? </span>
            <button
              type="button"
              className="btn btn-link p-0 fw-bold"
              style={{ color: "#FFB703", textDecoration: "none" }}
              onClick={() => navigate("/signin")}
            >
              Sign in
            </button>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default SignUp;