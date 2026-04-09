import { useContext } from "react";

import { AuthContext } from "../Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { signOut } from "firebase/auth";
import { auth } from '../firebase/FireBaseConfig';
import NotificationBell from "./NotificationBell";
import "./NavBarComp.css";

function NavScrollExample() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin', { state: { loggedOut: true } });
  };

  return (
    <Navbar expand="lg" className="bg-success fixed-top navbar-dark" style={{ zIndex: 1030 }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/home" className="navbar-brand">
          <span className="navbar-icon">🐾</span>
          PetCare Hub
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0 align-items-center"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/community" className="nav-link-with-icon">
              <span className="nav-icon">💬</span>
              <span className="nav-text">Community</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/vet-finder" className="nav-link-with-icon">
              <span className="nav-icon">🏥</span>
              <span className="nav-text">Vet Finder</span>
            </Nav.Link>
            <Nav.Link as={Link} to="/vaccine-tracker" className="nav-link-with-icon">
              <span className="nav-icon">💉</span>
              <span className="nav-text">Vaccine Tracker</span>
            </Nav.Link>
            <div className="nav-notification-bell">
              <NotificationBell/>
            </div>
            <NavDropdown 
              title={
                <div className="profile-dropdown-toggle">
                  <span className="profile-icon">👤</span>
                  
                </div>
              } 
              id="profile-dropdown"
              className="profile-dropdown"
            >
              <NavDropdown.Item as={Link} to="/profile" className="dropdown-item-with-icon">
                <span className="dropdown-icon">👤</span>
                My Profile
              </NavDropdown.Item>
              
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut} className="dropdown-item-with-icon text-danger">
                <span className="dropdown-icon">🚪</span>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
