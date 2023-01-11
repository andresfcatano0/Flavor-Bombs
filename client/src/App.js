import "./App.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
// import restInfo from "./data/restInfo.json";
import LoadMap from "./components/LoadMap";
import LoadOneMap from "./components/LoadOneMap";


function App() {
  
  return (
    <div id="googleMapApp">
      <h1>
        Flavor Bombs{" "}
        <span role="img" aria-label="bombs">
          🔥
        </span>
      </h1>
      <LoadOneMap/>
    </div>
  );
}

export default App;
