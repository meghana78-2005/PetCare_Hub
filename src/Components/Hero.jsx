import { Container, Row, Col } from "react-bootstrap";

const Hero = () => {
  return (
    <section id="home" className="py-5 mt-5">
      <Container>
        <Row className="justify-content-center text-center">
          <Col lg={8} xl={7}>
            <div className="glass-panel p-5 animate-fadeIn">
              <span style={{ fontSize: "4rem" }} className="d-block mb-3">🐶</span>
              <h1 className="display-4 mb-3 font-weight-bold">
                Welcome to <span style={{ color: "var(--primary)" }}>PetCare Hub</span>
              </h1>
              <p className="lead text-secondary mb-4">
                The ultimate sanctuary for your furry friends. Manage, track, and provide the best care for your pets all in one place.
              </p>
              <div className="d-flex justify-content-center gap-3">
                <button className="btn-premium btn-primary-premium">
                  Get Started
                </button>
                <button className="btn-premium glass-panel px-4" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  Learn More
                </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
