import {
  Show,
  Season,
  ShowDescription,
  Episode,
  EpisodeDescription,
  Source
} from "../types";

interface Provider {
  key: string;
  getSettings(): object;
  setSettings(settings: object): object;
  fetchShows(): Promise<Show[]>;
  fetchShowDecription(target: { showId: number }): Promise<Show>;
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
}

export default Provider;
