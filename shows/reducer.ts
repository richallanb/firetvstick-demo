import { createReducer } from "../redux-utils";
import { WonderfulSubs } from "../provider";
import { UPDATE_SHOWS, FETCHED_SHOW_DATA } from "./actionTypes";

const updateShows = (state, action) => ({
  ...state,
  ...action.payload
});

const updateShowData = (state, action) => {
  const { id, data } = action.payload;
  return {
    state,
    data: state.data.map(show => (show.id === id ? { ...show, ...data } : show))
  };
};

const fetchShowData = state => ({
  ...state,
  isFetching: true
});

const fetchedShowData = state => ({
  ...state,
  isFetching: false
})
export default createReducer(
  {
    data: [],
    isFetching: false
  },
  {
    UPDATE_SHOWS: updateShows,
    FETCH_SHOW_DATA: fetchShowData,
    FETCHED_SHOW_DATA: fetchedShowData,
    UPDATE_SHOW_DATA: updateShowData
  }
);
