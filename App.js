/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { useScreens } from "react-native-screens";
import { Player } from "./player";
import { ShowList } from "./shows";
import store from './store';

useScreens();

const AppNavigator = createStackNavigator(
  {
    Player: {
      screen: Player
    },
    ShowList: {
      screen: ShowList
    }
  },
  {
    initialRouteName: "ShowList",
    headerMode: "none"
  }
);

const Navigation = createAppContainer(AppNavigator);


export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}
