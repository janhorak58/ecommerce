import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";


function Header() {
  return (
    <header>
      <Navbar expand="lg" variant="dark" bg="info" collapseOnSelect>
        <Container className="py-4">
          <Navbar.Brand href="/">MyExampleShop</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
              <Nav.Link href="/login"><i className="fas fa-user"></i> Log In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
