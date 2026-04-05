import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-5 mt-auto glass-panel mx-3 mb-3 border-0" style={{ background: 'rgba(255,255,255,0.02)' }}>
      <Container>
        <Row className="gy-4">
          <Col md={6} lg={4}>
            <div className="brand-text d-flex align-items-center gap-2 mb-3" style={{ fontSize: '1.5rem' }}>
              <span>🐾</span>
              <span>PetCare <span style={{ color: 'var(--primary)' }}>Hub</span></span>
            </div>
            <p className="text-secondary small">
              The ultimate destination for pet owners seeking excellence in care, community, and management.
            </p>
          </Col>
          <Col md={6} lg={2}>
            <h5 className="mb-3">Quick Links</h5>
            <ul className="list-unstyled text-secondary small d-flex flex-column gap-2">
              <li><a href="#home" className="text-decoration-none text-secondary">Home</a></li>
              <li><a href="#features" className="text-decoration-none text-secondary">Features</a></li>
              <li><a href="#about" className="text-decoration-none text-secondary">About</a></li>
              <li><a href="#contact" className="text-decoration-none text-secondary">Contact</a></li>
            </ul>
          </Col>
          <Col md={12} lg={6} className="text-lg-end">
            <h5 className="mb-3">Connect With Us</h5>
            <div className="d-flex justify-content-lg-end gap-3 mb-3">
              <div className="btn-premium glass-panel p-2" style={{ cursor: 'pointer' }}>📸</div>
              <div className="btn-premium glass-panel p-2" style={{ cursor: 'pointer' }}>🐦</div>
              <div className="btn-premium glass-panel p-2" style={{ cursor: 'pointer' }}>💼</div>
            </div>
            <p className="text-secondary smaller">© 2026 PetCare Hub. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
