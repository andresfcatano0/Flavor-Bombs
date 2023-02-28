import React from "react";
import { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { auto } from "@popperjs/core";
// import restInfo from "./data/restInfo.json";

const libraries = ["places"];
const mapContainerStyle = {
  margin: "7rem auto",
  width: "60vw",
  height: "60vh",
};
const center = {
  lat: 44.986656,
  lng: -93.258133,
};

export default function LoadMap() {

  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  const [clickedRestaurant, setClickedRestaurant] = useState("")

  const getSelectedRestaurant = () => {

    fetch(`http://localhost:8080/api/restaurant`, {
      
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((selectRestaurant) => {
        setSelectedRestaurant(selectRestaurant);
      });
  };
  

  useEffect(() => {
    getSelectedRestaurant();
  },[]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading the map";
  if (!isLoaded) return "Loading map...";
  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {selectedRestaurant.map((restName) => (
          <MarkerF
            key={restName.latitude}
            icon={{
              // url: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/326/hamburger_1f354.png",
              url: "https://cdn-icons-png.flaticon.com/128/9745/9745057.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            position={{
              lat: restName.latitude,
              lng: restName.longitude,
            }}
            onClick={() => {
              setClickedRestaurant(restName);
              console.log(clickedRestaurant);
            }}
          />
        ))}
        {clickedRestaurant ? (
          <InfoWindowF
            position={{
              lat: clickedRestaurant.latitude,
              lng: clickedRestaurant.longitude,
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
