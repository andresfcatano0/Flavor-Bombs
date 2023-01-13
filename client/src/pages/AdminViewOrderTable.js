import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/AuthContext";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import {
  BagCheckFill,
  Basket3Fill,
  BasketFill,
  ChatQuoteFill,
  Clipboard2Data,
  MenuDown,
  PeopleFill,
  Shop,
  Trash3,
} from "react-bootstrap-icons";
import ReviewsTable from "../components/adminTables/ReviewsTable";
import { Link } from "react-router-dom";

export default function AdminViewOrderTable({restaurants, allOrders}) {
    const user = useContext(UserContext);

    const [specificUser, setSpecificUser] = useState({});
    const handleSpecificReviewOrder = (userId) => {
      fetch("http://localhost:8080/api/user/" + userId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + user.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpecificUser(data);
        });
    };

   
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th>OrderId</th>
          <th>Order Items</th>
          <th>Last Name</th>
          <th>Orders</th>
          <th>Actions</th>
        </tr>
      </thead>
        {/* {Array.from({ 
            length: allOrders.length 
        }).map((_, index) => (
            {handleSpecificReviewOrder(index)} )} */}
        <tbody>
            
        </tbody>


    
            
    </Table>
  );
}
