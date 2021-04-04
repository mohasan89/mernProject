import axios from "axios";

import {
  PRODCUT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODCUT_DETAILS_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODCUT_DELETE_FAIL,
  PRODCUT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODCUT_EDIT_FAIL,
  PRODUCT_EDIT_REQUEST,
  PRODUCT_EDIT_SUCCESS,
  PRODCUT_REVIEW_FAIL,
  PRODUCT_REVIEW_REQUEST,
  PRODUCT_REVIEW_SUCCESS,
  PRODCUT_TOP_FAIL,
  PRODUCT_TOP_REQUEST,
  PRODUCT_TOP_SUCCESS,
} from "../constants/productConstraints";

export const listProducts = (keyword = "", pageNumber = 1) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });

    const results = await axios.get(`/api/products?keyword=${keyword}&page=${pageNumber}`);
    const { data } = results;
    if (data.message) {
      const err = new Error("unable to connect");
      throw err;
    }
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODCUT_LIST_FAIL, payload: err.message || "unable to fetch products" });
  }
};

export const detailProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const results = await axios.get("/api/product/" + id);
    const { data } = results;
    if (data.message) {
      const err = new Error("unable to connect");
      throw err;
    }
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: PRODCUT_DETAILS_FAIL, payload: err.message || "unable to fetch products" });
  }
};

export const deleteProduct = (prodId) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_DELETE_REQUEST });

    const token = getState().user.user.token;

    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };

    const response = await axios.delete(`/api/product/${prodId}`, config);

    const { data } = response;

    if (data.message === "deleted") {
      dispatch({ type: PRODUCT_DELETE_SUCCESS });
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    dispatch({ type: PRODCUT_DELETE_FAIL, payload: err.message });
  }
};

export const createProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_CREATE_REQUEST });

    const token = getState().user.user.token;
    const id = getState().user.user._id;

    const newProduct = { ...product, user: id };
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };

    const response = await axios.post(`/api/product/new`, newProduct, config);

    const { data } = response;
    if (data._id) {
      dispatch({ type: PRODUCT_CREATE_SUCCESS });
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    dispatch({ type: PRODCUT_CREATE_FAIL, payload: err.message });
  }
};

export const editProduct = (prodId, product) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST });

    const token = getState().user.user.token;
    const id = getState().user.user._id;

    const newProduct = { ...product, user: id };
    const config = {
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    };

    const response = await axios.put(`/api/product/${prodId}/edit`, newProduct, config);

    const { data } = response;
    if (data._id) {
      dispatch({ type: PRODUCT_EDIT_SUCCESS });
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    dispatch({ type: PRODCUT_EDIT_FAIL, payload: err.message });
  }
};

export const addReview = (productId, review) => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_REVIEW_REQUEST });
    const token = getState().user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/product/${productId}/review`, review, config);

    if (data.message === "updated") {
      dispatch({ type: PRODUCT_REVIEW_SUCCESS });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: PRODCUT_REVIEW_FAIL, payload: error.message });
  }
};

export const topItems = () => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_TOP_REQUEST });
    const { data } = await axios.get("/api/product/top");

    dispatch({ type: PRODUCT_TOP_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODCUT_TOP_FAIL, payload: error.message });
  }
};
