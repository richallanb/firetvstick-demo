import React, { useReducer, createContext, useContext } from "react";
import { set } from 'lodash';

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const initialState = {};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_OPTION": {
      const { path, value } = action.payload;
      return set(state, path, value);
    }
    default: {
      return state;
    }
  }
};

export const StateContext = createContext([]);

export const useStateValue = () => useContext(StateContext);

export const setOption = (path, value) => ({
  type: 'SET_OPTION',
  payload: {
    path,
    value
  }
});
