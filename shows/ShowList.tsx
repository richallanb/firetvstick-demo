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
import { StyleSheet, View, ScrollView } from "react-native";
import { StackActions } from "react-navigation";
import * as actions from "./actions";
import ShowItem from "./ShowItem";
import { Show } from "../types";
import { DISPLAY } from "../constants";
import { useStateValue } from "./context";

interface Props {
  navigation: any;
  infiniteScrollShowData(category: string): AnyAction;
  fetchSeasonData(target: { showId: number }): AnyAction;
  category: string;
  shows: {
    data: Show[];
    searchData: Show[];
  };
}

const ShowList = (props: Props) => {
  const [state, dispatch] = useStateValue();
  const {
    navigation,
    infiniteScrollShowData,
    fetchSeasonData,
    category,
    shows
  } = props;

  const resetCategory = () => {
    dispatch({
      type: "SET_SELECTED_CATEGORY",
      payload: undefined
    });
  };

  const setSelectedShow = id => {
    dispatch({
      type: "SET_SELECTED_SHOW",
      payload: id
    });
  };

  const getSources = async sourceFetch => {
    const response = await sourceFetch();
    const result = await response.json();
    return result.urls && result.urls[result.urls.length - 1];
  };

  const playVideo = async sourceFetch => {
    const source = await getSources(sourceFetch);
    console.log(source);
    navigation.dispatch(
      StackActions.push({
        routeName: "Player",
        params: { uri: source.src }
      })
    );
  };

  const showData = category === "search" ? shows.searchData : shows.data;
  const items = showData.map(item => (
    <ShowItem
      focused={item.id === state.selectedShow}
      key={item.id}
      title={item.name}
      imageSource={item.picture}
      onPress={() => fetchSeasonData({ showId: item.id })}
      onFocus={() => {
        resetCategory();
        setSelectedShow(item.id);
      }}
    />
  ));

  const calculateScrollPercentage = (scrollPosition: number) => {
    const scrollPositionWithOffset = this.scrollWindowSize + scrollPosition;
    return scrollPositionWithOffset / this.windowHeight;
  };

  return (
    <ScrollView
      onLayout={({ nativeEvent: { layout } }) =>
        (this.scrollWindowSize = layout.height)
      }
      onScroll={({ nativeEvent: { contentOffset } }) => {
        if (
          shows.data.length < DISPLAY.SHOW_LIST.MAX_SHOWS_ON_SCREEN &&
          category !== "search"
        ) {
          const scrollPrecentage = calculateScrollPercentage(contentOffset.y);
          if (
            scrollPrecentage >
            DISPLAY.SHOW_LIST.FETCH_SHOWS_AT_SCROLL_PRECENTAGE
          ) {
            infiniteScrollShowData(category);
          }
        }
      }}
      scrollEventThrottle={10}
    >
      <View
        onLayout={({ nativeEvent: { layout } }) =>
          (this.windowHeight = layout.height)
        }
        style={styles.container}
      >
        {items}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "rgb(36,36,33)"
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
)(ShowList);
