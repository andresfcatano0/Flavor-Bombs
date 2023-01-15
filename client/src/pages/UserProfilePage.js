import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/AuthContext'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { PersonCircle } from 'react-bootstrap-icons'
import { useParams } from 'react-router-dom'

export default function UserProfilePage({ setAuthUser, currentUserFormInfo, getData }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(currentUserFormInfo.password);

  const userInfo = useContext(UserContext);

  // const params = useParams();

  const [error, setError] = useState([]);

  // let paramUsername = params.username;
  // paramUsername = paramUsername.replace(":", "");

  const [fullUserData, setFullUserData] = useState({});

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
            setFullUserData(d);
          }
        }
      });
  };

  useEffect(() => {
    getCurrentUserInfo();
  }, []);

  // console.log(found)

  // console.log(userInfo)

  const populateUserInfo = () => {
    setDisableForm(false);
    setFirstName(fullUserData.firstName);
    setLastName(fullUserData.lastName);
    setUsername(fullUserData.username);
    setFormEmail(fullUserData.email);
    setPassword(currentUserFormInfo.password);
  };

  const [disableForm, setDisableForm] = useState(true);

  const editProfile = async () => {
    populateUserInfo();

    const updateUser = {
      appUserId: fullUserData.appUserId,
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      email: formEmail,
      enabled: fullUserData.enabled,
    };

    console.log(updateUser)
    await fetch("http://localhost:8080/api/user/" + fullUserData.appUserId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userInfo.token,
      },
      body: JSON.stringify(updateUser),
    }).then((res) => {
      if (res.statusCode === 204) {
        console.log("user updated successfully");
        setDisableForm(true);
      } else {
        res.json().then((error) => {
          setError(error);
        });
      }
    });
  };

  const cancelEdit = () => {
    setDisableForm(true);
    clearForm()
  };

  const clearForm = () => {
    setDisableForm(true);
    setFirstName("");
    setLastName("");
    setUsername("");
    setPassword("");
    setFormEmail("");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    editProfile();
    setDisableForm(true);
    clearForm()
  };
  

  return (
    <div id="food-background" width="100%" height="100%" className="mt-3">
      <Container
        className="mt-3"
        style={{ height: "87vh" }}
        // id="food-background"
      >
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
                populateUserInfo();
              }}
            >
              Update Profile Information
            </Button>

            {/* <Button
              className="mt-5"
              variant='danger'
              onClick={() => {
                cancelEdit();
              }}
            >
              Cancel Update
            </Button> */}
          </Col>
          {disableForm === true ? (
            <Col>
              <Form>
                <FloatingLabel label="First Name" className="mb-3">
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled
                  />
                </FloatingLabel>

                <FloatingLabel label="Last Name" className="mb-3">
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled
                  />
                </FloatingLabel>

                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled
                  />
                </FloatingLabel>

                <FloatingLabel label="Email Address" className="mb-3">
                  <Form.Control
                    type="text"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    disabled
                  />
                </FloatingLabel>

                {/* <FloatingLabel label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled
                />
              </FloatingLabel> */}

                {/* <Button type="submit" style={{ marginLeft: "45%" }} disabled>
                Update Profile
              </Button> */}
              </Form>
            </Col>
          ) : (
            <Col>
              <Form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <FloatingLabel label="First Name" className="mb-3">
                  <Form.Control
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel label="Last Name" className="mb-3">
                  <Form.Control
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel label="Username" className="mb-3">
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel label="Email Address" className="mb-3">
                  <Form.Control
                    type="text"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                  />
                </FloatingLabel>

                <FloatingLabel label="Password" className="mb-3">
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />
                </FloatingLabel>

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
