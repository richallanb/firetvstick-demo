import {
  Show,
  Category
} from "../types";



export interface Provider {
  key: string;
  categories: Category[];
  getSettings(): object;
  setSettings(settings: object): object;
  fetchShows({ type } : Category): Promise<Show[]>;
  fetchShowDecription(target: { showId: number }): Promise<Show>;
  searchShows(target: {query: string}): Promise<Show[]>;
  fetchSeasons(target: { showId: number }): Promise<Show>;
  fetchEpisodes(target: { showId: number; seasonId: number }): Promise<Show>;
  fetchEpisodeDescription(target: {
    showId: number;
    seasonId: number;
    episodeId: number;
  }): Promise<Show>;
  fetchSources(target: {
    showId: number;
    seasonId: number;
    episodeId: number;
  }): Promise<Show>;
};