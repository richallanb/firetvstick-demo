import { fetchShowData } from "./actions";
import {
  INITIALIZE_SHOWS,
  INFINITE_SCROLL_FETCH_SHOW_DATA
} from "./actionTypes";
import createMiddleware from "../redux-utils/createMiddleware";

function initialFetch(state, { payload }) {
  return fetchShowData(payload);
}

function fetchMoreData(state, { payload }) {
  return fetchShowData(payload);
}

export default createMiddleware({
  [INITIALIZE_SHOWS]: initialFetch,
  [INFINITE_SCROLL_FETCH_SHOW_DATA]: fetchMoreData
});
