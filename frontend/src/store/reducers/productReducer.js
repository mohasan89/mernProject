import {
  PRODCUT_DETAILS_FAIL,
  PRODCUT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODCUT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODCUT_DELETE_RESET,
  PRODCUT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODCUT_CREATE_RESET,
  PRODCUT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODCUT_EDIT_RESET,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODCUT_REVIEW_FAIL,
  PRODCUT_REVIEW_RESET,
  PRODUCT_TOP_SUCCESS,
  PRODCUT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
} from "../constants/productConstraints";

export const productReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, products: [], error: null };
    case PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        error: null,
      };
    case PRODCUT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload, products: null };
    default:
      return { ...state };
  }
};

export const productDetailReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, product: { reviews: [] }, error: null };
    case PRODUCT_DETAILS_SUCCESS:
      return { ...state, loading: false, product: action.payload, error: null };
    case PRODCUT_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload, product: null };
    default:
      return { ...state };
  }
};

export const productDeleteReducer = (state = { product: { reviews: [] } }, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODCUT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODCUT_DELETE_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true };
    case PRODCUT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODCUT_CREATE_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const productEditReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_EDIT_REQUEST:
      return { loading: true };
    case PRODUCT_EDIT_SUCCESS:
      return { loading: false, success: true };
    case PRODCUT_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case PRODCUT_EDIT_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const productAddReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_REVIEW_REQUEST:
      return { loading: true };
    case PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case PRODCUT_REVIEW_FAIL:
      return { loading: false, error: action.payload };
    case PRODCUT_REVIEW_RESET:
      return {};
    default:
      return { ...state };
  }
};

export const productTopReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_TOP_REQUEST:
      return { loading: true };
    case PRODUCT_TOP_SUCCESS:
      return { loading: false, products: action.payload };
    case PRODCUT_TOP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
