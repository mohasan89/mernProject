import {
  addItemToCart,
  deleteItemFromCart,
  SAVE_SHIPPING_ADDRESS,
  SAVE_PAYMENT_METHOD,
} from "../constants/cartConstants";

const cartReducers = (state = { cartItems: [], shippingAddress: {} }, dispatch) => {
  switch (dispatch.type) {
    case addItemToCart:
      const item = dispatch.payload;
      const existItems = state.cartItems.find((x) => x.product === item.product);
      if (existItems) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) => (x.product === existItems.product ? item : x)),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case deleteItemFromCart:
      return { ...state, cartItems: state.cartItems.filter((x) => x.product !== dispatch.payload) };
    case SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: dispatch.payload };
    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: dispatch.payload };
    default:
      return state;
  }
};

export default cartReducers;
