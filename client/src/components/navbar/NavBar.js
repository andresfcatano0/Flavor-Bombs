import React, { useContext } from 'react';
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import UserContext from '../../context/AuthContext';
import AuthNavBar from './AuthNavBar';
import AdminNavBar from './AdminNavBar';

export default function NavBar({setAuthUser}){

  const user = useContext(UserContext);

  //  console.log(user.userData.roles[0].authority)

    return (
      <>
        {!user ? (
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
                  <Nav.Link href="/">Home</Nav.Link>

                  <Nav.Link href="/about-us">About Us</Nav.Link>

                  <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                </Nav>
                <Nav>
                  <Link to="/login">
                    <Button>Log In</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        ) : user.userData.roles[0].authority === "ROLE_ADMIN" ? (
          <AdminNavBar setAuthUser={setAuthUser} />
        ) : (
          <AuthNavBar setAuthUser={setAuthUser} />
        )}

        {/* { user.userData.roles[0].authority === "ROLE_ADMIN" ? (
          <AdminNavBar setAuthUser={setAuthUser} />
        ) : user.userData.roles[0].authority === "ROLES_USER" ? (
          <AuthNavBar setAuthUser={setAuthUser} />
        ) : (
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
                  <Nav.Link href="/">Home</Nav.Link>

                  <Nav.Link href="/about-us">About Us</Nav.Link>

                  <Nav.Link href="/restaurants">Restaurants</Nav.Link>
                </Nav>
                <Nav>
                  <Link to="/login">
                    <Button>Log In</Button>
                  </Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )} */}
        {/* {user ? (
          <AuthNavBar setAuthUser={setAuthUser} />
        ) : (
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
                 
                   <Nav.Link href="/">Home</Nav.Link>
                  
                   <Nav.Link href="/about-us">About Us</Nav.Link> 
                

                  
                  <Nav.Link href="/restaurants">Restaurants</Nav.Link>
              
             
                </Nav>
                <Nav>
                  <Link to="/login">
                    <Button>Log In</Button>
                  </Link>
                  
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        )} */}
      </>
    );
}

