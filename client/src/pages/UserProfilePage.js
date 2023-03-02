import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { PersonCircle } from "react-bootstrap-icons";
import { useParams } from "react-router-dom";

export default function UserProfilePage({
  setAuthUser,
  getData,
}) {
  const initialUserState = {
    appUserId: "",
    firstName: "",
    lastName: "",
    username: "",
    passwordInput: "",
    email: "",
    enabled: true,
  };

  const userInfo = useContext(UserContext);
  
  const [error, setError] = useState([]);

  const [fullUserData, setFullUserData] = useState(initialUserState);

  //get more hydrated user info
  const getCurrentUserInfo = () => {
    fetch("http://localhost:8080/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userInfo.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let found;
        for (let d of data) {
          if (d.username == userInfo.userData.sub) {
            // console.log(d)
            //delete password for hydrated user for user to input their password
            delete d.password;
            setFullUserData(d);
          }
        }
      });
  };

  useEffect(() => {
    getCurrentUserInfo();
    // console.log(userInfo)
  }, [userInfo]);

  const [disableForm, setDisableForm] = useState(true);

  const editProfile = () => {
    fetch("http://localhost:8080/api/user/" + fullUserData.appUserId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
      body: JSON.stringify(fullUserData),
    }).then((res) => {
      if (res.status === 201) {
        console.log("user updated successfully");
       

        //cause user to "login" with credentials to get new token (since user may have change their username)
        return fetch("http://localhost:8080/api/security/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: fullUserData.username,
            password: fullUserData.passwordInput,
          }),
        })
          .then((response) => {
            console.log(response)
            console.log("hello token refresh attempt")
            if (response.status === 200) {
              console.log("Success");
              return response.json();
            } else if (response.status === 403) {
              // setError("Denied access. You do not have permission")
              console.log("Forbidden");
            } else {
              // TODO: setError(response);
            }
          })
          .then((jwtContainer) => {
            const jwt = jwtContainer.jwt;
            const decodeJwt = jwtDecode(jwt);

            const fullLoginData = {
              token: jwt,
              userData: decodeJwt,
            };

            localStorage.setItem("userData", JSON.stringify(fullLoginData));

            setAuthUser(fullLoginData);
          });

    
      } else {
        return res.json().then((error) => {
          setError(error);
        });
      }
    });
  };

  const cancelEdit = () => {
    setDisableForm(true);
    setFullUserData(initialUserState);
  };

 
  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile();
    setDisableForm(true);
  };

  const handleChange = (event) => {
    setFullUserData({
      ...fullUserData,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div id="food-background" width="100%" height="100%" className="mt-3">
      <Container className="mt-3" style={{ height: "87vh" }}>
        <Row className="">
          <Col className="d-flex  flex-column align-items-center">
            <PersonCircle size={"100px"} className="mb-4" />
            {/* <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>Default file input example</Form.Label>
            <Form.Control type="file" />
          </Form.Group>
          <Button className="mb-4">Change Profile Picture</Button> */}

            <Button
              className="mt-5"
              onClick={() => {
                setDisableForm(false);
              }}
            >
              Update Profile Information
            </Button>
          </Col>
          {disableForm === true ? (
            <Col>
              <Form>
                <FloatingLabel
                  htmlFor="firstName"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    value={fullUserData.firstName}
                    id="firstName"
                    onChange={handleChange}
                    disabled
                  />
                </FloatingLabel>

                <FloatingLabel
                  htmlFor="lastName"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="lastName"
                    value={fullUserData.lastName}
                    onChange={handleChange}
                    disabled
                  />
                </FloatingLabel>

                <FloatingLabel
                  htmlFor="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="username"
                    value={fullUserData.username}
                    onChange={handleChange}
                    disabled
                  />
                </FloatingLabel>

                <FloatingLabel
                  htmlFor="email"
                  label="Email Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="email"
                    value={fullUserData.email}
                    onChange={handleChange}
                    disabled
                  />
                </FloatingLabel>
              </Form>
            </Col>
          ) : (
            <Col>
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <FloatingLabel
                  htmlFor="firstName"
                  label="First Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="firstName"
                    value={fullUserData.firstName}
                    onChange={handleChange}
                  />
                </FloatingLabel>

                <FloatingLabel
                  htmlFor="lastName"
                  label="Last Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="lastName"
                    value={fullUserData.lastName}
                    onChange={handleChange}
                  />
                </FloatingLabel>

                <FloatingLabel
                  htmlFor="username"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="username"
                    value={fullUserData.username}
                    onChange={handleChange}
                    required={true}
                  />
                </FloatingLabel>

                <FloatingLabel
                  htmlFor="email"
                  label="Email Address"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    id="email"
                    value={fullUserData.email}
                    onChange={handleChange}
                  />
                </FloatingLabel>

                <div className = "p-3" style={{ backgroundColor: "white", border:"1px solid black", borderRadius:"10px"}}>

                <p style={{ color: "#df3445" }} className="text-center">
                  To confirm your changes, please enter your password.
                </p>
                <FloatingLabel
                  htmlFor="passwordInput"
                  label="Password"
                  className="mb-3"
                >
                  {/* passwordInput is temp placed in appUser object, since delete passhash field due to must still send all user info (username + password) to backend*/}
                  <Form.Control
                    type="password"
                    id="passwordInput"
                    value={fullUserData.passwordInput}
                    onChange={handleChange}
                    required={true}
                  />
                </FloatingLabel>
                </div>

                <div className="mt-5 d-flex justify-content-around">
                  <Button
                    className=""
                    variant="danger"
                    onClick={() => {
                      cancelEdit();
                    }}
                  >
                    Cancel Update
                  </Button>
                  <Button type="submit">Update Profile</Button>
                </div>
              </Form>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}
