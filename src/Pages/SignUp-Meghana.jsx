import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/FireBaseConfig";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaPaw } from "react-icons/fa";
import { GiSittingDog, GiCat, GiNestBirds } from "react-icons/gi";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPet, setSelectedPet] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [mascotPosition, setMascotPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMascotPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "🐶 Name is required!";
    if (!email.trim()) newErrors.email = "🐱 Email is required!";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "🐶 Oops! Enter a valid email";
    if (!password.trim()) newErrors.password = "🐕 Password is required!";
    else if (password.length < 6) newErrors.password = "🐱 Password must be at least 6 characters";
    if (!selectedPet) newErrors.pet = "🐶 Choose your pet avatar!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signOut(auth);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  const petOptions = [
    { id: "dog", icon: GiSittingDog, label: "Dog" },
    { id: "cat", icon: GiCat, label: "Cat" },
    { id: "bird", icon: GiNestBirds, label: "Bird" },
  ];

  return (
    <div className="position-relative min-vh-100 overflow-hidden" style={{
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    }}>
      {/* Animated Background Elements */}
      <div className="position-absolute top-0 start-0 w-100 h-100">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="position-absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            {i % 3 === 0 ? <FaPaw size={20} className="text-white opacity-25" /> :
             i % 3 === 1 ? <span className="text-white opacity-25">🦴</span> :
             <span className="text-white opacity-25">💙</span>}
          </motion.div>
        ))}
      </div>

      {/* Mascot */}
      <motion.div
        className="position-fixed"
        style={{
          left: mascotPosition.x - 25,
          top: mascotPosition.y - 25,
          pointerEvents: "none",
          zIndex: 1000,
        }}
        animate={{
          scale: isHovered ? 1.2 : 1,
          rotate: isHovered ? [0, -10, 10, 0] : 0,
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <GiSittingDog size={50} className="text-white opacity-75" />
      </motion.div>

      {/* Main Content */}
      <div className="d-flex align-items-center justify-content-center min-vh-100 p-3">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="card shadow-lg border-0"
          style={{
            backdropFilter: "blur(20px)",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <div className="card-body p-4">
            <motion.h2
              className="text-center mb-4 text-white fw-bold"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              🐾 Join PetCare Hub
            </motion.h2>

            {/* Pet Avatar Selection */}
            <div className="mb-3">
              <label className="form-label text-white fw-semibold">Choose Your Pet Avatar</label>
              <div className="d-flex justify-content-center gap-3">
                {petOptions.map((pet) => (
                  <motion.button
                    key={pet.id}
                    type="button"
                    className={`btn border-0 p-3 ${selectedPet === pet.id ? 'bg-primary' : 'bg-white bg-opacity-25'}`}
                    onClick={() => setSelectedPet(pet.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      borderRadius: "50%",
                      width: "60px",
                      height: "60px",
                    }}
                  >
                    <pet.icon size={24} className={selectedPet === pet.id ? 'text-white' : 'text-primary'} />
                  </motion.button>
                ))}
              </div>
              {errors.pet && <div className="text-danger small mt-1">{errors.pet}</div>}
            </div>

            {/* Name Input */}
            <div className="mb-3 position-relative">
              <label className="form-label text-white fw-semibold" htmlFor="signup-name">Name</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-white border-opacity-25 text-white">
                  <FaUser />
                </span>
                <input
                  id="signup-name"
                  type="text"
                  autoFocus
                  autoComplete="name"
                  className="form-control bg-transparent border-white border-opacity-25 text-white"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{
                    boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.25)",
                  }}
                />
              </div>
              {errors.name && <div className="text-danger small mt-1">{errors.name}</div>}
            </div>

            {/* Email Input */}
            <div className="mb-3 position-relative">
              <label className="form-label text-white fw-semibold">Email</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-white border-opacity-25 text-white">
                  <FaEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control bg-transparent border-white border-opacity-25 text-white"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.25)",
                  }}
                />
              </div>
              {errors.email && <div className="text-danger small mt-1">{errors.email}</div>}
            </div>

            {/* Password Input */}
            <div className="mb-3 position-relative">
              <label className="form-label text-white fw-semibold">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-white border-opacity-25 text-white">
                  <FaLock />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control bg-transparent border-white border-opacity-25 text-white"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    boxShadow: "0 0 0 0.2rem rgba(255, 255, 255, 0.25)",
                  }}
                />
                <button
                  type="button"
                  className="btn btn-outline-light border-white border-opacity-25"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="text-danger small mt-1">{errors.password}</div>}
            </div>

            {errors.general && <div className="alert alert-danger">{errors.general}</div>}

            {/* Sign Up Button */}
            <motion.button
              className="btn btn-primary w-100 py-2 fw-bold"
              onClick={handleSignup}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              style={{
                background: "linear-gradient(45deg, #667eea, #764ba2)",
                border: "none",
              }}
            >
              {isLoading ? (
                <div className="d-flex align-items-center justify-content-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="me-2"
                  >
                    🐾
                  </motion.div>
                  Creating Account...
                </div>
              ) : (
                "🐶 Create Account"
              )}
            </motion.button>

            {/* Social Login */}
            <div className="d-flex gap-2 mt-3">
              <motion.button
                className="btn btn-outline-light flex-fill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGoogle className="me-2" />
                Google
              </motion.button>
              <motion.button
                className="btn btn-outline-light flex-fill"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebook className="me-2" />
                Facebook
              </motion.button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-3">
              <span className="text-white">Already have an account? </span>
              <motion.a
                href="#"
                className="text-primary fw-bold text-decoration-none"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/signin");
                }}
                whileHover={{ scale: 1.1 }}
              >
                Login
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Success Animation */}
      {isSuccess && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="position-fixed top-50 start-50 translate-middle text-center"
          style={{ zIndex: 1050 }}
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-white"
          >
            <GiSittingDog size={80} />
            <h3 className="mt-3">🎉 Account Created!</h3>
            <p>Redirecting to login...</p>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SignUp;