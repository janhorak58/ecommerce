import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'

function Header() {
  return (
    <header>
      <Navbar expand="lg" variant="dark" bg="info" collapseOnSelect>
        <Container className="py-4">
        <LinkContainer to ="/">
        <Navbar.Brand>MyExampleShop</Navbar.Brand>
        </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
          <LinkContainer to ="/cart">
                <Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
          </LinkContainer>
          <LinkContainer to ="/login">
                <Nav.Link><i className="fas fa-user"></i> Log In</Nav.Link>
          </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
