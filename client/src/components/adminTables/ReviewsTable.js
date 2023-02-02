import React from 'react'
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import {
  BagCheckFill,
  Basket3Fill,
  BasketFill,
  ChatQuoteFill,
  MenuDown,
  PeopleFill,
  Shop,
  Trash3,
} from "react-bootstrap-icons";


export default function ReviewsTable(){
    return (
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th></th>
            <th>User Name</th>
            <th>Restaurant</th>
            <th>Text</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* {restaurants.map((restaurant, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td></td>
                <td></td>
                <td></td>
                <td className="d-flex justify-content-around">
                  <Button className="btn btn-danger d-flex align-items-center">
                    <span className="px-2">Delete</span>
                    <Trash3 />
                  </Button>
                </td>
              </tr>
            );
          })}
          <tr></tr> */}
        </tbody>
      </Table>
    );
}