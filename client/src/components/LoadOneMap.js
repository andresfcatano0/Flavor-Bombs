import React from 'react'
import  { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";


// const libraries = ["places"];

export default function LoadOneMap({getSpecificRestaurant, specificRestaurant}) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    // libraries,
  });
  const params = useParams();
  // const [selectedRestaurantId, setSelectedRestaurantId] = useState([]);
  const [clickedRestaurant, setClickedRestaurant] = useState("")

// console.log(specificRestaurant)
  // const getSelectedRestaurant = () => {
  //   // fetch(`http://localhost:8080/api/restaurant/${params.id}`, {
  //     fetch(`http://localhost:8080/api/restaurant/${6}`, {
  //       method: 'GET',
  //       headers: {
  //           'Content-Type': 'application/json'

  //       },
  //   })
  //   .then(res=> {
  //       return res.json();
  //   })
  //   .then(selectRestaurant => {
  //       setSelectedRestaurantId(selectRestaurant);

  //   })
  // }

  const mapContainerStyle = {
    height: "300px", width: "350px"
    // width: "50vw",
    // height: "70vh",
  };
  const center = {
    lat: +specificRestaurant.latitude,
    // 44.986656
    lng: +specificRestaurant.longitude,
  };
  
  useEffect(() => {
    getSpecificRestaurant();
  },[])

  console.log(specificRestaurant)

  if (loadError) return "Error loading the map";
  if (!isLoaded) return "Loading map...";
    return (
      <div>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={17}
          center={center}
        >
          <MarkerF
            key={specificRestaurant.restaurantId}
            position={{
              lat: +specificRestaurant.latitude,
              lng: +specificRestaurant.longitude,
            }}
            onClick={() => {
              setClickedRestaurant(specificRestaurant);
              console.log(clickedRestaurant);
            }}
          />
          {clickedRestaurant ? (
            <InfoWindowF
              position={{
                lat: specificRestaurant.latitude,
                lng: specificRestaurant.longitude,
              }}
              onCloseClick={() => {
                setClickedRestaurant();
              }}
            >
              <div>
                <h6>{clickedRestaurant.restaurantName}</h6>
                <p>{clickedRestaurant.openHours}</p>
                <p>{clickedRestaurant.phoneNumber}</p>
                <p>{clickedRestaurant.address}</p>
              </div>
            </InfoWindowF>
          ) : null}
        </GoogleMap>
      </div>
    );
}
