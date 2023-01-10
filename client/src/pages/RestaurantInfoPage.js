import React, { useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import { useParams } from "react-router-dom";
import ReviewCard from '../components/ReviewCard';
import MenuCard from '../components/MenuCard';
import CartContext from '../context/cart/CartContext';

export default function RestaurantInfoPage({getRestaurants, restaurants}) {
    // const [index, setIndex] = useState(0);

    // const handleSelect = (selectedIndex, e) => {
    //   setIndex(selectedIndex);
    // };

    



    const [menu, setMenu] = useState([]);
    const params = useParams();
    const [specificRestaurant, setSpecificRestaurant] = useState({});

    const getMenuByRestaurant = () => {
        fetch("http://localhost:8080/api/menu", {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            return response.json();
        }).then(data => {
            let specificMenu = data.filter(d=> {
                return d.restaurantId.toString() === params.id.toString()
            })
            // console.log(specificMenu);
            setMenu(specificMenu);
        }).catch(err=> console.log(err));
    }


const {
  addItemToCart,
  increaseQuantity,

  orderCartItems,
  handleTotals,
  itemCount,
} = useContext(CartContext);

const itemInCart = (menuItems) => {
  return orderCartItems?.find((item) => item.menuId === menuItems.menuId);
};








const getSpecificRestaurant = () => {
  fetch(`http://localhost:8080/api/restaurant/${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
      
    },
  })
  .then(res=> {
    return res.json();
  })
  .then(data => {
    // console.log(data)
    setSpecificRestaurant(data);
  })
}

const [reviews, setReviews] = useState([]);
const getReviewPerRestaurant = () => {
  fetch("http://localhost:8080/api/review", {
    method: 'GET',
    headers:{
      "Content-Type": "application/json"
    }
  }).then(res=> {
    return res.json();
  }).then(data=> {
    // console.log(data)
    // for(let i = 0; i<data.length;i++){
    //   if (data[i].restaurantId === params.id) {
    //     setReviews(data[i]);
    //   }
    // }
    let specificReviews = data.filter(d=> {
      return d.restaurantId.toString() === params.id.toString()
    })
    setReviews(specificReviews)
    // console.log(specificReviews)
  })
}

useEffect(()=> {
  getSpecificRestaurant();
  getMenuByRestaurant();
  getReviewPerRestaurant();
  }, [])
  
    return (
      // <div className="mt-4 flex-column text-center">
      <>
        <div className="mt-4" key={specificRestaurant.restaurantId}>
          <div className="text-center">
            <img
              className="rounded"
              height={"350px"}
              src="https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_1280.jpg"
            />
          </div>
          <div>
            <h3 className="mt-2 text-end">
              {specificRestaurant.restaurantName}
            </h3>
          </div>
          <div className="text-end">
            <p className="text-muted">{specificRestaurant.address}</p>
            <p className="text-muted">{specificRestaurant.openHours}</p>
          </div>
          <hr />
          {/* <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <ReviewCard/>
              </Carousel.Item>
              <Carousel.Item>
                <ReviewCard/>
              </Carousel.Item>
              <Carousel.Item>
                <ReviewCard/>
              </Carousel.Item>
            </Carousel> */}
          <Row>
            <ReviewCard reviews={reviews}/>
            {console.log(reviews)}
            {/* <ReviewCard /> */}
          </Row>
          <hr />
          <div>
            <h4>Menu</h4>
          </div>
          {menu.map(m=>{
            return (
                <MenuCard 
                key={m.menuId} 
                m={m} 

                
                />
            )
          })}
        </div>
      </>
    );
}
