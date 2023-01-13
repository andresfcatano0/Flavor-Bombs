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
import OrdersCartPage from "./OrdersCartPage";

export default function AdminViewOrderTable({allUsers, getAllOrders, deleteOrder, restaurants, allOrders}) {
    const adminUser = useContext(UserContext);

    console.log(allOrders)

    const [specificUser, setSpecificUser] = useState({});
    const handleSpecificReviewOrder = (userId) => {
      fetch("http://localhost:8080/api/user/" + userId, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + adminUser.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setSpecificUser(data);
        });
    };



    useEffect(()=> {
        console.log(handleSpecificReviewOrder(1))

    },[])

   
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th></th>
          <th>Date</th>
          <th>Order Items</th>
          <th>Restaurants</th>
          <th>Quantity</th>
          <th>Total Price</th>
          <th>Actions</th>
        </tr>
      </thead>
        {/* {Array.from({ 
            length: allOrders.length 
        }).map((_, index) => (
            {handleSpecificReviewOrder(index)} )} */}
        <tbody className="text-center">
            {/* {allUsers.map((user)=> {
                return (
                <tr key={user.appUserId}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                    {allOrders.map((o, index)=> {
                        return (
                            <td>{o.orderId} </td>
                        )
                    })}
                </tr>

                )
            })} */}

           {allOrders.map((o, index)=> {
            return (
              <tr key={o.orderId}>
                <td>{index + 1}</td>
                <td>{o.orderDate}</td>
                <td>{o.orderItems}</td>
                <td>{restaurants[o.restaurantId].restaurantName}</td>
                <td>{o.itemQuantity}</td>
                <td>${o.totalPrice.toFixed(2)}</td>
                <td>
                  <Button
                    value={o.restaurantId}
                    onClick={() => {
                      deleteOrder(o.restaurantId);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
           })}
        </tbody>


    
            
    </Table>
  );
}
