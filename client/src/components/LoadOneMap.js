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

  const [selectedRestaurantId, setSelectedRestaurantId] = useState({});


  const getSelectedRestaurant = () => {
    fetch(`http://localhost:8080/api/restaurant/2`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'

        },
    })
    .then(res=> {
        return res.json();
    })
    .then(selectedRestaurant => {
        setSelectedRestaurantId(selectedRestaurant);
    })
  }

  const mapContainerStyle = {

    width: "80vw",
    height: "70vh",
  };
  const center = {
    lat: selectedRestaurantId.latitude,
    // 44.986656 
    lng: selectedRestaurantId.longitude,
  };
  
  useState(() => {
    getSelectedRestaurant()
  })
console.log(selectedRestaurantId)
  if (loadError) return "Error loading the map";
  if (!isLoaded) return "Loading map...";
    return (
        <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >

        <MarkerF 
        key={selectedRestaurantId.restaurant_id}
        
        position={{
          lat: selectedRestaurantId.latitude,
          lng: selectedRestaurantId.longitude,
        }}
      onClick={() => {
        setSelectedRestaurantId(selectedRestaurantId);
        console.log(selectedRestaurantId)
      }}
        />
         {/* <InfoWindowF
            position={{
              lat: selectedRestaurantId.latitude,
              lng: selectedRestaurantId.longitude,
            }}
            onCloseClick={() => {
              setSelectedRestaurantId();
            }}
          >
            <div>
              <h6>
              {selectedRestaurantId.restaurant_name}
              </h6>
              <p>{selectedRestaurantId.open_hours}</p>
              <p>{selectedRestaurantId.address}</p>
              <p>{selectedRestaurantId.phone_number}</p>
            </div>
          </InfoWindowF> */}
    
      </GoogleMap>
    </div>
    );
}
