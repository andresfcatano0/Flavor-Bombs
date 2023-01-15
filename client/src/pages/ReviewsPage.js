import React, { useContext, useState, useEffect } from 'react'
import Table from "react-bootstrap/Table";
import UserContext from '../context/AuthContext'

export default function ReviewsPage({restaurants, allUsers, allReviews, getAllUsers, getAllReviews}) {
    // console.log(allReviews)
    // console.log(restaurants)

    const currentUser = useContext(UserContext)


    const [isLoading, setIsLoading] = useState(true)
    const [fullUserData, setFullUserData] = useState({});
    const [detailedUser, setDetailedUser] = useState({});

    const getCurrentUserInfo = async () => {
      fetch("http://localhost:8080/api/user/", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
            let found;
            setIsLoading(false)
            for (let d of data) {
                if (d.username == currentUser.userData.sub) {
                    // console.log(d)
                    setFullUserData(d);
                }
            }
            
        });
    };
    console.log(fullUserData)

    const getDetailedUser = async () => {
        await fetch("http://localhost:8080/api/user/" + fullUserData.appUserId, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + currentUser.token,
          }
        }).then(res => res.json())
        .then(data => {
             setIsLoading(false);
            // console.log(data)
            setDetailedUser(data)
        });
    }
    console.log(detailedUser)

   

    useEffect(() => {
      getCurrentUserInfo();
      getDetailedUser();
    }, []);


  return (
    <div>
        {detailedUser.length === 0 ? (<div>
            <p>There are no reviews..</p>
        </div>):(
            
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
              {detailedUser.reviews.map((review, index)=> {
            return (
              <tr key={review.reviewId}>
                <td>{index+1}</td>
                <td>{review.restaurantId}</td>
               
                <td>{review.reviewText}</td>
                <td className="d-flex align-items-center justify-content-around">
                  <button className="btn btn-warning">Edit</button>
                  <button className="btn btn-danger">Delete</button>
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
