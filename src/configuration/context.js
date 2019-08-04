import React, { useReducer, createContext, useContext } from "react";
import { set } from 'lodash';

export const StateProvider = ({ children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const initialState = {
  ...global.__provider().getSettings().getDefaultSettings()
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_OPTIONS": {
      return { ...state, ...action.payload };
    }
    case "SET_OPTION": {
      const { path, value } = action.payload;
      global.__provider().getSettings().updateSettings(set(state, path, value))
      return { ...state, ...set(state, path, value) };
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
