import { useAuth } from "../Context/AuthContext";
import { NavbarCollapse } from "react-bootstrap";
import NavBarComp from "../Components/NavBarComp";
import { Container, Row, Col, Card } from "react-bootstrap";

const Home = () => {
  const { user } = useAuth();
  const penciledName = user?.displayName || "MS. Pet Lover";

  return (
    <div className="Home-container" style={{ paddingTop: '100px', minHeight: '100vh' }}>
      <div className="home-bg-overlay" />
      <NavBarComp />
      <Container className="mt-5 home-content" style={{ position: 'relative', zIndex: 2 }}>
        <Row className="justify-content-center">
          <Col md={8} className="text-center">
            <h1>Welcome to 🐶 PetCare Hub</h1>
            <p className="lead">Your one-stop solution for pet care management.</p>
            <p>Hello, {penciledName}!</p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={3}>
            <Card className="text-center border-success">
              <Card.Body>
                <Card.Title>🐕 Profile</Card.Title>
                <Card.Text>Manage your pet's profile.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-success">
              <Card.Body>
                <Card.Title>👥 Community</Card.Title>
                <Card.Text>Connect with other pet owners.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-success">
              <Card.Body>
                <Card.Title>🏥 Hospital Routes</Card.Title>
                <Card.Text>Find nearby vet hospitals.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="text-center border-success">
              <Card.Body>
                <Card.Title>💉 Vaccine Tracker</Card.Title>
                <Card.Text>Track your pet's vaccinations.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5 justify-content-center">
          <Col lg={8}>
            <Card className="text-center border-success p-4" style={{ background: 'rgba(255,255,255,0.9)' }}>
              <Card.Title style={{ fontSize: '1.7rem' }}>🐾 Pet Parent Hub</Card.Title>
              <Card.Text>
                Connect with pet parents, track vaccinations, and find nearby vet routes in a warm and secure community. For cats, dogs, birds, and all companions.
              </Card.Text>
              <button className="btn btn-success mt-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Explore Features</button>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;