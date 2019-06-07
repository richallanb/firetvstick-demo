import {
  INITIALIZE_SHOWS,
  UPDATE_SHOWS,
  FETCH_SHOW_DATA,
  FETCHED_SHOW_DATA,
  UPDATE_SHOW_DATA,
  FETCH_EPISODE_DATA,
  FETCHED_EPISODE_DATA,
  FETCH_SEASON_DATA,
  FETCHED_SEASON_DATA
} from "./actionTypes";
import { Action } from "../redux-utils";

export function initializeShows(): Action {
  return {
    type: INITIALIZE_SHOWS
  };
}

export function updateShows(target: {
  data: object;
}): Action<{ data: object }> {
  const { data } = target;
  return {
    type: UPDATE_SHOWS,
    payload: { data }
  };
}

export function fetchShowData(): Action {
  return {
    type: FETCH_SHOW_DATA
  };
}

export function fetchedShowData(): Action {
  return {
    type: FETCHED_SHOW_DATA
  };
}

export function fetchEpisodeData(target: {
  showId: number;
}): Action<{ id: number }> {
  const { showId: id } = target;
  return {
    type: FETCH_EPISODE_DATA,
    payload: { id }
  };
}

export function fetchedEpisodeData(): Action {
  return {
    type: FETCHED_EPISODE_DATA
  };
}

export function fetchSeasonData(target: {
  showId: number;
}): Action<{ id: number }> {
  const { showId: id } = target;
  return {
    type: FETCH_SEASON_DATA,
    payload: { id }
  };
}

export function fetchedSeasonData(): Action {
  return {
    type: FETCHED_SEASON_DATA
  };
}

export function updateShowData(target: {
  showId: number;
  data: object;
}): Action<{ id: number; data: object }> {
  const { showId: id, data } = target;
  return {
    type: UPDATE_SHOW_DATA,
    payload: { id, data }
  };
}
