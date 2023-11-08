const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
        loading: false,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: null,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
