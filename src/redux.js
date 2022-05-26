import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";


// Read user from the localStorage
const readUserFromLocalStorage=()=> {
  try {
    const serialized = localStorage.getItem("name");
    if (serialized === null) {
      return undefined;
    }
    return JSON.parse(serialized);
  } catch (err) {
    return undefined;
  }
}

const initialState = {
  user: readUserFromLocalStorage()
};

// Reducer
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "USER_SIGNUP":
      return {
        user: payload
      };
    case "USER_LOGIN":
      return {
        user: payload
      };
    default:
      return state;
  }
};

// Store
export const store = createStore(
  reducer,
  initialState,
  applyMiddleware(thunk, logger)
);

// Actions

export const userSignup = (payload) => (dispatch) => {
  console.log(payload.payload.name,"payload")
  localStorage.setItem("name", JSON.stringify(payload.payload.name));
  return dispatch({
    type: "USER_SIGNUP",
    payload: payload.payload
  })
}

export const userLogin = (payload) => (dispatch) => {
  console.log(payload.payload.name,"payload")
  localStorage.setItem("name", JSON.stringify(payload.payload.name));
  return dispatch({
    type: "USER_LOGIN",
    payload: payload.payload
  })
}

