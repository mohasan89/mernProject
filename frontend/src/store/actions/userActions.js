import axios from "axios";
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_REQUEST,
  USER_LOGOUT,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  DETAILS_USER_FAIL,
  DETAILS_USER_SUCCESS,
  DETAILS_USER_REQUEST,
  DETAILS_UPDATE_FAIL,
  DETAILS_UPDATE_REQUESTED,
  DETAILS_UPDATE_SUCCESS,
  LIST_USER_FAIL,
  LIST_USER_REQUEST,
  LIST_USER_SUCCESS,
  LIST_USER_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_ADMIN_USER_FAIL,
  UPDATE_ADMIN_USER_REQUEST,
  UPDATE_ADMIN_USER_SUCCESS,
} from "../constants/userConstants";

export const loginUser = (email, password) => async (dispatch) => {
  let data;
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const results = await axios.post("/api/auth/login", { email, password }, config);
    data = results.data;
    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({ type: LOGIN_USER_FAIL, payload: data ? data.message : "Invaild login or password" });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: LIST_USER_RESET });
};

export const register = (name, email, password, password2) => async (dispatch) => {
  let data;
  let results;
  try {
    if (password !== password2) {
      throw new Error("passwords did not match");
    }
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    results = await axios.post("/api/auth/user", { name, email, password }, config);

    data = results.data;

    if (data.message) {
      throw new Error(data.message);
    }
    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: err.message || "Error when registeration",
    });
  }
};

export const getDetails = () => async (dispatch, getState) => {
  const token = getState("user").user.user.token;
  let data, results;
  try {
    dispatch({ type: DETAILS_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    results = await axios.get("/api/auth/user/profile", config);

    data = results.data;

    if (data.message) {
      throw new Error(data.message);
    }
    dispatch({ type: DETAILS_USER_SUCCESS, payload: { ...data._doc, token: data.token } });
  } catch (err) {
    dispatch({
      type: DETAILS_USER_FAIL,
      payload: err.message || "Error when getting the details",
    });
  }
};

export const updateDetails = (newDetails, turnOff) => async (dispatch, getState) => {
  let results;
  let data;
  dispatch({ type: DETAILS_UPDATE_REQUESTED });
  const { password, password2, name, email, token } = newDetails;
  let updatedValues;
  if (password !== password2) {
    return dispatch({ type: DETAILS_UPDATE_FAIL, payload: "Passwords do not match" });
  }

  try {
    if (password !== "" || password2 !== "") {
      updatedValues = newDetails;
    } else {
      updatedValues = { name, email };
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    results = await axios.put("/api/auth/user/update", updatedValues, config);

    data = results.data;

    if (data.message) {
      throw new Error(data.message);
    } else {
      dispatch({ type: DETAILS_UPDATE_SUCCESS, payload: data });
      turnOff("true");
    }
  } catch (err) {
    dispatch({ type: DETAILS_UPDATE_FAIL, payload: err.message || "Unexpected error" });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  const token = getState("user").user.user.token;
  try {
    dispatch({ type: LIST_USER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get("/api/auth/users", config);

    if (data.message) {
      throw new Error(data.message);
    }
    dispatch({ type: LIST_USER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: LIST_USER_FAIL,
      payload: err.message || "Error when getting the details",
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    const token = getState("user").user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.delete(`/api/auth/user/${id}`, config);

    if (data.message === "deleted") {
      dispatch({ type: DELETE_USER_SUCCESS });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.message });
  }
};

export const getUserbyId = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const token = getState("user").user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(`/api/auth/user/${id}`, config);

    if (!data.message) {
      dispatch({ type: GET_USER_SUCCESS, payload: data });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error.message });
  }
};

export const updateUserbyId = (id, updateValues) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_ADMIN_USER_REQUEST });

    const token = getState("user").user.user.token;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.put(`/api/auth/user/${id}`, updateValues, config);

    if (!data.message) {
      dispatch({ type: UPDATE_ADMIN_USER_SUCCESS, payload: data });
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    dispatch({ type: UPDATE_ADMIN_USER_FAIL, payload: error.message });
  }
};
