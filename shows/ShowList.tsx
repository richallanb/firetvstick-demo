/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { useReducer, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StyleSheet, View, BackHandler, ScrollView } from "react-native";
import { StackActions } from "react-navigation";
import * as actions from "./actions";
import ShowItem from "./ShowItem";
import { Show } from "../types";


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

interface Props {
  navigation: any;
  initializeShows();
  fetchSeasonData(target: { showId: number });
  shows: {
    data: [Show];
  };
}

const ShowList = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { navigation, initializeShows, fetchSeasonData, shows } = props;

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
    initializeShows();
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
      onPress={() => fetchSeasonData({ showId: item.id })}
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
