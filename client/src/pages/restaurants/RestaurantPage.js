import React, { useEffect, useState } from 'react';
import "./RestaurantPage.css";
import RestaurantCard from '../../components/RestaurantCard';

import { Search } from "react-bootstrap-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Loader from '../../components/loadingComponents/Loader';
import filterMaterial from '../../components/data/filterTags';


export default function RestaurantPage({restaurants,getRestaurants,isLoading,menus}) {

  const [showRestaurants, setShowRestaurants] = useState([]);

  const [filterTerm, setFilterTerm] = useState("");

  //handle change from typing in search bar
  const handleSearching = (event) => {
    console.log(event.target.value);

    setFilterTerm(event.target.value.toLowerCase());
  };


  //submits filter term when press enter in search bar
  const handleSubmit = (event) => {
    event.preventDefault();
    
    let results = restaurants.filter(found => {
        return found.filterTags.includes(filterTerm);
      }
    )

    // console.log(results)
    setShowRestaurants(results);    
  };

  useEffect(()=>{
    //reset the search to result in all restaurant showing when there is no filter words
    if (filterTerm === "") {
      setShowRestaurants([...restaurants]);
    }
  },[filterTerm, restaurants]);

  // console.log(showRestaurants)

  //handles filling in filter term from clicking filter icon
  const handleSelectFilter = (event) => {
      // console.log(event.target.id)
      setFilterTerm(event.target.id.toLowerCase());
      let results = restaurants.filter((found) => {
        return found.filterTags.includes(event.target.id.toLowerCase());
      });

      // console.log(results);
      setShowRestaurants(results);
  }

  //fetching async - in meantime show loader component until restaurant fully load
  if(!restaurants.length){
    return (
      <div className="position-absolute top-50 start-50 translate-middle"
      ><Loader />
      </div>
    );
  }

  return (
    <div id="food-background" className="mt-3">
      <h1 className="text-center mb-4" style={{backgroundColor:"rgba(255,255,255,0.4)"}}>Restaurants</h1>

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

      <Stack
        direction="horizontal"
        gap={5}
        className="mb-4 ms-4"
        style={{overflowX:"auto", overflowY:"hidden"}}
      >
        {
          filterMaterial.map((tag)=> {
            return (

        <div className="d-flex flex-column p-2 filter-container" key={tag.textKeyword} id={tag.textKeyword} onClick={(e)=> {handleSelectFilter(e)}}>
          
          <img
            src={tag.img}
            id={tag.textKeyword}
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <span className="bg-light">{tag.textKeyword}</span>

          </div>
            )
          })
        }
      </Stack>

      <RestaurantCard
        // restaurants={restaurants}
        restaurants={showRestaurants}
        isLoading={isLoading}
        menus={menus}
      />
    </div>
  );
}
