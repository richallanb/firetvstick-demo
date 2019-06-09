import { Episode } from "./episode";

interface Season {
  id: number;
  seasonNumber: number;
  episodes: Episode[];
}

export default Season;
