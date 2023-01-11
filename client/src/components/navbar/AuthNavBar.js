import React, { useContext } from "react";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Badge from "react-bootstrap/Badge";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useHistory } from "react-router-dom";
import { Cart3, PersonCircle } from "react-bootstrap-icons";
import UserContext from "../../context/AuthContext";
import CartContext from "../../context/cart/CartContext";
import { NavItem } from "react-bootstrap";

export default function AuthNavBar({setAuthUser}) {
  const history = useHistory();

  const user = useContext(UserContext);
  const {orderCartItems, clearCart} = useContext(CartContext);
  
  function handleLogout(){
    localStorage.removeItem("userData");
    clearCart();
    localStorage.removeItem("savedCart");
    setAuthUser(null);
    history.push("/");
  }

  // console.log(orderCartItems)

  let itemCount = orderCartItems.reduce((sum, item) => sum + item.quantity, 0);

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
                <Link  to="/">
              <Nav.Item className="nav-link">
                  Home
              </Nav.Item>
                </Link>
                <Link to="/about-us">
              <Nav.Item className="nav-link">
                  About Us
              </Nav.Item>
                </Link>
                <Link to="/orders">
              <Nav.Item className="nav-link">
                  Orders
              </Nav.Item>
                </Link>
                <Link to="/restaurants">
              <Nav.Item className="nav-link">
                  Restaurants
              </Nav.Item>
                </Link>
              
            </Nav>
            <Nav>
                <Link exact to="/shopping-cart" className="d-flex">
              <Nav.Item className="nav-link">
                  <Cart3 className="align-self-center" size={20} />
                  
                  {orderCartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {itemCount}
                    </Badge>
                  )}
              </Nav.Item>
                </Link>

              {/* <Nav.Link href={`/shopping-cart`} className="d-flex">
                
                {orderCartItems.length > 0 && (
                  <Badge pill bg="danger" className="align-self-start">
                    {itemCount}
                  </Badge>
                )}
                {/* <Badge pill bg="danger" className="align-self-start">
                   777777
                 </Badge> 
              </Nav.Link> 
                */}
              <Nav.Link href={`/user/:${user.userData.sub}`}>
                <PersonCircle size={30} />
              </Nav.Link>
              <NavDropdown className="" title="" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Account</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Orders</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  Logout {user.userData.sub}
                </NavDropdown.Item>
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
