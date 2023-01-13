import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { Cart2, Clipboard2Data, CreditCardFill, People, PeopleFill, Shop, ShopWindow } from 'react-bootstrap-icons';
import UserContext from '../context/AuthContext';
import { Link } from 'react-router-dom';
import AdminNavLeftPane from '../components/navbar/AdminNavLeftPane';


export default function AdminDashboard({ setAuthUser, restaurants, menus, allUsers }) {
  const user = useContext(UserContext);

  const [allOrders, setAllOrders] = useState([]);

  const getAllOrders = async () => {
    await fetch("http://localhost:8080/api/order/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + user.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setAllOrders(data);
      });
  };

  useEffect(()=> {
    getAllOrders()
  },[])


  return (
    <Container fluid className="mt-3">
      {/* Left Pane - Menu */}
      <Row>
        <Col>
          <AdminNavLeftPane />
        </Col>

        {/* Right Pane - Content */}
        <Col xs={10}>
          <Row>
            <Col>
              <h2>
                Welcome,{" "}
                {
                  // user.userData.sub
                  user.userData.sub.charAt(0).toUpperCase() +
                    user.userData.sub.slice(1)
                }
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className=" text-muted">USERS</Card.Title>
                  <Card.Subtitle className="mb-2 fs-2 fw-semibold">
                    {allUsers.length}
                  </Card.Subtitle>
                  <Card.Text>
                    Admins can view and delete registered users.
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <Link
                      to="/admin/view-all-users"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#999" }}
                    >
                      See all user information
                    </Link>
                    <PeopleFill style={{ color: "darkred" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className=" text-muted">RESTAURANTS</Card.Title>
                  <Card.Subtitle className="mb-2 fs-2 fw-semibold">
                    {restaurants.length}
                  </Card.Subtitle>
                  <Card.Text>Admins can view and delete restaurants</Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <Link
                      to="/admin/view-all-restaurants"
                      // <Card.Link
                      //   href="#"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#999" }}
                    >
                      See all restaurants
                    </Link>
                    {/* </Card.Link> */}
                    <Shop style={{ color: "indigo" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className=" text-muted">ORDERS</Card.Title>
                  <Card.Subtitle className="mb-2 fs-2 fw-semibold">
                    {allOrders.length}
                  </Card.Subtitle>
                  <Card.Text>
                    Admins can view all orders made and delete them for restaurants
                  </Card.Text>
                  
                  <div className="d-flex align-items-center justify-content-between">
                    <Link
                      to="/admin/view-all-orders"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#999" }}
                    >
                      See all orders
                    </Link>
                    <CreditCardFill style={{ color: "#DAA520" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}