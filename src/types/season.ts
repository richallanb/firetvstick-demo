import { Episode } from "./episode";

export enum SeasonType {
  episodes = 'episodes',
  seasons = 'seasons',
  film = 'film'
}

export interface Season {
  id: number;
  seasonName: string;
  type:SeasonType
  episodes: Episode[];
}