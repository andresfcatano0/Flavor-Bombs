import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/AuthContext'

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { BagCheckFill, Basket3Fill, BasketFill, ChatQuoteFill, Clipboard2Data, MenuDown, PeopleFill, Shop, Trash3 } from 'react-bootstrap-icons';
import ReviewsTable from '../components/adminTables/ReviewsTable';
import { Link } from 'react-router-dom';



export default function AdminPage({ restaurants, getRestaurants}) {
  const [allUser, setAllUser] = useState([]);

  const getAllOrders = () =>{
    fetch("http://localhost:8080/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + adminUser.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data);
        setAllUser(data);
      });
  }


  

  const [reviews, setReviews] = useState([]);
  const getAllReviews = () => {
    fetch("http://localhost:8080/api/review", {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res=> {
      return res.json()}
    ).then(data=>{
      // console.log(data)
      setReviews(data)
    })
  }

  useEffect(()=>{
    getAllReviews()
    getAllOrders()
  },[])

  const adminUser = useContext(UserContext);

    const deleteRestaurant = (restaurantId) => {
        if(window.confirm("Are you sure you want to delete this restaurant?")){

            fetch("http://localhost:8080/api/restaurant/"+restaurantId, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + adminUser.token
                }
          
            }).then(data => {
                // console.log(data);
                getRestaurants();
                if(data.statusCode === 204){
                  console.log("successfully deleted restaurant");
                }
                // console.log(data.statusCode)
            })
        }
        }

    const deleteReview = (reviewId) => {
        if(window.confirm("Are you sure you want to delete this review?")){

            fetch("http://localhost:8080/api/review/"+reviewId, {
                method: 'DELETE',
                headers: {
                    Authorization: "Bearer " + adminUser.token
                }
          
            }).then(data => {
                // console.log(data);
                
                if(data.statusCode === 204){
                  console.log("successfully deleted review");
                }
                
            })
        }
        }

        const [restaurantOrders, setRestaurantOrders] = useState([]);
        const getSpecificRestaurantForOrders = (restaurantId) => {
          fetch("http://localhost:8080/api/restaurant/"+restaurantId, {
            method: 'GET',
            headers:{
              "Content-Type": "application/json"
            }
          }).then(res => {
            return res.json()
          }).then(data => {
              getRestaurants()
              console.log(data)
          })
        }

        const [orders, setOrders] = useState([]);
        const getAllUserOrders = () => {
          fetch("http://localhost:8080/api/order/all", {
            method: "GET",
            headers: {
              Authorization: "Bearer " + adminUser.token,
            },
          })
            .then((res) => {
              return res.json();
            })
            .then((data) => {
              console.log(data);
              setOrders(data);
            });
        };

        useEffect(() => {
          getAllUserOrders();
        }, []);

        

 
  return (
    <>
      <Container className="d-flex mt-4">
        <Col lg={12}>
          <Tab.Container
            id="list-group-tabs-example"
            defaultActiveKey="#restaurant-table"
          >
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item
                    action
                    href="#restaurant-table"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <Shop />
                    <span>Restaurants</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link2"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <PeopleFill />
                    <span>Users</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link3"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <BasketFill />
                    <span>Orders</span>
                  </ListGroup.Item>

                  <ListGroup.Item
                    action
                    href="#link4"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ChatQuoteFill />
                    <span>Reviews</span>
                  </ListGroup.Item>
                  <Link to="/admin/dashboard-menu">
                    <ListGroup.Item
                      action
                      // href="/admin/dashboard-menu"
                      className="d-flex align-items-center justify-content-between"
                    >
                      <Clipboard2Data />
                      <span>Dashboard</span>
                    </ListGroup.Item>
                  </Link>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="#restaurant-table">
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
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{restaurant.restaurantName}</td>
                              <td>{restaurant.address}</td>
                              <td>{restaurant.description}</td>
                              <td className="d-flex justify-content-around">
                                <Button
                                  value={restaurant.restaurantId}
                                  onClick={() => {
                                    deleteRestaurant(restaurant.restaurantId);
                                  }}
                                  className="btn btn-danger d-flex align-items-center"
                                >
                                  <span className="px-2">Delete</span>
                                  <Trash3 />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        <tr></tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link2">
                    Users
                    <Table striped bordered hover className="text-center">
                      <thead>
                        <tr>
                          <th></th>
                          <th>User Name</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Email</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allUser.map((userInfo, index) => {
                          return (
                            <tr key={userInfo.appUserId}>
                              <td>{index + 1}</td>
                              <td>{userInfo.username}</td>
                              <td>{userInfo.firstName}</td>
                              <td>{userInfo.lastName}</td>
                              <td>{userInfo.email}</td>

                              <td className="d-flex justify-content-around">
                                <Button className="btn btn-danger d-flex align-items-center">
                                  <span className="px-2">Delete</span>
                                  <Trash3 />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        <tr></tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link3">
                    Orders
                    <Table striped bordered hover className="text-center">
                      <thead>
                        <tr>
                          <th></th>
                          <th>OrderId</th>
                          <th>Customer First Name</th>
                          <th>Customer Last Name</th>
                          <th>Restaurant Name</th>
                          <th>Order Items</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => {
                          return (
                            <tr key={order.orderId}>
                              <td>{index + 1}</td>
                              <td>{order.orderId}</td>
                              <td></td>
                              <td></td>
                              <td>
                                {
                                  restaurants[order.restaurantId - 1]
                                    .restaurantName
                                }
                              </td>
                              <td>{order.orderItems}</td>
                              <td className="d-flex justify-content-around">
                                <Button className="btn btn-danger d-flex align-items-center">
                                  <span className="px-2">Delete</span>
                                  <Trash3 />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        <tr></tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link4">
                    Reviews
                    {/* <ReviewsTable/> */}
                    <Table striped bordered hover className="text-center">
                      <thead>
                        <tr>
                          <th></th>
                          <th>User Name</th>
                          <th>Restaurant</th>
                          <th>Text</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log(restaurants)}
                        {reviews.map((review, index) => {
                          return (
                            <tr key={review.reviewId}>
                              <td>{index + 1}</td>
                              <td>{review.owner}</td>
                              <td>{review.restaurantId}</td>
                              <td>
                                {
                                  // restaurants[review.restaurantId - 1]
                                }
                              </td>
                              <td>{review.reviewText}</td>
                              <td className="d-flex justify-content-around">
                                <Button
                                  onClick={() => {
                                    deleteReview(review.reviewId);
                                  }}
                                  className="btn btn-danger d-flex align-items-center"
                                >
                                  <span className="px-2">Delete</span>
                                  <Trash3 />
                                </Button>
                              </td>
                            </tr>
                          );
                        })}
                        <tr></tr>
                      </tbody>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
      </Container>
    </>
  );
}
