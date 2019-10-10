import React from "react";
import { Text, View, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { StateContext } from "../context";
import * as actions from "../../redux-store/actions";
import * as reactActions from "../actions";
import { Source, Episode } from "../../types";
import {TextButton} from "../../components";

interface Props {
  showId: string;
  seasonId: string;
  episodeId: string;
  source: Source;
  episode: Episode;
  shows: {
    isFetching: boolean;
  };
  fetchSourceData(target: {
    showId: string;
    seasonId: string;
    episodeId: string;
    currentPosition: number;
    stalledSourceId?: number;
    sourceId?: number;
  }): AnyAction;
}

const winSize = Dimensions.get("window");
class LoadingBackground extends React.Component<Props> {
  static contextType = StateContext;

  render() {
    const [state, dispatch] = this.context;
    const {episode, source, shows} = this.props;
    const {
      video: { isFetching, fetchMessage, stalledSource }
    } = state;

    const fetchStalledSource = (sourceId?: number) => {
      const {
          video: { progress, duration }
      } = state;
      const { fetchSourceData, showId, seasonId, episodeId } = this.props;
      fetchSourceData({ showId, seasonId, episodeId, currentPosition: progress / duration, stalledSourceId: source.id, sourceId });
      dispatch(reactActions.clearStall());
    }

    
    
    if (!isFetching) {
      return <View />;
    }
    let stalledSourceButtons = <View />;
    if (stalledSource && !shows.isFetching) {
      const buttons = episode.sources.reduce((list, src) => {
        if (src.stalled || src.id === source.id) {
          return list;
        }
        const title = () => {
          const base = `${src.name} -  ${src.language}`;
          if (src.quality) {
            return `${base} (${src.quality})`;
          }
          return base;
        }
        return [
          ...list, 
          <TextButton key={src.id} onPress={() => fetchStalledSource(src.id)} title={title()} preferredFocus></TextButton>
        ];
      }, []);
      stalledSourceButtons = <View style={styles.sourcesContainer}>
        <Text style={styles.sourcesText}>Current source is stalled. Pick an alternate.</Text>
        {buttons}
      </View>;
    }
    return (
      <View style={{ ...styles.container }}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator
            style={styles.loadingIndicator}
            size="large"
            color="#ff9900"
          />
          </View>
          {stalledSourceButtons}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    width: winSize.width,
    height: winSize.height,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 999999,
    backgroundColor: 'rgb(0,0,0)',
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingContainer: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center"
  },
  loadingIndicator: {
    
  },
  sourcesText: {
    color: "white"
  },
  sourcesContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 20
  }
});


const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => ({
  shows: state.shows,
  settings: state.settings
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingBackground);