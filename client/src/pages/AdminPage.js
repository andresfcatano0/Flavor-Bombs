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
import { Link, useHistory } from 'react-router-dom';
import AdminRestaurantTable from './AdminRestaurantTable';
import AdminUsersTable from './AdminUsersTable';



export default function AdminPage({ restaurants, getRestaurants}) {
  const userInfo = useContext(UserContext);
  const history = useHistory();

  const [allUser, setAllUser] = useState([]);

  const getAllUsers = () =>{
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
    getAllUsers()
    getAllReviews()
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
              // console.log(data)
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
              // console.log(data);
              // for (let i = 0; i < allUser.length; i++) {
              //   for (let j = 0; j < allUser[i].length; j++) {
              //     if (allUser[i].orders[j].orderId === data[j].orderId) {
              //       data.owner = allUser[i];
              //     }
              //   }
              // }
              setOrders(data);
            });
        };

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
              history.push("/admin/table-view#link5");
              setSpecificUser(data);
            });
        }

        useEffect(() => {
          getAllUserOrders();
          // handleSpecificReviewOrder(3);
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
                  <ListGroup.Item
                    action
                    href="#link5"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <ChatQuoteFill />
                    <span>Specific User</span>
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
                    <AdminRestaurantTable
                      restaurants={restaurants}
                      deleteRestaurant={deleteRestaurant}
                    />
                  </Tab.Pane>

                  <Tab.Pane eventKey="#link2">
                    Users
                    <AdminUsersTable
                      allUser={allUser}
                      handleSpecificReviewOrder={handleSpecificReviewOrder}
                    />
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
                        {/* {console.log(handleSpecificReviewOrder(2))} */}

                        {/* (handleSpecificReviewOrder(userInfo.appUserId).username) */}
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
                        {/* {console.log(restaurants)} */}
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
                  <Tab.Pane eventKey="#link5">
                    Specific User
                    {/* <ReviewsTable/> */}
                    <Table striped bordered hover className="text-center">
                      <thead>
                        <tr>
                          <th>User Name</th>
                          <th>First Name</th>
                          <th>Last Name</th>
                          <th>Orders</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{specificUser.username}</td>
                          <td>{specificUser.firstName}</td>
                          <td>{specificUser.lastName}</td>
                          <td>
                            <th>OrderId</th>
                            <th>Order Items</th>
                            <th>Qty</th>
                            <th>Order Date</th>
                            <td>Total Price</td>
                            <th>Restaurant Name</th>
                            {specificUser.orders?.map((o, index) => (
                              <>
                                <tbody>
                                  <tr>
                                    <td key={o.orderId}>{index + 1}</td>
                                    <td>{o.orderItems}</td>
                                    <td>{o.itemQuantity}</td>
                                    <td>{o.orderDate}</td>
                                    <td>{o.totalPrice}</td>
                                    <td>
                                      {
                                        restaurants[o.restaurantId]
                                          .restaurantName
                                      }
                                    </td>
                                    <hr />
                                  </tr>
                                </tbody>
                              </>
                            ))}
                          </td>
                          <td>
                            <th>#</th>
                            <th>Review Text</th>
                            <th>Restaurant Name</th>

                            {specificUser.reviews?.map((r, index) => (
                              <>
                                <tbody>
                                  <tr>
                                    <td key={r.reviewId}>{index + 1}</td>
                                    <td>{r.reviewText}</td>
                                    <td>
                                      {
                                        restaurants[r.restaurantId]
                                          .restaurantName
                                      }
                                    </td>
                                    <hr />
                                  </tr>
                                </tbody>
                              </>
                            ))}
                          </td>

                          {/* <td>
                          { console.log(specificUser.orders[0].orderItems)
}
                          </td> */}
                          <td>{}</td>
                        </tr>
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
