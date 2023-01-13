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
import AdminNavLeftPane from "../../components/navbar/AdminNavLeftPane";
import AdminViewOrderTable from "../AdminViewOrderTable";
import UserContext from "../../context/AuthContext";

export default function AdminViewAllOrders({allOrders, restaurants,getRestaurants,specificUser,handleSpecificReviewOrder}) {
  const adminUser = useContext(UserContext);


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
              <AdminViewOrderTable 
              allOrders={allOrders}
              // orders={orders} 
              restaurants={restaurants}
              // getAllOrders={getAllOrders}
              specificUser={specificUser}
              handleSpecificReviewOrder={handleSpecificReviewOrder}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
