import React, { useContext } from 'react'
import UserContext from '../context/AuthContext';

import LoadMap from "./LoadMap";
import LoadMapSpacing from './LoadMapSpacing';

export default function Map() {
  const user = useContext(UserContext);

  return (
    <div>
      {!user ? (
        <div id="googleMapApp">
          <LoadMap />
        </div>
      ) : (
        <div id="googleMapApp">
          <LoadMapSpacing />
        </div>
      )}
    </div>
  );
}
