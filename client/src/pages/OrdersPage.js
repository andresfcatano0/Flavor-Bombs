import React, {useContext, useEffect, useState} from 'react'
import UserContext from '../context/AuthContext';
import Table from 'react-bootstrap/Table'

export default function OrdersPage({restaurants}) {

     const userData = useContext(UserContext);
     const [orders, setOrders] = useState([]);

     const [restaurantOrders, setRestaurantOrders] = useState([]);
     

    const getAllUserOrders = () => {
        fetch("http://localhost:8080/api/order", {
          method: "GET",
          headers: {
            Authorization: "Bearer " + userData.token,
          },
        }).then((res) => {
          return res.json()
        }).then((data) => {
            setOrders(data);
        });
    }

    useEffect(()=>{
        getAllUserOrders()
        
    },[])

    // console.log(restaurantOrders)

  return (
    <div>
      <h2>Current or Future Orders</h2>

      <hr/>
      <h2>Past Orders</h2>
      <Table striped hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Restaurant Name</th>
            <th>Food Item</th>
            {/* <th>Time</th> */}
          </tr>
        </thead>
        <tbody>
            {orders.map((order, index)=> {
                return (
                  <tr key={order.orderId}>
                    <td>{index + 1}</td>
                    {/* <td>{order.restaurantId}</td> */}
                    <td>
                      {restaurants[order.restaurantId-1].restaurantName}
                    </td>
                    <td>{order.orderItems}</td>
                  </tr>
                );
            })}
          
        </tbody>
      </Table>
    </div>
  );
}
