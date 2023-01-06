import React, {useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SkeletonLoader from './SkeletonLoader';

export default function RestaurantCard() {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRestaurants = async () => {
        await fetch("http://localhost:8080/api/restaurant", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => {
              setIsLoading(false);
            return res.json();
          })
          .then((data) => {
            console.log(data);
            setRestaurants(data);
          })
           .catch((err) => {
             setIsLoading(false);
             console.log(err);
           });
    }

    useEffect(() => {
      getRestaurants()
    }, []);


  return (
    <>
      <Container>
        <Row>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            restaurants.map((restaurant) => {
              return (
                <Col key={restaurant.restaurantId}>
                  <Card
                    key={restaurant.restaurantId}
                    style={{ width: "20rem" }}
                    className="mb-4"
                  >
                    <Card.Img
                      variant="top"
                      src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
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
                      <Card.Text>{restaurant.description}</Card.Text>
                      <div className="d-grid gap-2 white-text">
                        <Button variant="primary" size="lg">
                          More Info
                        </Button>
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
