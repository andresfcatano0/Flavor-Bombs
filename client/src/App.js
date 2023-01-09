import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow } from '@react-google-maps/api';
import * as restMarker from "./data/restInfo.json"

const libraries = ["places"]
const mapContainerStyle = {
  width: "50vw",
  height: "50vh",
};
const center = {
  lat: 44.986656,
  lng: -93.258133,
};

const position = {
  lat: 44.986657,
  lng: -93.258139,
}


function App() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: "",
    // process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading the map";
  if (!isLoaded) return "Loading map...";

  return (
    <div>
      <h1>
        Flavor Bombs {" "}
        <span role="img" aria-label="bombs">
         🔥
          </span>
          </h1>
      <GoogleMap
       mapContainerStyle={mapContainerStyle} 
       zoom={10}
       center={center}
       >
      <MarkerF key="markerOne" position={position}
      // image={image}
      />
      <MarkerF  key="markerTwo" 
      position={{lat: 44.946346, lng: -93.305101}}
      // icon = "/icons/pizza.png"
      />
      <MarkerF key="markerThree" 
      position={{lat: 44.974820, lng: -93.269851}} 
      />
            <MarkerF key="markerFour" 
      position={{lat: 44.978471, lng: -93.275941}} 
      />
            <MarkerF key="markerFive" 
      position={{lat: 44.977032, lng: -93.272362}} 
      />
            <MarkerF key="markerSix" 
      position={{lat: 44.969191, lng: -93.247046}} 
      />
            <MarkerF key="markerSeven" 
      position={{lat: 44.968174, lng: -93.276598}} 
      />
                  <MarkerF key="markerSeven" 
      position={{lat: 44.965480, lng: -93.298057}} 
      />
                  <MarkerF key="markerSeven" 
      position={{lat: 44.952147, lng: -93.293456}} 
      />
                  <MarkerF key="markerSeven" 
      position={{lat: 44.968053, lng: -93.290599}} 
      />

       </GoogleMap>
    </div>
  );
}

export default App;
