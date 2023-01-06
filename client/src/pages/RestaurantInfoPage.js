import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";

export default function RestaurantInfoPage({getRestaurants, restaurants}) {
  const params = useParams();
  const [specificRestaurant, setSpecificRestaurant] = useState({});

  const getSpecificRestaurant = () => {
    fetch(`http://localhost:8080/api/restaurant/${params.id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
    })
    .then(res=> {
        // console.log(res.json())
        return res.json();
    })
    .then(data => {
        console.log(data)
        setSpecificRestaurant(data);
    })
  }

  useEffect(()=> {
    getSpecificRestaurant();
  }, [])
  
    return (
    // <div className="mt-4 flex-column text-center">
    <>
                <div className="mt-4" key={specificRestaurant.restaurantId}>
                <div className="text-center">

        <img
          className="rounded"
          height={"350px"}
          src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
        />
      </div>
      <div>
        <h3 className="mt-2">{specificRestaurant.restaurantName}</h3>
      </div>
      <div>
        <p className="text-muted">{}</p>
      </div>
      <hr />
      <div>
        <h4>Menu</h4>
      </div>
      <div style={{ backgroundColor: "lightGrey", width: "350px" }}>
        <img
          width={"150px"}
          className="p-2"
          src="https://cdn.pixabay.com/photo/2014/11/05/15/57/salmon-518032_1280.jpg"
        />
      </div>
      </div>
    </>    
  );
}
