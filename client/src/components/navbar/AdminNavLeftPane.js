import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Card from "react-bootstrap/Card";
import {
  Cart2,
  ChatQuote,
  ChatQuoteFill,
  Clipboard2Data,
  CreditCardFill,
  People,
  PeopleFill,
  Shop,
  ShopWindow,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

export default function AdminNavLeftPane() {
  return (
    <div>
      <ListGroup as="ol">
        <ListGroup.Item as="li" className=" ">
          <div className="ms-2 me-auto">
            <div className="fw-bold text-muted">MAIN</div>
            <Link to="/admin/dashboard-menu" className="text-reset">
              <div className="d-flex align-items-center justify-content-between py-2">
                <Clipboard2Data
                // style={{marginLeft: "-15px"}}
                />
                <span className="">Dashboard</span>
              </div>
            </Link>
          </div>
        </ListGroup.Item>
        <ListGroup.Item as="li" className="">
          <div className="ms-2 me-auto">
            <div className="fw-bold text-muted">VIEWINGS</div>
            <Link to="/admin/view-all-users" className="text-reset">
              <div className="d-flex align-items-center justify-content-between py-2">
                <People />
                <span>Users</span>
              </div>
            </Link>
            <Link to="/admin/view-all-restaurants" className="text-reset">
              <div className="d-flex align-items-center justify-content-between py-2">
                <ShopWindow />
                <span>Restaurants</span>
              </div>
            </Link>
            <Link to="/admin/view-all-orders" className="text-reset">
              <div className="d-flex align-items-center justify-content-between py-2">
                <Cart2 />
                <span>Orders</span>
              </div>
            </Link>
            <Link to="/admin/view-all-reviews" className="text-reset">
              <div className="d-flex align-items-center justify-content-between py-2">
                <ChatQuote />
                <span>Reviews</span>
              </div>
            </Link>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
