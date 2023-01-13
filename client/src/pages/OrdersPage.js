import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../context/AuthContext';
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Modal from "react-bootstrap/Modal";

export default function OrdersPage({restaurants}) {

     const userInfo = useContext(UserContext);
     const [orders, setOrders] = useState([]);

      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);

     const [restaurantOrders, setRestaurantOrders] = useState([]);
     

    // console.log(userInfo)
    
    let getSpecificRestaurantName = (orderId) => {
      let found = restaurants.filter(r=>r.restaurantId == orderId);
      setRestaurantOrders(found)
    }

    

    const getUserOrders = () => {
        fetch("http://localhost:8080/api/order", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            // console.log(data);
            setOrders(data);
          });
    }

    const deleteOrder = (orderId) => {
      
        fetch("http://localhost:8080/api/order/" + orderId, {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + userInfo.token,
          },
        }).then((data) => {
          // console.log(data);
          getUserOrders();
          handleClose();
          if (data.statusCode === 204) {
            console.log("successfully deleted restaurant");
          }
          // console.log(data.statusCode)
        });
      
    };

    useEffect(()=>{
        getUserOrders()
        
    },[])

   


  return (
    <div className=" mt-3 text-center">
      {/* <h2>Current or Future Orders</h2>
      <hr />
      <p className="text-muted">
        There are no current or future orders yet... Visit <a href="/restaurants" style={{color:"grey", fontWeight:"700"}}>Restaurants</a> to start
        ordering.
      </p>

      <br />
      <br /> */}
      <h2 className="text-center">Orders</h2>
      <hr />
      {orders ? (
        <Table striped hover>
          <thead>
            <tr>
              <th className="text-center">#</th>
              <th>Date</th>
              <th>Restaurant Name</th>
              <th>Food Item</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {console.log(orders)} */}
            {orders.map((order, index) => {
              return (
                <tr key={order.orderId}>
                  <td className="text-center">{index + 1}</td>
                  <td>{order.orderDate}</td>
                  {/* <td>{order.restaurantId}</td> */}
                  <td>{restaurants[order.restaurantId - 1].restaurantName}</td>
                  <td>{order.orderItems}</td>
                  <td>{order.itemQuantity}</td>
                  <td>${order.totalPrice.toFixed(2)}</td>

                  <td>
                    <Button
                      value={order.orderId}
                      className="btn-danger"
                      // onClick={() => deleteOrder(order.orderId)}
                      onClick={handleShow}
                    >
                      Delete
                    </Button>
                  </td>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Deleting Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete the order with {(order.orderItems)}?</Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="danger" onClick={()=>{deleteOrder(order.orderId)}}>
                        Delete Order
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </tr>
              );
            })}
          </tbody>
        </Table>
        
      ) : (
        <p className="text-muted">There are no orders.</p>
      )}

      
    </div>
  );
}
