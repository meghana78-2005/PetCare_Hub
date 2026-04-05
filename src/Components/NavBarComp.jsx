import { NavbarCollapse } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/FireBaseConfig';

function NavScrollExample() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/signin', { state: { loggedOut: true } });
  };

  return (
    <Navbar expand="lg" className="bg-success fixed-top navbar-dark" style={{ zIndex: 999 }}>
      <Container fluid>
        <Navbar.Brand as={Link} to="/home">PetCare Hub</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/community">Community</Nav.Link>
            <Nav.Link as={Link} to="/hospital-routes">Hospital Routes</Nav.Link>
            <Nav.Link as={Link} to="/vaccine-tracker">Vaccine Tracker</Nav.Link>
            <NavDropdown title={<img src="https://via.placeholder.com/30" alt="Profile" className="rounded-circle" />} id="profile-dropdown">
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={handleSignOut}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
