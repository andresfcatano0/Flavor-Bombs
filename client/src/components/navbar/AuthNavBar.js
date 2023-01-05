import React from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { PersonCircle } from "react-bootstrap-icons";

export default function AuthNavBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <img
                alt="brand logo"
                src={require("../../assets/primitiveSpongebob.png")}
                width="50"
                height="35"
                className="d-inline-block align-top"
              />{" "}
              Flavor Bombs
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item as="li">
                <Link to="/">
                  <Nav.Link>Home</Nav.Link>
                </Link>
              </Nav.Item>
              <Link to="/orders">
                <Nav.Link>Orders</Nav.Link>
              </Link>
              <Link to="/about-us">
                <Nav.Link>About Us</Nav.Link>
              </Link>
              <Link>
                <Nav.Link to="/restaurants">Restaurants</Nav.Link>
              </Link>
            </Nav>
            <Nav>
              <Nav.Link>
                <PersonCircle size={30} />
              </Nav.Link>
              <NavDropdown className="" title="" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
              </NavDropdown>

              {/* <Link to="/signup">
                  <Nav.Link>Sign Up</Nav.Link>
                </Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
