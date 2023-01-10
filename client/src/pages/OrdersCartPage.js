import React from 'react'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import Image from "react-bootstrap/Image";

export default function OrdersCartPage() {
  return (
    <Container className="mt-3">
      <h2 className="text-center mb-4">Order Summary</h2>
      <Row className="">
        <Col xs={8} className="">
          <Table  hover>
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
              <tr>
                <td style={{padding:"5px"}}>
                  <Image
                    src={require("../assets/images/burger-closeup.jpeg")}
                    // width="50"
                    height="65"
                    style={{objectFit:"cover", width:"100%", borderRadius:"2px"}}
                    className="d-inline-block align-top"
                  />
                </td>
                <td>Menu Item Name</td>
                <td>Words</td>
                <td>$2.99</td>
                <td>1</td>
                <td className="fw-bolder">$2.99</td>
              </tr>
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
              <Button>Checkout Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
