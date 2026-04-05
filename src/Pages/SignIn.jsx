import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaPaw } from "react-icons/fa";
import { auth } from "../firebase/FireBaseConfig";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const loggedOut = location.state?.loggedOut;
  const MotionDiv = motion.div;
  const MotionButton = motion.button;

  const handleSignin = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("🐾 Please enter both email and password.");
      return;
    }
    setError("");
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="position-relative min-vh-100 overflow-hidden d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #EAF6FF, #DFF6FF)",
      }}
    >

      {Array.from({ length: 18 }).map((_, index) => (
        <MotionDiv
          key={index}
          className="position-absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.15,
          }}
          animate={{
            y: [0, -18, 0],
            rotate: [0, 35, -15, 0],
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
            <span style={{ fontSize: 18 }}>🐶</span>
          ) : (
            <span style={{ fontSize: 18 }}>💫</span>
          )}
        </MotionDiv>
      ))}

      <MotionDiv
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="card border-0"
        style={{
          maxWidth: "420px",
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
              Welcome back! Enter your details to continue.
            </div>
          </div>

          <div className="text-center mb-4">
            <h2 className="fw-bold" style={{ color: "#333" }}>Welcome Back</h2>
            <p className="mb-0" style={{ color: "#666" }}>Sign in and keep caring for your furry friends.</p>
          </div>

          <form onSubmit={handleSignin}>
            <div className="mb-3">
              <label htmlFor="signin-email" className="form-label fw-semibold" style={{ color: "#333" }}>
                Email
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border" style={{ color: "#4CAF50" }}>
                  <FaEnvelope />
                </span>
                <input
                  id="signin-email"
                  type="email"
                  autoFocus
                  autoComplete="email"
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
              <label htmlFor="signin-password" className="form-label fw-semibold" style={{ color: "#333" }}>
                Password
              </label>
              <div className="input-group">
                <span className="input-group-text bg-light border" style={{ color: "#4CAF50" }}>
                  <FaLock />
                </span>
                <input
                  id="signin-password"
                  type="password"
                  autoComplete="current-password"
                  className="form-control border"
                  style={{ borderRadius: "0 10px 10px 0", color: "#333" }}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                />
              </div>
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
              {isLoading ? "Logging in..." : "Login to PetCare"}
            </MotionButton>
          </form>

          <div className="row g-3 mt-4">
            <MotionDiv
              className="col-6"
              whileHover={{ y: -4 }}
              style={{ cursor: "default" }}
            >
              <div className="p-3 rounded-4 bg-light border h-100" style={{ borderColor: "#e0e0e0" }}>
                <h6 className="mb-2" style={{ color: "#4CAF50" }}>Pet reminders</h6>
                <p className="mb-0 small" style={{ color: "#666" }}>Never miss a vaccination or grooming day.</p>
              </div>
            </MotionDiv>
            <MotionDiv
              className="col-6"
              whileHover={{ y: -4 }}
              style={{ cursor: "default" }}
            >
              <div className="p-3 rounded-4 bg-light border h-100" style={{ borderColor: "#e0e0e0" }}>
                <h6 className="mb-2" style={{ color: "#4CAF50" }}>Safe login</h6>
                <p className="mb-0 small" style={{ color: "#666" }}>Secure access for every pet parent.</p>
              </div>
            </MotionDiv>
          </div>

          <div className="text-center mt-4">
            <span style={{ color: "#666" }}>Not a member yet? </span>
            <button
              type="button"
              className="btn btn-link p-0 fw-bold"
              style={{ color: "#FFB703", textDecoration: "none" }}
              onClick={() => navigate("/")}
            >
              Create account
            </button>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default SignIn;