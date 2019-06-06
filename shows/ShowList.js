/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component, useReducer, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Animated,
  DeviceEventEmitter,
  TouchableHighlight,
  Button,
  BackHandler,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import VideoPlayer from "react-native-video";
import {
  createSwitchNavigator,
  createAppContainer,
  StackActions
} from "react-navigation";
import * as actions from "./actions";
import ShowItem from "./ShowItem";

const testData = [
  {
    id: "1",
    name: "Yatogame-chan Kansatsu Nikki",
    description:
      "After growing up in Tokyo, high school student Jin Kaito moves to Nagoya where he meets Yatogame Monaka, a fellow student who puts her Nagoya dialect on full display. With her cat-like appearance and unvarnished Nagoya dialect, Yatogame won't open up to him at all. This popular local comedy is increasing the status of Nagoya through observation of the adorable Yatogame-chan!",
    picture:
      "https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/abf311bc630e6bb123e072f62c8f2320.jpg",
    wallArt:
      "https://static.vrv.co/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/76da51a0494fbcd18a5779165c8cd67c.jpg"
  },
  {
    id: "2",
    name: "One Piece",
    description:
      "Monkey. D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who'll never give up until he's claimed the greatest treasure on Earth: the Legendary One Piece!",
    picture:
      "https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/15c8f292c92584f73a65b2d0fd6a167c.jpg",
    wallArt:
      "https://static.vrv.co/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/4085817886f2fbb9cacfb975217bbcc2.jpg",
    seasons: [
      {
        seasonNumber: 1,
        episodes: [
          {
            name:
              "Hayami Hiro, Mihama Koji, Nishina Kazuki: Beyond The Rainbow",
            episodeNumber: 1,
            description:
              "The tumultuous Prism King Cup has ended, and Shin becomes a first-year high school student at Kakyoin Academy. Edel Rose's new students advance one year as well. In a new environment, Shin's heart races in anticipation for the future. However, the evil hand of Schwarz Rose's supervisor Noriyuki Jin is once again secretly closing in on Edel Rose...",
            picture:
              "https://static.vrv.co/imgsrv/display/thumbnail/320x180/catalog/crunchyroll/5718f09f545b937d1db74b6abd75ef95.jpg",
            watched: false,
            sources: () =>
              fetch(
                "https://www.wonderfulsubs.com/api/v1/media/stream?code=id=157276"
              )
          }
        ]
      }
    ]
  }
];

const initialState = {
  selectedShow: undefined
};
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_SHOW": {
      return { ...state, selectedShow: action.payload };
    }
    default: {
      return state;
    }
  }
};

const ShowList = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { navigation, fetchedShowData, shows, dispatch: reduxDispatch } = props;

  const fetchData = async () => {
    const response = await fetch(
      "https://www.wonderfulsubs.com/api/v1/media/latest?count=24"
    );
    const json = await response.json();
    console.log(json);
    fetchedShowData(json);
  };

  let backHandler;
  const componentDidMountEvents = () => {
    backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      console.log("go back");
      if (!navigation.isFocused) {
        navigation.dispatch(
          StackActions.pop({
            n: 1
          })
        );
        return true;
      }
      return false;
    });
    fetchData();
  };

  const componentDidUnmountEvents = () => {
    backHandler.remove();
  };

  useEffect(() => {
    componentDidMountEvents();
    return componentDidUnmountEvents;
  }, [false]);

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

  const items = shows.data.map(item => (
    <ShowItem
      focused={item.id === state.selectedShow}
      key={item.id}
      title={item.name}
      imageSource={item.picture}
      onPress={async () => {
        const action = await item.seasons();
        reduxDispatch(action);
      }}
      onFocus={() => setSelectedShow(item.id)}
    />
  ));
  return (
    <ScrollView>
      <View style={styles.container}>{items}</View>
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
  },
  backgroundVideo: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 500
  },
  statusContainer: {
    zIndex: 700,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 60
  },
  statusText: {
    color: "#FFF",
    fontSize: 20
  },
  statusIcon: {
    color: "#FFF",
    fontSize: 25,
    marginRight: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  }
});

const mapDispatchToProps = dispatch => ({
  dispatch,
  ...bindActionCreators(actions, dispatch)
});

const mapStateToProps = state => ({
  shows: state.shows
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowList);
