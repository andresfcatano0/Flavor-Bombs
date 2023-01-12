import React from 'react'
import  { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";


const libraries = ["places"];

export default function LoadOneMap() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  const params = useParams();
  const [selectedRestaurantId, setSelectedRestaurantId] = useState([]);
  const [clickedRestaurant, setClickedRestaurant] = useState("")


  const getSelectedRestaurant = () => {
    // fetch(`http://localhost:8080/api/restaurant/${params.id}`, {
      fetch(`http://localhost:8080/api/restaurant/${6}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
    })
    .then(res=> {
        return res.json();
    })
    .then(selectRestaurant => {
        setSelectedRestaurantId(selectRestaurant);

    })
  }

  const mapContainerStyle = {

    width: "80vw",
    height: "70vh",
  };
  const center = {
    lat: +selectedRestaurantId.latitude,
    // 44.986656 
    lng: +selectedRestaurantId.longitude,
  };
  
  useEffect(() => {
    getSelectedRestaurant()
  },[])
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
        key={selectedRestaurantId.restaurant_id}
        
        position={{
          lat: +selectedRestaurantId.latitude,
          lng: +selectedRestaurantId.longitude,
        }}
      onClick={() => {
        setClickedRestaurant(selectedRestaurantId);
        console.log(clickedRestaurant)
      }}
        />
                {clickedRestaurant ? (
         <InfoWindowF
            position={{
              lat: selectedRestaurantId.latitude,
              lng: selectedRestaurantId.longitude,
            }}
            onCloseClick={() => {
              setClickedRestaurant();
            }}
          >
            <div>
              <h6>
              {clickedRestaurant.restaurantName}
              </h6>
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
