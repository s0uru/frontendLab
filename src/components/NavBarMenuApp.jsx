import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router';

function NavBarMenuApp() {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
      <Container>
        <Navbar.Brand as={NavLink} to="/">  {/* zmiana z /home na / */}
          <strong>React Labs</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/">  {/* zmiana z /Home na / */}
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/lab01">
              Laboratorium 1
            </Nav.Link>
            <Nav.Link as={NavLink} to="/lab02/1">  {/* dodano /1 bo potrzebny jest parametr id */}
              Laboratorium 2
            </Nav.Link>
            <Nav.Link as={NavLink} to="/lab03">
              Laboratorium 3
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBarMenuApp;