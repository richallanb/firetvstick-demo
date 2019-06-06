import {
  UPDATE_SHOWS,
  FETCH_SHOW_DATA,
  FETCHED_SHOW_DATA,
  UPDATE_SHOW_DATA
} from "./actionTypes";

export function updateShows(data) {
  return {
    type: UPDATE_SHOWS,
    payload: data
  };
}

export function fetchShowData() {
  return {
    type: FETCH_SHOW_DATA
  };
}

export function fetchedShowData(data) {
  return {
    type: FETCHED_SHOW_DATA,
    payload: data
  };
}

export function updateShowData({ id, data }) {
  return {
    type: UPDATE_SHOW_DATA,
    payload: { id, data }
  };
}
