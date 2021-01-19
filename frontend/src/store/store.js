import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import {
  productReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productEditReducer,
  productAddReviewReducer,
  productTopReducer,
} from "./reducers/productReducer";
import cartReducers from "./reducers/cartReducers";
import {
  userReducers,
  userRegisterReducer,
  userDetailsReducer,
  listUsers,
  deleteUsersReducer,
  getUserByIdReducer,
  updateUserByIdReducer,
} from "./reducers/userReducers";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPaymentReducer,
  myordersReducer,
  allOrdersAdminReducer,
  deliverOrdersAdminReducer,
} from "./reducers/orderReducers";

const reducers = combineReducers({
  products: productReducer,
  details: productDetailReducer,
  cart: cartReducers,
  user: userReducers,
  regUser: userRegisterReducer,
  detailsUser: userDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPayment: orderPaymentReducer,
  myOrders: myordersReducer,
  listUsers: listUsers,
  deleteUser: deleteUsersReducer,
  editUser: getUserByIdReducer,
  updateUser: updateUserByIdReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  adminOrders: allOrdersAdminReducer,
  adminDeliverOrder: deliverOrdersAdminReducer,
  productReview: productAddReviewReducer,
  topProducts: productTopReducer,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : {};

const shippingAddress = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const paymentMethod = localStorage.getItem("paymentMethod")
  ? JSON.parse(localStorage.getItem("paymentMethod"))
  : {};

const intialState = {
  cart: { cartItems, shippingAddress, paymentMethod },
  user: { user: userInfo, err: null, loading: false },
};

const store = createStore(
  reducers,
  intialState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
