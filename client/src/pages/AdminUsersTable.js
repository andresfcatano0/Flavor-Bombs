import React, { useContext, useState } from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  Trash3,
} from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

export default function AdminUsersTable({
  specificUser,handleClose,
  handleShow,
  show,
  allUsers,
  deleteUser
}) {
  let userModal = {
    appUserId: 0,
    firstName: "",
    lastName: "",
  };

  let [userSavedState, setUserSavedState] = useState({
    userModal,
  });

  const handleModal = (event) => {
    console.log(event.target.value);
    let found = allUsers.filter((user) => user.appUserId == event.target.value);
    //  console.log(found[0].userName)
    let savedU = {
      appUserId: event.target.value,
      firstName: found[0].firstName,
      lastName: found[0].lastName,
    };
    setUserSavedState(savedU);
    handleShow();
  };

  const history = useHistory();
  const handleSpecificReviewOrder = (userId) => {
        history.push("/admin/specific-user/" + userId);
  };

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
                  onClick={() => {
                    handleSpecificReviewOrder(userInfo.appUserId);
                  }}
                  className="btn btn-info d-flex align-items-center"
                >
                  More Info
                </Button>
                <Button
                  value={userInfo.appUserId}
                  onClick={(event) => {
                    handleModal(event);
                  }}
                  className="btn btn-danger d-flex align-items-center"
                >
                  Delete
                  <Trash3 />
                </Button>
              </td>
            </tr>
          );
        })}
        <tr></tr>
      </tbody>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {userSavedState.firstName}{" "}
          {userSavedState.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              deleteUser(userSavedState.appUserId);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Table>
  );
}
