import { bindActionCreators } from 'redux';
import { updateShowData } from "../../shows/actions";

const showShortName = ({ url }) => {
  return url.substring(url.indexOf("watch/") + 6);
};

const fetchSeasonData = async ({ id, url }) => {
  const response = await fetch(url);
  const json = await response.json();
  console.log(json);
  return updateShowData({ id, data: { test: 123 } });
};

export default class WonderfulSubs {
  constructor() {
    this.boundActions = bindActionCreators({updateShowData}, )
  }

  translateShows = ({ json: { series = [] } = {} } = {}) => {
    return series.map((show, index) => ({
      id: index,
      name: show.title,
      description: show.description,
      picture: show.poster_tall[2].source,
      wallArt: show.poster_wide[4].source,
      seasons: () =>
        fetchSeasonData({
          id: index,
          url: `https://www.wonderfulsubs.com/api/v1/media/series?series=${showShortName(
            show
          )}`
        })
    }));
  };
  translateSeasons = season => {
    if (typeof season === 'function') {
      // nothing
    }
  }
}
