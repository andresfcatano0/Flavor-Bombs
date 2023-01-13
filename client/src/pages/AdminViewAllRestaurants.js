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
import UserContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import AdminRestaurantTable from "./AdminRestaurantTable";
import AdminNavLeftPane from "../components/navbar/AdminNavLeftPane";

export default function AdminViewAllRestaurants({ restaurants, menus, allUsers }) {
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

    useEffect(() => {
      getAllOrders();
    }, []);

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
              restaurants={restaurants} 
            //   deleteRestaurant={deleteRestaurant}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
