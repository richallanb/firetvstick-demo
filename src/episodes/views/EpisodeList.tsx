/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from "react";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  ActivityIndicator,
  FlatList
} from "react-native";
import { StackActions } from "react-navigation";
import { debounce } from "lodash";
import * as actions from "../../redux-store/actions";
import { EpisodeItem } from "../components";
import { Show } from "../../types";
import { DISPLAY_CONST, DATA_CONST } from "../../constants";
import { useStateValue } from "../context";

interface Props {
  navigation: any;
  showId: number;
  shows: {
    isFetching: boolean;
    showData: Show;
  };
  fetchSourceData(target: {
    showId: string;
    seasonId: number;
    episodeId: number;
  }): AnyAction;
  style?: object;
}

const EpisodeList = (props: Props) => {
  const [state, dispatch] = useStateValue();
  const { navigation, shows, style = {}, fetchSourceData } = props;
  const { selectedSeason } = state;
  const { showData, isFetching } = shows;

  const episodeData =
    (showData &&
      showData.seasons &&
      showData.seasons[selectedSeason] &&
      showData.seasons[selectedSeason].episodes) ||
    [];

  return (
    <FlatList
      data={episodeData.map(episode => ({ ...episode, key: `${episode.id}` }))}
      renderItem={({ item }) => (
        <EpisodeItem
          key={item.id}
          title={item.name}
          description={item.description}
          episodeNumber={item.episodeNumber}
          imageSource={item.picture}
          onPress={() =>
            fetchSourceData({
              showId: showData.id,
              seasonId: selectedSeason,
              episodeId: item.id
            })
          }
        />
      )}
      maxToRenderPerBatch={80}
      numColumns={1}
      style={{ ...styles.scrollOuterContainer, ...style }}
      contentContainerStyle={styles.scrollInnerContainer}
    />
  );
};

const styles = StyleSheet.create({
  scrollInnerContainer: {
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 10,
    paddingBottom: 5
  },
  scrollOuterContainer: {},
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "rgb(36,36,33)"
  },
  infiniteScrollingContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40
  }
});

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = state => ({
  shows: state.shows
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodeList);
