import { put, takeLatest } from "redux-saga/effects";
import { WonderfulSubs } from ".";
import {
  FETCH_SHOW_DATA,
  FETCH_SEASON_DATA
} from "../shows/actionTypes";
import { updateShows, updateShowData } from "../shows/actions";
import { AnyAction } from "redux";

const provider = new WonderfulSubs();

function* fetchShowData() {
  const data = yield provider.fetchShows();
  yield put(updateShows({ data }));
}

function* fetchSeasonData({ payload: { id } }: AnyAction) {
  const data = yield provider.fetchSeasons({ showId: id });
  yield put(updateShowData({ showId: id, data }));
}

export function* fetchShowEpisodesAsync() {
  yield takeLatest(FETCH_SEASON_DATA, fetchSeasonData);
}

export function* fetchShowDataAsync() {
  yield takeLatest(FETCH_SHOW_DATA, fetchShowData);
}
