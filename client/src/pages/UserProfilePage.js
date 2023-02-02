import React, { useContext } from 'react'
import UserContext from '../context/AuthContext'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { PersonCircle } from 'react-bootstrap-icons'

export default function UserProfilePage({setAuthUser}) {
    const userInfo = useContext(UserContext);

  return (
    <Container className="mt-3">
      <Row>
        <Col className="d-flex flex-column align-items-center">
          <PersonCircle size={"100px"} className="mb-4" />
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button className="mb-4">Change Profile Picture</Button>
          <Button className="mb-4">Edit</Button>
        </Col>
        <Col>
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
        </Col>
      </Row>
    </Container>
  );
}
