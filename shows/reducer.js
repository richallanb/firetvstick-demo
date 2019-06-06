import { createReducer } from "../redux-utils";
import { WonderfulSubs } from "../provider";
import { UPDATE_SHOWS, FETCHED_SHOW_DATA } from "./actionTypes";

const translate = new WonderfulSubs();

const updateShows = (state, action) => ({
  ...state,
  ...action.payload
});

const fetchedShowData = (state, action) => {
  const { payload } = action;
  return {
    ...state,
    data: translate.translateShows(payload)
  };
};

const updateShowData = (state, action) => {
  const { id, data } = action.payload;
  return {
    state,
    data: state.data.map(show => (show.id === id ? { ...show, ...data } : show))
  };
};

export default createReducer(
  {
    data: [],
    isFetching: false
  },
  {
    UPDATE_SHOWS: updateShows,
    FETCHED_SHOW_DATA: fetchedShowData,
    UPDATE_SHOW_DATA: updateShowData
  }
);
