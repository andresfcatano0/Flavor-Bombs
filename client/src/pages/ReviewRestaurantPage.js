import React, { useContext, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import UserContext from '../context/AuthContext';

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
        
        let fullUser = allUsers.filter((u)=> u.username === currentUser.userData.sub)
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
      return <div>Loading...</div>;
    } 

  return (
    <div id="food-background" style={{ height: "88vh" }}>
      {!isLoading ? (
        <>
        <span>You have not made any reviews...</span>
        <br/>
        <Link className="btn btn-primary" to="/user/add-review">Make a review</Link>
        </>
      ) : (
        <>
          <h2 className="text-center mt-4">Reviews Per Restaurant</h2>
          <Table striped hover bordered className="mx-5" style={{ backgroundColor: "white", width: "90vw" }}>
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
                    <td style={{display: "flex", justifyContent:"space-around"}}>
                      <Button variant='warning'>Edit</Button>
                      <Button variant="danger" onClick={()=>{deleteReview(review.reviewId);}}>Delete</Button>
                    </td>
                  </tr>
                );
              })} 
            </tbody>
          </Table>
          <Link to="/user/add-review" className='btn btn-primary'>Make a review</Link>
        </>
      )}
    </div>
  );
}
