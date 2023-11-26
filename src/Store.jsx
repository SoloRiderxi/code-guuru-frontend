import { createContext, useReducer } from "react";

export const Store = createContext();

const intialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  userPassState: null,
};

//Reducer
function reducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, userInfo: action.payload };
    }

    case "LOGOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };

    case "PassState":
      return { ...state, userPassState: action.payload };

    case "ClearPassState":
      return { ...state, userPassState: null };

    default: {
      return state;
    }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, intialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
