import React, { useContext, useEffect, useState } from 'react'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import AdminNavLeftPane from '../../components/navbar/AdminNavLeftPane';
import { useParams } from 'react-router-dom';
import UserContext from '../../context/AuthContext';

export default function AdminSpecificPerson({restaurants, getRestaurants}) {
    const adminUser = useContext(UserContext)
    const params = useParams();
    const [specificUser, setSpecificUser] = useState(null);

   
    const handleSpecificReviewOrder = () => {
      fetch("http://localhost:8080/api/user/" + params.id, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + adminUser.token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            setSpecificUser(data);
         
        })
     
    }


    useEffect(()=>{
        handleSpecificReviewOrder()
       getRestaurants()
    },[])

    if(!specificUser){
      return <div>Loading...</div>
    }
    
    
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
              <Table striped bordered hover className="text-center">
                <thead>
                  <tr>
                    <th>User Name</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Orders</th>
                    <th>Reviews</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{specificUser.username}</td>
                    <td>{specificUser.firstName}</td>
                    <td>{specificUser.lastName}</td>
                    <td>
                      {specificUser.orders.length === 0 ? (
                        <p>No orders.</p>
                      ) : (
                        <Table bordered hover className="">
                          <thead>
                            <tr>
                              <th>Order No.</th>
                              <th>Date</th>
                              <th>Restaurant</th>
                              <th>Items</th>
                              <th>Qty</th>
                              <th>Total Price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {specificUser.orders.map((order, index) => {
                              return (
                                <tr key={order.orderId}>
                                  <td>{index + 1}</td>
                                  <td>{order.orderDate}</td>
                                  <td>
                                    {
                                      restaurants[order.restaurantId - 1]
                                        ?.restaurantName
                                    }
                                  </td>
                                  <td>{order.orderItems}</td>
                                  <td>{order.itemQuantity}</td>
                                  <td>${order.totalPrice.toFixed(2)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      )}
                    </td>
                      <td>
                      {
                      specificUser.reviews.length === 0 ? (
                        <p>No reviews.</p>
                      ) : (
                        <Table bordered hover className="">
                          <thead>
                            <tr>
                              <th>Restaurant Name</th>
                              <th>Review</th>
                            </tr>
                          </thead>
                          <tbody>
                            {specificUser.reviews.map((review, index) => {
                              return (
                                <tr key={review.reviewId}>
                                  <td>{restaurants[review.restaurantId-1]?.restaurantName}</td>
                                  <td>{review.reviewText}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </Table>
                      )}{" "}
                      
                    </td>
                      
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
