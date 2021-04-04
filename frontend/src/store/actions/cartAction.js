import axios from "axios";

import {
  addItemToCart,
  deleteItemFromCart,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

export const addActionItemToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/product/${id}`);
  if (data._id) {
    dispatch({
      type: addItemToCart,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        Price: data.Price,
        countInStock: data.countInStock,
        qty,
      },
    });
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCartAction = (id) => async (dispatch, getState) => {
  dispatch({ type: deleteItemFromCart, payload: id });

  localStorage.setItem("cartItems", getState().cart.cartItems);
};

export const addShippingAddress = (shipping) => (dispatch) => {
  dispatch({ type: SAVE_SHIPPING_ADDRESS, payload: shipping });

  localStorage.setItem("shippingAddress", JSON.stringify(shipping));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: SAVE_PAYMENT_METHOD, payload: data });

  localStorage.setItem("paymentMethod", JSON.stringify(data));
};
