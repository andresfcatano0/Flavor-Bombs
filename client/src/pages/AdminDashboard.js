import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import { CreditCardFill, PeopleFill, Shop } from 'react-bootstrap-icons';
import UserContext from '../context/AuthContext';


export default function AdminDashboard({ setAuthUser }) {
  const user = useContext(UserContext);

  return (
    <Container fluid className="mt-3">
      {/* Left Pane - Menu */}
      <Row>
        <Col>
          <div>
            <ListGroup as="ol">
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">MAIN</div>
                  DASHBOARD
                </div>
              </ListGroup.Item>
              <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">VIEWINGS</div>

                  <p>USERS</p>
                  <p>RESTAURANTS</p>
                  <p>ORDERS</p>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>

        {/* Right Pane - Content */}
        <Col xs={10}>
          <Row>
            <Col>
              <h2>Welcome, {user.userData.sub}</h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className=" text-muted">USERS</Card.Title>
                  <Card.Subtitle className="mb-2 fs-2 fw-semibold">
                    10
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <Card.Link
                      href="#"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#999" }}
                    >
                      See all users
                    </Card.Link>
                    <PeopleFill style={{ color: "darkred" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className=" text-muted">RESTAURANTS</Card.Title>
                  <Card.Subtitle className="mb-2 fs-2 fw-semibold">
                    30
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <Card.Link
                      href="#"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#999" }}
                    >
                      See all restaurants
                    </Card.Link>
                    <Shop style={{ color: "indigo" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title className=" text-muted">ORDERS</Card.Title>
                  <Card.Subtitle className="mb-2 fs-2 fw-semibold">
                    25
                  </Card.Subtitle>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <div className="d-flex align-items-center justify-content-between">
                    <Card.Link
                      href="#"
                      className="fw-semibold text-decoration-underline"
                      style={{ color: "#999" }}
                    >
                      See all orders
                    </Card.Link>
                    <CreditCardFill style={{ color: "#DAA520" }} />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}