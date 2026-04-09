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
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path='*'element = {<PageNotFound/>}/>
        <Route 
          path="/" 
          element={user !== null ? <Navigate to="/home" replace /> : <Welcome />} 
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />

        <Route path="/home" element={user !== null ? <Home /> : <Navigate to="/signin" />} />
        <Route path="/profile" element={user !== null ? <Profile /> : <Navigate to="/signin" />} />
        <Route path="/community" element={user !== null ? <CommunityPage /> : <Navigate to="/signin" />} />
        <Route path="/vet-finder" element={user !== null ? <VetFinder /> : <Navigate to="/signin" />} />
        <Route path="/vaccine-tracker" element={user !== null ? <VaccineTrackerPage /> : <Navigate to="/signin" />} />
        <Route path="/notification-settings" element={user !== null ? <NotificationSettings /> : <Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;