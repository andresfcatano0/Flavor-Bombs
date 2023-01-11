import React from "react";
import { Search } from "react-bootstrap-icons";

import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";



export default function SearchBar() {
  return (
    <div>
      <div>
        <InputGroup size="sm" className="mt-1 ms-3" style={{ width: "80vw" }}>
          <Form.Control
            placeholder="Search for restaurant and food"
            aria-label="search input"
            aria-describedby="search input"
          />
          <InputGroup.Text id="search input">
            <Search style={{ cursor: "pointer" }} />
          </InputGroup.Text>
        </InputGroup>
      </div>
    </div>
  );
}
