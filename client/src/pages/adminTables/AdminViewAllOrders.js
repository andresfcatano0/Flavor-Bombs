import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AdminNavLeftPane from "../../components/navbar/AdminNavLeftPane";
import AdminViewOrderTable from "../AdminViewOrderTable";
import UserContext from "../../context/AuthContext";

export default function AdminViewAllOrders({allUsers, restaurants,getRestaurants,specificUser,handleSpecificReviewOrder}) {
  const adminUser = useContext(UserContext);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ALL ORDERS
  const [allOrders, setAllOrders] = useState([]);

  const getAllOrders = async () => {
    await fetch("http://localhost:8080/api/order/all", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + adminUser?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllOrders(data);
      });
  };

  useEffect(()=>{
    getAllOrders()
  })

  const deleteOrder = (orderId) => {
    fetch("http://localhost:8080/api/order/" + orderId, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + adminUser.token,
      },
    }).then((data) => {
      // console.log(data);
      getAllOrders();
      handleClose();
      if (data.statusCode === 204) {
        console.log("successfully deleted order");
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
              <AdminViewOrderTable
                allOrders={allOrders}
                allUsers={allUsers}
                deleteOrder={deleteOrder}
                restaurants={restaurants}
                getAllOrders={getAllOrders}
                specificUser={specificUser}
                handleSpecificReviewOrder={handleSpecificReviewOrder}
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
