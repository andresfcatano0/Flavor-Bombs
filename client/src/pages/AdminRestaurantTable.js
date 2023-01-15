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


export default function AdminRestaurantTable({show, handleClose, handleShow, restaurants, deleteRestaurant}) {
  

  let restaurantModal = {
    restaurantId: 0,
    restaurantName: ""
  }

  let [restaurantSavedState, setRestaurantSavedState] = useState({restaurantModal});

  const handleModal = (event) => {
    // console.log(event.target.id)
   let found = restaurants.filter(r=> r.restaurantId == event.target.value)
  //  console.log(found[0].restaurantName)
    let savedR = {
      restaurantId: event.target.value,
      restaurantName: found[0].restaurantName
    };
    setRestaurantSavedState(savedR)
    handleShow()


  }

  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th></th>
          <th>Restaurant Name</th>
          <th>Restaurant Address</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {restaurants.map((restaurant, index) => {
          return (
            <tr key={restaurant.restaurantId}>
              <td>{index + 1}</td>
              <td>{restaurant.restaurantName}</td>
              <td>{restaurant.address}</td>
              <td>{restaurant.description}</td>
              <td className="d-flex justify-content-around">
                <Button
                  value={restaurant.restaurantId}
                  id={restaurant.restaurantId}
                  onClick={(event) => {
                    // deleteRestaurant(restaurant.restaurantId);
                    handleModal(event);
                  }}
                  className="btn btn-danger d-flex align-items-center"
                > Delete
                  {/* <span value={restaurant.restaurantId} className="px-2">
                    Delete
                  </span>
                  <Trash3 /> */}
                </Button>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Delete Restaurant</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete {restaurantSavedState.restaurantName}?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        deleteRestaurant(
                          restaurantSavedState.restaurantId
                        );
                      }}
                    >
                      Delete
                    </Button>
                  </Modal.Footer>
                </Modal>
              </td>
            </tr>
          );
        })}
        <tr></tr>
      </tbody>
    </Table>
  );
}
