import { Provider } from "../providerInterface";
import { updateShowData } from "../../shows/actions";
import { Category, Show, Season, Episode, Source } from "../../types";

const showShortName = ({ url }) => {
  return url.substring(url.indexOf("watch/") + 6);
};

const showsToLookupTable = (shows: Show[]): object => {
  let objectMap = {};
  shows.forEach((show: Show) => {
    objectMap[show.id] = show;
  });
  return objectMap;
};

interface SourceWithFetchUrl extends Source {
  sourcesFetched: boolean;
  fetchUrl: string;
}

interface ShowWithShortName extends Show {
  seasonsFetched: boolean;
  shortName: string;
}

export default class WonderfulSubs implements Provider {
  public key = "wonderfulsubs";
  public categories = [
    { name: "Latest", type: "latest" },
    { name: "Popular", type: "popular" }
  ];
  private settings: object;
  private showData: ShowWithShortName[];

  constructor(settings: object = undefined) {
    this.settings = settings;
  }

  getSettings(): object {
    return this.settings;
  }

  setSettings(settings: object): object {
    this.settings = settings;
    return this.settings;
  }

  async fetchShows({ type = "latest" }: Category): Promise<Show[]> {
    const response = await fetch(
      `https://www.wonderfulsubs.com/api/v1/media/${type}?count=24`
    );
    const json = await response.json();
    const showData = this.translateShows(json);
    this.showData = showData;
    return showData;
  }

  async fetchShowDecription(target: { showId: number }): Promise<Show> {
    const { showId } = target;
    return this.showData[showId];
  }

  async fetchSeasons(target: { showId: number }): Promise<Show> {
    const { showId } = target;
    const show = <ShowWithShortName>this.showData[showId];
    if (show.seasonsFetched) {
      return show;
    }
    const response = await fetch(
      `https://www.wonderfulsubs.com/api/v1/media/series?series=${
        show.shortName
      }`
    );
    const json = await response.json();
    const translatedSeasons = this.translateSeasons(json);
    this.showData[showId] = {
      ...show,
      seasonsFetched: true,
      seasons: translatedSeasons
    };
    return this.showData[showId];
  }

  async fetchEpisodes(target: {
    showId: number;
    seasonId: number;
  }): Promise<Show> {
    throw new Error("Method not implemented.");
  }

  fetchEpisodeDescription(target: {
    showId: number;
    seasonId: number;
    episodeId: number;
  }): Promise<Show> {
    throw new Error("Method not implemented.");
  }

  fetchSources(target: {
    showId: number;
    seasonId: number;
    episodeId: number;
  }): Promise<Show> {
    throw new Error("Method not implemented.");
  }

  private translateShows = ({ json: { series = [] } }): ShowWithShortName[] => {
    return <ShowWithShortName[]>series.map(
      (show: any, index: number) =>
        <ShowWithShortName>{
          id: index,
          provider: this.key,
          name: show.title,
          description: show.description,
          picture: show.poster_tall[2].source,
          wallArt: show.poster_wide[4].source,
          shortName: showShortName(show),
          seasonsFetched: false
        }
    );
  };

  private translateSeasons = ({
    json: {
      seasons: {
        ws: { media = [] }
      }
    }
  }): Season[] => {
    const type = media[0].type;
    if (type === "episodes") {
      const season1: Season = {
        id: 0,
        seasonNumber: 1,
        episodes: this.translateEpisodes(media[0])
      };
      return [season1];
    }
    return [];
  };

  private translateEpisodes = ({ episodes = [] }) => {
    const stubSources = ({ sources = [] }): Source[] => {
      sources.map(
        (source: any) =>
          <SourceWithFetchUrl>{
            sourcesFetched: false,
            name: source.source,
            language: source.language,
            fetchUrl: Array.isArray(source.retrieve_url)
              ? source.retrieve_url[0]
              : source.retrieve_url
          }
      );
      return <SourceWithFetchUrl[]>sources;
    };
    return <Episode[]>episodes.map(
      (episode: any, index: number) =>
        <Episode>{
          id: index,
          name: episode.title,
          episodeNumber: episode.episode_number,
          description: episode.description,
          picture: episode.thumbnail[0],
          sources: stubSources(episode)
        }
    );
  };
}
