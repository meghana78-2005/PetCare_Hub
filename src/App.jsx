import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./Context/AuthContext";
import Welcome from "./Pages/Welcome";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Community from "./Pages/Community";
import HospitalRoutes from "./Pages/HospitalRoutes";
import VaccineTracker from "./Pages/VaccineTracker";
import "bootstrap/dist/css/bootstrap.min.css";
import NavScrollExample from "./Components/NavBarComp";
import Dashboard from "./Pages/Dashboard";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
    {/* <NavScrollExample/> */}
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/home" element={user ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/community" element={user ? <Community /> : <Navigate to="/signin" />} />
        <Route path="/hospital-routes" element={user ? <HospitalRoutes /> : <Navigate to="/signin" />} />
        <Route path="/vaccine-tracker" element={user ? <VaccineTracker /> : <Navigate to="/signin" />} />
        {/* <Route path="/dashboard" element={<Dashboard/>} />  */}
      </Routes>
    </BrowserRouter >
  );
}

export default App;