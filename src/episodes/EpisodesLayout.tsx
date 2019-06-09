import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { NavigationEvents } from "react-navigation";
import { AnyAction } from "redux";
import { connect } from "react-redux";
import * as actions from "../redux-store/actions";
import { StateProvider } from "./context";
import { EpisodeList, SeasonList } from "./views";

const winSize = Dimensions.get("window");

interface Props {
  navigation: any;
  fetchSeasonData(showId: number): AnyAction;
}

const EpisodeLayout = props => {
  const { navigation, fetchSeasonData } = props;
  const showId = navigation.getParam(
    "showId",
    global.__provider().categories[0].type
  );
  return (
    <View style={styles.container}>
      <NavigationEvents
        onWillFocus={({
          state: {
            params: { showId }
          }
        }) => {
          fetchSeasonData({ showId });
        }}
      />
      <StateProvider>
        <SeasonList style={styles.seasonContainer} />
        <EpisodeList style={styles.episodeContainer} />
      </StateProvider>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  seasonContainer: {
    width: 130
  },
  episodeContainer: {
    width: winSize.width - 130
  }
});

const mapDispatchToProps = {
  ...actions
};

const mapStateToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EpisodeLayout);