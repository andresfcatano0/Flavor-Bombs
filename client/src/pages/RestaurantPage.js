import React, { useEffect, useState } from 'react';
import "./RestaurantPage.css";
import RestaurantCard from '../components/RestaurantCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from '../components/SearchBar';
import { Search } from "react-bootstrap-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Stack from "react-bootstrap/Stack";
import Loader from '../components/loadingComponents/Loader';
import filterMaterial from '../components/data/filterTags';





export default function RestaurantPage({restaurants,getRestaurants,isLoading,menus, getAllMenus}) {

  const [showRestaurants, setShowRestaurants] = useState([]);

  const [filterTerm, setFilterTerm] = useState("");

  const handleSearching = (event) => {
    console.log(event.target.value);

    setFilterTerm(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let results = restaurants.filter(found => {
        return found.filterTags.includes(filterTerm);
      }
    )

    console.log(results)
    setShowRestaurants(results)
    
     
  };

  // useEffect(()=> {
  //   setShowRestaurants([...restaurants])
  //   filterTerm === ""
  //     ? setShowRestaurants([...restaurants])
  //     : setShowRestaurants([...restaurants]);
  //   return () => {
  //     // getRestaurants();
  //   }
  // },[restaurants])

  useEffect(()=>{
    //reset the search to result in all restaurant showing when there is no filter words
    if (filterTerm === "") {
      setShowRestaurants([...restaurants]);
    }
  },[filterTerm, restaurants]);

  // console.log(showRestaurants)

  const handleSelectFilter = (event) => {
      console.log(event.target.id)
      setFilterTerm(event.target.id.toLowerCase());
      let results = restaurants.filter((found) => {
        return found.filterTags.includes(event.target.id.toLowerCase());
      });

      console.log(results);
      setShowRestaurants(results);
  }

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
        {/* 
        <div className="d-flex flex-column p-2 filter-container" onClick={(e)=> {handleSelectFilter(e)}}>
          <img
            src="filter_tags/fried-chicken.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />
          <span className="bg-light">Chicken</span>

        </div>
        <div id="sweet" className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/cake-slice.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Sweet</span>
        </div>
        <div id="spicy" className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/chili.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Spicy</span>
        </div>
        <div className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/pizza.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Pizza</span>
        </div>
        <div className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/taco.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Taco</span>
        </div>
        <div className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/spaguetti.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Pasta</span>
        </div>
        <div className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/fried-potatoes.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Fries</span>
        </div>
        <div className="d-flex flex-column p-2 filter-container">
          <img
            src="filter_tags/vegan.png"
            style={{ width: "60px", height: "60px", objectFit: "cover" }}
          />

          <span className="bg-light">Vegan</span>
        </div> */}
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
