import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import CartContext from "../context/cart/CartContext";
import { useContext } from 'react';
import { PlusCircle } from 'react-bootstrap-icons';

export default function MenuCard({
  m,
  
}) {
  const {
    addItemToCart,
    increaseQuantity,

    orderCartItems,
    handleTotals,
    itemCount,
  } = useContext(CartContext);

  const isItemInCart = (m) => {
    return orderCartItems?.find((item) => item.menuId === m.menuId);
  };

  console.log(orderCartItems);

  return (
    <Container
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
            style={{ borderRadius: "1.7rem" }}
            className="p-2, my-3"
            src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg"
          />
        </Col>
        <Col className="d-flex">
          <Row>
            <h5 className="mt-3 ">
              {m.itemName} - <span>${m.itemPrice}</span>
            </h5>
            <p>{m.itemDescription}</p>
          </Row>
          <Row className="align-items-end mb-3">
            {/* {isItemInCart(m) && (
              <PlusCircle
                onClick={() => {
                  increaseQuantity(m);
                }}
              />
            )}
          */}

            {/* <Button className="">Order Now</Button> */}
            {isItemInCart(m) && (
              <Button
                onClick={() => {
                  increaseQuantity(m);
                }}
              >
                <PlusCircle />
                
                {m.quantity}
              </Button>
            )}

            {/* If item is not in cart show order now button then change to other button above */}
            {!isItemInCart(m) && (
              <Button
                onClick={() => {
                  addItemToCart(m);
                }}
              >
                Order Now
              </Button>
            )}
            {console.log(handleTotals)}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
