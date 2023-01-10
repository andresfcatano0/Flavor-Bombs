import React from 'react'
import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  INCREASE,
  DECREASE,
  CHECKOUT_ORDER,
  CLEAR,
} from "./CartTypes.js";

export const handleTotals = (orderCartItems) => {
    let itemCount = orderCartItems.reduce((total, menuItem)=> total + menuItem.quantity, 0
    );

    let total = orderCartItems.reduce((total, menuItem)=> total + menuItem.quantity*menuItem.itemPrice,0).toFixed(2);
    return {itemCount, total};
};


const CartReducer = (state, action)=> {
    switch (action.type) {
      case ADD_ITEM_TO_CART:
        if (
          !state.orderCartItems.find((item) => item.menuId === action.payload.menuId)
        ) {
          state.orderCartItems.push({ ...action.payload, quantity: 1 });
        }
        return {
          ...state,
          ...handleTotals(state.orderCartItems),
          orderCartItems: [...state.orderCartItems],
        };

      case REMOVE_ITEM_FROM_CART:
        return {
          ...state,
          ...handleTotals(
            state.orderCartItems.filter((item) => item.menuId !== action.payload.menuId)
          ),
          orderCartItems: [
            ...state.orderCartItems.filter(
              (item) => item.menuId !== action.payload.menuId
            ),
          ],
        };

      case INCREASE:
        state.orderCartItems[
          state.orderCartItems.findIndex(
            (item) => item.menuId === action.payload.menuId
          )
        ].quantity++;
        return {
          ...state,
          ...handleTotals(state.orderCartItems),
          orderCartItems: [...state.orderCartItems],
        };

      case DECREASE:
        state.orderCartItems[
          state.orderCartItems.findIndex(
            (item) => item.menuId === action.payload.menuId
          )
        ].quantity--;
        return {
          ...state,
          ...handleTotals(state.orderCartItems),
          orderCartItems: [...state.orderCartItems],
        };

      case CHECKOUT_ORDER:
        return {
          orderCartItems: [],
          handleCheckoutOrder: true,
          ...handleTotals([]),
        };

      case CLEAR:
        return {
          ...state,
          orderCartItems: [],
          ...handleTotals([]),
        };

      default:
        return state;
    }}

export default CartReducer;
