import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Fragment } from "react";

function handleLogout() {
  localStorage.removeItem("token");
}

function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Car Care</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/addCar">Add New Car</Nav.Link>
          </Nav>
          {localStorage.getItem("token") ? (
            <Fragment>
              <Nav>
                <Nav.Link href="/login" onClick={handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Fragment>
          ) : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
