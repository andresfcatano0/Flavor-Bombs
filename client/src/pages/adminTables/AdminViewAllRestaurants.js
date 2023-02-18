import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import {
  Cart2,
  Clipboard2Data,
  CreditCardFill,
  People,
  PeopleFill,
  Shop,
  ShopWindow,
} from "react-bootstrap-icons";
import UserContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import AdminRestaurantTable from "../AdminRestaurantTable";
import AdminNavLeftPane from "../../components/navbar/AdminNavLeftPane";

export default function AdminViewAllRestaurants({ restaurants, getRestaurants, menus, allUsers }) {
    const user = useContext(UserContext);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [allOrders, setAllOrders] = useState([]);
    const getAllOrders = () => {
      fetch("http://localhost:8080/api/order/all", {
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

    useEffect(() => {
      getAllOrders();
    }, []);

    const deleteRestaurant = (restaurantId) => {
      // if (window.confirm("Are you sure you want to delete this restaurant?")) {
        fetch("http://localhost:8080/api/restaurant/" + restaurantId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }).then((data) => {
          // console.log(data);
          getRestaurants();
          handleClose();
          if (data.statusCode === 204) {
            console.log("successfully deleted restaurant");
          }
          // console.log(data.statusCode)
        });
      // }
    };

  return (

    <Container fluid className="mt-3">
      {/* Left Pane - Menu */}
      <Row>
        <Col>
          <AdminNavLeftPane/>
        </Col>

        {/* Right Pane - Content */}
        <Col xs={10}>
          <Row>
            <Col>
              <AdminRestaurantTable 
              deleteRestaurant={deleteRestaurant}
              restaurants={restaurants}
              show={show}
              handleClose={handleClose}
              handleShow={handleShow} 
            //   deleteRestaurant={deleteRestaurant}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
