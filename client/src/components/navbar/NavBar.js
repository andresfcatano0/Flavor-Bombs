import React from 'react';
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';

export default function NavBar(){
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
                  <Link exact to="/">
                    <Nav.Link>Home</Nav.Link>
                  </Link>
                </Nav.Item>
                <Link to="/about-us">
                  <Nav.Link>About Us</Nav.Link>
                </Link>
                <Link>
                  <Nav.Link to="/restaurants">Restaurants</Nav.Link>
                </Link>
              </Nav>
              <Nav>
                <Link to="/login">
                    <Button>Log In</Button>
                </Link>
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

