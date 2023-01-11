import React from 'react'
import  { useState, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import restInfo from "./data/restInfo.json";

const libraries = ["places"];
const mapContainerStyle = {
  width: "80vw",
  height: "70vh",
};
const center = {
  lat: 44.986656,
  lng: -93.258133,
};

export default function LoadMap(props) {

const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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
        {restInfo.restaurants.map((restName) => (
          <MarkerF
            key={restName.restaurant_id}
            icon={{
              url: restName.icon,
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            position={{
              lat: restName.lat,
              lng: restName.lng,
            }}
            onClick={() => {
              setSelectedRestaurant(restName);
            }}
          />
        ))}
        {selectedRestaurant ? (
          <InfoWindowF
            position={{
              lat: selectedRestaurant.lat,
              lng: selectedRestaurant.lng,
            }}
            onCloseClick={() => {
              setSelectedRestaurant(null);
            }}
          >
            <div>
              <h6>
              {selectedRestaurant.restaurant_name}
              </h6>
              <p>{selectedRestaurant.open_hours}</p>
              <p>{selectedRestaurant.address}</p>
              <p>{selectedRestaurant.phone_number}</p>
            </div>
          </InfoWindowF>
        ) : null}
      </GoogleMap>
    </div>
    );
}
