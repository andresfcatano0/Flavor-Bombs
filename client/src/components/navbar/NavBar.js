import React, { useContext } from 'react';
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import UserContext from '../../context/AuthContext';
import AuthNavBar from './AuthNavBar';

export default function NavBar({setAuthUser}){

  const user = useContext(UserContext);

  

    return (
      <>
      {user ? <AuthNavBar setAuthUser={setAuthUser}/> : 
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
                {/* <Link to="/"> */}
                  {/* <Nav.Item>Home</Nav.Item> */}
                {/* </Link> */}
                <Nav.Link href="/">Home</Nav.Link>
                {/* <Link to="/about-us">
                  <Nav.Item>About Us</Nav.Item> */}
                  <Nav.Link href="/about-us">About Us</Nav.Link>
                {/* </Link> */}

                {/* <Nav.Item>
                <Link to="/restaurants">
                  Restaurants */}
                  <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                {/* </Link>
                </Nav.Item> */}
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
}
      </>
    );
}

