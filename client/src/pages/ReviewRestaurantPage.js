import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/AuthContext';
import Loader from '../components/loadingComponents/Loader';

export default function ReviewRestaurantPage({
  restaurants,
  allUsers,
  allReviews,
  getAllUsers,
  getAllReviews
}) 

{
    const currentUser = useContext(UserContext);
    const [moreUserData, setMoreUserData] = useState(null)
    const [fullUserData, setFullUserData] = useState(null)
  
    const [isLoading, setIsLoading] = useState(false)
    
    

    const findCurrentUser = () => {
        
        let fullUser = allUsers?.filter((u)=> u.username === currentUser.userData.sub)
       setMoreUserData(fullUser[0])
    }

    const getHydratedUser = () => {
        // setIsLoading(true)
        fetch("http://localhost:8080/api/user/"+moreUserData.appUserId, {
            method:"GET",
            headers:{
                Authorization: "Bearer " + currentUser.token
            }
        }).then(res => res.json()).then((data) => {
            setIsLoading(true)
            console.log(data.reviews)
            setFullUserData(data.reviews)
        }).catch(err => console.log(err))
    }

    const deleteReview = (reviewId) => {
      if (window.confirm("Are you sure you want to delete this review?")) {
        fetch("http://localhost:8080/api/review/" + reviewId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + currentUser.token,
          },
        }).then((data) => {
          // console.log(data);
          
            getHydratedUser();
          console.log("successfully deleted order");

          // console.log(data.statusCode)
        });
      }
    };

    const history = useHistory();
    const editReview = (reviewId) => {
      history.push("/user/edit-review/"+reviewId);
    };
    


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let reviewModal = {
      reviewId: 0,
      reviewText: "",
      restaurantId: 0
    };

    let [reviewSavedState, setReviewSavedState] = useState({
      reviewModal,
    });

    const handleModal = (event) => {
      console.log(event.target.value);
      let found = allReviews.filter((r) => r.reviewId == event.target.value);
      //  console.log(found[0].reviewName)
      let savedR = {
        reviewId: event.target.value,
        reviewText: found[0].reviewText,
        restaurantId: found[0].restaurantId,
        restaurantName: restaurants[(found[0].restaurantId)-1].restaurantName,
      };
      setReviewSavedState(savedR);
      handleShow();
    };




    useEffect(()=> {
        findCurrentUser()
      },[allUsers])
      
      useEffect(()=> {
        if(moreUserData){
          getHydratedUser()
        }
    },[moreUserData])

    // {console.log(allUsers)}

    if (!allUsers.length) {
      return (
        <div className="position-absolute top-50 start-50 translate-middle">
          <Loader />
        </div>
      );
    } 

  return (
    <div id="food-background" style={{ height: "90vh" }}>
      {!isLoading ? (
        <>
          <span className='text-center'>You did not made any reviews...</span>
          <br />
          <Link className="btn btn-primary" to="/user/add-review">
            Make a review
          </Link>
        </>
      ) : (
        <>
          <Link to="/user/add-review" className="btn btn-primary float-end my-3 me-2">
            Make a review
          </Link>
          <h2 className="text-center mt-4">Reviews Per Restaurant</h2>
          <Table
            striped
            hover
            bordered
            className="mx-5"
            style={{ backgroundColor: "white", width: "90vw" }}
          >
            <thead>
              <tr>
                <th></th>
                <th>Restaurant Name</th>
                <th>Review Text</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {fullUserData.map((review, index) => {
                return (
                  <tr key={review.reviewId}>
                    <td>{index + 1}</td>
                    <td>
                      {restaurants[review.restaurantId - 1]?.restaurantName}
                    </td>
                    <td>{review.reviewText}</td>
                    <td
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <Button
                        variant="warning"
                        onClick={() => {
                          editReview(review.reviewId);
                        }}
                      >
                        Edit
                      </Button>
                      {/* <Button
                        variant="danger"
                        onClick={() => {
                          deleteReview(review.reviewId);
                        }}
                      >
                        Delete
                      </Button> */}
                      <Button
                        value={review.reviewId}
                        onClick={(event) => {
                          handleModal(event);
                        }}
                        className="btn btn-danger"
                      >
                        Delete
                      </Button>
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Delete Review</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          Are you sure you want to delete your review{" "}
                          <span style={{ fontStyle: "italic" }}>
                            {reviewSavedState.reviewText}
                          </span>{" "}
                          from {reviewSavedState.restaurantName}?
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => {
                              deleteReview(reviewSavedState.reviewId);
                            }}
                          >
                            Delete
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
}
