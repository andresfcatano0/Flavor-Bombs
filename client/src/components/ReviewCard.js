import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export default function ReviewCard({reviews}) {
  return (
    <>
    {reviews?.map((review, index)=> {
      return(

        <Card style={{ width: "15rem" }} className="ms-3">
      <Card.Header>{index}</Card.Header>
      <Card.Body>
        {/* <Card.Title>Special title treatment</Card.Title> */}
        <Card.Text>
          {review.reviewText}
        </Card.Text>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
    )
    })}
    </>
  );
}
