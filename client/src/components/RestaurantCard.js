import React, {useEffect, useState} from 'react'
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import SkeletonLoader from './SkeletonLoader';

export default function RestaurantCard() {
    const [restaurants, setRestaurants] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getRestaurants = async () => {
        await fetch("http://localhost:8080/api/restaurant/public", {
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
    // <Card style={{ width: "28rem" }}>
    <>
      {/* <Card.Img
        variant="top"
        src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
      />
      <div style={{ textAlign: "end", marginRight: "1rem" }}>
        <Card.Title className="justify-content-end">Restaurant Name</Card.Title>
        <Card.Subtitle className="text-muted">
          Hours: 8 AM - 7PM <br />
          Sat - Tues
        </Card.Subtitle>
      </div>
      <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <div className="d-grid gap-2 white-text">
            <Button href="/restaurant-information" variant="primary" size="lg">
                More Info
            </Button>
        </div>
      </Card.Body> */}
      { isLoading ? <SkeletonLoader/> : 
      
      restaurants.map((restaurant)=> {
        return (
            <Card key={restaurant.restaurantId} style={{ width: "28rem" }} className="mb-4">
                <Card.Img
                    variant="top"
                    src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
                />
                <div style={{ textAlign: "end", marginRight: "1rem" }}>
                    <Card.Title className="justify-content-end">{restaurant.restaurantName}</Card.Title>
                    <Card.Subtitle className="text-muted">
                    Hours: 8 AM - 7PM <br />
                    Sat - Tues
                    </Card.Subtitle>
                        
                </div>
                <Card.Body>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                    </Card.Text>
                    <div className="d-grid gap-2 white-text">
                        <Button variant="primary" size="lg">
                            More Info
                        </Button>
                    </div>
                </Card.Body> 
            </Card>
        )
      })
    }
    </>
  );
}
