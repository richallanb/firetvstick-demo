import { put, takeLatest } from "redux-saga/effects";
import { FETCH_SHOW_DATA, FETCH_SEASON_DATA } from "../shows/actionTypes";
import { updateShows, updateShowData } from "../shows/actions";
import { AnyAction } from "redux";

function* fetchShowData() {
  const data = yield global.__provider().fetchShows({ name: "", type: "popular" });
  yield put(updateShows({ data }));
}

function* fetchSeasonData({ payload: { id } }: AnyAction) {
  const data = yield global.__provider().fetchSeasons({ showId: id });
  yield put(updateShowData({ showId: id, data }));
}

export function* fetchShowEpisodesAsync() {
  yield takeLatest(FETCH_SEASON_DATA, fetchSeasonData);
}

export function* fetchShowDataAsync() {
  yield takeLatest(FETCH_SHOW_DATA, fetchShowData);
}
