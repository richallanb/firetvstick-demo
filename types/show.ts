import Season from "./season";

export interface ShowDescription {
  description: string;
  wallArt: string;
}

export interface ShowCoreInformation {
  picture: string;
  name: string;
  description: string;
  seasons: Season[];
}

export interface Show extends ShowDescription, ShowCoreInformation {
  id: number;
  provider: string;
}
