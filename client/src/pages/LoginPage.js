import React from 'react'
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function LoginPage() {
  return (
    <Row className="mt-4 align-items-center">
      <Col>
        <h1>Welcome to Flavor Bombs</h1>
      </Col>
      <Col>
        <h2 className="text-center">Log In</h2>
        <Form className="justify-content-center me-3">
          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
          >
            <Form.Control type="email" placeholder="name@example.com" />
          </FloatingLabel>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button
            className="mt-3"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
