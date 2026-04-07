import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { useAuth } from "./Context/AuthContext";
import Welcome from "./Pages/Welcome";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import CommunityPage from "./Pages/CommunityPage";
import VetFinder from "./Pages/VetFinder";
import VaccineTrackerPage from "./Pages/VaccineTrackerPage";
import NotificationSettings from "./Pages/NotificationSettings";
import "bootstrap/dist/css/bootstrap.min.css";
import NavScrollExample from "./Components/NavBarComp";
import Dashboard from "./Pages/Dashboard";

function App() {
  const { user } = useAuth();

  // Debug: Log user state to console
  console.log('App - Current user state:', user);
  console.log('App - User is null:', user === null);
  console.log('App - User type:', typeof user);

  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/" 
          element={user !== null ? <Navigate to="/home" replace /> : <Welcome />} 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/home" element={user !== null ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={user !== null ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/community" element={user !== null ? <CommunityPage /> : <Navigate to="/signin" />} />
        <Route path="/vet-finder" element={user !== null ? <VetFinder /> : <Navigate to="/signin" />} />
        <Route path="/vaccine-tracker" element={user !== null ? <VaccineTrackerPage /> : <Navigate to="/signin" />} />
        <Route path="/notification-settings" element={user !== null ? <NotificationSettings /> : <Navigate to="/signin" />} />
        {/* <Route path="/dashboard" element={<Dashboard/>} />  */}
      </Routes>
    </BrowserRouter >
  );
}

export default App;