import React, { useEffect, useState } from 'react';
import RestaurantCard from '../components/RestaurantCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../components/SearchBar';
import { Search } from "react-bootstrap-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";





export default function RestaurantPage({restaurants,getRestaurants,isLoading,menus, getAllMenus}) {
  // const [searchTerm, setSearchTerm] = useState("")

  const [showRestaurants, setShowRestaurants] = useState(restaurants);

  const [filterTerm, setFilterTerm] = useState("");

  const handleSearching = (event) => {
    console.log(event.target.value);
    //reset the search to result in all restaurant showing when there is no filter words
    if(event.target.value == ""){
      setShowRestaurants(restaurants)
    }

    setFilterTerm(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let results = showRestaurants.filter(found => {
        // if(found.filterTags.includes(filterTerm)){
        //   return found;
        // }
        return found.filterTags.includes(filterTerm)
        
      }
    )

    setShowRestaurants(results)
    
     
  };

  // useEffect(()=> {
  //   getRestaurants();
  // },[showRestaurants])

  console.log(showRestaurants)

  if(!showRestaurants.length){
    return <span>Loading...</span>
  }


  return (
    <div id="food-background" className="mt-5">
      <h1 className="text-center mb-4">Restaurants</h1>
      {/* <SearchBar setSearchTerm={setSearchTerm}/> */}
      
      <form onSubmit={(e)=>{handleSubmit(e)}}>
        <input type="search" onChange={(e)=>handleSearching(e)}/>
        <button type="submit">Search</button>
      </form>

      <RestaurantCard
        restaurants={restaurants}
        isLoading={isLoading}
        // searchTerm={searchTerm}
        menus={menus}
      />

      
      <ul>
      {showRestaurants.map((found)=> {
        return <li>{found.restaurantName}</li>
      })}

      </ul>
    </div>
  );
}
