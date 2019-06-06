/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import {
  createSwitchNavigator,
  createAppContainer,
  SwitchActions
} from "react-navigation";
import { useScreens } from "react-native-screens";
import Player from './Player';
import ShowList from './ShowList';

useScreens();

const AppNavigator = createSwitchNavigator(
  {
    Player: {
      screen: Player
    },
    ShowList: {
      screen: ShowList
    }
  },
  {
    initialRouteName: "ShowList"
  }
);

export default createAppContainer(AppNavigator);
