import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  RESET_MESSAGE
} from "../constants/action-types";

const initialState = {
  user: {},
  isAuth: false,
  loginMsg: "",
  registerMsg: "",
  redirectTo: ""
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload.id) {
        return {
          user: action.payload,
          isAuth: true,
          redirectTo: "/posts"
        };
      } else {
        return {
          loginMsg: action.payload,
          isAuth: false
        };
      }
    case REGISTER_USER:
      return {
        registerMsg: action.payload
      };
    case LOGOUT_USER:
      return {
        isAuth: false
      };
    case RESET_MESSAGE:
      return {
        loginMsg: action.payload,
        registerMsg: action.payload
      };
    default:
      return state;
  }
}
