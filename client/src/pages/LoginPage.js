import React, { useState } from 'react'
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function LoginPage() {

    const [loginData, setLoginData] = useState({username:"",password:""});

    const handleLoginInput = (event) => {
        const inputChange = event.target;
        // console.log(inputChange.id);
        
        const loginInfoCopy = {...loginData};

        loginInfoCopy[inputChange.id] = inputChange.value;

        setLoginData(loginInfoCopy);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

        // console.log(loginData);

        fetch("http://localhost:8080/api/security/login", {
            method: 'POST',
            headers: {
              "Content-Type":"application/json"  
        },
            body: JSON.stringify(loginData)
        }).then(response => {
            if(response.status === 200) {
                console.log("Success");
                return response.json();
            } else if(response.status === 403){
                console.log("Forbidden");
            } else {
                console.log(response);

            }

        }).then(jwtContainer => {
            const jwt = jwtContainer.jwt;
            console.log(jwt);
        })


    }   
    


  return (
    <Row className="mt-4 align-items-center">
      <Col>
        <h1>Welcome to Flavor Bombs</h1>
      </Col>
      <Col>
        <h2 className="text-center">Log In</h2>
        <Form onSubmit={handleSubmit} className="justify-content-center me-3">
          <FloatingLabel
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="input"
              id="username"
              placeholder="name"
              value={loginData.username}
              onChange={handleLoginInput}
            />
          </FloatingLabel>
          <FloatingLabel  label="Password">
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginInput}
            />
          </FloatingLabel>
          <Button className="mt-3" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
