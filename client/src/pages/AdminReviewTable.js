import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import {
  Cart2,
  Clipboard2Data,
  CreditCardFill,
  People,
  PeopleFill,
  Shop,
  ShopWindow,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import UserContext from "../context/AuthContext";

export default function AdminReviewTable({allReviews, getAllReviews}) {
    const adminUser = useContext(UserContext);

    const deleteReview = (reviewId) => {
      if (window.confirm("Are you sure you want to delete this review?")) {
        fetch("http://localhost:8080/api/review/" + reviewId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + adminUser.token,
          },
        }).then((data) => {
          // console.log(data);
          getAllReviews();
          if (data.statusCode === 204) {
            console.log("successfully deleted review");
          }
          // console.log(data.statusCode)
        });
      }
    };
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th></th>
          <th>Review Text</th>
          <th>Actions</th>
        </tr>
      </thead>
        <tbody className="text-center">
           

           {allReviews.map((r, index)=> {
            return (
              <tr key={r.reviewId}>
                <td>{index + 1}</td>
                <td>{r.reviewText}</td>
                
                <td>
                  <Button
                    value={r.reviewId}
                    onClick={() => {
                      deleteReview(r.reviewId);
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
           })}
        </tbody>


  </Table>
  )
}
