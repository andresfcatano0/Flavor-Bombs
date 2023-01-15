import React, { useContext, useState } from 'react'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import UserContext from '../context/AuthContext';
import { useHistory } from 'react-router-dom';


export default function AddReview({restaurants}) {
  const currentUser = useContext(UserContext);
  const history = useHistory();

  const [selectedRestaurant, setSelectedRestaurant] = useState(0);
  const [reviewText, setReviewText] = useState("");
  // const [isAnonymous, setIsAnonymous] = useState(false);

  const [formData,setFormData] = useState({});

console.log(selectedRestaurant)
console.log(reviewText)

const postReview = () => {
  const reviewForm = {
    restaurantId: selectedRestaurant,
    reviewText:reviewText,
    owner: null
  }

  console.log(reviewForm)

  fetch("http://localhost:8080/api/review", {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Authorization: "Bearer " + currentUser.token
    },
    body: JSON.stringify(reviewForm)
  }).then(res =>{
    if(res.status >= 200 && res.status < 300){
      console.log("successfully added a new review")
      history.push("/user/reviews");
    } else{
      res.json().then(error => {
        console.log(error)
      })
    }
  })

    
}



const handleSubmit = (event) => {
  event.preventDefault();
  postReview()
  // console.log(reviewForm)
}

  return (
    <div className="mt-3">
      <Form onSubmit={handleSubmit}>
        <FloatingLabel
          className="mb-3"
          label="Choose a restaurant"
          controlId='restaurantName'
        >
          <Form.Select
            aria-label="Default select example"
            value={selectedRestaurant}
            name="restaurantName"
            id="restaurantName"
            onChange={(event)=>{setSelectedRestaurant(event.target.value)}}
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
            onChange={(event)=>{setReviewText(event.target.value)}}
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

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
