import {
  INITIALIZE_SHOWS,
  FETCH_SHOW_DATA,
  FETCHED_SHOW_DATA,
  UPDATE_SHOW_DATA,
  FETCH_EPISODE_DATA,
  FETCHED_EPISODE_DATA,
  FETCH_SEASON_DATA,
  FETCHED_SEASON_DATA,
  INFINITE_SCROLL_FETCH_SHOW_DATA,
  FETCH_SEARCH_SHOW_DATA,
  FETCHED_SEARCH_SHOW_DATA,
  FETCH_SOURCE_DATA,
  FETCH_NEXT_EPISODE,
  INITIALIZE_OPTIONS,
  SET_OPTION
} from "./actionTypes";
import { Action } from "../redux-utils";
import { Show } from "../types";

export function initializeShows(category: string): Action<string> {
  return {
    type: INITIALIZE_SHOWS,
    payload: category
  };
}

export function fetchedShowData(target: {
  data: Show[];
}): Action<{ data: Show[] }> {
  const { data } = target;
  return {
    type: FETCHED_SHOW_DATA,
    payload: { data }
  };
}

export function fetchShowData(target: {
  category: string;
  infiniteScroll: boolean;
}): Action<{ category: string; infiniteScroll: boolean }> {
  const { category, infiniteScroll } = target;
  return {
    type: FETCH_SHOW_DATA,
    payload: { category, infiniteScroll }
  };
}

export function searchShowData(query: string): Action<{ query: string }> {
  return {
    type: FETCH_SEARCH_SHOW_DATA,
    payload: { query }
  };
}

export function searchedShowData(target: {
  searchData: Show[];
}): Action<{ searchData: Show[] }> {
  const { searchData } = target;
  return {
    type: FETCHED_SEARCH_SHOW_DATA,
    payload: { searchData }
  };
}

export function infiniteScrollShowData(category: string): Action<string> {
  return {
    type: INFINITE_SCROLL_FETCH_SHOW_DATA,
    payload: category
  };
}

export function fetchEpisodeData(target: {
  showId: string;
}): Action<{ id: string }> {
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

export function fetchNextEpisode(current: {
  showId: string;
  seasonId: string;
  episodeId: string;
}): Action<{ showId: string; seasonId: string; episodeId: string }> {
  const { showId, seasonId, episodeId } = current;
  return {
    type: FETCH_NEXT_EPISODE,
    payload: { showId, seasonId, episodeId }
  };
}

export function fetchSeasonData(target: {
  showId: string;
}): Action<{ id: string }> {
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

export function fetchSourceData(target: {
  showId: string;
  seasonId: number;
  episodeId: number;
  stalledSourceId?: number;
  sourceId?: number;
}): Action<{ showId: string; seasonId: number; episodeId: number; stalledSourceId?: number; sourceId?: number }> {
  const { showId, seasonId, episodeId, stalledSourceId, sourceId } = target;
  return {
    type: FETCH_SOURCE_DATA,
    payload: { showId, seasonId, episodeId, stalledSourceId, sourceId }
  };
}

export function updateShowData(target: {
  showId: string;
  data: object;
}): Action<{ id: string; data: object }> {
  const { showId: id, data } = target;
  return {
    type: UPDATE_SHOW_DATA,
    payload: { id, data }
  };
}

export function initializeSettings(settings: any): Action<any> {
  return {
    type: INITIALIZE_OPTIONS,
    payload: settings
  };
}

export function updateSettings(path: string, value: any): Action<{ path: string, value: any }> {
  return {
    type: SET_OPTION,
    payload: {
      path,
      value
    }
  };
}
