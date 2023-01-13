import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Image from "react-bootstrap/Image";
import { DashCircle, DashCircleFill, PlusCircle, PlusCircleFill, Trash, Trash2Fill, Trash3Fill, TrashFill } from 'react-bootstrap-icons'
import CartContext from '../context/cart/CartContext'
import { Link } from 'react-router-dom'
import UserContext from '../context/AuthContext'
import LoaderEat from '../components/loadingComponents/LoaderEat'

export default function OrdersCartPage({restaurants}) {
  const userInfo = useContext(UserContext);
  
  const [isLoading, setIsLoading] = useState(false);

  const {
    orderCartItems,
    clearCart,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  
  const handleCheckoutOrder = async () => {
    const checkoutItem = [
      {filterTags: "",
      itemDescription:"", 
      itemImage:"",
      itemName:"",
      itemPrice:  0.00,
      menuId: 0,
      quantity: 0,
      restaurantId: 0}
    ]

    let checkOutOrder = [...orderCartItems];
    
      await fetch("http://localhost:8080/api/checkout", {
        method: "POST",
        headers:{
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "Bearer " + userInfo.token
        },
        body: JSON.stringify(checkOutOrder)

      }).then((res)=> {
        clearCart()
          return res.json().then((error)=> {
            console.log(error);
          })

        // if(res.statusCode >= 400){
        // }
        // console.log("successfully passed to back")
      })
      // clearCart();

  }

   let total = orderCartItems.reduce(
     (sum, item) => sum+item.itemPrice * item.quantity, 0
   );

  //  let restaurantNamesArray = orderCartItems.map((o,index) => {
  //                   return (
  //                      restaurants[o.restaurantId].restaurantName
  //                   )
  //                 })
  //                 let restaurantUniqueNameArray = [
  //                   ...new Set(restaurantNamesArray),
  //                 ];
  //                 if(restaurantUniqueNameArray.length > 0){
  //                   restaurantUniqueNameArray = restaurantUniqueNameArray.join(", ")
  //                 }
                    

  return (
    <Container className="mt-3">
      <h2 className="text-center mb-4">Order Summary</h2>
      {/* {handleCheckoutOrder && (
        <p>
          Thank you for ordering
          <Link to="/">
            <button onClick={clearCart}>Continue Ordering</button>
          </Link>
        </p>
      )} */}

      {/* If cart is empty, show no items in cart message, otherwise show items */}
      {orderCartItems.length === 0 ? (
        <div>
          <h5 className="text-center mt-3">
            Cart is empty...
            <span>
              Head to your orders page or grab some food from the Restaurants
              page
            </span>
          </h5>
          <LoaderEat />
        </div>
      ) : (
        <Row className="d-flex justify-content-between">
          <Col xs={8} className="me-5">
            <Table hover>
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="">
                {orderCartItems.map((item) => (
                  <tr key={item.menuId} className="">
                    <td>
                      <img
                        height="65"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          borderRadius: "2px",
                        }}
                        className="d-inline-block align-top"
                        src={item.itemImage}
                      />
                    </td>
                    <td>{item.itemName}</td>
                    <td>{item.itemDescription}</td>
                    <td>${item.itemPrice.toFixed(2)}</td>
                    <td className="">
                      {/* <Button
                        className="btn-success py-auto"
                        size="sm"
                        style={{ fontSize: "10px" }}
                        onClick={() => increaseQuantity(item)}
                      > */}
                      <PlusCircleFill
                        style={{
                          fontSize: "15px",
                          color: "#198754",
                          cursor: "pointer"
                        }}
                        onClick={() => increaseQuantity(item)}
                      />{" "}
                      {/* </Button> */}
                      <span>{item.quantity}</span>{" "}
                      {item.quantity > 1 && (
                        // <Button
                        //   className="btn-secondary"
                        //   size="sm"
                        //   style={{ fontSize: "10px" }}
                        //   onClick={() => decreaseQuantity(item)}
                        // >
                        <DashCircleFill
                          style={{
                            fontSize: "15px",
                            color: "#6c757d",
                            cursor: "pointer",
                            // padding: "3px",
                            // borderRadius: "5px",
                            // color: "white",
                          }}
                          onClick={() => decreaseQuantity(item)}
                        />
                        // </Button>
                      )}{" "}
                      {item.quantity === 1 && (
                        // <Button
                        //   className="btn-danger d-flex align-items-center justify-content-center"
                        //   size="sm"
                        //   style={{ padding: "3px"}}
                        //   onClick={() => removeItemFromCart(item)}
                        // >
                        <Trash3Fill
                          // className="btn "
                          style={{
                            fontSize: "17px",
                            // backgroundColor: "#dc3545",
                            // padding: "3px",
                            marginBottom:"4px",
                            borderRadius: "5px",
                            color: "#dc3545",
                            cursor: "pointer",
                          }}
                          onClick={() => removeItemFromCart(item)}
                        />
                        //  </Button>
                      )}
                    </td>
                    <td>${(item.itemPrice * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}

               
              </tbody>
            </Table>
          </Col>

          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>CART</Card.Title>
                {/* <Card.Subtitle className="mb-2 text-muted">
                  From
                  {" "}
                  {restaurantUniqueNameArray}
                </Card.Subtitle> */}
                <Card.Text className="fw-bolder">
                  Total: ${total.toFixed(2)}
                </Card.Text>
                {orderCartItems.length > 0 && (
                  <div>
                    <Button className="me-4" onClick={handleCheckoutOrder}>
                      Checkout Now
                    </Button>

                    <Button className="btn-danger" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
