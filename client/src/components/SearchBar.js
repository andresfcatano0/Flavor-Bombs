import React, { useState } from "react";
import { Search } from "react-bootstrap-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";



export default function SearchBar({setSearchTerm}) {
  const [filterTerm, setFilterTerm] = useState("");

  const handleSearching = (event) => {
    setFilterTerm(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(filterTerm)
  }


  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup size="sm" className="my-5 mx-auto" style={{ width: "80vw"}}>
        <Form.Control
          placeholder="Search for restaurant and food"
          aria-label="search input"
          aria-describedby="search input"
          value={filterTerm}
          onChange={(event)=>{handleSearching(event)}}
        />
        <InputGroup.Text id="search-input">
          <Search style={{ cursor: "pointer" }} />
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
