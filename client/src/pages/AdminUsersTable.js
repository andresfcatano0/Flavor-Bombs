import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/AuthContext";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import {
  BagCheckFill,
  Basket3Fill,
  BasketFill,
  ChatQuoteFill,
  Clipboard2Data,
  MenuDown,
  PeopleFill,
  Shop,
  Trash3,
} from "react-bootstrap-icons";
import ReviewsTable from "../components/adminTables/ReviewsTable";
import { Link } from "react-router-dom";

export default function AdminUsersTable({ allUser }) {
  return (
    <Table striped bordered hover className="text-center">
      <thead>
        <tr>
          <th></th>
          <th>User Name</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allUser.map((userInfo, index) => {
          return (
            <tr key={userInfo.appUserId}>
              <td>{index + 1}</td>
              <td>{userInfo.username}</td>
              <td>{userInfo.firstName}</td>
              <td>{userInfo.lastName}</td>
              <td>{userInfo.email}</td>

              <td className="d-flex justify-content-around">
                <Button className="btn btn-danger d-flex align-items-center">
                  <span className="px-2">Delete</span>
                  <Trash3 />
                </Button>
              </td>
            </tr>
          );
        })}
        <tr></tr>
      </tbody>
    </Table>
  );
}
