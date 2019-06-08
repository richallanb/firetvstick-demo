import { put, takeLeading, select } from "redux-saga/effects";
import {
  FETCH_SHOW_DATA,
  FETCH_SEASON_DATA,
  FETCH_SEARCH_SHOW_DATA
} from "../shows/actionTypes";
import {
  updateShowData,
  fetchedShowData,
  searchedShowData
} from "../shows/actions";
import { AnyAction } from "redux";

function* fetchShowData({ payload: category }: AnyAction) {
  const data = yield global
    .__provider()
    .fetchShows({ name: "", type: category });
  yield put(fetchedShowData({ data }));
}

function* fetchSeasonData({ payload: { id } }: AnyAction) {
  const data = yield global.__provider().fetchSeasons({ showId: id });
  yield put(updateShowData({ showId: id, data }));
}

function* fetchSearchData({ payload: { query } }: AnyAction) {
  const searchData = yield global.__provider().searchShows({ query });
  yield put(searchedShowData({ searchData }));
}

export function* fetchShowEpisodesAsync() {
  yield takeLeading(FETCH_SEASON_DATA, fetchSeasonData);
}

export function* fetchShowDataAsync() {
  yield takeLeading(FETCH_SHOW_DATA, fetchShowData);
}

export function* fetchSearchDataAsync() {
  yield takeLeading(FETCH_SEARCH_SHOW_DATA, fetchSearchData);
}
