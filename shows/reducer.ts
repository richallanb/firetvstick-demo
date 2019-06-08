import { createReducer } from "../redux-utils";

import {
  FETCHED_SHOW_DATA,
  FETCH_SHOW_DATA,
  UPDATE_SHOW_DATA,
  FETCH_SEARCH_SHOW_DATA,
  FETCHED_SEARCH_SHOW_DATA
} from "./actionTypes";

const fetchedShowData = (state, action) => ({
  ...state,
  ...action.payload,
  isFetching: false
});

const fetchedSearchShowData = (state, action) => ({
  ...state,
  ...action.payload,
  isFetching: false
})

const updateShowData = (state, action) => {
  const { id, data } = action.payload;
  return {
    ...state,
    data: state.data.map(show => (show.id === id ? { ...show, ...data } : show))
  };
};

const isFetching = state => ({
  ...state,
  isFetching: true
});

export default createReducer(
  {
    data: [],
    searchData: [],
    isFetching: false
  },
  {
    [FETCH_SHOW_DATA]: isFetching,
    [FETCH_SEARCH_SHOW_DATA]: isFetching,
    [FETCHED_SEARCH_SHOW_DATA]: fetchedSearchShowData,
    [FETCHED_SHOW_DATA]: fetchedShowData,
    [UPDATE_SHOW_DATA]: updateShowData
  }
);
