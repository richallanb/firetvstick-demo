/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Animated,
  DeviceEventEmitter,
  TouchableHighlight,
  Button
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import VideoPlayer from "react-native-video";
import { FirestickKeys } from "./components/firestick-keys";
import test from "./crawler/test";
import {
  createSwitchNavigator,
  createAppContainer,
  SwitchActions
} from "react-navigation";
import FocusManager from "./FocusManager";
import ShowItem from './ShowItem';

const testData = [
  {
    id: '1',
    name: 'Yatogame-chan Kansatsu Nikki',
    description: "After growing up in Tokyo, high school student Jin Kaito moves to Nagoya where he meets Yatogame Monaka, a fellow student who puts her Nagoya dialect on full display. With her cat-like appearance and unvarnished Nagoya dialect, Yatogame won't open up to him at all. This popular local comedy is increasing the status of Nagoya through observation of the adorable Yatogame-chan!",
    picture: 'https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/abf311bc630e6bb123e072f62c8f2320.jpg',
    wallArt: 'https://static.vrv.co/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/76da51a0494fbcd18a5779165c8cd67c.jpg'
  },
  {
    id: '2',
    name: 'One Piece',
    description: "Monkey. D. Luffy refuses to let anyone or anything stand in the way of his quest to become the king of all pirates. With a course charted for the treacherous waters of the Grand Line and beyond, this is one captain who'll never give up until he's claimed the greatest treasure on Earth: the Legendary One Piece!",
    picture: 'https://static.vrv.co/imgsrv/display/thumbnail/240x360/catalog/crunchyroll/15c8f292c92584f73a65b2d0fd6a167c.jpg',
    wallArt: 'https://static.vrv.co/imgsrv/display/thumbnail/1200x675/catalog/crunchyroll/4085817886f2fbb9cacfb975217bbcc2.jpg'
  }
]


export default class ShowList extends Component {
  state = {
    color: "purple"
  };

  

  render() {
    const items = testData.map(item => <ShowItem key={item.id} title={item.name} imageSource={item.picture} onPress={() => console.log(item)} />);
    return (
      <View style={styles.container}>
        {/* <TouchableHighlight
          style={styles.button}
          key="video"
          onPress={() => {
            this.props.navigation.dispatch(
              SwitchActions.jumpTo({ routeName: "Player" })
            );
            console.log("test");
          }}
        >
          <Text>Details Screen</Text>
        </TouchableHighlight> */}
        {items}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
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