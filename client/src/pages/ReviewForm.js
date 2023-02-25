import React, { useContext, useEffect, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import UserContext from '../context/AuthContext';
import { useHistory, useParams } from 'react-router-dom';


export default function ReviewForm({ restaurants, getRestaurants, allReviews }) {
  const currentUser = useContext(UserContext);
  const history = useHistory();

  const [selectedRestaurant, setSelectedRestaurant] = useState(1);
  const [reviewText, setReviewText] = useState("");
  // const [isAnonymous, setIsAnonymous] = useState(false);

  const [formData, setFormData] = useState({});

  const params = useParams();

  // console.log(selectedRestaurant)
  // console.log(reviewText)

  const postReview = () => {
    const reviewForm = {
      restaurantId: selectedRestaurant,
      reviewText: reviewText,
      owner: null,
    };

    fetch("http://localhost:8080/api/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify(reviewForm),
    }).then((res) => {
      if (res.status >= 200 && res.status < 300) {
        console.log("successfully added a new review");
        history.push("/user/reviews");
      } else {
        res.json().then((error) => {
          console.log(error);
        });
      }
    });
  };

  const clearForm = () => {
    return setSelectedRestaurant(1), setReviewText("");
  };

  const populateForm = () => {
    if (params.id && allReviews.length > 0) {
      let popReview = allReviews.find(
        (r) => r.reviewId.toString() === params.id.toString()
      );
      setReviewText(popReview.reviewText)
      setSelectedRestaurant(popReview.restaurantId)
    }
  };

  

  useEffect(() => {
    if(params.id){
      populateForm();
    }
  }, []);

  const updateReview = () => {
    const updateReview = {
      reviewId: params.id,
      restaurantId: selectedRestaurant,
      reviewText: reviewText,
      // owner: currentUser.appUserId,
      owner: null,
    };

    fetch("http://localhost:8080/api/review/" + params.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify(updateReview),
    }).then((res) => {
      if (res.status>= 200 && res.status < 300) {
        console.log("updated....");
        history.push("/user/reviews");
      } else {
        res.json().then((error) => {
          console.log(error);
        });
      }
    });
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    if (params.id === undefined) {
      postReview();
    } else {
      updateReview();
    }
    // console.log(reviewForm)
  };

  return (
    <div className="mt-4" id="food-background" style={{minHeight: "86vh"}}>
      <Form onSubmit={handleSubmit} className="mx-5">
        <FloatingLabel
          className="mb-3"
          label="Choose a restaurant"
          controlId="restaurantName"
        >
          <Form.Select
            aria-label="Default select example"
            value={selectedRestaurant}
            name="restaurantName"
            id="restaurantName"
            onChange={(event) => {
              setSelectedRestaurant(event.target.value);
            }}
          >
            {restaurants.map((restaurant, index) => {
              return (
                <option
                  key={restaurant.restaurantName}
                  value={restaurant.restaurantId}
                >
                  {restaurant.restaurantName}
                </option>
              );
            })}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          className="mb-3"
          value={formData.reviewText}
          // controlId="reviewText"
          label="Leave a review"
        >
          <Form.Control
            as="textarea"
            name="reviewText"
            id="reviewText"
            value={reviewText}
            onChange={(event) => {
              setReviewText(event.target.value);
            }}
            style={{ height: "100px" }}
          />
        </FloatingLabel>

        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            id="isAnonymous"
            name="isAnonymous"
            checked={isAnonymous}
            onChange={(event)=>{setIsAnonymous(event.target.checked)}}
            label="Do you wish to be an anonymous reviewer?"
          />
        </Form.Group> */}

        <Container className="d-flex justify-content-around">
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Button variant="danger" onClick={clearForm}>
            Clear Form
          </Button>
        </Container>
      </Form>
    </div>
  );
}
