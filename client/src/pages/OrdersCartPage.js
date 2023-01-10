import React, {useContext, useState} from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Image from "react-bootstrap/Image";
import { DashCircle, PlusCircle, Trash2Fill } from 'react-bootstrap-icons'
import CartContext from '../context/cart/CartContext'

export default function OrdersCartPage() {
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
      handleCheckoutOrder,
      clearCart,
      removeItemFromCart,
      increaseQuantity,
      decreaseQuantity
    } = useContext(CartContext);



  return (
    <Container className="mt-3">
      <h2 className="text-center mb-4">Order Summary</h2>
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

                {orderCartItems.map((m) => (
                  <tr key={m.menuId}>
                    <td>{/* Place for menu picture */}</td>
                    <td>{m.itemName}</td>
                    <td>{m.itemDescription}</td>
                    <td>{m.itemPrice}</td>

                    <td>
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
                      />

                      {/* Remove item if user clicks minus after 1 */}
                      {m.quantity === 1 && (
                        <Trash2Fill
                          onClick={() => {
                            removeItemFromCart(m);
                          }}
                        />
                      )}
                    </td>
                    <td>{m.itemPrice}</td>
                  </tr>
                ))}
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
                <Card.Text>Total:</Card.Text>
                {orderCartItems.length > 0 && <Button>Checkout Now</Button>}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}
