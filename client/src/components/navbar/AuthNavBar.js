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

export default function AuthNavBar({setAuthUser}) {
  const history = useHistory();

  const user = useContext(UserContext);
  
  function handleLogout(){
    localStorage.removeItem("userData");
    setAuthUser(null);
    history.push("/");
  }

  const {orderCartItems} = useContext(CartContext);
  // console.log(orderCartItems)

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
              {/* <Nav.Item as="li">
                <Link to="/" style={{textDecoration:"none"}}>Home */}
              {/* <Nav.Link>Home</Nav.Link> */}
              {/* </Link>
              </Nav.Item> */}
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about-us">About Us</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
              <Nav.Link href="/restaurants">Restaurants</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href={`/shopping-cart`} className="d-flex">
                <Cart3 className="align-self-center" size={20} />
                {/* {orderCartItems.length > 0 ? (<Badge pill bg="danger" className="align-self-start">
                  {orderCartItems.length}
                </Badge>) : null} */}
                {orderCartItems.length > 0 && (
                  <Badge pill bg="danger" className="align-self-start">{orderCartItems.length}</Badge>
                )}
                {/* <Badge pill bg="danger" className="align-self-start">
                   777777
                 </Badge> */}
              </Nav.Link>
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
