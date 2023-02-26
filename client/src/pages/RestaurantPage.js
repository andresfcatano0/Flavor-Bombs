import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../components/SearchBar';
import { Search } from "react-bootstrap-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Loader from '../components/loadingComponents/Loader';





export default function RestaurantPage({restaurants,getRestaurants,isLoading,menus, getAllMenus}) {
  // const [searchTerm, setSearchTerm] = useState("")

  const [showRestaurants, setShowRestaurants] = useState(restaurants);

  const [filterTerm, setFilterTerm] = useState("");

  const handleSearching = (event) => {
    console.log(event.target.value);

    //reset the search to result in all restaurant showing when there is no filter words
    if(event.target.value === ""){
      setShowRestaurants(restaurants)
    }

    setFilterTerm(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let results = showRestaurants.filter(found => {
        return found.filterTags.includes(filterTerm);
      }
    )

    setShowRestaurants(results)
    
     
  };

  useEffect(()=> {
    getRestaurants();
  },[showRestaurants])

  console.log(showRestaurants)

  if(!restaurants.length){
    return (
      <div
        className="position-absolute top-50 start-50 translate-middle"
      >
        <Loader />
      </div>
    );
  }


  return (
    <div id="food-background" className="mt-5">
      <h1 className="text-center mb-4">Restaurants</h1>
     
      <Form onSubmit={handleSubmit}>
        <InputGroup
          size="sm"
          className="my-5 mx-auto"
          style={{ width: "80vw" }}
        >
          <Form.Control
            placeholder="Search for restaurant and food"
            aria-label="search input"
            aria-describedby="search input"
            value={filterTerm}
            onChange={(event) => {
              handleSearching(event);
            }}
          />
          <InputGroup.Text id="search-input">
            <Search style={{ cursor: "pointer" }} />
          </InputGroup.Text>
        </InputGroup>
      </Form>

      <RestaurantCard
        // restaurants={restaurants}
        restaurants={showRestaurants}
        isLoading={isLoading}
        menus={menus}
      />
    </div>
  );
}
