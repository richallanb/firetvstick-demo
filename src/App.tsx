import React, { Component } from "react";
import { Provider } from "react-redux";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { useScreens } from "react-native-screens";
import { Player } from "./player";
import { ShowsLayout } from "./shows";
import { WonderfulSubs } from "./provider";
import { Provider as ProviderInterface } from "./provider/providerInterface";
import { Easing, Animated } from "react-native";
import { EpisodesLayout } from "./episodes";
import { buildStore } from "./store";

useScreens();

const provider = new WonderfulSubs();

global.__provider = (): ProviderInterface => provider;
const router = require("./router");
const { RouterComponent, navReducer } = router;
const store = buildStore(navReducer);

export default class App extends Component {
  render() {
    console.log(RouterComponent);
    return (
      <Provider store={store}>
        <RouterComponent />
      </Provider>
    );
  }
}
