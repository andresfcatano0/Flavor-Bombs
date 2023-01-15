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
import { Link, useHistory } from "react-router-dom";
import AdminRestaurantTable from "../AdminRestaurantTable";
import AdminNavLeftPane from "../../components/navbar/AdminNavLeftPane";
import AdminUsersTable from "../AdminUsersTable";

export default function AdminViewAllUsers({allUsers, getAllUsers}) {
  const history = useHistory();
     const user = useContext(UserContext);

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

    //  const [specificUser, setSpecificUser] = useState({});
    //  const handleSpecificReviewOrder = (userId) => {
    //    fetch("http://localhost:8080/api/user/" + userId, {
    //      method: "GET",
    //      headers: {
    //        Authorization: "Bearer " + user.token,
    //      },
    //    })
    //      .then((res) => res.json())
    //      .then((data) => {
    //        console.log(data);
    //        setSpecificUser(data);
    //       });
    //       history.push("/admin/view-all-orders");
    //  };

    const deleteUser = (userId) => {
        fetch("http://localhost:8080/api/user/" + userId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + user.token,
          },
        }).then((data) => {
          // console.log(data);
          getAllUsers();
          handleClose();
          if (data.statusCode === 204) {
            console.log("successfully deleted user");
          }
          // console.log(data.statusCode)
        });
    };
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
              <AdminUsersTable
                allUsers={allUsers}
                deleteUser={deleteUser}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
                // handleSpecificReviewOrder={handleSpecificReviewOrder}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
