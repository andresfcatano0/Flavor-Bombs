import React from 'react'
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function MenuCard({m}) {
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
            <h5 className="mt-3 ">{m.itemName}</h5>
            <p>{m.itemDescription}</p>
          </Row>
          <Row className="align-items-end mb-3">
            <Button className="">Order Now</Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
