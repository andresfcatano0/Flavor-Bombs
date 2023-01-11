import React, { useEffect, useReducer, useState } from 'react'
// import CartContext, {storage} from './CartContext';
import CartContext from './CartContext';
import CartReducer, { handleTotals } from './CartReducer';

const storage = localStorage.getItem("orderCartItems")
  ? JSON.parse(localStorage.getItem("orderCartItems"))
  : [];


const CartState = ({children}) => {

    // const [menu, setMenu] = useState([]);
    // const getMenuByRestaurant = (params) => {
    //   fetch("http://localhost:8080/api/menu", {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //     .then((response) => {
    //       return response.json();
    //     })
    //     .then((data) => {
    //       let specificMenu = data.filter((d) => {
    //         // return d.restaurantId.toString() === params.id.toString();
    //         return d.restaurantId === params;
    //       });
    //       console.log(specificMenu);
    //       setMenu(specificMenu);
    //     })
    //     .catch((err) => console.log(err));
    // };

    // // console.log(menu)
    // useEffect(()=> {
    //     getMenuByRestaurant(3)

    // },[])
   

    const initialState = {
        orderCartItems: storage, ...handleTotals(storage),
        checkoutCartItems: false,
    };

    const [state, dispatch] = useReducer(CartReducer, initialState);

    const addItemToCart = (payload) => {
        dispatch({
          type: "ADD_ITEM_TO_CART",
          payload,
        });
    }

        const increaseQuantity = (payload) => {
            dispatch({
                type: "INCREASE",
                payload,
            });
        };

        const decreaseQuantity = (payload) => {
            dispatch({type: 'DECREASE', payload})
        };

        const removeItemFromCart = (payload) => {
            dispatch({ type: "REMOVE_ITEM_FROM_CART", payload });
        };

        const clearCart = () => {
            dispatch({type: "CLEAR"})
        };
        
        const handleCheckoutOrder = ()=>{
            dispatch({ type: "CHECKOUT_ORDER" });
                    };
        

                    return (
                      <CartContext.Provider
                        value={{
                          showCart: state.showCart,
                          orderCartItems: state.orderCartItems,
                          addItemToCart,
                          increaseQuantity,
                          decreaseQuantity,
                          removeItemFromCart,
                          clearCart,
                          handleCheckoutOrder,
                          ...state,
                        }}
                      >
                        {children}
                      </CartContext.Provider>
                    );

        
    }

    export default CartState;

  
