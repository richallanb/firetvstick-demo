import React, { Component } from "react";
import { Provider } from "react-redux";
import { createAppContainer, createStackNavigator } from "react-navigation";
import { useScreens } from "react-native-screens";
import { Player } from "./player";
import { ShowsLayout } from "./shows";
import store from "./store";
import { WonderfulSubs } from "./provider";
import { Provider as ProviderInterface } from "./provider/providerInterface";
import { Easing, Animated } from "react-native";
import { EpisodesLayout } from "./episodes";

useScreens();

const provider = new WonderfulSubs();

(() => {
  global.__provider = (): ProviderInterface => provider;
})();

const initialCategory = global.__provider().categories[0].type;

const AppNavigator = createStackNavigator(
  {
    Player: {
      screen: Player
    },
    Shows: {
      screen: ShowsLayout
    },
    Episodes: {
      screen: EpisodesLayout
    }
  },
  {
    cardStyle: { backgroundColor: "#242421", opacity: 1 },
    initialRouteName: "Shows",
    initialRouteKey: initialCategory,
    initialRouteParams: {
      category: initialCategory
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0
      },
      containerStyle: { backgroundColor: "transparent", },
      screenInterpolator: undefined
    }),
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
