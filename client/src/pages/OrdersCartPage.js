import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Image from "react-bootstrap/Image";
import { DashCircle, PlusCircle, PlusCircleFill, Trash, Trash2Fill } from 'react-bootstrap-icons'
import CartContext from '../context/cart/CartContext'
import { Link } from 'react-router-dom'
import UserContext from '../context/AuthContext'

export default function OrdersCartPage() {
  const userInfo = useContext(UserContext);
  // const [quantity, setQuantity] = useState(1);

  // const handleQuantity = (type) => {
  //     if(type === "decrease"){
  //         quantity > 1 && setQuantity(quantity - 1);
  //     }
  //     else{
  //         setQuantity(quantity + 1);
  //     }
  // }

  const {
    orderCartItems,
    clearCart,
    removeItemFromCart,
    increaseQuantity,
    decreaseQuantity
  } = useContext(CartContext);

  const newlyMadeOrder = {
    orderItems: "",
    userId: "",
    restaurantId: "",
    orderDate: "",
    itemQuantity: "",
    totalPrice: "",
  };

  const [newOrder, setNewOrder] = useState({newlyMadeOrder})

  const completeOrder = () => {
    fetch("http://localhost:8080/api/order", {
      method: "POST",
      headers:{
        Authorization: "Bearer " + userInfo.token,
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(newlyMadeOrder)
    }).then((res)=> {
      console.log(res)
    }).then(err=> {
      console.log(err)
    })
    ;
  }

  const handleCheckoutOrder = () => {

  }

  /*
    filterTags: "spicy,waffles,shrimp,curry,savory"
itemDescription: "Spicy shrimp on top of 3 buttermilk waffles."
itemImage: "images/waffles.jpg"
itemName: "Shrimp Curry Waffles"
itemPrice: 12.75
menuId: 7
quantity: 1
restaurantId:3
    */
   let total = orderCartItems.reduce(
     (sum, item) => item.itemPrice * item.quantity, 0
   );

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
        <h5>Cart is empty</h5>
      ) : (
        <Row className="">
          <Col xs={8} className="">
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
              <tbody>
                {console.log(orderCartItems)}
                {orderCartItems.map((item) => (
                  <tr key={item.menuId}>
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
                    <td>${(item.itemPrice).toFixed(2)}</td>
                    <td>
                      <Button
                        className="btn-success"
                        onClick={() => increaseQuantity(item)}
                      >
                        <PlusCircleFill />
                      </Button>
                      <span>{item.quantity}</span>

                      {item.quantity > 1 && (
                        <Button
                          className="btn-secondary"
                          onClick={() => decreaseQuantity(item)}
                        >
                          <DashCircle />
                        </Button>
                      )}

                      {item.quantity === 1 && (
                        <Button
                          className="btn-danger"
                          onClick={() => removeItemFromCart(item)}
                        >
                          <Trash />
                        </Button>
                      )}
                    </td>
                    <td>${(item.itemPrice * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}

                {/* Template */}
                {/* <tr>
                  <td style={{ padding: "5px" }}>
                    <Image
                      src={require("../assets/images/burger-closeup.jpeg")}
                      // width="50"
                      height="65"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: "2px",
                      }}
                      className="d-inline-block align-top"
                    />
                  </td>
                  <td>Menu Item Name</td>
                  <td>Words</td>
                  <td>$2.99</td>
                  <td className="d-flex align-items-center justify-content-between"> */}
                {/* <DashCircle onClick={()=> {
                    handleQuantity("decrease")
                  }}/>
                  {quantity}
                  <PlusCircle onClick={()=> {
                    handleQuantity("increase")}}/> */}
                {/* </td>
                  <td className="fw-bolder">$2.99</td>
                </tr> */}

                {/* End of template  */}

                {/* {orderCartItems.map((m) => (
                  <tr key={m.menuId}> */}
                <td>{/* Place for menu picture */}</td>
                {/* <td>{m.itemName}</td>
                    <td>{m.itemDescription}</td>
                    <td>{m.itemPrice}</td> */}

                {/* <td>
                      <PlusCircle
                        onClick={() => {
                          increaseQuantity(m);
                        }}
                      />
                      {m.quantity}
                      <DashCircle
                        onClick={() => {
                          decreaseQuantity(m);
                        }}
                      /> */}

                {/* Remove item if user clicks minus after 1 */}
                {/* {m.quantity === 1 && (
                        <Trash2Fill
                          onClick={() => {
                            removeItemFromCart(m);
                          }}
                        />
                      )}
                    </td>
                    <td>{m.itemPrice}</td>
                  </tr>
                ))} */}
                {/* <tr>
                  <td style={{ padding: "5px" }}> */}
                {/* <Image
                      src={require("../assets/images/burger-closeup.jpeg")}
                      // width="50"
                      height="65"
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        borderRadius: "2px",
                      }}
                      className="d-inline-block align-top"
                    /> */}
                {/* </td>
                  
                  <td className="d-flex align-items-center justify-content-between"> */}
                {/* <DashCircle onClick={()=> {
                    handleQuantity("decrease")
                  }}/>
                  {quantity}
                  <PlusCircle onClick={()=> {
                    handleQuantity("increase")}}/> */}
                {/* </td>
                  <td className="fw-bolder">$2.99</td>
                </tr> */}
              </tbody>
            </Table>
          </Col>

          <Col>
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>CART</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  From Restaurant Name
                </Card.Subtitle>
                <Card.Text>Subtotal:</Card.Text>
                <Card.Text>Total: ${total.toFixed(2)}</Card.Text>
                {orderCartItems.length > 0 && (
                  <>
                    <Button onClick={handleCheckoutOrder}>Checkout Now</Button>

                    <Button className="btn-danger" onClick={clearCart}>
                      Clear Cart
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {/* )}  */}
    </Container>
  );
}
