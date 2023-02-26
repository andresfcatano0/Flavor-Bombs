import React, {useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SkeletonLoader from './loadingComponents/SkeletonLoader';
import { Link } from 'react-router-dom';

export default function RestaurantCard(props) {

  return (
    <>
      <Container className=''>
        <Row>
          {props.isLoading ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <Col key={idx}>
                <SkeletonLoader />
              </Col>
            ))
          ) : !props.restaurants.length ? (
            <div style={{ height: "58vh" }}>
              <p>No restaurants with your search</p>
            </div>
          ) : (
            props.restaurants.map((restaurant) => {
              return (
                <Col key={restaurant.restaurantId}>
                  <Card
                    key={restaurant.restaurantId}
                    style={{ width: "20rem" }}
                    className="mb-4"
                  >
                    <Card.Img
                      variant="top"
                      src={restaurant.restaurantImage}
                      height={"286px"}
                    />
                    <div style={{ textAlign: "end", marginRight: "1rem" }}>
                      <Card.Title className="justify-content-end">
                        {restaurant.restaurantName}
                      </Card.Title>
                      <Card.Subtitle className="text-muted">
                        {restaurant.openHours}
                        {/* {restaurant.openHours.replace("-", "\n\n")} */}
                      </Card.Subtitle>
                    </div>
                    <Card.Body>
                      <Card.Text>
                        {restaurant.description.length > 60
                          ? restaurant.description.substring(0, 70) + "..."
                          : restaurant.description}
                      </Card.Text>
                      <div className="d-grid gap-2 white-text">
                        {/* <Button
                          variant="primary"
                          size="lg"
                          href={`/restaurant/${restaurant.restaurantId}`}
                        > */}
                        <Link
                          to={`/restaurant/${restaurant.restaurantId}`}
                          className="btn btn-primary"
                        >
                          More Info
                        </Link>
                        {/* </Button> */}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          )}
        </Row>
      </Container>
    </>
  );
}
