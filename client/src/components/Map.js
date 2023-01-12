import React from 'react'

import LoadMap from "./LoadMap";
import LoadOneMap from "./LoadOneMap";

export default function Map() {
  return (
    <div>
      <div id="googleMapApp">
        <LoadMap />
      </div>
    </div>
  );
}
