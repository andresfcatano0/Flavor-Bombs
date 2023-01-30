import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import { useHistory, useParams } from "react-router-dom";
import ReviewCard from '../components/ReviewCard';
import MenuCard from '../components/MenuCard';
import CartContext from '../context/cart/CartContext';
import { DashCircle, PlusCircle, PlusCircleFill, Trash } from 'react-bootstrap-icons';
import UserContext from '../context/AuthContext';
import LoadOneMap from '../components/LoadOneMap';

export default function RestaurantInfoPage({ restaurants, getRestaurants, menus }) {

  const userInfo = useContext(UserContext);

  const history = useHistory();

  const [menu, setMenu] = useState([]);
  const params = useParams();
  const [specificRestaurant, setSpecificRestaurant] = useState({});
  const [usersThatDoneReviews, setUsersThatDoneReviews] = useState([]);

  let found = menus.filter(m => {
    return (m.restaurantId == params.id)
  })

  const {
    addItemToCart,
    increaseQuantity,
    decreaseQuantity,
    removeItemFromCart,
    orderCartItems
  } = useContext(CartContext);

  // return orderCartItems?.find((item) => item.menuId === menuItems.menuId);
  const isItemInCart = (menuItems) => {
    return orderCartItems.find((item) => item.menuId == menuItems.menuId) !== undefined;
  };

  const getSpecificRestaurant = () => {
    fetch(`http://localhost:8080/api/restaurant/${params.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        setSpecificRestaurant(data);
      });
  };

  // const getMenuByRestaurant = async () => {
  //   await fetch("http://localhost:8080/api/menu", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       let specificMenu = data.filter((d) => {
  //         return d.restaurantId.toString() == params.id.toString();
  //       });
  //       // console.log(data);
  //       setMenu(specificMenu);
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const getUsers = () => {
  //   fetch("http://localhost:8080//api/user", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json"
  //     }
  //   }
  //   );
  // }

  const [reviews, setReviews] = useState([]);
  const getReviewPerRestaurant = () => {
    fetch("http://localhost:8080/api/review", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log(data)
        // for(let i = 0; i<data.length;i++){
        //   if (data[i].restaurantId === params.id) {
        //     setReviews(data[i]);
        //   }
        // }
        let specificReviews = data.filter((d) => {
          return d.restaurantId.toString() === params.id.toString();
        });
        setReviews(specificReviews);
        // console.log(specificReviews)
      });
  };

  const [fullUserData, setFullUserData] = useState({});

  const getCurrentUserInfo = () => {
    fetch("http://localhost:8080/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let findOwnerOfReview;
        for(let d of data){
          if(d.reviewId === specificRestaurant.reviewId){
            findOwnerOfReview = d;
          }
        }
        
      });
  };


   const redirectionToLogin = () => {
      history.push("/login");
   }

  

  useEffect(() => {
    getSpecificRestaurant();
    // getMenuByRestaurant();
    getReviewPerRestaurant();
  }, []);

  return (
    // <div className="mt-4 flex-column text-center">
    <div id="food-background" style={{ height: "100%" }}>
      <div>
        {/* <LoadOneMap
        getSpecificRestaurant={getSpecificRestaurant}
        specificRestaurant
      ={specificRestaurant}/> */}
      </div>
      <div className="mt-4 mx-4" key={specificRestaurant.restaurantId}>
        <div className="text-center">
          <img
            src={specificRestaurant.restaurantImage}
            style={{ height: "300px", width: "350px", objectFit: "cover" }}
          />
        </div>
        {/* <Container> */}
        <Row className="d-flex justify-content-between mt-2">
          <Col className='text-start'>

            <h3
              style={{
                backgroundColor: "white"
              }}
            >
              {specificRestaurant.restaurantName}
            </h3>
            <span>{specificRestaurant.description}</span>
          </Col>
          <Col className="d-flex flex-column text-end ">
           
            <span className="text-muted mb-auto">
              Address: {specificRestaurant.address}
            </span>
            <span className="text-muted">
              Hours: {specificRestaurant.openHours}
            </span>
          </Col>
        </Row>
        {/* </Container> */}
        <br />
        <br />
        <hr />
        <Row>
          <ReviewCard
            reviews={reviews}
            specificRestaurant={specificRestaurant}
          />
        </Row>
        <hr />
        <div>
          <h4>Menu</h4>

          {found.map((m) => {
            return (
              <Container
                key={m.menuId}
                className="mb-4 pe-5"
                style={{
                  backgroundColor: "lightGrey",
                  width: "90vw",
                  borderRadius: "1rem",
                }}
              >
                <Row>
                  <Col>
                    <img
                      width={"350px"}
                      height={"200px"}
                      style={{ borderRadius: "1.7rem", objectFit: "cover" }}
                      className="p-2, my-3"
                      src={m.itemImage}
                    />
                  </Col>
                  <Col className="d-flex">
                    <Row>
                      <h5 className="mt-3 ">
                        {m.itemName} - <span>${m.itemPrice.toFixed(2)}</span>
                      </h5>
                      <p>{m.itemDescription}</p>
                    </Row>
                    <Row className="align-items-end mb-3">
                      {/* {isItemInCart(m) && (
                        <Button
                          onClick={() => {
                            increaseQuantity(m);
                          }}
                        >
                          <PlusCircle /> Add More
                        </Button>
                      )} */}
                      {isItemInCart(m) && (
                        <>
                          <Button
                            onClick={() => {
                              increaseQuantity(m);
                            }}
                          >
                            <PlusCircleFill />
                          </Button>
                        </>
                      )}

                      {/* <Button
                        className="btn-success"
                        onClick={() => increaseQuantity(item)}
                      >
                        <PlusCircleFill />
                      </Button>
                      <span>{item.quantity}</span> */}

                      {/* <Button className="">Order Now</Button> */}
                      {userInfo ? (
                        !isItemInCart(m) && (
                          <Button
                            onClick={() => {
                              addItemToCart(m);
                            }}
                          >
                            Order Now
                          </Button>
                        )
                      ) : (
                        <Button
                          onClick={() => {
                            redirectionToLogin();
                          }}
                        >
                          Order Now
                        </Button>
                      )}
                      {/* {!isItemInCart(m) && (
                        <Button
                          onClick={() => {
                            addItemToCart(m);
                          }}
                        >
                          Order Now
                        </Button>
                      )} */}

                      {/* If item is not in cart show order now button then change to other button above */}
                      {/* {!isItemInCart(m) && (
                        <Button
                          onClick={() => {
                            addItemToCart(m);
                          }}
                        >
                          Order Now
                        </Button>
                      )}
                      {console.log(handleTotals)} */}
                    </Row>
                  </Col>
                </Row>
              </Container>
            );
          })}
        </div>
      </div>
    </div>
  );
}
