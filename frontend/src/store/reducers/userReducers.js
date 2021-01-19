import {
  USER_LOGOUT,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  DETAILS_USER_FAIL,
  DETAILS_USER_REQUEST,
  DETAILS_USER_SUCCESS,
  DETAILS_UPDATE_REQUESTED,
  DETAILS_UPDATE_SUCCESS,
  DETAILS_UPDATE_FAIL,
  LIST_USER_FAIL,
  LIST_USER_REQUEST,
  LIST_USER_SUCCESS,
  LIST_USER_RESET,
  DELETE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAIL,
  UPDATE_ADMIN_USER_REQUEST,
  UPDATE_ADMIN_USER_SUCCESS,
  UPDATE_ADMIN_USER_FAIL,
} from "../constants/userConstants";

export const userReducers = (state = { user: {}, loading: null, err: null }, dispatch) => {
  switch (dispatch.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, user: {}, loading: true, err: null };
    case LOGIN_USER_SUCCESS:
      return { ...state, user: dispatch.payload, loading: false, err: null };
    case LOGIN_USER_FAIL:
      return { ...state, user: {}, loading: false, err: dispatch.payload };
    case USER_LOGOUT:
      return { ...state, user: {}, loading: false, err: null };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { user: {}, loadng: null, err: null }, dispatch) => {
  switch (dispatch.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true, user: {}, err: null };
    case REGISTER_USER_SUCCESS:
      return { loading: null, user: dispatch.payload, err: null };
    case REGISTER_USER_FAIL:
      return { loading: null, user: {}, err: dispatch.payload };
    default:
      return { ...state };
  }
};

export const userDetailsReducer = (
  state = { user: {}, loading: null, err: null, successUpdatedMessage: null },
  dispatch
) => {
  switch (dispatch.type) {
    case DETAILS_USER_REQUEST:
      return { ...state, loading: true, user: {}, err: null, successUpdatedMessage: null };
    case DETAILS_USER_SUCCESS:
      return { ...state, loading: null, user: dispatch.payload, err: null };
    case DETAILS_USER_FAIL:
      return { ...state, loading: null, user: {}, err: dispatch.payload };
    case DETAILS_UPDATE_REQUESTED:
      return { ...state, loading: true, err: null };
    case DETAILS_UPDATE_SUCCESS:
      return {
        ...state,
        loading: null,
        user: dispatch.payload,
        err: null,
        successUpdatedMessage: "Updated successfully!",
      };
    case DETAILS_UPDATE_FAIL:
      return { ...state, loading: null, err: dispatch.payload, successUpdatedMessage: null };
    default:
      return { ...state };
  }
};

export const listUsers = (state = {}, action) => {
  switch (action.type) {
    case LIST_USER_REQUEST:
      return { loading: true };
    case LIST_USER_SUCCESS:
      return { loading: false, users: action.payload };
    case LIST_USER_FAIL:
      return { loading: false, error: action.payload };
    case LIST_USER_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const deleteUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true };
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getUserByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return { loading: true };
    case GET_USER_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserByIdReducer = (
  state = { loading: false, error: null, user: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_ADMIN_USER_REQUEST:
      return { loading: true, user: {}, error: null };
    case UPDATE_ADMIN_USER_SUCCESS:
      return { loading: false, user: action.payload, error: null };
    case UPDATE_ADMIN_USER_FAIL:
      return { loading: false, error: action.payload, user: {} };
    default:
      return state;
  }
};
