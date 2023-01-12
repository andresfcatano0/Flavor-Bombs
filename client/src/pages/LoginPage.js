import React, { useContext, useState } from 'react'
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import UserContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';

export default function LoginPage({setAuthUser}) {

    const [loginData, setLoginData] = useState({username:"",password:""});

    const history = useHistory();


    const handleLoginInput = (event) => {
        const inputChange = event.target;
        
        const loginInfoCopy = {...loginData};

        loginInfoCopy[inputChange.id] = inputChange.value;

        setLoginData(loginInfoCopy);
    }

    const handleSubmit = (event) =>{
        event.preventDefault();

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
            const decodeJwt = jwtDecode(jwt);

            const fullLoginData = {
                token: jwt,
                userData: decodeJwt
            };

            localStorage.setItem("userData",JSON.stringify(fullLoginData));

            setAuthUser(fullLoginData);

            // redirect user to appropriate home page
            fullLoginData.userData.roles[0].authority === "ROLE_ADMIN" ? 
            history.push("/admin/dashboard-menu") : history.push("/");
            
        })


    }   
    


  return (
    <Row
      className="mt-4 align-items-center"
      id="food-background"
      style={{ height: "83vh" }}
    >
      <Col xs={12} lg={6}>
        <h1
          className="text-center ms-5"
          style={{ }}
        >
          Welcome <br />
          to <br/> Flavor Bombs
        </h1>
      </Col>
      <Col
        className="mx-5 text-center"
        style={{
          border: "0.5px solid grey",
          height: "75vh",
          backgroundColor: "white",
        }}
      >
        <h2 className="text-center p-3 pb-4 mb-3">Log In</h2>
        <Form onSubmit={handleSubmit} className="justify-content-center ">
          <FloatingLabel
            label="Username"
            className="mb-3 mx-auto"
            style={{ width: "90%" }}
          >
            <Form.Control
              type="input"
              id="username"
              placeholder="name"
              value={loginData.username}
              onChange={handleLoginInput}
            />
          </FloatingLabel>
          <FloatingLabel
            label="Password"
            style={{ width: "90%" }}
            className="mt-5 mx-auto"
          >
            <Form.Control
              type="password"
              id="password"
              placeholder="Password"
              value={loginData.password}
              onChange={handleLoginInput}
            />
          </FloatingLabel>
          <Button className="mt-5" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
