import React, { useContext } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import {
  Trash3,
} from "react-bootstrap-icons";

export default function AdminUsersTable({ allUsers, deleteUser, handleSpecificReviewOrder }) {
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
        {allUsers.map((userInfo, index) => {
          return (
            <tr key={userInfo.appUserId}>
              <td>{index + 1}</td>
              <td>{userInfo.username}</td>
              <td>{userInfo.firstName}</td>
              <td>{userInfo.lastName}</td>
              <td>{userInfo.email}</td>

              <td className="d-flex justify-content-around">
                
                <Button
                  value={userInfo.appUserId}
                  onClick={()=> {
                    deleteUser(userInfo.appUserId);
                  }}
                  className="btn btn-danger d-flex align-items-center"
                >
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
