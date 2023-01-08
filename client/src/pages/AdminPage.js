import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/AuthContext'

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Tab from "react-bootstrap/Tab";
import ListGroup from "react-bootstrap/ListGroup";
import Modal from "react-bootstrap/Modal";
import { MenuDown, PeopleFill, Shop, Trash3 } from 'react-bootstrap-icons';


export default function AdminPage({ restaurants, getMenuByRestaurant, menu }) {
  const adminUser = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [newMenu, setNewMenu] = useState([...menu]);

  const [isLoading, setIsLoading] = useState(true);

  const handleMenuModal = (restaurantId) => {
    let savedRestaurant = restaurants.filter(r=> r.restaurantId == restaurantId);
    console.log(savedRestaurant[0].restaurantName)
    
    getMenuByRestaurant(restaurantId)
    console.log(newMenu)

    
    
    // setNewMenu(getMenuByRestaurant(restaurantId));
    // setIsLoading(false)
    // setModalShow(true);
    
  };


//   function MyVerticallyCenteredModal(props) {
//     // let restaurantMenu = {
//     //     menuId: "", 
//     //     itemName: "",
//     //     itemDescription: "",
//     //     itemPrice: "", 
//     //     restaurantId:""
//     // }

//     // console.log(menu)

//     return (
//         // isLoading ? (
//         //     <p>Loading..</p>
//         // ):(
//       <Modal
//         {...props}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//       >
//         <Modal.Header closeButton>
//           <Modal.Title id="contained-modal-title-vcenter">
            
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <h4>Centered Modal</h4>
//           <p>
//             Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
//             dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
//             ac consectetur ac, vestibulum at eros.
//           </p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={props.onHide}>Close</Button>
//         </Modal.Footer>
//       </Modal>
//     //   )
//     );
//   }

  

  return (
    <>
      <Container className="d-flex mt-4">
        <Col lg={12}>
          <Tab.Container
            id="list-group-tabs-example"
            defaultActiveKey="#restaurant-table"
          >
            <Row>
              <Col sm={4}>
                <ListGroup>
                  <ListGroup.Item
                    action
                    href="#restaurant-table"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <Shop />
                    <span>Restaurants</span>
                  </ListGroup.Item>
                  <ListGroup.Item
                    action
                    href="#link2"
                    className="d-flex align-items-center justify-content-between"
                  >
                    <PeopleFill />
                    <span>Users</span>
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  <Tab.Pane eventKey="#restaurant-table">
                    <Table striped bordered hover className="text-center">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Restaurant Name</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {restaurants.map((restaurant, index) => {
                          return (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{restaurant.restaurantName}</td>
                              <td className="d-flex justify-content-around">
                                <Button
                                  onClick={() => {
                                    handleMenuModal(restaurant.restaurantId);
                                  }}
                                  className="btn btn-dark d-flex align-items-center"
                                >
                                  <span className="px-2">View Menu</span>
                                  <MenuDown />
                                </Button>
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
                  </Tab.Pane>
                  <Tab.Pane eventKey="#link2">bye</Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Col>
        {/* <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th></th>
                <th>Restaurant Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{restaurant.restaurantName}</td>
                    <td>
                      <Button className="btn btn-success">Edit</Button>
                      <Button className="btn btn-danger">Delete</Button>
                    </td>
                  </tr>
                );
              })}
              <tr></tr>
            </tbody>
          </Table>
        </Col> */}
      </Container>
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );
}
