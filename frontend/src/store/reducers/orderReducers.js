import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAYMENT_FAIL,
  ORDER_PAYMENT_REQUEST,
  ORDER_PAYMENT_RESET,
  ORDER_PAYMENT_SUCCESS,
  MYORDERS_SUCCESS,
  MYORDERS_FAIL,
  MYORDERS_REQUEST,
  ORDERS_ALL_LIST_REQUEST,
  ORDERS_ALL_LIST_SUCCESS,
  ORDERS_ALL_LIST_FAIL,
  ORDER_DELIVERED_REQUEST,
  ORDER_DELIVERED_SUCCESS,
  ORDER_DELIVERED_FAIL,
} from "../constants/ordersConstrants";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, success: false, err: action.payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, order: {}, success: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAYMENT_REQUEST:
      return { loading: true };
    case ORDER_PAYMENT_SUCCESS:
      return { loading: false, success: true };
    case ORDER_PAYMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ORDER_PAYMENT_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const myordersReducer = (state = {}, action) => {
  switch (action.type) {
    case MYORDERS_REQUEST:
      return { loading: true };
    case MYORDERS_SUCCESS:
      return { loading: false, myorders: action.payload };
    case MYORDERS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const allOrdersAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDERS_ALL_LIST_REQUEST:
      return { loading: true };
    case ORDERS_ALL_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDERS_ALL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};

export const deliverOrdersAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVERED_REQUEST:
      return { loading: true };
    case ORDER_DELIVERED_SUCCESS:
      return { loading: false };
    case ORDER_DELIVERED_FAIL:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
