import React from 'react';
import "./AdminNavBar.css";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavItem from "react-bootstrap/NavItem";

export default function AdminNavBar() {
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
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav"> */}
          <Nav className="justify-content-end">
            <img 
              alt="profile avatar"
              id="user-profile-avatar"
              src="https://robohash.org/admin.pngProfile?size=50x50" 
            />
            <NavItem>
              <NavDropdown
                className=""
                title=""
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Users</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Orders</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">
                  Restaurants
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.5">Logout</NavDropdown.Item>
              </NavDropdown>
            </NavItem>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </>
  );
}
