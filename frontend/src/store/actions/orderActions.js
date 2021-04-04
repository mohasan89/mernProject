import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_SUCCESS,
  MYORDERS_FAIL,
  MYORDERS_REQUEST,
  MYORDERS_SUCCESS,
  ORDERS_ALL_LIST_REQUEST,
  ORDERS_ALL_LIST_SUCCESS,
  ORDERS_ALL_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
} from "../constants/ordersConstrants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST });
    const { user } = getState().user;
    const { token } = user;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.post("/api/order", order, config);
    if (data.message) {
      throw new Error(data.message);
    }
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message || "unkown error" });
  }
};

export const orderDetails = (id) => async (dispatch, getState) => {
  try {
    const token = getState().user.user.token;
    dispatch({ type: ORDER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(`/api/order/${id}`, config);

    if (data.message) {
      console.log(data);
      throw new Error(data.message);
    } else {
      dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: err.message || "unknown server error" });
  }
};

export const orderPaymentAction = (id, paymentResults) => async (dispatch, getState) => {
  try {
    const token = getState().user.user.token;
    dispatch({ type: ORDER_PAYMENT_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/order/${id}/pay`, paymentResults, config);
    if (!data.message) {
      dispatch({ type: ORDER_PAYMENT_SUCCESS });
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    dispatch({ type: ORDER_PAYMENT_FAIL, payload: err.message || "unknown server error" });
  }
};

export const myorders = () => async (dispatch, getState) => {
  dispatch({ type: MYORDERS_REQUEST });
  try {
    const token = getState().user.user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/order/myorders", config);
    if (data.message) {
      throw new Error(data.message);
    } else {
      dispatch({ type: MYORDERS_SUCCESS, payload: data });
    }
  } catch (err) {
    dispatch({ type: MYORDERS_FAIL, payload: err.message || "Orders not found" });
  }
};

export const fetchAllOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDERS_ALL_LIST_REQUEST });

    const token = getState().user.user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/orders", config);
    if (!data.message) {
      dispatch({ type: ORDERS_ALL_LIST_SUCCESS, payload: data });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: ORDERS_ALL_LIST_FAIL, payload: error.message });
  }
};

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const token = getState().user.user.token;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    console.log(config);
    const res = await axios.put(`/api/order/${id}/deliver`, {}, config);

    const data = { res };

    if (!data.message) {
      dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: ORDER_DELIVERED_FAIL, payload: error.message });
  }
};
