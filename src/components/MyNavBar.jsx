import { Container, NavDropdown } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function MyNavbar(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img
          src="https://play-lh.googleusercontent.com/34vH94Vt3JFW_jsCMlBdNRdniMCcrMdwOygi-hfipjLzzGZMfApjeO8SaOdQ2mn5FVA"
          alt="logo"
          className="MyLogo"
        />
        <Navbar.Brand href="#home">Meteo-React-App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink to={"/"} className="text-decoration-none">
              <Nav.Link href="#home">Home</Nav.Link>
            </NavLink>

            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;
