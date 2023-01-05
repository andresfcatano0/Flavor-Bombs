import React from 'react';
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function NavBar(){
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt="brand logo"
                src={require("../../assets/primitiveSpongebob.png")}
                width="50"
                height="35"
                className="d-inline-block align-top"
              />{" "}
              Flavor Bombs
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#link">Order</Nav.Link>
                <Nav.Link href="#link">About Us</Nav.Link>
                <Nav.Link href="#link">Restaurants</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Nav.Link href="#deets">
                  Log In
                </Nav.Link>
                <Nav.Link href="#deets">Sign Up</Nav.Link>
                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </>
    );
}

