import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default function RestaurantPage({restaurants,isLoading}) {

  return (
    <div id="food-background">
      <h1 className="text-center mb-4">Restaurants</h1>
      <RestaurantCard restaurants={restaurants} isLoading={isLoading} />
    </div>
  );
}
