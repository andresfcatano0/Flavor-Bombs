import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from "react";
import {
  GoogleMap, useLoadScript, MarkerF, InfoWindow,
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


function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading the map";
  if (!isLoaded) return "Loading map...";

  return (
    <div>
      <h1>
        Flavor Bombs{" "}
        <span role="img" aria-label="bombs">
          🔥
        </span>
      </h1>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        {restInfo.restaurants.map((restName) => (
          <MarkerF
            debugger
            key={restName.restaurant_id}
            icon={restName.icon}
            position={{
            lat: restName.lat,
            lng: restName.lng
            }}
          ></MarkerF>
        ))}
        
      </GoogleMap>
    </div>
  );
}

export default App;
