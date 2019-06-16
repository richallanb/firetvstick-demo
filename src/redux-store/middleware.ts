import { fetchShowData, fetchSourceData } from "./actions";
import {
  INITIALIZE_SHOWS,
  INFINITE_SCROLL_FETCH_SHOW_DATA,
  FETCH_NEXT_EPISODE
} from "./actionTypes";
import createMiddleware from "../redux-utils/createMiddleware";
import { Show } from "../types";
import { findNextEpisode } from "../show-utils";

function initialFetch(state, { payload }) {
  return fetchShowData(payload);
}

function fetchMoreData(state, { payload }) {
  return fetchShowData(payload);
}

function fetchNextEpisode(state: { shows: { showData: Show } }, { payload }) {
  const { showId, seasonId, episodeId } = payload;
  const {
    shows: { showData }
  } = state;
  const { season: nextSeason, episode: nextEpisode } = findNextEpisode({
    seasonId,
    episodeId,
    show: showData
  });

  return fetchSourceData({
    showId: showId,
    seasonId: nextSeason.id,
    episodeId: nextEpisode.id
  });
}

export default createMiddleware({
  [INITIALIZE_SHOWS]: initialFetch,
  [INFINITE_SCROLL_FETCH_SHOW_DATA]: fetchMoreData,
  [FETCH_NEXT_EPISODE]: fetchNextEpisode
});
