import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../components/SearchBar';


export default function RestaurantPage({restaurants,isLoading,menus}) {
  const [searchTerm, setSearchTerm] = useState("")

  return (
    <div id="food-background" className='mt-5'>
      <h1 className="text-center mb-4">Restaurants</h1>
      <SearchBar setSearchTerm={setSearchTerm}/>
      <RestaurantCard restaurants={restaurants} isLoading={isLoading} searchTerm={searchTerm} menus={menus}/>
    </div>
  );
}
