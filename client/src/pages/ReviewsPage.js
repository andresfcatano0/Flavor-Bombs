import React, { useContext, useState, useEffect } from 'react'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Link } from 'react-router-dom';
import UserContext from '../context/AuthContext'

export default function ReviewsPage({
  restaurants,
  allUsers,
  allReviews,
  getAllUsers,
  getData,
  getAllReviews,
}) {
  // console.log(allReviews)
  // console.log(restaurants)

  const currentUser = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [fullUserData, setFullUserData] = useState({});
  const [detailedUser, setDetailedUser] = useState({});

  const [userFromApp, setUserFromApp] = useState({});
  
    setUserFromApp(getData(currentUser));


  const getCurrentUserInfo = () => {
    fetch("http://localhost:8080/api/user/", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + userFromApp.token,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let found;
        for (let d of data) {
          if (d.username === userFromApp.userData.sub) {
            // cmonsole.log(d)
            setFullUserData(d);
          }
        }
      });
      setIsLoading(false);
  };
  // console.log(fullUserData);


  const getDetailedUser = () => {
    fetch("http://localhost:8080/api/user/" + fullUserData.appUserId, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + currentUser.token,
      },
    })
      .then((res) => {
        return res.json(); 
      })
      .then((data) => {
        console.log(data)
        setDetailedUser(data);
        // setIsLoading(true)
      });
      setIsLoading(false);
  };

  useEffect(() => {
    getCurrentUserInfo();
    getDetailedUser();
    setIsLoading(false)
  }, []);

  const deleteReview = (reviewId) => {
    if(window.confirm("Are you sure you want to delete this review?")){

      fetch("http://localhost:8080/api/review/" + reviewId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      }).then((data) => {
        // console.log(data);
      getAllReviews()
        
          console.log("successfully deleted order");
        
        // console.log(data.statusCode)
      });
    }
  }

  return (
    <div>
      {isLoading ? (
        <div>
          <p>There are no reviews..</p>
          <Link to="/user/add-review">
            <button>Make a review</button>
          </Link>
        </div>
      ) : (
        <>
          <h3>View Your Reviews</h3>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Restaurant</th>
                <th>Review</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
             
                 {detailedUser?.reviews.map((review, index) => {
                return (
                  <tr key={review.reviewId}>
                    <td>{index + 1}</td>
                    <td>{review.restaurantId}</td>

                    <td>{review.reviewText}</td>
                    <td className="d-flex align-items-center justify-content-around">
                      <Link
                        to={`/user/edit-review/${review.reviewId}`}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>
                      <Button variant="danger" onClick={()=>{deleteReview(review.reviewId);}}>Delete</Button>
                    </td>
                  </tr>
                );
              })}   
            </tbody>
          </Table>
          <p>
            Want to make a review? Click here to{" "}
            <Link to="/user/add-review">
              <button className="btn btn-primary">Make review.</button>
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
